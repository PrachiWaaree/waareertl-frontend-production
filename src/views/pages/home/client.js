"use client";
/* eslint-disable no-unused-vars */

import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { OptimizedImage } from "@/components";

export const HomePageClientSection = ({ data = {}, slug = "icon-slider" }) => {
    const { cta, image, title, slider = [] } = data;

    const hasSlider =
        Array.isArray(slider) &&
        slider.length > 0 &&
        slider.some((item) => item?.icon?.src);

    const { options } = useSwiperSliderOptions({
        modules: [Navigation, Autoplay],
        freeMode: true,
        speed: 4000,
        direction: "horizontal",
        clickable: "false",
        slidesPerView: 1,
        loop: true,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: ".prev-btn-trust",
            nextEl: ".next-btn-trust",
        },
        breakpoints: {
            240: {
                slidesPerView: 2.1,
            },
            600: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },
    });

    if (!hasSlider) {
        return null;
    }

    return (
        <section className="trusted___section" id={slug}>
            <div className="row">
                <div className="col-12">
                    <div className="trusted__bg_wrapper">
                        <div className="row">
                            <div className="col-12">
                                <Swiper
                                    {...options}
                                    className="trusted__slider icon-slider"
                                >
                                    {slider.map(
                                        (item, idx) =>
                                            item?.icon?.src && (
                                                <SwiperSlide key={idx}>
                                                    <OptimizedImage
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            item?.icon?.src
                                                        )}
                                                        alt={
                                                            item?.icon?.alt ||
                                                            ""
                                                        }
                                                    />
                                                </SwiperSlide>
                                            )
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
