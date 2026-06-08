"use client";
import { OptimizedImage } from "@/components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const PartnerPageAbout = ({ data = {} }) => {
    const { title, description, image, list = [] } = data;

    const { options } = useSwiperSliderOptions({
        clickable: true,
        loop: true,
        infinite: true,
        slidesPerView: 3,
        modules: [Navigation],
        navigation: {
            prevEl: ".prev-btn-content",
            nextEl: ".next-btn-content",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            600: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1500: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
    });

    return (
        <>
            <section className="who__we_are_section channel__section">
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12 col-lg-6">
                            <div className="section_header">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                            <div className="content__wrap">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                                {Array.isArray(list) && list.length > 0 && (
                                    <div className="content__slider">
                                        <Swiper {...options}>
                                            {list.map((item, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <div className="item__wrap">
                                                        <div className="single__item d-flex">
                                                            <div className="icon__wrap">
                                                                <OptimizedImage
                                                                    className="img-fluid"
                                                                    src={getImageURL(
                                                                        item
                                                                            ?.icon
                                                                            ?.src
                                                                    )}
                                                                    alt=""/>
                                                            </div>
                                                            <div className="content_block">
                                                                <h4
                                                                    className="heading fs-20 fw-600"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item?.heading,
                                                                    }}
                                                                />
                                                                <div className="content_area">
                                                                    <p
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item?.description,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-10 col-lg-6">
                            <div className="img__wrapper">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(image?.src)}
                                    alt={image?.alt || ""}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
