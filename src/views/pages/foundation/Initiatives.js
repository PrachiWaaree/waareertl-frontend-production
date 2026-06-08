"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Controller } from "swiper/modules";
//
import { Button, OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const FoundationPageInitiatives = ({
    data = {},
    slug = "foundation_initiatives",
}) => {
    const { initiatives, description, heading, parent_class } = data;
    const [isLocked, setIsLocked] = useState(false);

    const {
        nextSlide,
        prevSlide,
        options: imagesSliderOptions,
    } = useSwiperSliderOptions({
        modules: [EffectCoverflow, Controller],
        effect: "coverflow",
        centeredSlides: true,
        watchSlidesProgress: true,
        loop: true,
        slidesPerView: "auto",
        grabCursor: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 85,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
        },
        breakpoints: {
            1199: {
                coverflowEffect: {
                    depth: 250,
                    stretch: 85,
                    modifier: 2.5,
                },
            },
            991: {
                slidesPerView: 1,
                coverflowEffect: {
                    depth: 250,
                    stretch: 0,
                    modifier: 1.5,
                },
            },
        },
    });

    return (
        <>
            <section
                className={`ongoing__section esg_ongoing_rtl ${parent_class}`}
                id={slug}
            >
                <div className="circle lg__circle" />
                <div className="circle sm__circle" />
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-10">
                            <div className="section_header">
                                <h3
                                    className="heading text-center fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />

                                <div className="content__wrap text-center">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center ongoing_sliding_row">
                        <div className="col-12 col-md-10 col-lg-10 col-xl-10">
                            <div className="ongoing__wrapper">
                                <div className="ongoing__slider">
                                    <Swiper
                                        {...imagesSliderOptions}
                                        onSwiper={(swiper) => {
                                            setIsLocked(swiper.isLocked);
                                        }}
                                        onSlideChange={(swiper) => {
                                            setIsLocked(swiper.isLocked);
                                        }}
                                        {...imagesSliderOptions}
                                    >
                                        {initiatives?.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="single__item">
                                                    <div className="img__wrap">
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                item?.image
                                                                    ?.src,
                                                            )}
                                                            alt={
                                                                item?.image?.alt
                                                            }
                                                        />
                                                    </div>
                                                    {item?.description?.trim() && (
                                                        <div className="award__content theme-gradient-1 text-center">
                                                            <h4
                                                                className="heading fs-28 fw-400 text-white"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.description,
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            {!isLocked && (
                                <ul className="ongoing__slider_btn">
                                    <li
                                        className="prev-btn-ongoing"
                                        onClick={() => {
                                            prevSlide();
                                        }}
                                    >
                                        <svg
                                            width={87}
                                            height={87}
                                            viewBox="0 0 87 87"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x={-1}
                                                y={1}
                                                width={85}
                                                height={85}
                                                rx="42.5"
                                                transform="matrix(-1 0 0 1 85 0)"
                                                stroke="#0DB02B"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M62.9744 42.0003C63.5265 41.9862 63.9855 42.4223 63.9997 42.9744C64.0138 43.5265 63.5777 43.9855 63.0256 43.9997L62.9744 42.0003ZM23.3112 44.725C22.9108 44.3446 22.8946 43.7117 23.275 43.3113L29.4737 36.7863C29.8541 36.3858 30.4871 36.3696 30.8875 36.75C31.2879 37.1304 31.3041 37.7633 30.9237 38.1638L25.4138 43.9637L31.2137 49.4737C31.6142 49.8541 31.6304 50.4871 31.25 50.8875C30.8696 51.2879 30.2367 51.3041 29.8362 50.9237L23.3112 44.725ZM63 43L63.0256 43.9997L24.0256 44.9997L24 44L23.9744 43.0003L62.9744 42.0003L63 43Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </li>
                                    <li
                                        className="next-btn-ongoing"
                                        onClick={nextSlide}
                                    >
                                        <svg
                                            width={87}
                                            height={87}
                                            viewBox="0 0 87 87"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x={1}
                                                y={1}
                                                width={85}
                                                height={85}
                                                rx="42.5"
                                                stroke="#0DB02B"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M24.0256 42.0003C23.4735 41.9862 23.0145 42.4223 23.0003 42.9744C22.9862 43.5265 23.4223 43.9855 23.9744 43.9997L24.0256 42.0003ZM63.6888 44.725C64.0892 44.3446 64.1054 43.7117 63.725 43.3113L57.5263 36.7863C57.1459 36.3858 56.5129 36.3696 56.1125 36.75C55.7121 37.1304 55.6959 37.7633 56.0763 38.1638L61.5862 43.9637L55.7863 49.4737C55.3858 49.8541 55.3696 50.4871 55.75 50.8875C56.1304 51.2879 56.7633 51.3041 57.1638 50.9237L63.6888 44.725ZM24 43L23.9744 43.9997L62.9744 44.9997L63 44L63.0256 43.0003L24.0256 42.0003L24 43Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div className="ongoing_focus_action text-center">
                            <Button
                                label={initiatives?.[0]?.cta?.title}
                                href={initiatives?.[0]?.cta?.url}
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
