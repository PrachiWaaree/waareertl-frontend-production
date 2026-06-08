const fs = require("fs");
const path = require("path");

function loadEnv(filePath) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, "utf8");
    content.split("\n").forEach((line) => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (!match) return;
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, "");
        if (!process.env[key]) {
            process.env[key] = value;
        }
    });
}

loadEnv(path.join(__dirname, "../.env.local"));
loadEnv(path.join(__dirname, "../.env.production"));
loadEnv(path.join(__dirname, "../.env"));

const BASE_URL = (process.env.BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
);
const rawApiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "https://devrtlapi.waaree.com";
const API_BASE_URL = String(rawApiBase).includes("${")
    ? "https://devrtlapi.waaree.com"
    : String(rawApiBase).replace(/\/$/, "");

const CONCURRENCY = Math.max(1, Number(process.env.WARM_CACHE_CONCURRENCY || 8));
const RETRIES = Math.max(0, Number(process.env.WARM_CACHE_RETRIES || 2));
const REQUEST_TIMEOUT_MS = Math.max(
    1000,
    Number(process.env.WARM_CACHE_TIMEOUT_MS || 15000),
);
const MAX_URLS = Math.max(1, Number(process.env.WARM_CACHE_MAX_URLS || 1500));
const FAIL_ON_ERROR =
    String(process.env.WARM_CACHE_FAIL_ON_ERROR || "false").toLowerCase() ===
    "true";
const INCLUDE_TRAILING_SLASH_VARIANTS =
    String(process.env.WARM_CACHE_INCLUDE_TRAILING_SLASH_VARIANTS || "true").toLowerCase() !==
    "false";

const STATIC_SEEDS = ["/", "/sitemap.xml", "/investor", "/csr", "/enquiry"];

function normalizePath(input) {
    if (!input) return null;
    let value = String(input).trim();
    if (!value) return null;

    if (
        value.startsWith("mailto:") ||
        value.startsWith("tel:") ||
        value.startsWith("javascript:") ||
        value.startsWith("#")
    ) {
        return null;
    }

    if (value.startsWith("http://") || value.startsWith("https://")) {
        const target = new URL(value);
        const base = new URL(BASE_URL);
        if (target.host !== base.host) return null;
        value = `${target.pathname}${target.search || ""}`;
    }

    if (!value.startsWith("/")) return null;
    if (/\.(png|jpg|jpeg|gif|css|js|ico|svg|woff|woff2|ttf|eot|pdf|webp)$/i.test(value)) {
        return null;
    }

    const [withoutHash] = value.split("#");
    const [pathname, search = ""] = withoutHash.split("?");
    const cleanedPath = pathname.replace(/\/{2,}/g, "/");
    const cleaned = search ? `${cleanedPath}?${search}` : cleanedPath;
    return cleaned || "/";
}

function buildPathVariants(inputPath) {
    const normalized = normalizePath(inputPath);
    if (!normalized) return [];
    const variants = new Set([normalized]);

    if (INCLUDE_TRAILING_SLASH_VARIANTS) {
        const [pathname, search = ""] = normalized.split("?");
        if (pathname !== "/" && !/\.[a-z0-9]+$/i.test(pathname)) {
            const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;
            const withoutSlash = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
            variants.add(search ? `${withSlash}?${search}` : withSlash);
            if (withoutSlash) {
                variants.add(search ? `${withoutSlash}?${search}` : withoutSlash);
            }
        }
    }

    return [...variants];
}

function extractXmlLocations(xml = "") {
    const links = [];
    const locRegex = /<loc>(.*?)<\/loc>/gi;
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
        links.push(match[1]);
    }
    return links;
}

function collectMenuLinks(menuItems = [], accumulator = new Set()) {
    for (const item of menuItems) {
        const url = item?.link?.url;
        if (typeof url === "string") {
            buildPathVariants(url).forEach((v) => accumulator.add(v));
        }
        if (Array.isArray(item?.submenu) && item.submenu.length > 0) {
            collectMenuLinks(item.submenu, accumulator);
        }
    }
    return accumulator;
}

async function fetchWithRetry(url, attempt = 0) {
    const controller = new AbortController();
    const timeoutRef = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            redirect: "follow",
            cache: "no-store",
        });
        const retryable =
            response.status === 404 || response.status === 429 || response.status >= 500;
        if (retryable && attempt < RETRIES) {
            const delay = Math.min(300 * Math.pow(2, attempt), 1500);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchWithRetry(url, attempt + 1);
        }
        return response;
    } finally {
        clearTimeout(timeoutRef);
    }
}

async function fetchDynamicSeeds() {
    const discovered = new Set();

    const sitemapResponse = await fetchWithRetry(`${BASE_URL}/sitemap.xml`);
    if (sitemapResponse.ok) {
        const xml = await sitemapResponse.text();
        extractXmlLocations(xml)
            .flatMap((loc) => buildPathVariants(loc))
            .forEach((v) => discovered.add(v));
    }

    const pageResponse = await fetchWithRetry(`${API_BASE_URL}/api/pages?slug=root&lang=en`);
    if (pageResponse.ok) {
        const pageJson = await pageResponse.json();
        const headerMenu = pageJson?.header?.data?.menu || [];
        const secondaryMenu = pageJson?.header?.data?.["secondary-menu"] || [];
        collectMenuLinks(headerMenu, discovered);
        collectMenuLinks(secondaryMenu, discovered);
    }

    return [...discovered];
}

async function main() {
    const seeds = new Set();
    STATIC_SEEDS.flatMap((seed) => buildPathVariants(seed)).forEach((s) => seeds.add(s));

    try {
        const dynamicSeeds = await fetchDynamicSeeds();
        dynamicSeeds.forEach((seed) => seeds.add(seed));
    } catch (error) {
        console.error("Failed to fetch dynamic warm-cache seeds:", error?.message || error);
    }

    const queue = [...seeds].slice(0, MAX_URLS);
    const visited = new Set();
    const statusCount = {};
    const errors = [];
    let active = 0;
    let index = 0;

    console.log(`Warming ${queue.length} URLs on ${BASE_URL}`);

    await new Promise((resolve) => {
        const runNext = () => {
            while (active < CONCURRENCY && index < queue.length) {
                const route = queue[index++];
                if (visited.has(route)) continue;
                visited.add(route);
                active += 1;

                const fullUrl = new URL(route, BASE_URL).toString();
                fetchWithRetry(fullUrl)
                    .then((response) => {
                        const status = Number(response?.status || 0);
                        statusCount[status] = (statusCount[status] || 0) + 1;
                        if (!response.ok) {
                            errors.push({ route, status });
                        }
                        console.log(`${response.ok ? "OK" : "ERR"} ${status} ${route}`);
                    })
                    .catch((error) => {
                        errors.push({ route, error: error?.message || String(error) });
                        console.log(`ERR X ${route}`);
                    })
                    .finally(() => {
                        active -= 1;
                        if (index >= queue.length && active === 0) {
                            resolve();
                        } else {
                            runNext();
                        }
                    });
            }
        };

        runNext();
    });

    console.log("Warm cache completed.");
    console.log(`Status counts: ${JSON.stringify(statusCount)}`);

    if (errors.length > 0 && FAIL_ON_ERROR) {
        console.log("Warm cache finished with errors:");
        errors.forEach((item) => {
            console.log(`- ${item.route}: ${item.status || item.error}`);
        });
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Warm cache failed:", error);
    process.exit(1);
});
