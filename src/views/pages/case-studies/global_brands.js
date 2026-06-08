"use client";
import { OptimizedImage } from "@/components";

import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

export const GlobalBrandsSection = ({ data = {}, slug = "global_brands" }) => {
    const { title, slider_1_images, slider_2_images } = data;

    const { options } = useSwiperSliderOptions({
        slidesPerView: 6,
        modules: [Autoplay],
        spaceBetween: 25,
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        freeMode: {
            enabled: true,
        },
        breakpoints: {
            200: {
                slidesPerView: 1.5,
                spaceBetween: 15,
            },
            575: {
                slidesPerView: 2.5,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 25,
            },
            1200: {
                slidesPerView: 6,
            },
        },
    });
    const { options: imagesSliderOptions } = useSwiperSliderOptions({
        slidesPerView: 6,
        modules: [Autoplay],
        spaceBetween: 25,
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        freeMode: {
            enabled: true,
        },
        breakpoints: {
            200: {
                slidesPerView: 1.5,
                spaceBetween: 15,
            },
            575: {
                slidesPerView: 2.5,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 25,
            },
            1200: {
                slidesPerView: 6,
            },
        },
    });

    return (
        <section className="recognized_brand_section" id={slug}>
            <div className="section_overlay" />
            <div className="custom-container">
                <div className="section_header text-center">
                    <h3
                        className="heading fs-48 fw-300"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </div>
            </div>
            <div className="brand_wrapper">
                <div className="brand__slider_wrap">
                    <Swiper {...options} className="brand__slider">
                        {slider_1_images?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="brand__item">
                                    <div className="brand__item_img theme-gradient-home">
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(item?.src)}
                                            alt={item?.alt}/>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="brand__slider_wrap">
                    <Swiper
                        {...imagesSliderOptions}
                        className="brand__slider_rtl swiper recognized_global_inner_down"
                    >
                        {slider_2_images?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="brand__item">
                                    <div className="brand__item_img theme-gradient-home">
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(item?.src)}
                                            alt={item?.alt}/>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};
