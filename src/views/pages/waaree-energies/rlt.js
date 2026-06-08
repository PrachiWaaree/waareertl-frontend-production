"use client";
import { OptimizedImage } from "@/components";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
//
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const WaareeEnergiesPageRtl = ({ data = {}, slug="waaree_rtl"}) => {
    const { title, ["card-detail"]: cardDeatail } = data;

    const { options } = useSwiperSliderOptions({
        clickable: true,
        slidesPerView: 1,
        modules: [Pagination],
        pagination: {
            el: ".waree__info-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            600: {
                slidesPerView: 2,
                pagination: {
                    el: ".waree__info-pagination",
                    clickable: true,
                },
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    const contentRef = useRef(null);

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

            const charSpans = textElement.querySelectorAll("span");

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
        { scope: contentRef, dependencies: [contentRef.current, title] }
    );

    return (
        <section className="waree__info_section" id={slug}>
            <div className="circle lg__circle" />
            <div className="circle sm__circle" />
            <div className="custom-container" ref={contentRef}>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-8">
                        <div className="content__wrap bottom_content split-lines scroll-color-change fs-36 fw-300 text-center">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: title,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                        <div className="waree__info_col waree__info_slider swiper">
                            <Swiper {...options}>
                                {cardDeatail?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="single__item">
                                            <div className="top__info">
                                                <div className="section_header text-center">
                                                    <h4
                                                        className="heading"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.title,
                                                        }}
                                                    />
                                                </div>
                                                <div className="content__wrap text-center">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.description,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="bottom__info">
                                                <OptimizedImage
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        item["background-image"]
                                                            ?.src
                                                    )}
                                                    alt={
                                                        item["background-image"]
                                                            ?.alt
                                                    }/>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="waree__info-pagination"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
