"use client";
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
//
import { Button, OptimizedImage } from "@/components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const EpcPageCapabilities = ({ data = {}, slug="epc_capabilities" }) => {
    const { title, description, type = [] } = data;
    const [activeTab, setActiveTab] = useState(0);

    const [epcActiveIndex, setEpcActiveIndex] = useState(0);
    const [epcTotalSlides, setEpcTotalSlides] = useState(0);
    const epcSwiperRef = useRef([]);

    useEffect(() => {
        const swiper = epcSwiperRef.current[activeTab];
        if (swiper && typeof swiper.slideTo === "function") {
            swiper.slideTo(0, 0);
        }
        setEpcActiveIndex(0);
        setEpcTotalSlides(
            Array.isArray(type[activeTab]?.slider)
                ? type[activeTab].slider.length
                : 0
        );
    }, [activeTab, type]);

    const handleEpcSwiperInit = (swiper, idx) => {
        epcSwiperRef.current[idx] = swiper;
        if (typeof swiper.slideTo === "function") {
            swiper.slideTo(0, 0);
        }
        setEpcTotalSlides(swiper.slides.length);
        setEpcActiveIndex(swiper.activeIndex);
    };

    const handleEpcSlideChange = (swiper, idx) => {
        setEpcActiveIndex(swiper.activeIndex);
        setEpcTotalSlides(swiper.slides.length);
    };

    const handlePrevEpcSlide = () => {
        const swiper = epcSwiperRef.current[activeTab];
        if (swiper && epcActiveIndex > 0) {
            swiper.slidePrev();
        }
    };

    const handleNextEpcSlide = () => {
        const swiper = epcSwiperRef.current[activeTab];
        if (swiper && epcActiveIndex < epcTotalSlides - 1) {
            swiper.slideNext();
        }
    };

    const {
        prevSlide: prevCategorySlide,
        nextSlide: nextCategorySlide,
        options: tabSliderOptions,
    } = useSwiperSliderOptions({
        slidesPerView: 3,
        allowTouchMove: true,
        centeredSlides: false,
        slideToClickedSlide: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                allowTouchMove: true,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    const { options: epcSliderOptions } = useSwiperSliderOptions({
        clickable: true,
        slidesPerView: 1,
        modules: [Navigation],
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            600: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            992: {
                slidesPerView: 1.12,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 1.12,
                spaceBetween: 16,
            },
        },
    });

    const handleTabClick = useCallback(
        (idx) => {
            if (activeTab !== idx) {
                setActiveTab(idx);
            }
        },
        [activeTab]
    );

    return (
        <>
            <section className="team__section epc_solar_section" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8 col-xl-6">
                            <div className="section_header text-center">
                                {title && (
                                    <h4
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                )}
                                {description && (
                                    <div className="content__wrap text-center">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {Array.isArray(type) && type.length > 0 && (
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <div className="item__tab_wrapper">
                                    <div className="tab_circle_1 circle__wrapper">
                                        <div className="circle-1" />
                                        <div className="circle-2 theme-gradient-1" />
                                    </div>
                                    <div className="tab_circle_2 circle__wrapper">
                                        <div className="circle-1" />
                                        <div className="circle-2 theme-gradient-1" />
                                    </div>
                                    <div className="custom-container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div>
                                                    <Swiper
                                                        {...tabSliderOptions}
                                                        className="item__tablist category__slider swiper-container"
                                                    >
                                                        {type?.map((tab, idx) =>
                                                            tab?.type_name ? (
                                                                <SwiperSlide
                                                                    key={idx}
                                                                >
                                                                    {({
                                                                        isActive:
                                                                            slideActive,
                                                                    }) => {
                                                                        if (
                                                                            activeTab !==
                                                                                idx &&
                                                                            !!slideActive &&
                                                                            typeof window !==
                                                                                "undefined" &&
                                                                            window.innerWidth <=
                                                                                480
                                                                        ) {
                                                                            handleTabClick(
                                                                                idx
                                                                            );
                                                                        }

                                                                        return (
                                                                            <div
                                                                                className={`list_item${
                                                                                    activeTab ===
                                                                                    idx
                                                                                        ? " active"
                                                                                        : ""
                                                                                }`}
                                                                            >
                                                                                <a
                                                                                    href="javascript:void(0);"
                                                                                    className={`item__tab${
                                                                                        activeTab ===
                                                                                        idx
                                                                                            ? " active"
                                                                                            : ""
                                                                                    }`}
                                                                                    data-id={`tab-${idx}`}
                                                                                    onClick={(
                                                                                        e
                                                                                    ) => {
                                                                                        e.preventDefault();
                                                                                        handleTabClick(
                                                                                            idx
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <h4 className="heading fs-28 fw-600">
                                                                                        {
                                                                                            tab?.type_name
                                                                                        }
                                                                                    </h4>
                                                                                    <div className="shape" />
                                                                                </a>
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </SwiperSlide>
                                                            ) : null
                                                        )}
                                                    </Swiper>

                                                    <ul className="category__slider_btn">
                                                        <li
                                                            className="prev-btn-category"
                                                            onClick={
                                                                prevCategorySlide
                                                            }
                                                        >
                                                            <a
                                                                href="javascript:void(0);"
                                                                onClick={(e) =>
                                                                    e.preventDefault()
                                                                }
                                                            >
                                                                <svg
                                                                    width={45}
                                                                    height={45}
                                                                    viewBox="0 0 45 45"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <rect
                                                                        x={-1}
                                                                        y={1}
                                                                        width={
                                                                            43
                                                                        }
                                                                        height={
                                                                            43
                                                                        }
                                                                        rx="21.5"
                                                                        transform="matrix(-1 0 0 1 43 0)"
                                                                        stroke="#5B5B5B"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                    />
                                                                    <path
                                                                        d="M37.4685 21.1158C38.0206 21.1017 38.4797 21.5377 38.4938 22.0898C38.508 22.6419 38.0719 23.101 37.5198 23.1151L37.4685 21.1158ZM6.81525 23.6095C6.41484 23.2291 6.39861 22.5961 6.779 22.1957L12.9777 15.6707C13.3581 15.2703 13.9911 15.2541 14.3915 15.6345C14.7919 16.0148 14.8081 16.6478 14.4277 17.0482L8.91774 22.8482L14.7177 28.3582C15.1181 28.7386 15.1344 29.3715 14.754 29.772C14.3736 30.1724 13.7406 30.1886 13.3402 29.8082L6.81525 23.6095ZM37.4941 22.1155L37.5198 23.1151L7.52963 23.8841L7.50399 22.8845L7.47836 21.8848L37.4685 21.1158L37.4941 22.1155Z"
                                                                        fill="#5B5B5B"
                                                                    />
                                                                </svg>
                                                            </a>
                                                        </li>
                                                        <li
                                                            className="next-btn-category"
                                                            onClick={
                                                                nextCategorySlide
                                                            }
                                                        >
                                                            <a
                                                                href="javascript:void(0);"
                                                                onClick={(e) =>
                                                                    e.preventDefault()
                                                                }
                                                            >
                                                                <svg
                                                                    width={45}
                                                                    height={45}
                                                                    viewBox="0 0 45 45"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <rect
                                                                        x={1}
                                                                        y={1}
                                                                        width={
                                                                            43
                                                                        }
                                                                        height={
                                                                            43
                                                                        }
                                                                        rx="21.5"
                                                                        stroke="#0DB02B"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                    />
                                                                    <path
                                                                        d="M7.53149 21.1158C6.97939 21.1017 6.52034 21.5377 6.50619 22.0898C6.49203 22.6419 6.92812 23.101 7.48023 23.1151L7.53149 21.1158ZM38.1848 23.6095C38.5852 23.2291 38.6014 22.5961 38.221 22.1957L32.0223 15.6707C31.6419 15.2703 31.0089 15.2541 30.6085 15.6345C30.2081 16.0148 30.1919 16.6478 30.5723 17.0482L36.0823 22.8482L30.2823 28.3582C29.8819 28.7386 29.8656 29.3715 30.246 29.772C30.6264 30.1724 31.2594 30.1886 31.6598 29.8082L38.1848 23.6095ZM7.50586 22.1155L7.48023 23.1151L37.4704 23.8841L37.496 22.8845L37.5216 21.8848L7.53149 21.1158L7.50586 22.1155Z"
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
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="custom-container">
                    {Array.isArray(type) &&
                        type.map((item, idx) =>
                            item ? (
                                <div
                                    key={idx}
                                    className={`item__tab_data${
                                        activeTab === idx ? " tab-active" : ""
                                    }`}
                                    data-id={`tab-${idx}`}
                                    style={{
                                        display:
                                            activeTab === idx
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <div className="team__slider_wrap">
                                        <div className="row justify-content-center">
                                            <div className="col-12 col-md-6 col-lg-5 col-xl-5">
                                                <div className="epc_left_col">
                                                    <div className="section_header">
                                                        {item?.type_name && (
                                                            <h4 className="heading fs-28 fw-400">
                                                                {
                                                                    item?.type_name
                                                                }
                                                            </h4>
                                                        )}
                                                        {item?.description && (
                                                            <div className="content__wrap">
                                                                <p
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item?.description,
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {(item?.feature_title ||
                                                        (Array.isArray(
                                                            item?.type_features
                                                        ) &&
                                                            item?.type_features
                                                                .length > 0) ||
                                                        item?.button) && (
                                                        <div className="feature__block">
                                                            {item?.feature_title && (
                                                                <h4 className="heading fs-20 fw-600">
                                                                    {
                                                                        item?.feature_title
                                                                    }
                                                                </h4>
                                                            )}
                                                            {Array.isArray(
                                                                item?.type_features
                                                            ) &&
                                                                item
                                                                    ?.type_features
                                                                    .length >
                                                                    0 && (
                                                                    <ul className="content__wrap list-unstyled fs-20 fw-600">
                                                                        {item?.type_features.map(
                                                                            (
                                                                                f,
                                                                                fidx
                                                                            ) =>
                                                                                f?.feature ? (
                                                                                    <li
                                                                                        key={
                                                                                            fidx
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            f.feature
                                                                                        }
                                                                                    </li>
                                                                                ) : null
                                                                        )}
                                                                    </ul>
                                                                )}
                                                            {item?.button && (
                                                                <div className="btn-group">
                                                                    <Button
                                                                        key={
                                                                            idx
                                                                        }
                                                                        href={
                                                                            item
                                                                                ?.button
                                                                                ?.url_type ===
                                                                            "external"
                                                                                ? item
                                                                                      ?.button
                                                                                      ?.external_url ||
                                                                                  item
                                                                                      ?.button
                                                                                      ?.url
                                                                                : item
                                                                                      ?.button
                                                                                      ?.url
                                                                        }
                                                                        label={
                                                                            item
                                                                                ?.button
                                                                                ?.title
                                                                        }
                                                                        target={
                                                                            item
                                                                                ?.button
                                                                                ?.open_new_tab ===
                                                                            "yes"
                                                                                ? "_blank"
                                                                                : undefined
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-7 col-xl-7">
                                                {Array.isArray(item?.slider) &&
                                                    item?.slider.length > 0 && (
                                                        <div className="epc_wrapper">
                                                            <div className="epc__slider swiper">
                                                                <Swiper
                                                                    {...epcSliderOptions}
                                                                    onSwiper={(
                                                                        swiper
                                                                    ) =>
                                                                        handleEpcSwiperInit(
                                                                            swiper,
                                                                            idx
                                                                        )
                                                                    }
                                                                    onSlideChange={(
                                                                        swiper
                                                                    ) =>
                                                                        handleEpcSlideChange(
                                                                            swiper,
                                                                            idx
                                                                        )
                                                                    }
                                                                >
                                                                    {item?.slider?.map(
                                                                        (
                                                                            slide,
                                                                            sidx
                                                                        ) =>
                                                                            slide ? (
                                                                                <SwiperSlide
                                                                                    key={
                                                                                        sidx
                                                                                    }
                                                                                >
                                                                                    <div className="single__item">
                                                                                        {slide
                                                                                            ?.bgimage
                                                                                            ?.src && (
                                                                                            <div className="img__wrap">
                                                                                                <OptimizedImage
                                                                                                    className="img-fluid"
                                                                                                    src={getImageURL(
                                                                                                        slide
                                                                                                            ?.bgimage
                                                                                                            ?.src
                                                                                                    )}
                                                                                                    alt={
                                                                                                        slide
                                                                                                            ?.bgimage
                                                                                                            ?.alt ||
                                                                                                        ""
                                                                                                    }/>
                                                                                            </div>
                                                                                        )}
                                                                                        {(slide?.title ||
                                                                                            slide?.description) && (
                                                                                            <div className="content__area">
                                                                                                {slide?.title && (
                                                                                                    <h4 className="heading fs-28 fw-400 text-primary">
                                                                                                        {
                                                                                                            slide?.title
                                                                                                        }
                                                                                                    </h4>
                                                                                                )}
                                                                                                {slide?.description && (
                                                                                                    <div className="content__wrap text-white">
                                                                                                        <p
                                                                                                            dangerouslySetInnerHTML={{
                                                                                                                __html: slide?.description,
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </SwiperSlide>
                                                                            ) : null
                                                                    )}
                                                                </Swiper>
                                                            </div>
                                                            <ul className="epc__slider_btn list-unstyled justify-content-center">
                                                                <li
                                                                    className={`prev-btn-epc${
                                                                        epcActiveIndex ===
                                                                        0
                                                                            ? " disabled swiper-button-disabled"
                                                                            : ""
                                                                    }`}
                                                                    onClick={
                                                                        epcActiveIndex ===
                                                                        0
                                                                            ? undefined
                                                                            : handlePrevEpcSlide
                                                                    }
                                                                    style={{
                                                                        pointerEvents:
                                                                            epcActiveIndex ===
                                                                            0
                                                                                ? "none"
                                                                                : "auto",
                                                                        opacity:
                                                                            epcActiveIndex ===
                                                                            0
                                                                                ? 0.5
                                                                                : 1,
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                        tabIndex={
                                                                            epcActiveIndex ===
                                                                            0
                                                                                ? -1
                                                                                : 0
                                                                        }
                                                                        aria-disabled={
                                                                            epcActiveIndex ===
                                                                            0
                                                                                ? "true"
                                                                                : "false"
                                                                        }
                                                                    >
                                                                        <svg
                                                                            width={
                                                                                65
                                                                            }
                                                                            height={
                                                                                65
                                                                            }
                                                                            viewBox="0 0 65 65"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <rect
                                                                                x={
                                                                                    -1
                                                                                }
                                                                                y={
                                                                                    1
                                                                                }
                                                                                width={
                                                                                    63
                                                                                }
                                                                                height={
                                                                                    63
                                                                                }
                                                                                rx="31.5"
                                                                                transform="matrix(-1 0 0 1 63 0)"
                                                                                stroke="currentColor"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                            />
                                                                            <path
                                                                                d="M51.9744 31.0003C52.5265 30.9862 52.9855 31.4223 52.9997 31.9744C53.0138 32.5265 52.5777 32.9855 52.0256 32.9997L51.9744 31.0003ZM12.3112 33.725C11.9108 33.3446 11.8946 32.7117 12.275 32.3113L18.4737 25.7863C18.8541 25.3858 19.4871 25.3696 19.8875 25.75C20.2879 26.1304 20.3041 26.7633 19.9237 27.1638L14.4138 32.9637L20.2137 38.4737C20.6142 38.8541 20.6304 39.4871 20.25 39.8875C19.8696 40.2879 19.2367 40.3041 18.8362 39.9237L12.3112 33.725ZM52 32L52.0256 32.9997L13.0256 33.9997L13 33L12.9744 32.0003L51.9744 31.0003L52 32Z"
                                                                                fill="currentColor"
                                                                            />
                                                                        </svg>
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className={`next-btn-epc${
                                                                        epcActiveIndex >=
                                                                            epcTotalSlides -
                                                                                1 ||
                                                                        epcTotalSlides ===
                                                                            0
                                                                            ? " disabled swiper-button-disabled"
                                                                            : ""
                                                                    }`}
                                                                    onClick={
                                                                        epcActiveIndex >=
                                                                            epcTotalSlides -
                                                                                1 ||
                                                                        epcTotalSlides ===
                                                                            0
                                                                            ? undefined
                                                                            : handleNextEpcSlide
                                                                    }
                                                                    style={{
                                                                        pointerEvents:
                                                                            epcActiveIndex >=
                                                                                epcTotalSlides -
                                                                                    1 ||
                                                                            epcTotalSlides ===
                                                                                0
                                                                                ? "none"
                                                                                : "auto",
                                                                        opacity:
                                                                            epcActiveIndex >=
                                                                                epcTotalSlides -
                                                                                    1 ||
                                                                            epcTotalSlides ===
                                                                                0
                                                                                ? 0.5
                                                                                : 1,
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        tabIndex={
                                                                            epcActiveIndex >=
                                                                                epcTotalSlides -
                                                                                    1 ||
                                                                            epcTotalSlides ===
                                                                                0
                                                                                ? -1
                                                                                : 0
                                                                        }
                                                                        aria-disabled={
                                                                            epcActiveIndex >=
                                                                                epcTotalSlides -
                                                                                    1 ||
                                                                            epcTotalSlides ===
                                                                                0
                                                                                ? "true"
                                                                                : "false"
                                                                        }
                                                                    >
                                                                        <svg
                                                                            width={
                                                                                65
                                                                            }
                                                                            height={
                                                                                65
                                                                            }
                                                                            viewBox="0 0 65 65"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <rect
                                                                                x={
                                                                                    1
                                                                                }
                                                                                y={
                                                                                    1
                                                                                }
                                                                                width={
                                                                                    63
                                                                                }
                                                                                height={
                                                                                    63
                                                                                }
                                                                                rx="31.5"
                                                                                stroke="currentColor"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                            />
                                                                            <path
                                                                                d="M13.0256 31.0003C12.4735 30.9862 12.0145 31.4223 12.0003 31.9744C11.9862 32.5265 12.4223 32.9855 12.9744 32.9997L13.0256 31.0003ZM52.6888 33.725C53.0892 33.3446 53.1054 32.7117 52.725 32.3113L46.5263 25.7863C46.1459 25.3858 45.5129 25.3696 45.1125 25.75C44.7121 26.1304 44.6959 26.7633 45.0763 27.1638L50.5862 32.9637L44.7863 38.4737C44.3858 38.8541 44.3696 39.4871 44.75 39.8875C45.1304 40.2879 45.7633 40.3041 46.1638 39.9237L52.6888 33.725ZM13 32L12.9744 32.9997L51.9744 33.9997L52 33L52.0256 32.0003L13.0256 31.0003L13 32Z"
                                                                                fill="currentColor"
                                                                            />
                                                                        </svg>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        )}
                </div>
            </section>
        </>
    );
};
