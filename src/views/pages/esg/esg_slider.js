"use client";
import { OptimizedImage } from "@/components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
//
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const EsgPageIconSlider = ({ data = {} }) => {
    const { heading, icon_slider = [] } = data;

    const { options } = useSwiperSliderOptions({
        slidesPerView: 6,
        spaceBetween: 25,
        loop: true,
        speed: 2000,
        modules: [Navigation, Autoplay],
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        freeMode: {
            enabled: true,
            momentum: false,
            sticky: false,
        },
        allowTouchMove: false,
        grabCursor: false,
        breakpoints: {
            1200: {
                slidesPerView: 6,
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 25,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 25,
            },
            0: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

    return (
        <>
            <section className="elevating_stadards_sec">
                <div className="custom-container">
                    <div className="elevating_stadards_inner d-flex">
                        <div className="elevating_stadards_left">
                            <div className="section_header">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="elevating_stadards_right">
                            <Swiper {...options}>
                                {icon_slider?.map((item, idx) => {
                                    const icon = item?.icon || item;

                                    return (
                                        <SwiperSlide key={idx}>
                                            <div className="vc_logos">
                                                <OptimizedImage
                                                    src={getImageURL(icon?.src)}
                                                    alt={icon?.alt || ""}/>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
