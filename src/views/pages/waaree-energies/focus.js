"use client";
/* eslint-disable no-unused-vars */
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const WaareeEnergiesPageFocus = ({ data = {}, slug="focus_area" }) => {
    const {
        title,
        description,
        cta,
        ["focus_list"]: focuslist,
        parent_class = "",
    } = data;

    const { nextSlide, prevSlide, options } = useSwiperSliderOptions({
        clickable: true,
        slidesPerView: 1,
        modules: [Pagination],
        pagination: {
            el: ".focus__item_pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            600: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: focuslist?.length > 5 ? 5 : focuslist?.length,
            },
        },
    });

    return (
        <section className={`focus__area_section ${parent_class || ""}`} id={slug}>
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-10 col-xxl-8">
                        <div className="section_header text-center">
                            <h2
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{ __html: title }}
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

                <div className="row justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                        <div className="focus__item_wrapper focus__item_slider swiper">
                            <Swiper {...options}>
                                {focuslist?.map((item, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className="item__wrap swiper-slide"
                                    >
                                        <div className="single__item">
                                            <div className="img__wrap">
                                                <OptimizedImage
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        item?.icon?.src
                                                    )}
                                                    alt={item?.icon?.alt}/>
                                            </div>
                                            <div className="content_head">
                                                <h3
                                                    className="heading fs-28 fw-600"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.title,
                                                    }}
                                                />
                                            </div>
                                            <div className="content_wrap">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.description,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="focus__item_pagination"></div>

                        {cta?.title &&
                            ((cta?.url_type === "external" &&
                                cta?.external_url) ||
                                (cta?.url_type !== "external" && cta?.url)) && (
                                <div className="foundation_focus_action text-center">
                                    <Button
                                        label={cta.title}
                                        href={
                                            cta.url_type === "external"
                                                ? cta.external_url
                                                : cta.url
                                        }
                                    />
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </section>
    );
};
