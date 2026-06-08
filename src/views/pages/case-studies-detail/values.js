"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { useRef } from "react";
import { getImageURL } from "@/lib";
import { Navigation, Pagination } from "swiper/modules";
import { useCommonContext } from "@/contexts";
import { Swiper, SwiperSlide } from "swiper/react";

export const CaseStudyDetailPageValueSection = ({ data = {} }) => {
    const {
        title = "Benefits",
        description = "",
        values_icon = [],
        client = [],
    } = data;

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
            el: ".value__tab_pagination",
            enabled: true,
            type: "bullets",
            clickable: true,
        },
        slidesPerView: slidesToShow,
        spaceBetween: 16,
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

    const getBenefitSliderOptions = {
        modules: [Navigation],
        loop: true,
        slidesPerView: 4,
        spaceBetween: 14,
        navigation: {
            prevEl: `.prev-btn-benefit`,
            nextEl: `.next-btn-benefit`,
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
                slidesPerView: 4,
                spaceBetween: 14,
            },
        },
    };

    const hasContent = (str) => !!str && String(str).trim() !== "";

    const hasAnyData =
        hasContent(title) ||
        hasContent(description) ||
        (Array.isArray(values_icon) && values_icon.length > 0);

    // Helper to check if there is any data to show in value__wrapper
    const hasValueWrapperData =
        Array.isArray(values_icon) &&
        values_icon.some(
            (item) =>
                item &&
                (hasContent(item?.title) || (item?.icon && item?.icon?.src)),
        );

    if (!hasAnyData) {
        return null;
    }

    return (
        <>
            <section className="our__value_section cs__value-section">
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            {(hasContent(title) || hasContent(description)) && (
                                <div className="value__block">
                                    {hasContent(title) && (
                                        <div className="section_header">
                                            <h4
                                                className="heading fs-28 fw-400"
                                                dangerouslySetInnerHTML={{
                                                    __html: title,
                                                }}
                                            />
                                        </div>
                                    )}
                                    {hasContent(description) && (
                                        <div className="content__wrap">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: description,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {hasValueWrapperData && (
                            <div className="col-12 col-lg-8">
                                <>
                                    <div className="lg-block">
                                        <div className="value__wrapper">
                                            {values_icon.map((item, idx) =>
                                                item &&
                                                (hasContent(item?.title) ||
                                                    (item?.icon &&
                                                        item?.icon?.src)) ? (
                                                    <div
                                                        key={idx}
                                                        className="value__tab"
                                                    >
                                                        {item?.icon &&
                                                            item?.icon?.src && (
                                                                <div className="img__wrap">
                                                                    <OptimizedImage
                                                                        className="img-fluid"
                                                                        src={getImageURL(
                                                                            item
                                                                                ?.icon
                                                                                ?.src,
                                                                        )}
                                                                        alt={
                                                                            item
                                                                                ?.icon
                                                                                ?.alt ||
                                                                            ""
                                                                        }/>
                                                                </div>
                                                            )}
                                                        {hasContent(
                                                            item?.title,
                                                        ) && (
                                                            <h4
                                                                className="heading fs-28 fw-400"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item?.title,
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                ) : null,
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm-block">
                                        <Swiper
                                            {...smSwiperOptions}
                                            className="value__wrapper value__tab_slider"
                                        >
                                            {values_icon?.map((item, index) =>
                                                item &&
                                                (hasContent(item?.title) ||
                                                    (item?.icon &&
                                                        item?.icon?.src)) ? (
                                                    <SwiperSlide key={index}>
                                                        <div className="value__tab">
                                                            {item?.icon &&
                                                                item?.icon
                                                                    ?.src && (
                                                                    <div className="img__wrap">
                                                                        <OptimizedImage
                                                                            className="img-fluid"
                                                                            src={getImageURL(
                                                                                item
                                                                                    ?.icon
                                                                                    ?.src,
                                                                            )}
                                                                            alt={
                                                                                item
                                                                                    ?.icon
                                                                                    ?.alt ||
                                                                                ""
                                                                            }/>
                                                                    </div>
                                                                )}
                                                            {hasContent(
                                                                item?.title,
                                                            ) && (
                                                                <h4
                                                                    className="heading fs-28 fw-400"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item?.title,
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </SwiperSlide>
                                                ) : null,
                                            )}
                                        </Swiper>
                                        <div className="value__tab_pagination"></div>
                                    </div>
                                </>
                            </div>
                        )}
                    </div>
                    {Array.isArray(client) && client.length > 0 && (
                        <div className="value__data_wrapper">
                            <div
                                className="value__tab_data tab-active"
                                data-id="benefit-tab-1"
                                style={{ display: "block" }}
                            >
                                <div className="value__data">
                                    <Swiper
                                        {...getBenefitSliderOptions}
                                        className="benefit__slider swiper"
                                    >
                                        {client.map((clientItem, cidx) =>
                                            clientItem &&
                                            (hasContent(clientItem?.name) ||
                                                hasContent(
                                                    clientItem?.designation,
                                                ) ||
                                                hasContent(
                                                    clientItem?.description,
                                                ) ||
                                                (clientItem?.icon &&
                                                    clientItem?.icon?.src)) ? (
                                                <SwiperSlide
                                                    className="swiper-slide"
                                                    key={cidx}
                                                >
                                                    <div className="item__wrap">
                                                        <div className="single__item">
                                                            <div className="top__item d-flex align-items-center">
                                                                {clientItem?.icon &&
                                                                    clientItem
                                                                        ?.icon
                                                                        ?.src && (
                                                                        <div className="img__wrap">
                                                                            <OptimizedImage
                                                                                className="img-fluid"
                                                                                src={getImageURL(
                                                                                    clientItem
                                                                                        ?.icon
                                                                                        ?.src,
                                                                                )}
                                                                                alt={
                                                                                    clientItem?.name ||
                                                                                    ""
                                                                                }/>
                                                                        </div>
                                                                    )}
                                                                {(hasContent(
                                                                    clientItem?.name,
                                                                ) ||
                                                                    hasContent(
                                                                        clientItem?.designation,
                                                                    )) && (
                                                                    <div className="top__content_wrap">
                                                                        {hasContent(
                                                                            clientItem?.name,
                                                                        ) && (
                                                                            <h4
                                                                                className="heading fs-20 fw-600"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: clientItem?.name,
                                                                                }}
                                                                            />
                                                                        )}
                                                                        {hasContent(
                                                                            clientItem?.designation,
                                                                        ) && (
                                                                            <p
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: clientItem?.designation,
                                                                                }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {hasContent(
                                                                clientItem?.description,
                                                            ) && (
                                                                <div className="content__wrap">
                                                                    <div
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: clientItem?.description,
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ) : null,
                                        )}
                                    </Swiper>
                                    <ul className="benefit__slider_btn list-unstyled justify-content-center">
                                        <li className="prev-btn-benefit">
                                            <a
                                                href="#"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                <svg
                                                    width={65}
                                                    height={65}
                                                    viewBox="0 0 65 65"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x={-1}
                                                        y={1}
                                                        width={63}
                                                        height={63}
                                                        rx="31.5"
                                                        transform="matrix(-1 0 0 1 63 0)"
                                                        stroke="#0DB02B"
                                                        strokeWidth={2}
                                                    />
                                                    <path
                                                        d="M51.9744 31.0003C52.5265 30.9862 52.9855 31.4223 52.9997 31.9744C53.0138 32.5265 52.5777 32.9855 52.0256 32.9997L51.9744 31.0003ZM12.3112 33.725C11.9108 33.3446 11.8946 32.7117 12.275 32.3113L18.4737 25.7863C18.8541 25.3858 19.4871 25.3696 19.8875 25.75C20.2879 26.1304 20.3041 26.7633 19.9237 27.1638L14.4138 32.9637L20.2137 38.4737C20.6142 38.8541 20.6304 39.4871 20.25 39.8875C19.8696 40.2879 19.2367 40.3041 18.8362 39.9237L12.3112 33.725ZM52 32L52.0256 32.9997L13.0256 33.9997L13 33L12.9744 32.0003L51.9744 31.0003L52 32Z"
                                                        fill="#0DB02B"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                        <li className="next-btn-benefit">
                                            <a
                                                href="#"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                <svg
                                                    width={65}
                                                    height={65}
                                                    viewBox="0 0 65 65"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x={1}
                                                        y={1}
                                                        width={63}
                                                        height={63}
                                                        rx="31.5"
                                                        stroke="#0DB02B"
                                                        strokeWidth={2}
                                                    />
                                                    <path
                                                        d="M13.0256 31.0003C12.4735 30.9862 12.0145 31.4223 12.0003 31.9744C11.9862 32.5265 12.4223 32.9855 12.9744 32.9997L13.0256 31.0003ZM52.6888 33.725C53.0892 33.3446 53.1054 32.7117 52.725 32.3113L46.5263 25.7863C46.1459 25.3858 45.5129 25.3696 45.1125 25.75C44.7121 26.1304 44.6959 26.7633 45.0763 27.1638L50.5862 32.9637L44.7863 38.4737C44.3858 38.8541 44.3696 39.4871 44.75 39.8875C45.1304 40.2879 45.7633 40.3041 46.1638 39.9237L52.6888 33.725ZM13 32L12.9744 32.9997L51.9744 33.9997L52 33L52.0256 32.0003L13.0256 31.0003L13 32Z"
                                                        fill="#0DB02B"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
