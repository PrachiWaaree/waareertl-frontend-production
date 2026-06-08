"use client";
import { Fragment, useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { ErrorMessage, OptimizedImage } from "@/components";

export const OfficePageLocation = ({ data = {}, slug = "location" }) => {
    const { center_icon, location_type = [] } = data;
    const [activeTab, setActiveTab] = useState(0);

    const safeLocationType = Array.isArray(location_type) ? location_type : [];
    const currentTab = safeLocationType[activeTab] || {};
    const addresses = Array.isArray(currentTab.addresses)
        ? currentTab.addresses
        : [];

    const { options } = useSwiperSliderOptions({
        slidesPerView: 2,
        loop: false,
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
                slidesPerView: 2,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
        },
    });

    const swiperRef = useRef(null);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(false);

    useEffect(() => {
        const swiper = swiperRef?.current;
        if (swiper) {
            const checkDisabled = () => {
                setIsNextDisabled(
                    swiper.isEnd ||
                        swiper.slides?.length <= swiper?.params?.slidesPerView
                );
                setIsPrevDisabled(swiper.isBeginning);
            };
            checkDisabled();
            swiper.on("slideChange", checkDisabled);
            swiper.on("update", checkDisabled);
            return () => {
                swiper.off("slideChange", checkDisabled);
                swiper.off("update", checkDisabled);
            };
        } else {
            setIsNextDisabled(true);
            setIsPrevDisabled(true);
        }
    }, [activeTab, addresses?.length]);

    const hasAnyData =
        Array.isArray(safeLocationType) &&
        safeLocationType?.length > 0 &&
        safeLocationType?.some(
            (lt) => Array?.isArray(lt?.addresses) && lt?.addresses?.length > 0
        );

    if (!hasAnyData) {
        return <ErrorMessage>No data</ErrorMessage>;
    }

    return (
        <>
            <section className="domestic_international_sec" id={slug}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            {safeLocationType?.length > 0 && (
                                <div className="item__tab_wrapper">
                                    {safeLocationType.map((item, index) =>
                                        item && item.title ? (
                                            <Fragment key={index}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setActiveTab(index);
                                                    }}
                                                    className={`item__tab ${
                                                        activeTab === index
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    data-id={`${item.title
                                                        .toLowerCase()
                                                        .replace(
                                                            /\s+/g,
                                                            "-"
                                                        )}-tab`}
                                                >
                                                    <h4
                                                        className="heading fs-38"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.title,
                                                        }}
                                                    />
                                                    <div className="shape" />
                                                </a>
                                                {activeTab === index && (
                                                    <div className="item__img">
                                                        <div className="outer_border" />
                                                        <div className="inner_border" />
                                                        {center_icon?.src && (
                                                            <OptimizedImage
                                                                className="img-fluid"
                                                                src={getImageURL(
                                                                    center_icon?.src
                                                                )}
                                                                alt={
                                                                    center_icon?.alt ||
                                                                    ""
                                                                }/>
                                                        )}
                                                    </div>
                                                )}
                                            </Fragment>
                                        ) : null
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="custom-container">
                    {addresses?.length > 0 && (
                        <div
                            className={`domestic__inner item__tab_data tab-active`}
                            data-id={`${currentTab.title
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")}-tab`}
                        >
                            <div
                                className={`${
                                    activeTab === 0
                                        ? "domestic_slider location_slider"
                                        : "int_location_slider"
                                } swiper`}
                            >
                                <Swiper
                                    {...options}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                    className="swiper-wrapper"
                                >
                                    {addresses.map((address, idx) =>
                                        address ? (
                                            <SwiperSlide
                                                className="swiper-slide d-flex"
                                                key={idx}
                                            >
                                                <div className="domestic_location d-flex">
                                                    <div className="domestic_img">
                                                        {address.image?.src && (
                                                            <OptimizedImage
                                                                className="img-fluid"
                                                                src={getImageURL(
                                                                    address
                                                                        ?.image
                                                                        ?.src
                                                                )}
                                                                alt={
                                                                    address
                                                                        ?.image
                                                                        ?.alt ||
                                                                    address.location_area ||
                                                                    ""
                                                                }/>
                                                        )}
                                                    </div>
                                                    <div className="domestic_details v_seperator">
                                                        <div className="row">
                                                            <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                                                                <div className="domestic_address">
                                                                    {address?.location_name && (
                                                                        <h4
                                                                            className="fs-28 fw-400"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                    address?.location_name ||
                                                                                    "",
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {address?.location_area && (
                                                                        <h4
                                                                            className="heading fs-20 fw-600 text-gradient"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                    address?.location_area ||
                                                                                    "",
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {address?.address && (
                                                                        <div className="content_wrap">
                                                                            <p
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html:
                                                                                        address?.address ||
                                                                                        "",
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                                                                {(address?.contact ||
                                                                    address?.email ||
                                                                    address?.direction) && (
                                                                    <div className="domestic_contact">
                                                                        {address?.contact && (
                                                                            <div className="single__item d-flex">
                                                                                <div className="icon__wrap">
                                                                                    {address
                                                                                        ?.call
                                                                                        ?.src && (
                                                                                        <OptimizedImage
                                                                                            className="img-fluid"
                                                                                            src={getImageURL(
                                                                                                address
                                                                                                    ?.call
                                                                                                    ?.src
                                                                                            )}
                                                                                            alt={
                                                                                                address
                                                                                                    ?.call
                                                                                                    ?.alt ||
                                                                                                ""
                                                                                            }/>
                                                                                    )}
                                                                                </div>
                                                                                <div className="content__wrap">
                                                                                    <a
                                                                                        href={`tel:${address?.contact?.replace(
                                                                                            /\s|-/g,
                                                                                            ""
                                                                                        )}`}
                                                                                    >
                                                                                        {
                                                                                            address?.contact
                                                                                        }
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {address?.email && (
                                                                            <div className="single__item d-flex">
                                                                                <div className="icon__wrap">
                                                                                    {address
                                                                                        .email_icon
                                                                                        ?.src && (
                                                                                        <OptimizedImage
                                                                                            className="img-fluid"
                                                                                            src={getImageURL(
                                                                                                address
                                                                                                    .email_icon
                                                                                                    ?.src
                                                                                            )}
                                                                                            alt={
                                                                                                address
                                                                                                    .email_icon
                                                                                                    ?.alt ||
                                                                                                ""
                                                                                            }/>
                                                                                    )}
                                                                                </div>
                                                                                <div className="content__wrap">
                                                                                    <a
                                                                                        href={`mailto:${address?.email}`}
                                                                                    >
                                                                                        {
                                                                                            address?.email
                                                                                        }
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {address?.direction && (
                                                                            <div className="single__item d-flex">
                                                                                <div className="icon__wrap">
                                                                                    {address
                                                                                        ?.location_icon
                                                                                        ?.src && (
                                                                                        <OptimizedImage
                                                                                            className="img-fluid"
                                                                                            src={getImageURL(
                                                                                                address
                                                                                                    ?.location_icon
                                                                                                    ?.src
                                                                                            )}
                                                                                            alt={
                                                                                                address
                                                                                                    ?.location_icon
                                                                                                    ?.alt ||
                                                                                                ""
                                                                                            }/>
                                                                                    )}
                                                                                </div>
                                                                                <div className="content__wrap">
                                                                                    <a
                                                                                        className="primary_text_btn fw-400"
                                                                                        href="#"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html:
                                                                                                address?.direction ||
                                                                                                "Get Direction",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ) : null
                                    )}
                                </Swiper>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <ul
                                        className={`${
                                            activeTab === 0
                                                ? "location__slider_btn"
                                                : "int_location__slider_btn"
                                        } list-unstyled justify-content-center`}
                                    >
                                        <li
                                            className={
                                                (activeTab === 0
                                                    ? "prev-btn-location"
                                                    : "prev-btn-ilocation") +
                                                (isPrevDisabled
                                                    ? " swiper-button-disabled"
                                                    : "")
                                            }
                                        >
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (
                                                        swiperRef.current &&
                                                        !isPrevDisabled
                                                    ) {
                                                        swiperRef.current.slidePrev();
                                                    }
                                                }}
                                                tabIndex={
                                                    isPrevDisabled ? -1 : 0
                                                }
                                                aria-disabled={isPrevDisabled}
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
                                        <li
                                            className={
                                                (activeTab === 0
                                                    ? "next-btn-location"
                                                    : "next-btn-ilocation") +
                                                (isNextDisabled
                                                    ? " swiper-button-disabled"
                                                    : "")
                                            }
                                        >
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (
                                                        swiperRef.current &&
                                                        !isNextDisabled
                                                    ) {
                                                        swiperRef.current.slideNext();
                                                    }
                                                }}
                                                tabIndex={
                                                    isNextDisabled ? -1 : 0
                                                }
                                                aria-disabled={isNextDisabled}
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
