"use client";
/* eslint-disable no-unused-vars */

import { cloneDeep } from "lodash";
import { useRef, useState } from "react";
//
import { PUBLIC_SERVER_URL } from "@/config";

export const getImageURL = (url = "") => {
    if (url?.startsWith("http") || url?.startsWith("blob")) {
        return url;
    } else if (url) {
        return (
            // PUBLIC_SERVER_URL +
            (url?.startsWith("\\") || url?.startsWith("/") ? url : `/${url}`)
        );
    } else {
        return "";
    }
};

export const useSwiperSliderOptions = ({ ...options }) => {
    const sliderRef = useRef(null);

    const isLoop = !!options?.loop;

    const [sliderButtons, setSliderButtons] = useState({
        activeIndex: 0,
        hasNext: isLoop ? true : false,
        hasPrev: isLoop ? true : false,
    });

    const updateSliderButton = (event = {}) => {
        if (options?.onSlideChange) {
            options?.onSlideChange(event);
        }
        if (options?.onSwiper) {
            options?.onSwiper(event);
        }
        const cloned_event = cloneDeep(event);

        const { isBeginning, isEnd, activeIndex } = cloned_event;

        if (
            !!options?.secondSlider?.slideTo &&
            activeIndex !== options?.secondSlider?.activeIndex
        ) {
            options?.secondSlider?.slideTo(activeIndex);
        }

        setSliderButtons({
            activeIndex,
            // In loop mode, both directions are always available
            hasNext: isLoop ? true : !isEnd,
            hasPrev: isLoop ? true : !isBeginning,
        });
    };

    const nextSlide = () => {
        sliderRef?.current?.swiper?.slideNext();
    };

    const prevSlide = () => {
        sliderRef?.current?.swiper?.slidePrev();
    };

    const goToSlide = (index = 0) => {
        if (index >= 0 && typeof index === "number") {
            sliderRef.current?.swiper?.slideTo(index);
        }
    };

    const refreshSlider = (event) => {
        updateSliderButton(sliderRef?.current?.swiper);
    };

    return {
        sliderButtons,
        nextSlide,
        prevSlide,
        goToSlide,
        refreshSlider,
        options: {
            ref: sliderRef,
            ...options,
            onSwiper: updateSliderButton,
            onSlideChange: updateSliderButton,
        },
    };
};

export const openLink = (url = "", event = null, disableLink = false) => {
    if (event) {
        event.preventDefault();
    }

    if (!!url && !disableLink) {
        if (url?.includes("https") || url?.includes("http")) {
            if (typeof window !== "undefined") {
                window.open(url, "_blank");
            }
        } else if (url?.charAt(0) === "/") {
            if (typeof window !== "undefined") {
                window.open(url, "_self");
            }
        } else if (url?.charAt(0) === "#") {
            if (
                typeof window !== "undefined" &&
                typeof document !== "undefined"
            ) {
                let element = document.getElementById(url?.substring(1));
                let headerOffset = 150;
                let elementPosition = element?.getBoundingClientRect().top;
                let offsetPosition =
                    elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }
    }
};

export const SHARE_LINKS = {
    whatsapp: (url) => {
        if (typeof window !== "undefined") {
            window.open(
                `https://wa.me/?text=${encodeURIComponent(url)}`,
                "_blank",
            );
        }
    },
    facebook: (url) => {
        if (typeof window !== "undefined") {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url,
                )}`,
                "_blank",
            );
        }
    },
    twitter: (url) => {
        if (typeof window !== "undefined") {
            window.open(
                `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`,
                "_blank",
            );
        }
    },
    linkedin: (url) => {
        if (typeof window !== "undefined") {
            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    url,
                )}`,
                "_blank",
            );
        }
    },
    copy: async (url) => {
        try {
            if (typeof url === "string" && typeof window !== "undefined") {
                await navigator.clipboard.writeText(url);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};

export const updateMediaUrls = (htmlString = "") => {
    if (!htmlString || typeof htmlString !== "string") return "";

    if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const tags = doc.querySelectorAll("img, video, source");

        tags.forEach((el) => {
            const src = el.getAttribute("src");
            if (src && src.startsWith("/")) {
                el.setAttribute("src", getImageURL(src));
            }
        });

        return doc.body.innerHTML;
    }

    // Server-safe fallback for SSR where DOMParser is unavailable.
    return htmlString.replace(
        /(<(?:img|video|source)\b[^>]*\bsrc=["'])(\/[^"']*)(["'])/gi,
        (_, prefix, srcPath, suffix) => `${prefix}${getImageURL(srcPath)}${suffix}`,
    );
};

export const getAbsoluteURL = (url = "") => {
    if (!url || typeof url !== "string") return "#";

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    if (url.startsWith("#")) {
        return url;
    }

    const isDev = process.env.NODE_ENV === "development";
    const base = isDev ? "" : (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "");

    const cleaned = url.startsWith("/") ? url : `/${url}`;

    return base + cleaned;
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

export const slugify = (text) =>
    (text ?? "")
        .toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[\s\W-]+/g, "-");
