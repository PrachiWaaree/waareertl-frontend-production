"use client";
/* eslint-disable @next/next/no-img-element, no-unused-vars */

import { useState, useRef } from "react";
import { Pagination } from "swiper/modules";
import { useCommonContext } from "@/contexts";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const AboutPageValues = ({ data = {}, slug = "values" }) => {
    const {
        description = "",
        title = "",
        values_icon = [],
        parent_class,
        culture_code = [],
    } = data;

    const [activeIndex, setActiveIndex] = useState(0);

    const { is480, is768, is992, is1200, isDesktop } = useCommonContext();

    let slidesToShow = 1;

    if (is480) {
        slidesToShow = 1;
    } else if (is768) {
        slidesToShow = 2;
    } else if (is992 || is1200) {
        slidesToShow = 3;
    } else if (isDesktop) {
        slidesToShow = 4;
    }

    const smSwiperRef = useRef(null);

    const smSwiperOptions = {
        modules: [Pagination],
        pagination: {
            el: ".value__item_pagination",
            enabled: true,
            type: "bullets",
            clickable: true,
        },
        slidesPerView: slidesToShow,
        spaceBetween: 16,

        onSlideChange: (swiper) => {
            setActiveIndex(swiper.activeIndex);
        },
        onSwiper: (swiper) => {
            smSwiperRef.current = swiper;
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
        },
    };

    return (
        <section className={`our__value_section ${parent_class}`} id={slug}>
            <div className="custom-container">
                <div className="row">
                    {(!!title || !!description) && (
                        <div className="col-12 col-lg-4">
                            <div className="value__block">
                                {!!title && (
                                    <div className="section_header">
                                        <h4
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    </div>
                                )}
                                {!!description && (
                                    <div className="content__wrap">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {Array.isArray(values_icon) && values_icon.length > 0 && (
                        <div className="col-12 col-lg-8">
                            <div className="lg-block">
                                <div className="value__wrapper">
                                    {values_icon.map((item, index) =>
                                        item?.title && item?.icon?.src ? (
                                            <div
                                                className={`value__tab`}
                                                data-id={`value-tab-${
                                                    index + 1
                                                }`}
                                                key={index}
                                            >
                                                <div className="img__wrap">
                                                    <img loading="lazy"
                                                    
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            item?.icon?.src
                                                        )}
                                                        alt={
                                                            item?.icon?.alt ||
                                                            ""
                                                        }
                                                    />
                                                </div>
                                                <h4
                                                    className="heading fs-28 fw-400"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title,
                                                    }}
                                                />
                                                {item?.list ? (
                                                    <div
                                                        className="hover_content"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.list,
                                                        }}
                                                    />
                                                ) : null}
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            </div>

                            <div className="sm-block">
                                <Swiper
                                    {...smSwiperOptions}
                                    className="value__wrapper value__tab_slider"
                                >
                                    {values_icon?.map((item, index) =>
                                        item?.title && item?.icon?.src ? (
                                            <SwiperSlide key={index}>
                                                <div
                                                    className={`value__tab${
                                                        activeIndex === index
                                                            ? " active"
                                                            : ""
                                                    }`}
                                                    data-id={`value-tab-${
                                                        index + 1
                                                    }`}
                                                >
                                                    <div className="img__wrap">
                                                        <img loading="lazy"
                                                         
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                item?.icon?.src
                                                            )}
                                                            alt={
                                                                item?.icon
                                                                    ?.alt || ""
                                                            }
                                                        />
                                                    </div>
                                                    <h4
                                                        className="heading fs-28 fw-400"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.title,
                                                        }}
                                                    />
                                                    {item?.list ? (
                                                        <div
                                                            className="hover_content"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.list,
                                                            }}
                                                        />
                                                    ) : null}
                                                </div>
                                            </SwiperSlide>
                                        ) : null
                                    )}
                                </Swiper>
                                <div className="value__item_pagination"></div>
                            </div>
                        </div>
                    )}
                </div>

                {Array.isArray(culture_code) && culture_code.length > 0 && (
                    <div className="value__data_wrapper">
                        <div className="value__tab_data tab-active">
                            <div className="value__data theme-gradient-home">
                                {culture_code.map((item, idx) =>
                                    item?.title && item?.icon?.src ? (
                                        <div className="value__item" key={idx}>
                                            <div className="img__wrap">
                                                <img loading="lazy"
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        item?.icon?.src
                                                    )}
                                                    alt={item?.icon?.alt || ""}
                                                />
                                            </div>
                                            <h4
                                                className="heading fs-28 fw-400"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.title,
                                                }}
                                            />
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
