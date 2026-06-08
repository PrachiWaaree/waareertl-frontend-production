"use server";

import { cookies } from "next/headers";
//
import { PagesLayout } from "@/layouts";
import { fetchUrlGenerator } from "@/utilities";
import { PagesSectionsView } from "@/views/pages";
import { API_ENDPOINTS, GLOBAL_META } from "@/config";
import { PageNotFound } from "@/components";

const CACHE_TTL_MS = Math.max(
    1000,
    Number(process.env.SLUG_RESPONSE_CACHE_TTL_MS || 300000),
);
const responseCache =
    globalThis.__waareeRtlResponseCache ||
    (globalThis.__waareeRtlResponseCache = new Map());

const getCacheKey = (type, slug = [], language = "en") =>
    `${type}:${language}:${JSON.stringify(slug)}`;

const getCachedResponse = (type, slug = [], language = "en") => {
    const cacheKey = getCacheKey(type, slug, language);
    const cachedEntry = responseCache.get(cacheKey);

    if (!cachedEntry) {
        return null;
    }

    if (Date.now() - cachedEntry.timestamp > CACHE_TTL_MS) {
        responseCache.delete(cacheKey);
        return null;
    }

    return cachedEntry.value;
};

const setCachedResponse = (type, slug = [], language = "en", value = null) => {
    if (!value) {
        return value;
    }

    const cacheKey = getCacheKey(type, slug, language);
    responseCache.set(cacheKey, {
        value,
        timestamp: Date.now(),
    });

    return value;
};

const renderPageResponse = (response = {}, slug = []) => (
    <PagesLayout
        headerData={response?.header?.data}
        footerData={response?.footer?.data}
        whatssAppConfig={response?.whatsapp}
        otherData={response?.other_data}
    >
        <PagesSectionsView sectionsData={response?.data} slug={slug} />
    </PagesLayout>
);

export const getMetaDetailsAPI = async (slug = []) => {
    const normalizedSlug = Array.isArray(slug) ? slug : [];

    try {
        if (!normalizedSlug?.length) {
            return {
                status: false,
                error: "Slug not found",
            };
        }

        const cookiesStorage = await cookies();
        let language = cookiesStorage.get("lang")?.value || "en";
        const cachedResponse = getCachedResponse("meta", normalizedSlug, language);

        if (cachedResponse) {
            return cachedResponse;
        }

        let url = await fetchUrlGenerator(true, API_ENDPOINTS["SLUG"]);

        const payload = {
            slug: normalizedSlug,
            meta: true,
            lang: language,
        };

        const raw_response = await fetchWithRetry(url, {
            cache: "no-store",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!raw_response?.ok) {
            throw new Error(`API request failed: ${raw_response.status}`);
        }

        const response = await raw_response.json();

        if (response?.status && response?.data) {
            return setCachedResponse("meta", normalizedSlug, language, response);
        }

        return response;
    } catch (error) {
        const cachedResponse = getCachedResponse("meta", normalizedSlug, "en")
            || getCachedResponse("meta", normalizedSlug, "ar");

        if (cachedResponse) {
            return cachedResponse;
        }

        return {
            status: false,
            error: error?.message,
        };
    }
};

export const getMetaData = async (slug = []) => {
    try {
        if (!slug?.length || !Array.isArray(slug)) {
            throw new Error("Page not found - Invalid slug");
        }

        const response = await getMetaDetailsAPI(slug);

        if (response?.status && response?.data) {
            const {
                title,
                description,
                keywords,
                global_header_script,
                global_body_script,
                global_footer_script,
                page_header_script,
                page_footer_script,
            } = response.data;

            return {
                title: title || GLOBAL_META?.title,
                description: description || GLOBAL_META?.description,
                keywords: keywords || GLOBAL_META?.keywords,
                globalHeaderScript:
                    global_header_script || GLOBAL_META?.global_header_script,
                globalBodyScript:
                    global_body_script || GLOBAL_META?.global_body_script,
                globalFooterScript:
                    global_footer_script || GLOBAL_META?.global_footer_script,
                pageHeaderScript:
                    page_header_script || GLOBAL_META?.page_header_script,
                pageFooterScript:
                    page_footer_script || GLOBAL_META?.page_footer_script,
            };
        }

        return GLOBAL_META;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            return {
                ...GLOBAL_META,
                error: error.message,
            };
        }

        return GLOBAL_META;
    }
};
export const renderHTMLPage = async (slug = [], language = "en") => {
    const normalizedSlug = Array.isArray(slug) ? slug : [];
    let resolvedLanguage = language || "en";

    try {
        if (!normalizedSlug?.length) {
            throw new Error("Page not found");
        }

        const cookiesStorage = await cookies();
        const cookieLanguage = cookiesStorage.get("lang")?.value || "en";
        resolvedLanguage = language || cookieLanguage;

        const cachedResponse = getCachedResponse(
            "page",
            normalizedSlug,
            resolvedLanguage,
        );

        if (cachedResponse) {
            return renderPageResponse(cachedResponse, normalizedSlug);
        }

        let url = await fetchUrlGenerator(true, API_ENDPOINTS["SLUG"]);

        const raw_response = await fetchWithRetry(url, {
            cache: "no-store",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slug: normalizedSlug?.map((item) => decodeURIComponent(item)),
                lang: resolvedLanguage,
            }),
        });

        if (!raw_response?.ok) {
            throw new Error("Page not found");
        }

        const response = await raw_response?.json();

        if (response?.status) {
            return renderPageResponse(
                setCachedResponse(
                    "page",
                    normalizedSlug,
                    resolvedLanguage,
                    response,
                ),
                normalizedSlug,
            );
        }

        throw new Error(response?.message || "Page not found");
    } catch (error) {
        const cachedResponse =
            getCachedResponse("page", normalizedSlug, resolvedLanguage) ||
            getCachedResponse("page", normalizedSlug, "en") ||
            getCachedResponse("page", normalizedSlug, "ar");

        if (cachedResponse) {
            return renderPageResponse(cachedResponse, normalizedSlug);
        }

        return <PageNotFound />;
    }
};

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, options = {}) => {
    const maxRetries = Number(process.env.SLUG_FETCH_RETRIES || 2);
    let attempt = 0;
    let lastError = null;

    while (attempt <= maxRetries) {
        try {
            const response = await fetch(url, options);
            const shouldRetry =
                response.status === 404 ||
                response.status === 429 ||
                response.status >= 500;

            if (!shouldRetry || attempt === maxRetries) {
                return response;
            }
        } catch (error) {
            lastError = error;

            if (attempt === maxRetries) {
                throw error;
            }
        }

        const delay = Math.min(250 * Math.pow(2, attempt), 1500);
        await wait(delay);
        attempt += 1;
    }

    if (lastError) {
        throw lastError;
    }

    return fetch(url, options);
};
