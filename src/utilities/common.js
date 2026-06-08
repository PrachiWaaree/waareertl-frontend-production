import { PUBLIC_SERVER_URL } from "@/config/variables";
import { isEmpty } from "lodash";

const SERVER_URL = process.env.API_URL;

export const fetchUrlGenerator = async (
    isApi = true,
    endpoint = "",
    params = {},
) => {
    try {
        let url =
            typeof window === "undefined"
                ? SERVER_URL || PUBLIC_SERVER_URL
                : PUBLIC_SERVER_URL;

        if (isApi) {
            url += "/api";
        }

        if (!!endpoint && typeof endpoint === "string") {
            url += endpoint;
        }

        if (!isEmpty(params)) {
            url += "/?" + new URLSearchParams(params);
        }

        return url;
    } catch (error) {
        throw new Error(error?.message || "Unexpected error");
    }
};

export const currencyFormat = (price = 0) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    }).format(price);
};

export const cleanSEOTags = (html) => {
    if (!html || typeof html !== "string") return "";
    return html
        .replace(/<!DOCTYPE[^>]*>/gi, "")
        .replace(/<\/?html[^>]*>/gi, "")
        .replace(/<\/?head[^>]*>/gi, "")
        .replace(/<\/?body[^>]*>/gi, "")
        .replace(/<title[\s\S]*?<\/title>/gi, "")
        .replace(/<meta[^>]*>/gi, "")
        .replace(/<link[^>]*rel=["']?canonical["'][^>]*>/gi, "")
        .replace(/<link([^>]+)?rel=["']?(?:icon|apple-touch-icon)[^>]*>/gi, "")
        .trim();
};

export const getPaginationRange = (current, total, siblingCount = 1) => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (total <= totalPageNumbers) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblingCount, 1);
    const rightSibling = Math.min(current + siblingCount, total);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    const range = [];

    range.push(1);

    if (showLeftEllipsis) {
        range.push("...");
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== total) {
            range.push(i);
        }
    }

    if (showRightEllipsis) {
        range.push("...");
    }

    if (total !== 1) {
        range.push(total);
    }

    return range;
};

export const stripHtml = (text = "") =>
    text.replace(/<\/?[^>]+(>|$)/g, "").trim();
