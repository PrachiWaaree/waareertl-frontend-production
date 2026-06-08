import parse from "html-react-parser";

export const sanitizeCmsScripts = (rawScript = "") => {
    if (!rawScript || typeof rawScript !== "string") {
        return "";
    }

    return rawScript
        .replace(/<!DOCTYPE[^>]*>/gi, "")
        .replace(/<\/?html[^>]*>/gi, "")
        .replace(/<\/?head[^>]*>/gi, "")
        .replace(/<\/?body[^>]*>/gi, "")
        .replace(/<title[\s\S]*?<\/title>/gi, "")
        .replace(/<link([^>]+)?rel=["']?(?:icon|apple-touch-icon|canonical)[^>]*>/gi, "")
        .replace(
        /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
        (fullMatch, attrs = "", body = "") => {
            const rawAttrs = String(attrs || "");
            const trimmedBody = String(body || "").trim();
            const isJsonLikeBody =
                trimmedBody.startsWith("{") &&
                /"@context"\s*:/.test(trimmedBody);
            const hasBrokenType = /\btype\s*=\s*(["'])\1/i.test(rawAttrs);
            const hasBrokenApplication = /\bapplication\s*=\s*(["'])\1/i.test(rawAttrs);
            const hasJsonLdType = /\btype\s*=\s*(["'])application\/ld\+json\1/i.test(
                rawAttrs,
            );

            // Safe mode: strip CMS-provided JSON/JSON-LD scripts entirely.
            // They have caused recurring parse + hydration errors in production.
            if (
                hasJsonLdType ||
                hasBrokenType ||
                hasBrokenApplication ||
                isJsonLikeBody
            ) {
                return "";
            }

            return fullMatch;
        },
    ).replace(/\{\s*"@context"[\s\S]*\}\s*/gi, "");
};

export const parseCmsScriptsSafely = (rawScript = "") => {
    const sanitizedScript = sanitizeCmsScripts(rawScript);

    if (!sanitizedScript) {
        return null;
    }

    try {
        return parse(sanitizedScript);
    } catch (error) {
        return null;
    }
};
