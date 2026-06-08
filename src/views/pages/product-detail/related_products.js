"use client";
/* eslint-disable no-unused-vars */

import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Button, OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const ProductPagerelatedProducts = ({ data = {} }) => {
    const {
        title = "Related Products",
        description = "",
        button = {},
        related_products = [],
    } = data;

    // For slider control
    const [firstSlider, setFirstSlider] = useState(null);
    const [secondSlider, setSecondSlider] = useState(null);

    // Main (large) slider options
    const { nextSlide, prevSlide, options } = useSwiperSliderOptions({
        slidesPerView: "auto",
        noSwiping: false,
        onSwiper: setFirstSlider,
        controller: {
            control: secondSlider,
        },
        modules: [Controller],
        loop: true,
        noSwipingClass: "img_wrap",
    });

    // Small (nav) slider options
    const { options: secondSliderOptions } = useSwiperSliderOptions({
        slidesPerView: 2,
        initialSlide: 1,
        loop: true,
        modules: [Controller],
        onSwiper: setSecondSlider,
        controller: {
            control: firstSlider,
        },
        spaceBetween: "12px",
        breakpoints: {
            991: {
                slidesPerView: 1,
            },
            1200: {
                slidesPerView: 2,
            },
        },
    });

    // Helper for product URL
    const getProductUrl = (slug) => {
        if (!slug) return "#";
        return `/product/${slug}`;
    };

    // Button link
    const getButtonHref = (btn) => {
        if (!btn) return "#";
        if (btn.url_type === "external") return btn.url || "#";
        if (btn.url_type === "internal") return `/${btn.url || ""}`;
        return btn.url || "#";
    };

    // Button target
    const getButtonTarget = (btn) => {
        if (!btn) return undefined;
        return btn.open_new_tab === "yes" ? "_blank" : undefined;
    };

    return (
        <section className="product__section detail_related_product">
            <div className="custom-container">
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                        <div className="product__data">
                            <h3
                                className="h3 heading fs-36 fw-500"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                            <div className="content_wrap">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                            {button?.title && (
                                <div className="btn-group">
                                    <Button
                                        label={button?.title}
                                        href={getButtonHref(button)}
                                        target={getButtonTarget(button)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-7 col-lg-8 col-xl-9">
                        <div className="product__slider_wrap row">
                            <div className="col-12 col-md-12 col-lg-7 col-xl-6">
                                <div className="row">
                                    <div className="col-12 col-md-2 col-lg-2">
                                        <div className="slider__btn_col">
                                            <div className="slider__btn_wrapper">
                                                <ul className="product__slider_btn">
                                                    <li className="prev-btn-product prev-btn-product-1">
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                prevSlide();
                                                            }}
                                                        >
                                                            <svg
                                                                width={87}
                                                                height={87}
                                                                viewBox="0 0 87 87"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <rect
                                                                    x={-1}
                                                                    y={1}
                                                                    width={85}
                                                                    height={85}
                                                                    rx="42.5"
                                                                    transform="matrix(-1 0 0 1 85 0)"
                                                                    stroke="currentColor"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                />
                                                                <path
                                                                    d="M62.9744 42.0003C63.5265 41.9862 63.9855 42.4223 63.9997 42.9744C64.0138 43.5265 63.5777 43.9855 63.0256 43.9997L62.9744 42.0003ZM23.3112 44.725C22.9108 44.3446 22.8946 43.7117 23.275 43.3113L29.4737 36.7863C29.8541 36.3858 30.4871 36.3696 30.8875 36.75C31.2879 37.1304 31.3041 37.7633 30.9237 38.1638L25.4138 43.9637L31.2137 49.4737C31.6142 49.8541 31.6304 50.4871 31.25 50.8875C30.8696 51.2879 30.2367 51.3041 29.8362 50.9237L23.3112 44.725ZM63 43L63.0256 43.9997L24.0256 44.9997L24 44L23.9744 43.0003L62.9744 42.0003L63 43Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li className="next-btn-product next-btn-product-1">
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                nextSlide();
                                                            }}
                                                        >
                                                            <svg
                                                                width={87}
                                                                height={87}
                                                                viewBox="0 0 87 87"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <rect
                                                                    x={1}
                                                                    y={1}
                                                                    width={85}
                                                                    height={85}
                                                                    rx="42.5"
                                                                    stroke="#0DB02B"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                />
                                                                <path
                                                                    d="M24.0256 42.0003C23.4735 41.9862 23.0145 42.4223 23.0003 42.9744C22.9862 43.5265 23.4223 43.9855 23.9744 43.9997L24.0256 42.0003ZM63.6888 44.725C64.0892 44.3446 64.1054 43.7117 63.725 43.3113L57.5263 36.7863C57.1459 36.3858 56.5129 36.3696 56.1125 36.75C55.7121 37.1304 55.6959 37.7633 56.0763 38.1638L61.5862 43.9637L55.7863 49.4737C55.3858 49.8541 55.3696 50.4871 55.75 50.8875C56.1304 51.2879 56.7633 51.3041 57.1638 50.9237L63.6888 44.725ZM24 43L23.9744 43.9997L62.9744 44.9997L63 44L63.0256 43.0003L24.0256 42.0003L24 43Z"
                                                                    fill="#0DB02B"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-10 col-lg-10 slider__left">
                                        <Swiper {...options}>
                                            {related_products?.map(
                                                (item, idx) => (
                                                    <SwiperSlide
                                                        key={item.id || idx}
                                                    >
                                                        <div className="product__slider_for product__slider_for_1">
                                                            <div className="item__wrap">
                                                                <div className="single__item">
                                                                    <div className="img_wrap">
                                                                        <div className="product__img_slider product__img_slider_1">
                                                                            <OptimizedImage
                                                                                className="img-fluid"
                                                                                src={getImageURL(
                                                                                    item
                                                                                        ?.template_fields
                                                                                        ?.thumbnail_image
                                                                                        ?.src ||
                                                                                        item
                                                                                            ?.template_fields
                                                                                            ?.product_image
                                                                                            ?.src
                                                                                )}
                                                                                alt={
                                                                                    item
                                                                                        ?.template_fields
                                                                                        ?.thumbnail_image
                                                                                        ?.alt ||
                                                                                    item
                                                                                        ?.template_fields
                                                                                        ?.product_image
                                                                                        ?.alt ||
                                                                                    item?.name
                                                                                }/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content_block text-center">
                                                                        <div className="content_head">
                                                                            <h3 className="h3 heading fs-36 fw-500 text-white">
                                                                                {
                                                                                    item?.name
                                                                                }
                                                                            </h3>
                                                                        </div>
                                                                        <div className="content_wrap fw-500 text-white">
                                                                            <p>
                                                                                {item
                                                                                    ?.template_fields
                                                                                    ?.description ||
                                                                                    item
                                                                                        ?.meta
                                                                                        ?.description}
                                                                            </p>
                                                                        </div>
                                                                        {item
                                                                            ?.template_fields
                                                                            ?.button
                                                                            ?.title && (
                                                                            <Button
                                                                                label={
                                                                                    item
                                                                                        .template_fields
                                                                                        .button
                                                                                        .title
                                                                                }
                                                                                href={getButtonHref(
                                                                                    item
                                                                                        .template_fields
                                                                                        .button
                                                                                )}
                                                                                target={getButtonTarget(
                                                                                    item
                                                                                        .template_fields
                                                                                        .button
                                                                                )}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            )}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-5 col-xl-6 slider__right">
                                <div className="product__slider_nav product__slider_nav_1">
                                    <Swiper {...secondSliderOptions}>
                                        {related_products?.map((item, idx) => (
                                            <SwiperSlide key={item.id || idx}>
                                                <div className="item__wrap">
                                                    <div className="single__item">
                                                        <div className="img_wrap">
                                                            <OptimizedImage
                                                                className="img-fluid"
                                                                src={getImageURL(
                                                                    item
                                                                        ?.template_fields
                                                                        ?.product_image
                                                                        ?.src ||
                                                                        item
                                                                            ?.template_fields
                                                                            ?.thumbnail_image
                                                                            ?.src
                                                                )}
                                                                alt={
                                                                    item
                                                                        ?.template_fields
                                                                        ?.product_image
                                                                        ?.alt ||
                                                                    item
                                                                        ?.template_fields
                                                                        ?.thumbnail_image
                                                                        ?.alt ||
                                                                    item?.name
                                                                }/>
                                                        </div>
                                                        <div className="content_block text-center">
                                                            <div className="content_head">
                                                                <h3 className="h3 heading fs-28 fw-500">
                                                                    {item?.name}
                                                                </h3>
                                                            </div>
                                                            <div className="content_wrap fw-500">
                                                                <p>
                                                                    {item
                                                                        ?.template_fields
                                                                        ?.description ||
                                                                        item
                                                                            ?.meta
                                                                            ?.description}
                                                                </p>
                                                            </div>
                                                            {item
                                                                ?.template_fields
                                                                ?.button
                                                                ?.title && (
                                                                <Button
                                                                    label={
                                                                        item
                                                                            .template_fields
                                                                            .button
                                                                            .title
                                                                    }
                                                                    href={getButtonHref(
                                                                        item
                                                                            .template_fields
                                                                            .button
                                                                    )}
                                                                    target={getButtonTarget(
                                                                        item
                                                                            .template_fields
                                                                            .button
                                                                    )}
                                                                />
                                                            )}
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
            </div>
        </section>
    );
};
