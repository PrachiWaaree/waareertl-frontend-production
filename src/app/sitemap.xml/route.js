import { fetchUrlGenerator } from "../../utilities/common";
import { API_ENDPOINTS } from "../../config/endpoints";

export const dynamic = "force-dynamic";

const STATIC_ROUTES = ["/", "/investor", "/csr", "/enquiry"];

const normalizePath = (value = "") => {
    if (!value || typeof value !== "string") {
        return null;
    }

    let path = value.trim();

    if (
        !path ||
        path.startsWith("#") ||
        path.startsWith("mailto:") ||
        path.startsWith("tel:") ||
        path.startsWith("javascript:")
    ) {
        return null;
    }

    if (path.startsWith("http://") || path.startsWith("https://")) {
        try {
            path = new URL(path).pathname || "/";
        } catch {
            return null;
        }
    }

    if (!path.startsWith("/")) {
        path = `/${path}`;
    }

    path = path.replace(/\/{2,}/g, "/");

    if (/\.(png|jpg|jpeg|gif|css|js|ico|svg|woff|woff2|ttf|eot|pdf|webp|mp4)$/i.test(path)) {
        return null;
    }

    return path === "" ? "/" : path;
};

const addPath = (paths, value) => {
    const normalizedPath = normalizePath(value);

    if (normalizedPath) {
        paths.add(normalizedPath);
    }
};

const collectHeaderLinks = (items = [], paths = new Set()) => {
    for (const item of items) {
        addPath(paths, item?.link?.url);

        if (Array.isArray(item?.submenu) && item.submenu.length > 0) {
            collectHeaderLinks(item.submenu, paths);
        }
    }

    return paths;
};

const collectFooterLinks = (footerData = {}, paths = new Set()) => {
    if (Array.isArray(footerData?.list)) {
        for (const group of footerData.list) {
            if (!Array.isArray(group?.list)) {
                continue;
            }

            for (const item of group.list) {
                addPath(paths, item?.link?.url);
            }
        }
    }

    addPath(paths, footerData?.terms_conditions?.url);
    addPath(paths, footerData?.privacy_policy?.url);

    return paths;
};

const buildXml = (paths = [], origin = "") => {
    const urls = paths
        .map((path) => {
            const location = new URL(path, origin).toString();
            return `<url><loc>${location}</loc></url>`;
        })
        .join("");

    return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
};

const buildFallbackSitemap = async (origin = "") => {
    const slugUrl = await fetchUrlGenerator(true, API_ENDPOINTS.SLUG);
    const response = await fetch(slugUrl, {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            slug: ["root"],
            lang: "en",
        }),
    });

    const paths = new Set(STATIC_ROUTES);

    if (response.ok) {
        const payload = await response.json();
        collectHeaderLinks(payload?.header?.data?.menu || [], paths);
        collectHeaderLinks(payload?.header?.data?.["secondary-menu"] || [], paths);
        collectFooterLinks(payload?.footer?.data || {}, paths);
    }

    return buildXml([...paths], origin);
};

export async function GET(request) {
    const origin = request?.nextUrl?.origin || "http://localhost:3000";

    try {
        const url = await fetchUrlGenerator(true, API_ENDPOINTS.SITEMAP);
        const response = await fetch(url, {
            cache: "no-store",
        });

        if (response.ok) {
            const xml = await response.text();

            return new Response(xml, {
                headers: {
                    "Content-Type": "application/xml",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                },
            });
        }

        const fallbackXml = await buildFallbackSitemap(origin);
        return new Response(fallbackXml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });
    } catch (error) {
        const fallbackXml = await buildFallbackSitemap(origin);
        return new Response(fallbackXml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });
    }
}
