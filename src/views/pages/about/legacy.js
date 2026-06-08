"use client";
/* eslint-disable @next/next/no-img-element, no-unused-vars */

import { useState } from "react";
import { Controller, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
//
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const AboutPageLegacy = ({ data = {}, slug = "legacy" }) => {
    const { heading, description, timeline = [] } = data;

    const [mainSlider, setMainSlider] = useState(null);
    const [timelineSlider, setTimelineSlider] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const mainSliderOptions = {
        loop: false,
        watchSlidesProgress: true,
        modules: [Navigation],
        onSwiper: (swiper) => {
            setMainSlider(swiper);
        },
        onSlideChange: (swiper) => {
            setCurrentSlide(swiper.activeIndex);
            if (
                timelineSlider &&
                timelineSlider.activeIndex !== swiper.activeIndex
            ) {
                timelineSlider.slideTo(swiper.activeIndex);
            }
        },
    };

    const timelineSliderOptions = {
        slidesPerView: 1,
        loop: false,
        watchSlidesProgress: true,
        modules: [Navigation],
        onSwiper: (swiper) => {
            setTimelineSlider(swiper);
        },
        onSlideChange: (swiper) => {
            setCurrentSlide(swiper.activeIndex);
            if (mainSlider && mainSlider.activeIndex !== swiper.activeIndex) {
                mainSlider.slideTo(swiper.activeIndex);
            }
        },
        allowTouchMove: true,
        breakpoints: {
            220: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 100,
            },
        },
    };

    const nextSlide = () => {
        if (mainSlider && currentSlide < timeline.length - 1) {
            mainSlider.slideTo(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (mainSlider && currentSlide > 0) {
            mainSlider.slideTo(currentSlide - 1);
        }
    };

    return (
        <section className="legacy__section" id={slug}>
            <div className="custom-container">
                <div className="row">
                    <div className="col-12 col-lg-11 col-xl-11">
                        <div className="section_header">
                            <h4
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: heading,
                                }}
                            />
                            <div className="content__wrap">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row btn-top-row">
                    {/* <div className="lg-block"> */}
                    <div className="col-12 col-md-2 col-lg-2 col-xl-1">
                        <ul className="legacy__tab__slider_btn list-unstyled justify-content-center">
                            <li className="prev-btn-legacy" onClick={prevSlide}>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <svg
                                        width={17}
                                        height={34}
                                        viewBox="0 0 17 34"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 2L2 17C2 17 9.92318 26.1421 15 32"
                                            stroke="#5B5B5B"
                                            strokeWidth={3}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li className="next-btn-legacy" onClick={nextSlide}>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={17}
                                        height={33}
                                        viewBox="0 0 17 33"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 31.5L15 16.5C15 16.5 7.07682 7.35786 2 1.5"
                                            stroke="#5B5B5B"
                                            strokeWidth={3}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* </div> */}

                    <div className="col-12 col-md-10 col-lg-10 col-xl-11">
                        <div className="legacy__item_wrapper">
                            <div className="legacy__item_slider swiper">
                                <Swiper {...mainSliderOptions}>
                                    {timeline.map((item, index) => (
                                        <SwiperSlide
                                            key={`main-slide-${index}-${
                                                item?.year || index
                                            }`}
                                        >
                                            <div className="legacy__item_wrap">
                                                <div className="legacy__item d-flex align-items-center">
                                                    <div className="legacy__block theme-gradient-1">
                                                        <div className="img__wrap">
                                                            <img
                                                                loading="lazy"
                                                                className="img-fluid"
                                                                src={
                                                                    item.image
                                                                        ?.src
                                                                        ? getImageURL(
                                                                              item
                                                                                  .image
                                                                                  ?.src
                                                                          )
                                                                        : ""
                                                                }
                                                                alt={
                                                                    item.image
                                                                        ?.alt ||
                                                                    item.heading ||
                                                                    ""
                                                                }
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.style.display =
                                                                        "block";
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="legacy__content fs-36 fw-500 text-gradient">
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    item?.description ||
                                                                    "",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-container-fluid">
                <div className="row legacy_year">
                    <div className="col-12">
                        <div className="legacy_list_wrapper lg_view">
                            <ul className="list-unstyled">
                                <Swiper
                                    {...timelineSliderOptions}
                                    className="legacy_list legacy_list_slider"
                                >
                                    {timeline?.map((item, index) => (
                                        <SwiperSlide
                                            key={`timeline-slide-${index}-${
                                                item?.year || index
                                            }`}
                                            className={
                                                currentSlide === index
                                                    ? "active-slide"
                                                    : ""
                                            }
                                        >
                                            <li data-id={`legacy-${index}`}>
                                                <a
                                                    href="#"
                                                    data-id={`legacy-${index}`}
                                                    className="legacy_list_item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (mainSlider) {
                                                            mainSlider.slideTo(
                                                                index
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <span className="dot">
                                                        <div className="circle__wrapper">
                                                            <div className="circle-1" />
                                                            <div className="circle-2" />
                                                        </div>
                                                    </span>
                                                    <div className="legacy_content">
                                                        <div
                                                            className="year fs-36"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.year,
                                                            }}
                                                        />
                                                        <h4
                                                            className="heading fs-28"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.heading,
                                                            }}
                                                        />
                                                        <div className="content__wrap">
                                                            <p
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        item?.short_description ||
                                                                        "",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="custom-container">
                <div className="row btn-bottom-row">
                    <div className="sm-block">
                        <div className="col-12">
                            <ul className="legacy__tab__slider_btn list-unstyled justify-content-center">
                                <li
                                    className="prev-btn-legacy"
                                    onClick={prevSlide}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <svg
                                            width={17}
                                            height={34}
                                            viewBox="0 0 17 34"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 2L2 17C2 17 9.92318 26.1421 15 32"
                                                stroke="#5B5B5B"
                                                strokeWidth={3}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li
                                    className="next-btn-legacy"
                                    onClick={nextSlide}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={17}
                                            height={33}
                                            viewBox="0 0 17 33"
                                            fill="none"
                                        >
                                            <path
                                                d="M2 31.5L15 16.5C15 16.5 7.07682 7.35786 2 1.5"
                                                stroke="#5B5B5B"
                                                strokeWidth={3}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
