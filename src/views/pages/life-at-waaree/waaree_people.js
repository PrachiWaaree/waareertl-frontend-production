"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";
import { useState } from "react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { cleanSEOTags } from "@/utilities";
import { Swiper, SwiperSlide } from "swiper/react";

export const LifeAtWaareePeople = ({ data = {}, slug = "waaree_people" }) => {
    const { heading, people_slider = [] } = data || {};

    const {
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
        options,
    } = useSwiperSliderOptions({
        // loop: true,
        infinite: true,
        grabCursor: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        slidesPerView: "auto",
        breakpoints: {
            320: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 1.2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 1.2,
                spaceBetween: 40,
            },
        },
    });

    const [mainSwiper, setMainSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const goPrev = () => {
        if (mainSwiper) mainSwiper.slidePrev();
    };
    const goNext = () => {
        if (mainSwiper) mainSwiper.slideNext();
    };

    const swiperOptions = {
        ...options,
        onSwiper: (swiper) => setMainSwiper(swiper),
        onSlideChange: (swiper) => {
            setActiveIndex(swiper.realIndex);
        },
    };

    return (
        <>
            <section className="meet__people_section" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="item__wrapper">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                                        <Swiper
                                            {...swiperOptions}
                                            className="people__slider"
                                        >
                                            {people_slider.map((item, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <div className="item__wrap">
                                                        <div className="single__item">
                                                            <div className="img__wrap">
                                                                <OptimizedImage
                                                                    className="img-fluid"
                                                                    src={getImageURL(
                                                                        item
                                                                            .image
                                                                            ?.src,
                                                                    )}
                                                                    alt={
                                                                        item
                                                                            .image
                                                                            ?.alt ||
                                                                        item.name ||
                                                                        ""
                                                                    }/>
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
                    <div className="row">
                        <div className="col-12">
                            <div className="section_header text-center">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: cleanSEOTags(heading),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <div className="pc__slider_wrapper">
                                <div className="people__content_slider swiper">
                                    {people_slider[activeIndex] && (
                                        <div className="single__item text-center">
                                            <div className="quote__img">
                                                <OptimizedImage
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        people_slider[
                                                            activeIndex
                                                        ].quote_icon?.src,
                                                    )}
                                                    alt={
                                                        people_slider[
                                                            activeIndex
                                                        ].quote_icon?.alt || ""
                                                    }/>
                                            </div>
                                            <div className="content__wrap">
                                                <div
                                                    className="desc fs-20 fw-300"
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanSEOTags(
                                                            people_slider[
                                                                activeIndex
                                                            ].description,
                                                        ),
                                                    }}
                                                />
                                            </div>
                                            <h5 className="people_name fs-28 fw-600">
                                                <span className="text-gradient">
                                                    {
                                                        people_slider[
                                                            activeIndex
                                                        ].name
                                                    }
                                                </span>
                                            </h5>
                                            <div className="people_designation fs-18 fw-500">
                                                {
                                                    people_slider[activeIndex]
                                                        .designation
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <ul className="pc__slider_btn list-unstyled justify-content-center">
                                    <li
                                        className={`prev-btn-content${
                                            activeIndex === 0 ? " disable" : ""
                                        }`}
                                        style={{
                                            ...(activeIndex === 0 && {
                                                filter: "saturate(0)",
                                                opacity: 0.5,
                                                pointerEvents: "none",
                                            }),
                                        }}
                                    >
                                        <a
                                            href="#!"
                                            aria-label="Previous Slide"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (
                                                    mainSwiper &&
                                                    activeIndex !== 0
                                                ) {
                                                    goPrev();
                                                }
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
                                        </a>
                                    </li>
                                    <li
                                        className={`next-btn-content${
                                            activeIndex ===
                                            people_slider.length - 1
                                                ? " disable"
                                                : ""
                                        }`}
                                        style={{
                                            ...(activeIndex ===
                                                people_slider.length - 1 && {
                                                filter: "saturate(0)",
                                                opacity: 0.5,
                                                pointerEvents: "none",
                                            }),
                                        }}
                                    >
                                        <a
                                            href="#!"
                                            aria-label="Next Slide"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (
                                                    mainSwiper &&
                                                    activeIndex !==
                                                        people_slider.length - 1
                                                ) {
                                                    goNext();
                                                }
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
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
