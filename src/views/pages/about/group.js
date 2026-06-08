"use client";
/* eslint-disable @next/next/no-img-element, no-unused-vars */

import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Button } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";

export const AboutPageCompanyGroup = ({
    data = {},
    slug = "company_group",
}) => {
    const { group_slider, button, description, title } = data || {};

    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const { nextSlide, prevSlide, options } = useSwiperSliderOptions({
        slidesPerView: 4,
        noSwiping: false,
        noSwipingClass: "img_wrap",
        spaceBetween: 16,
        breakpoints: {
            260: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
        },
    });

    const handleSwiper = (swiper) => {
        setSwiperInstance(swiper);
        setActiveIndex(swiper.activeIndex);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
        setIsLocked(swiper.isLocked);
    };

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
        setIsLocked(swiper.isLocked);
    };

    const handlePrev = () => {
        if (!isBeginning && prevSlide) prevSlide();
    };
    const handleNext = () => {
        if (!isEnd && nextSlide) nextSlide();
    };

    const getButtonHref = (btn) => {
        let url = "";
        if (btn?.url_type === "external") {
            url = btn?.external_url || btn?.url;
        } else {
            url = btn?.url;
        }
        if (typeof url === "string") {
            return url;
        }
        return "";
    };

    if (!data || typeof data !== "object") {
        return null;
    }

    const hasLeftBlock =
        (typeof title === "string" && title.trim() !== "") ||
        (typeof description === "string" && description.trim() !== "") ||
        (button && button.title);

    const hasSlider = Array.isArray(group_slider) && group_slider.length > 0;

    if (!hasLeftBlock && !hasSlider) {
        return null;
    }

    return (
        <section className="award__section grp__company_section" id={slug}>
            <div className="custom-container">
                <div className="row">
                    {hasLeftBlock && (
                        <div className="col-12 col-lg-4 col-xl-3">
                            <div className="grp__company_block">
                                {/* Title */}
                                {typeof title === "string" &&
                                    title.trim() !== "" && (
                                        <div className="section_header">
                                            <h4
                                                className="heading fs-48 fw-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: title,
                                                }}
                                            />
                                        </div>
                                    )}
                                {typeof description === "string" &&
                                    description.trim() !== "" && (
                                        <div className="content__wrap">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: description,
                                                }}
                                            />
                                        </div>
                                    )}
                                {button && button.title && (
                                    <Button
                                        label={button.title}
                                        href={getButtonHref(button)}
                                        target={
                                            button.open_new_tab === "yes"
                                                ? "_blank"
                                                : undefined
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {hasSlider && (
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="grp__company_slider_wrap">
                                <Swiper
                                    {...options}
                                    className="grp__company_slider"
                                    onSwiper={handleSwiper}
                                    onSlideChange={handleSlideChange}
                                >
                                    {group_slider.map((item, index) => {
                                        const hasImage = item?.image?.src;
                                        const hasTitle = item?.title;
                                        const hasDesc = item?.description;
                                        const link = item?.redirect_to?.url;
                                        if (!hasImage && !hasTitle && !hasDesc)
                                            return null;
                                        return (
                                            <SwiperSlide
                                                className="d-flex"
                                                key={index}
                                            >
                                                <div className="single__item">
                                                    {hasImage && (
                                                        <div className="img__wrap">
                                                            <a href={link}>
                                                                <img
                                                                    loading="lazy"
                                                                    src={getImageURL(
                                                                        item
                                                                            ?.image
                                                                            ?.src
                                                                    )}
                                                                    alt={
                                                                        item
                                                                            ?.image
                                                                            ?.alt ||
                                                                        item?.title ||
                                                                        ""
                                                                    }
                                                                />
                                                            </a>
                                                        </div>
                                                    )}
                                                    {(hasTitle || hasDesc) && (
                                                        <div className="award__content theme-gradient-1 text-center">
                                                            {hasTitle && (
                                                                <a href={link}>
                                                                    <h4 className="heading fs-20 fw-600 text-white">
                                                                        {
                                                                            item?.title
                                                                        }
                                                                    </h4>
                                                                </a>
                                                            )}
                                                            {hasDesc && (
                                                                <div className="content__wrap text-white">
                                                                    <p>
                                                                        {
                                                                            item?.description
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                                {!isLocked && (
                                    <ul className="grp__company__slider_btn list-unstyled justify-content-center">
                                        <li
                                            className={`prev-btn-grp${
                                                isBeginning ? " disable" : ""
                                            }`}
                                            onClick={handlePrev}
                                        >
                                            <a
                                                href="#!"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                                tabIndex={isBeginning ? -1 : 0}
                                                aria-disabled={isBeginning}
                                            >
                                                <svg
                                                    width={55}
                                                    height={54}
                                                    viewBox="0 0 55 54"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x="-0.631579"
                                                        y="0.631579"
                                                        width="53.3546"
                                                        height="52.7368"
                                                        rx="26.3684"
                                                        transform="matrix(-1 0 0 1 53.3548 0)"
                                                        stroke="#5B5B5B"
                                                        strokeWidth="1.26316"
                                                    />
                                                    <path
                                                        d="M39.6086 26.053C39.9573 26.044 40.2472 26.3194 40.2561 26.6681C40.2651 27.0168 39.9896 27.3068 39.6409 27.3157L39.6086 26.053ZM14.5582 27.7738C14.3053 27.5336 14.295 27.1338 14.5353 26.8809L18.4503 22.7599C18.6905 22.507 19.0903 22.4967 19.3432 22.737C19.5961 22.9772 19.6063 23.377 19.3661 23.6299L15.8861 27.293L19.5492 30.773C19.8021 31.0133 19.8124 31.413 19.5721 31.6659C19.3319 31.9188 18.9321 31.929 18.6792 31.6888L14.5582 27.7738ZM39.6248 26.6843L39.6409 27.3157L15.0094 27.9473L14.9932 27.3159L14.977 26.6845L39.6086 26.053L39.6248 26.6843Z"
                                                        fill="#5B5B5B"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                        <li
                                            className={`next-btn-grp${
                                                isEnd ? " disable" : ""
                                            }`}
                                            onClick={handleNext}
                                        >
                                            <a
                                                href="#!"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                                tabIndex={isEnd ? -1 : 0}
                                                aria-disabled={isEnd}
                                            >
                                                <svg
                                                    width={55}
                                                    height={54}
                                                    viewBox="0 0 55 54"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x="1.0139"
                                                        y="0.631579"
                                                        width="53.3546"
                                                        height="52.7368"
                                                        rx="26.3684"
                                                        stroke="#0DB02B"
                                                        strokeWidth="1.26316"
                                                    />
                                                    <path
                                                        d="M15.3917 26.053C15.043 26.044 14.7531 26.3194 14.7441 26.6681C14.7352 27.0168 15.0106 27.3068 15.3593 27.3157L15.3917 26.053ZM40.4421 27.7738C40.695 27.5336 40.7052 27.1338 40.465 26.8809L36.55 22.7599C36.3097 22.507 35.91 22.4967 35.6571 22.737C35.4042 22.9772 35.3939 23.377 35.6342 23.6299L39.1142 27.293L35.451 30.773C35.1981 31.0133 35.1879 31.413 35.4281 31.6659C35.6684 31.9188 36.0681 31.929 36.321 31.6888L40.4421 27.7738ZM15.3755 26.6843L15.3593 27.3157L39.9909 27.9473L40.0071 27.3159L40.0233 26.6845L15.3917 26.053L15.3755 26.6843Z"
                                                        fill="#0DB02B"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
