"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const WhyRtlPageGsapSection = ({ data = {}, slug = "gsap" }) => {
    const { heading } = data;
    const contentRef = useRef(null);

    useGSAP(
        () => {
            const textElement = contentRef.current.querySelector(
                ".scroll-color-change p",
            );
            if (!textElement) return;

            const text = textElement.textContent;
            const chars = text
                .split("")
                .map((char) => `<span>${char}</span>`)
                .join("");
            textElement.innerHTML = chars;

            // Get all character spans
            const charSpans = textElement.querySelectorAll("span");

            // Create the animation
            gsap.from(charSpans, {
                scrollTrigger: {
                    trigger: textElement,
                    start: "top 85%",
                    end: "bottom 20%",
                    scrub: true,
                },
                color: "rgba(0, 0, 0, 0.25)",
                stagger: 1,
                duration: 1,
            });
        },
        { scope: contentRef, dependencies: [contentRef.current, heading] },
    );

    return (
        <>
            <section className="about__section" ref={contentRef} id={slug}>
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="about__area">
                                <div className="about__content">
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                            <div className="about__header split-lines scroll-color-change fs-48 fw-300">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: heading,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
