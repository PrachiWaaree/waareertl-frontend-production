"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
//
import { useCommonContext } from "@/contexts";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const ClientPageBrand = ({ data = {}, slug = "waaree_brands" }) => {
    const { list = [], title } = data;

    const { is480, is768, is992, is1200, isDesktop } = useCommonContext();

    let slidesPerView = 5;
    let gridRows = 2;

    if (!isDesktop) {
        if (is480) {
            slidesPerView = 1;
            gridRows = 2;
        } else if (is768) {
            slidesPerView = 3;
            gridRows = 2;
        } else if (is992) {
            slidesPerView = 3;
            gridRows = 2;
        } else if (is1200) {
            slidesPerView = 5;
            gridRows = 2;
        }
    }

    const showNavButtons =
        Array.isArray(list) && list.length > slidesPerView * gridRows;

    const {
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
        options: imagesSliderOptions,
    } = useSwiperSliderOptions({
        modules: [Navigation, Pagination, Grid],
        slidesPerView: slidesPerView,
        grid: {
            rows: 2,
            fill: "row",
        },
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                grid: {
                    rows: 2,
                },
            },
            768: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                },
            },
            1024: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                },
            },
            1280: {
                slidesPerView: 5,
                grid: {
                    rows: 2,
                },
            },
        },
    });

    const hasTitle = !!title && String(title).trim() !== "";
    const hasList = Array.isArray(list) && list.length > 0;

    if (!hasTitle && !hasList) {
        return null;
    }

    return (
        <>
            <section className="trested_section" id={slug}>
                <div className="custom-container">
                    {hasTitle && (
                        <div className="row">
                            <div className="section_header">
                                <div className="col-md-12 col-xs-12">
                                    <h4
                                        className="heading fs-48 fw-300 text-center"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {hasList && (
                        <div className="row">
                            <div className="trested_inner">
                                <div className="trested_slider">
                                    <Swiper {...imagesSliderOptions}>
                                        {list.map((item, index) => {
                                            const img = item?.image || {};
                                            const isFirstRow =
                                                list.length / gridRows > index;
                                            const isSecondRow =
                                                list.length / gridRows < index;

                                            return (
                                                <SwiperSlide key={index}>
                                                    <div
                                                        className="trested_logo"
                                                        // style={{
                                                        //     ...(isFirstRow && {
                                                        //         borderBottom: `1px solid #00000025`,
                                                        //     }),
                                                        //     ...(isSecondRow &&
                                                        //         {}),
                                                        //     borderRight: `1px solid #00000025`,
                                                        // }}
                                                    >
                                                        <OptimizedImage
                                                            src={getImageURL(
                                                                img?.src
                                                            )}
                                                            alt={img?.alt || ""}/>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </div>

                                {showNavButtons && (
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="trested__slider_btn list-unstyled justify-content-center">
                                                <li
                                                    className={
                                                        "prev-btn-trested" +
                                                        (!hasPrev
                                                            ? " swiper-button-disabled"
                                                            : "")
                                                    }
                                                >
                                                    <a
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            prevSlide();
                                                        }}
                                                        style={{
                                                            ...(!hasPrev && {
                                                                filter: "saturate(0)",
                                                                opacity: 0.5,
                                                            }),
                                                        }}
                                                    >
                                                        <svg
                                                            width={65}
                                                            height={65}
                                                            viewBox="0 0 65 65"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect
                                                                x={-0.9375}
                                                                y={0.9375}
                                                                width={59.0625}
                                                                height={58.125}
                                                                rx="29.0625"
                                                                transform="matrix(-1 0 0 1 61.125 3)"
                                                                stroke="#0DB02B"
                                                                strokeWidth={
                                                                    1.875
                                                                }
                                                            />
                                                            <path
                                                                d="M50.8125 33C51.3303 33 51.75 33.4197 51.75 33.9375C51.75 34.4553 51.3303 34.875 50.8125 34.875V33.9375V33ZM13.5751 34.6004C13.209 34.2343 13.209 33.6407 13.5751 33.2746L19.5413 27.3084C19.9074 26.9423 20.501 26.9423 20.8671 27.3084C21.2332 27.6745 21.2332 28.2681 20.8671 28.6342L15.5638 33.9375L20.8671 39.2408C21.2332 39.6069 21.2332 40.2005 20.8671 40.5666C20.501 40.9327 19.9074 40.9327 19.5413 40.5666L13.5751 34.6004ZM50.8125 33.9375V34.875H14.238V33.9375V33H50.8125V33.9375Z"
                                                                fill="#0DB02B"
                                                            />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li
                                                    className={
                                                        "next-btn-trested" +
                                                        (!hasNext
                                                            ? " swiper-button-disabled"
                                                            : "")
                                                    }
                                                >
                                                    <a
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            nextSlide();
                                                        }}
                                                        style={{
                                                            ...(!hasNext && {
                                                                filter: "saturate(0)",
                                                                opacity: 0.5,
                                                            }),
                                                        }}
                                                    >
                                                        <svg
                                                            width={65}
                                                            height={65}
                                                            viewBox="0 0 65 65"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect
                                                                x={3}
                                                                y={3.9375}
                                                                width={59.0625}
                                                                height={58.125}
                                                                rx="29.0625"
                                                                stroke="#0DB02B"
                                                                strokeWidth={
                                                                    1.875
                                                                }
                                                            />
                                                            <path
                                                                d="M14.25 33C13.7322 33 13.3125 33.4197 13.3125 33.9375C13.3125 34.4553 13.7322 34.875 14.25 34.875V33.9375V33ZM51.4874 34.6004C51.8535 34.2343 51.8535 33.6407 51.4874 33.2746L45.5212 27.3084C45.1551 26.9423 44.5615 26.9423 44.1954 27.3084C43.8293 27.6745 43.8293 28.2681 44.1954 28.6342L49.4987 33.9375L44.1954 39.2408C43.8293 39.6069 43.8293 40.2005 44.1954 40.5666C44.5615 40.9327 45.1551 40.9327 45.5212 40.5666L51.4874 34.6004ZM14.25 33.9375V34.875H50.8245V33.9375V33H14.25V33.9375Z"
                                                                fill="#0DB02B"
                                                            />
                                                        </svg>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
