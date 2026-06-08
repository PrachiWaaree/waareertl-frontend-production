"use client";
/* eslint-disable no-unused-vars */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { OptimizedImage, Button } from "@/components";
import { useSwiperSliderOptions } from "@/lib";

gsap.registerPlugin(ScrollTrigger);

export const HomePageAbout = ({ data = {}, slug = "home-about-us" }) => {
    const { cta, list, description } = data;

    const contentRef = useRef(null);

    const { options } = useSwiperSliderOptions({
        slidesPerView: 1,
        breakpoints: {
            320: { slidesPerView: 1 },
            575: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
        },
    });

    useGSAP(
        () => {
            const textElement = contentRef.current.querySelector(
                ".scroll-color-change p"
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
        { scope: contentRef, dependencies: [contentRef.current, description] }
    );

    const hasDescription = !!description && String(description).trim() !== "";
    const hasList = Array.isArray(list) && list.length > 0;
    const hasCta = cta && (cta.title || cta.url);

    if (!hasDescription && !hasList && !hasCta) {
        return null;
    }

    return (
        <section className="about__section" ref={contentRef} id={slug}>
            <div className="custom-container">
                <div className="row">
                    <div className="col-12">
                        <div className="about__area">
                            {hasDescription && (
                                <div className="about__content">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="about__header split-lines scroll-color-change fs-48 fw-300">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: description,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {hasList && (
                                <ul className="counter__list list-unstyled">
                                    {list.map((item, index) => (
                                        <li
                                            className="counter__item"
                                            key={index}
                                        >
                                            <div className="img__wrap">
                                                {item.icon?.src ? (
                                                    <OptimizedImage
                                                        className="img-fluid"
                                                        src={item.icon.src}
                                                        alt={
                                                            item.icon?.alt || ""
                                                        }
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="content__area">
                                                <div
                                                    className="heading fs-72 fw-600"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.title,
                                                    }}
                                                />
                                                <div className="content__wrap">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.description,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {hasCta && (
                                <div className="btn-group">
                                    <Button
                                        label={cta?.title}
                                        href={cta?.url}
                                        target={
                                            cta?.open_new_tab === "yes"
                                                ? "_blank"
                                                : undefined
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
