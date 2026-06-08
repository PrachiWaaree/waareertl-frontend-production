import { COOKIE_CONSENT_CONFIG } from "@/config/common";

const COOKIE_NAME = COOKIE_CONSENT_CONFIG?.name || "waaree_cookie_consent";
const COOKIE_MAX_AGE_DAYS = Number(COOKIE_CONSENT_CONFIG?.maxAgeDays || 1);

const ESSENTIAL_COOKIES = [COOKIE_NAME];

const isBrowser = () => typeof document !== "undefined";

const buildExpiryString = () => {
    const date = new Date();
    date.setDate(date.getDate() + COOKIE_MAX_AGE_DAYS);
    return date.toUTCString();
};

export const getCookieConsentStatus = () => {
    if (!isBrowser()) {
        return null;
    }
    const cookies = document.cookie ? document.cookie.split(";") : [];
    for (let i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i].trim();
        if (!cookie) {
            continue;
        }
        const separatorIndex = cookie.indexOf("=");
        if (separatorIndex === -1) {
            continue;
        }
        const name = cookie.substring(0, separatorIndex);
        if (name === COOKIE_NAME) {
            return decodeURIComponent(cookie.substring(separatorIndex + 1));
        }
    }
    return null;
};

export const setCookieConsentStatus = (status) => {
    if (!isBrowser()) {
        return;
    }
    const expires = buildExpiryString();
    const value = encodeURIComponent(status);
    document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

const getHostVariants = () => {
    if (!isBrowser()) {
        return [];
    }
    const host = (window.location.hostname || "").toLowerCase();
    if (!host || host === "localhost" || /^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
        return [undefined];
    }

    const parts = host.split(".").filter(Boolean);
    const baseDomain =
        parts.length >= 2 ? `.${parts.slice(-2).join(".")}` : undefined;
    return [undefined, host, `.${host}`, baseDomain].filter(Boolean);
};

const expireCookie = (name, domain, path = "/") => {
    if (!name) {
        return;
    }
    const domainPart = domain ? `; domain=${domain}` : "";
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=${path}${domainPart}; SameSite=Lax`;
};

const clearBrowserStorage = () => {
    if (!isBrowser()) {
        return;
    }
    try {
        window.localStorage?.clear();
    } catch (_) {}
    try {
        window.sessionStorage?.clear();
    } catch (_) {}
};

export const clearNonEssentialCookies = () => {
    if (!isBrowser()) {
        return;
    }
    const hostVariants = getHostVariants();
    const pathVariants = ["/"];
    const cookies = document.cookie ? document.cookie.split(";") : [];
    for (let i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i].trim();
        if (!cookie) {
            continue;
        }
        const separatorIndex = cookie.indexOf("=");
        const name = separatorIndex === -1 ? cookie : cookie.substring(0, separatorIndex);
        if (ESSENTIAL_COOKIES.includes(name)) {
            continue;
        }
        for (let d = 0; d < hostVariants.length; d += 1) {
            for (let p = 0; p < pathVariants.length; p += 1) {
                expireCookie(name, hostVariants[d], pathVariants[p]);
            }
        }
    }
    clearBrowserStorage();
};
