"use client";
import { useCommonContext } from "@/contexts";
import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const HomePageWhyChooseUs = ({ data = {}, slug = "why_choose" }) => {
    const { title, list = [] } = data;
    const { is480, is768, is992, is1200, isDesktop } = useCommonContext();

    let slidesPerView = 4;
    let gridRows = 2;
    if (!isDesktop) {
        if (is480) {
            slidesPerView = 1;
            gridRows = 2;
        } else if (is768) {
            slidesPerView = 2;
            gridRows = 2;
        } else if (is992) {
            slidesPerView = 3;
            gridRows = 2;
        } else if (is1200) {
            slidesPerView = 4;
            gridRows = 2;
        }
    }

    let currentSlidesPerView = 4;
    if (is480) {
        currentSlidesPerView = 1;
    } else if (is768) {
        currentSlidesPerView = 2;
    } else if (is992) {
        currentSlidesPerView = 3;
    } else if (is1200 || isDesktop) {
        currentSlidesPerView = 4;
    }

    const showNavButtons =
        Array.isArray(list) && list.length > currentSlidesPerView * gridRows;

    const swiperRef = useRef(null);

    const {
        nextSlide,
        prevSlide,
        options: imagesSliderOptions,
        sliderButtons: { hasNext, hasPrev },
    } = useSwiperSliderOptions({
        modules: [Navigation, Pagination, Grid],
        slidesPerView: slidesPerView,
        grid: {
            rows: gridRows,
            fill: "row",
        },
        spaceBetween: 30,
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
                slidesPerView: 2,
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
                slidesPerView: 4,
                grid: {
                    rows: 2,
                },
            },
        },
    });

    const handlePrev = useCallback(
        (e) => {
            e.preventDefault();
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slidePrev();
            } else {
                prevSlide();
            }
        },
        [prevSlide]
    );

    const handleNext = useCallback(
        (e) => {
            e.preventDefault();
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideNext();
            } else {
                nextSlide();
            }
        },
        [nextSlide]
    );

    return (
        <>
            <section className="why_choose" id={slug}>
                <div className="custom-container">
                    <div className="row">
                        <div className="section_header">
                            <div className="col-md-12 col-xs-12">
                                <h4
                                    className="heading fs-48 fw-300 text-center"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="why_choose_inner">
                            <Swiper
                                {...imagesSliderOptions}
                                className="why_choose_slider"
                                ref={swiperRef}
                            >
                                <div className="why_choose_slider">
                                    {Array.isArray(list) &&
                                        list.map((item, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div className="why_choose_box">
                                                    <div className="first_box">
                                                        <div className="img__wrap">
                                                            <OptimizedImage
                                                                src={
                                                                    item.icon
                                                                        ?.src
                                                                        ? getImageURL(
                                                                              item
                                                                                  ?.icon
                                                                                  .src
                                                                          )
                                                                        : ""
                                                                }
                                                                alt={
                                                                    item.title ||
                                                                    ""
                                                                }
                                                            />
                                                        </div>
                                                        <h4
                                                            className="image_title_box heading fs-28 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.title,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="content_block_hover">
                                                        <h4
                                                            className="heading_bottom_box fs-28 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.title,
                                                            }}
                                                        />
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.description,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </div>
                            </Swiper>
                            {showNavButtons && (
                                <div className="row">
                                    <div className="col-12">
                                        <ul className="blog__slider_btn list-unstyled justify-content-center">
                                            <li
                                                className={
                                                    "prev-btn-choose" +
                                                    (!hasPrev
                                                        ? " swiper-button-disabled"
                                                        : "")
                                                }
                                            >
                                                <button
                                                    type="button"
                                                    tabIndex={0}
                                                    aria-label="Previous"
                                                    onClick={handlePrev}
                                                    disabled={!hasPrev}
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        padding: 0,
                                                        cursor: hasPrev
                                                            ? "pointer"
                                                            : "not-allowed",
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
                                                            strokeWidth={1.875}
                                                        />
                                                        <path
                                                            d="M50.8125 33C51.3303 33 51.75 33.4197 51.75 33.9375C51.75 34.4553 51.3303 34.875 50.8125 34.875V33.9375V33ZM13.5751 34.6004C13.209 34.2343 13.209 33.6407 13.5751 33.2746L19.5413 27.3084C19.9074 26.9423 20.501 26.9423 20.8671 27.3084C21.2332 27.6745 21.2332 28.2681 20.8671 28.6342L15.5638 33.9375L20.8671 39.2408C21.2332 39.6069 21.2332 40.2005 20.8671 40.5666C20.501 40.9327 19.9074 40.9327 19.5413 40.5666L13.5751 34.6004ZM50.8125 33.9375V34.875H14.238V33.9375V33H50.8125V33.9375Z"
                                                            fill="#0DB02B"
                                                        />
                                                    </svg>
                                                </button>
                                            </li>
                                            <li
                                                className={
                                                    "next-btn-choose" +
                                                    (!hasNext
                                                        ? " swiper-button-disabled"
                                                        : "")
                                                }
                                            >
                                                <button
                                                    type="button"
                                                    tabIndex={0}
                                                    aria-label="Next"
                                                    onClick={handleNext}
                                                    disabled={!hasNext}
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        padding: 0,
                                                        cursor: hasNext
                                                            ? "pointer"
                                                            : "not-allowed",
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
                                                            strokeWidth={1.875}
                                                        />
                                                        <path
                                                            d="M14.25 33C13.7322 33 13.3125 33.4197 13.3125 33.9375C13.3125 34.4553 13.7322 34.875 14.25 34.875V33.9375V33ZM51.4874 34.6004C51.8535 34.2343 51.8535 33.6407 51.4874 33.2746L45.5212 27.3084C45.1551 26.9423 44.5615 26.9423 44.1954 27.3084C43.8293 27.6745 43.8293 28.2681 44.1954 28.6342L49.4987 33.9375L44.1954 39.2408C43.8293 39.6069 43.8293 40.2005 44.1954 40.5666C44.5615 40.9327 45.1551 40.9327 45.5212 40.5666L51.4874 34.6004ZM14.25 33.9375V34.875H50.8245V33.9375V33H14.25V33.9375Z"
                                                            fill="#0DB02B"
                                                        />
                                                    </svg>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
