"use client";
/* eslint-disable jsx-a11y/role-supports-aria-props, no-unused-vars */

import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
//
import { OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { useMemo } from "react";

export const EventPageUpcomingSection = ({
    data = {},
    slug = "upcoming_events",
}) => {
    const { title, upcoming_webinars } = data || {};

    const filteredUpcoming = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return (upcoming_webinars || []).filter((item) => {
            const publishDate = new Date(item?.publish_date);
            publishDate.setHours(0, 0, 0, 0);

            return publishDate >= today;
        });
    }, [upcoming_webinars]);

    const { sliderButtons, nextSlide, prevSlide, options } =
        useSwiperSliderOptions({
            loop: true,
            clickable: "true",
            slidesPerView: 3,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            },
        });

    if (
        !data ||
        (!data.title &&
            (!data.upcoming_webinars || data.upcoming_webinars.length === 0))
    ) {
        return null;
    }

    return (
        <section className="upcoming_webinars_section" id={slug}>
            <div className="custom-container">
                <div className="row justify-content-center  ">
                    <div className="col-12 col-lg-10 col-xl-10">
                        <div className="event_listing_inner">
                            <div className="section_header">
                                <h3
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                        </div>
                        <div className="upcoming_webinars_inner">
                            <Swiper
                                className="upcoming_webinars_slider"
                                {...options}
                            >
                                {filteredUpcoming?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="single__item">
                                            <div className="img__wrap">
                                                <OptimizedImage
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        item?.template_fields
                                                            ?.image?.src
                                                    )}
                                                    alt={
                                                        item?.template_fields
                                                            ?.image?.alt
                                                    }
                                                />
                                            </div>
                                            <div className="content_block">
                                                <div className="d-flex date_time">
                                                    <span
                                                        className="publish__date"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.publish_date,
                                                        }}
                                                    />

                                                    <span
                                                        className="publish__date"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.publish_time,
                                                        }}
                                                    />
                                                </div>
                                                <div className="content__wrap">
                                                    <h4
                                                        className="heading fs-20 fw-600 fs-20"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.name,
                                                        }}
                                                    />
                                                </div>
                                                <div className="speaker_name_wrap">
                                                    Speaker Name:{" "}
                                                    <span
                                                        className="speaker_name text-gradient fw-700"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item
                                                                ?.template_fields
                                                                ?.speaker_name,
                                                        }}
                                                    />
                                                </div>
                                                {/* <div className="btn-group">
                                                    <Button
                                                        key={index}
                                                        href={item?.slug}
                                                        label={
                                                            item
                                                                ?.template_fields
                                                                ?.cta_button
                                                                ?.title ||
                                                            "Read more"
                                                        }
                                                    />
                                                </div> */}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="row">
                                <div className="col-12">
                                    <ul className="webinar__slider_btn list-unstyled justify-content-center">
                                        <li
                                            className={`prev-btn-blog slick-arrow ${
                                                sliderButtons?.hasPrev
                                                    ? ""
                                                    : "slick-disabled "
                                            }`}
                                            aria-disabled="true"
                                            style={{}}
                                            onClick={prevSlide}
                                        >
                                            <a href="#!" aria-label="Previous Slide">
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
                                                    : "slick-disabled"
                                            }`}
                                            aria-disabled="false"
                                            style={{}}
                                            onClick={nextSlide}
                                        >
                                            <a href="#!" aria-label="Next Slide">
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
                </div>
            </div>
        </section>
    );
};
