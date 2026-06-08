"use client";

import { openLink } from "@/lib";
import { useRef, useEffect } from "react";

export const Button = ({
    label = "",
    href = null,
    openNewTab = false,
    srText = "",
    ...other
}) => {
    const buttonRef = useRef(null);
    const arrowRef = useRef(null);
    const textRef = useRef(null);

    const cleanLabel = typeof label === "string" ? label.replace(/<[^>]*>/g, "").trim() : "";
    const fallbackAriaLabel = cleanLabel || "Learn more";
    const ariaLabelProp = other["aria-label"] || (srText ? `${cleanLabel} ${srText}` : fallbackAriaLabel);

    useEffect(() => {
        const btn = buttonRef.current;
        const arrow = arrowRef.current;
        const text = textRef.current;

        if (!btn || !arrow || !text) return;

        const handleMouseEnter = () => {
            const arrowWidth = arrow.offsetWidth;
            const textWidth = text.offsetWidth;
            const gap = 10;
            const arrowTranslateX = textWidth + gap;
            const textTranslateX = -(arrowWidth + gap);

            arrow.style.transform = `translateX(${arrowTranslateX}px)`;
            text.style.transform = `translateX(${textTranslateX}px)`;
        };

        const handleMouseLeave = () => {
            arrow.style.transform = "";
            text.style.transform = "";
        };

        btn.addEventListener("mouseenter", handleMouseEnter);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btn.removeEventListener("mouseenter", handleMouseEnter);
            btn.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (href) {
        return (
            <a
                href={
                    href
                        ? ["/", "#", "http", "https"].some((prefix) =>
                              href?.startsWith(prefix)
                          )
                            ? href
                            : `/${href}`
                        : "#"
                }
                className="primary_btn"
                target={openNewTab ? "_blank" : "_self"}
                ref={buttonRef}
                aria-label={ariaLabelProp}
                onClick={(e) => {
                    if (href?.startsWith("#")) {
                        e.preventDefault();
                        openLink(href, null, false, openNewTab);
                    }
                }}
                {...other}
            >
                <RenderComponent
                    label={label}
                    srText={srText}
                    arrowRef={arrowRef}
                    textRef={textRef}
                />
            </a>
        );
    } else {
        return (
            <button
                className="primary_btn"
                ref={buttonRef}
                aria-label={ariaLabelProp}
                {...other}
            >
                <RenderComponent
                    label={label}
                    srText={srText}
                    arrowRef={arrowRef}
                    textRef={textRef}
                />
            </button>
        );
    }
};

const RenderComponent = ({ label, srText, arrowRef, textRef }) => {
    return (
        <>
            <span className="btn_icon" ref={arrowRef}>
                <svg
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x={1}
                        y={1}
                        width={28}
                        height={28}
                        rx={14}
                        stroke="currentColor"
                        strokeWidth={2}
                    />
                    <path
                        d="M6.5 14C5.94772 14 5.5 14.4477 5.5 15C5.5 15.5523 5.94772 16 6.5 16V14ZM24.2071 15.7071C24.5976 15.3166 24.5976 14.6834 24.2071 14.2929L17.8431 7.92893C17.4526 7.53841 16.8195 7.53841 16.4289 7.92893C16.0384 8.31946 16.0384 8.95262 16.4289 9.34315L22.0858 15L16.4289 20.6569C16.0384 21.0474 16.0384 21.6805 16.4289 22.0711C16.8195 22.4616 17.4526 22.4616 17.8431 22.0711L24.2071 15.7071ZM6.5 15V16H23.5V15V14H6.5V15Z"
                        fill="currentColor"
                    />
                </svg>
            </span>

            <span
                className="btn_text"
                ref={textRef}
            >
                <span dangerouslySetInnerHTML={{ __html: label }} />
                {srText && <span className="sr-only"> {srText}</span>}
            </span>
        </>
    );
};
