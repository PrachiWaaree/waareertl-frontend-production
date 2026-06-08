"use client";
/* eslint-disable @next/next/no-img-element */

import { Swiper, SwiperSlide } from "swiper/react";
//
import { Button } from "@/components";
import { useCommonContext } from "@/contexts";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const BlogDetailRelatedSection = ({
    data = {},
    slug = "related_blogs",
}) => {
    const { title, short_description, reference_by_blog } = data || {};
    const { list } = reference_by_blog || {};

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

    const { sliderButtons, nextSlide, prevSlide, options } =
        useSwiperSliderOptions({
            clickable: "true",
            slidesPerView: 1,
            // loop: true,
            navigation: {
                prevEl: ".prev-btn-related",
                nextEl: ".next-btn-related",
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
                    spaceBetween: 40,
                },
            },
        });

    return (
        list?.length !== 0 && (
            <section
                className="upcoming_webinars_section related_blog_new_section"
                id={slug}
            >
                <div className="custom-container">
                    <div className="row justify-content-center top__row">
                        <div className="col-12 col-lg-11 col-xl-9">
                            <div className="section_header text-center">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                            {!!short_description && (
                                <div className="content__wrap text-center">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: short_description,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="custom-container-fluid">
                    <div className="upcoming_webinars_inner">
                        <div className="related_blog_slider swiper">
                            <Swiper className="item__wrap" {...options}>
                                {list?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="single__item">
                                            <div className="img__wrap">
                                                <img loading="lazy"
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        item?.template_fields
                                                            ?.feature_image
                                                            ?.src ||
                                                            "/upload/media/resources_1_1748408224.png"
                                                    )}
                                                    alt={
                                                        item?.template_fields
                                                            ?.feature_image?.alt
                                                    }
                                                />
                                            </div>
                                            <div className="content_block">
                                                <div className="top__block">
                                                    <ul className="h5 heading fs-20 fw-600 list-unstyled">
                                                        <li className="text-gradient">
                                                            Blog
                                                        </li>

                                                        {item?.tag_data
                                                            ?.category?.length >
                                                            0 && (
                                                            <li
                                                                className="text-gradient"
                                                                key={
                                                                    item
                                                                        .tag_data
                                                                        .category[0]
                                                                        ?.id
                                                                }
                                                            >
                                                                {
                                                                    item
                                                                        .tag_data
                                                                        .category[0]
                                                                        ?.name
                                                                }
                                                            </li>
                                                        )}
                                                    </ul>

                                                    <div
                                                        className="publish__date"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.publish_date,
                                                        }}
                                                    />
                                                </div>

                                                <div className="content__wrap">
                                                    <h4
                                                        className="heading fw-600 fs-20"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.name,
                                                        }}
                                                    />
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: item
                                                                ?.template_fields
                                                                ?.short_description,
                                                        }}
                                                    />
                                                </div>
                                                <div className="btn-group">
                                                    <Button
                                                        href={item?.slug}
                                                        label={
                                                            item
                                                                ?.template_fields
                                                                ?.button
                                                                ?.title ||
                                                            "read more"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {list?.length > slidesToShow && (
                            <div className="row">
                                <div className="col-12">
                                    <ul className="webinar__slider_btn list-unstyled justify-content-center">
                                        <li
                                            className={`prev-btn-blog slick-arrow ${
                                                sliderButtons?.hasPrev
                                                    ? ""
                                                    : "disabled"
                                            }`}
                                        >
                                            <a
                                                href="#"
                                                aria-label="Previous Slide"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    prevSlide();
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
                                            className={`next-btn-blog slick-arrow ${
                                                sliderButtons?.hasNext
                                                    ? ""
                                                    : "disabled"
                                            }`}
                                        >
                                            <a
                                                href="#"
                                                aria-label="Next Slide"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    nextSlide();
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
                        )}
                    </div>
                </div>
            </section>
        )
    );
};
