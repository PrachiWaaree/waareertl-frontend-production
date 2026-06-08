"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const HomePageSuccessStories = ({
    data = {},
    slug = "success_stories",
}) => {
    const { story_list, heading } = data || {};

    const hasHeading = typeof heading === "string" && heading.trim().length > 0;
    const hasStories =
        Array.isArray(story_list) &&
        story_list.length > 0 &&
        story_list.some(
            (story) =>
                story &&
                typeof story.description === "string" &&
                story.description.trim().length > 0 &&
                typeof story.name_designation === "string" &&
                story.name_designation.trim().length > 0
        );

    const { options } =
        useSwiperSliderOptions({
            slidesPerView: 1,
            modules: [Navigation],
            clickable: "true",
            loop: true,
            navigation: {
                prevEl: ".prev-btn-content",
                nextEl: ".next-btn-content",
            },
            breakpoints: {
                260: {
                    slidesPerView: 1,
                    centeredSlides: true,
                    spaceBetween: 20,
                },
                600: {
                    centeredSlides: false,
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                767: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
            },
        });

    if (!hasHeading || !hasStories) {
        return null;
    }

    return (
        <>
            <section className="success_stories_section" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <div className="section_header text-center">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <div className="pc__slider_wrapper">
                                <Swiper
                                    {...options}
                                    className="success_stories_slider"
                                >
                                    {story_list.map((story, idx) => {
                                        if (
                                            !story ||
                                            typeof story.description !==
                                                "string" ||
                                            !story.description.trim() ||
                                            typeof story.name_designation !==
                                                "string" ||
                                            !story.name_designation.trim()
                                        ) {
                                            return null;
                                        }
                                        return (
                                            <SwiperSlide key={idx}>
                                                <div className="single__item text-center">
                                                    <div className="quote__img">
                                                        {story?.icon &&
                                                        story?.icon?.src ? (
                                                            <OptimizedImage
                                                                className="img-fluid"
                                                                src={getImageURL(
                                                                    story?.icon
                                                                        .src
                                                                )}
                                                                alt={
                                                                    story?.icon
                                                                        ?.alt ||
                                                                    ""
                                                                }
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <div className="content__wrap">
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: story.description,
                                                            }}
                                                        />
                                                    </div>
                                                    <h5 className="people_name fs-28 fw-600">
                                                        <span
                                                            className="text-gradient"
                                                            dangerouslySetInnerHTML={{
                                                                __html: story?.name_designation,
                                                            }}
                                                        />
                                                    </h5>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                                <ul className="pc__slider_btn list-unstyled justify-content-center">
                                    <li className="prev-btn-content">
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            aria-label="Previous Slide"
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
                                                stroke="currentColor"
                                                strokeWidth={1.875}
                                            />
                                             <path
                                                d="M50.8125 33C51.3303 33 51.75 33.4197 51.75 33.9375C51.75 34.4553 51.3303 34.875 50.8125 34.875V33.9375V33ZM13.5751 34.6004C13.209 34.2343 13.209 33.6407 13.5751 33.2746L19.5413 27.3084C19.9074 26.9423 20.501 26.9423 20.8671 27.3084C21.2332 27.6745 21.2332 28.2681 20.8671 28.6342L15.5638 33.9375L20.8671 39.2408C21.2332 39.6069 21.2332 40.2005 20.8671 40.5666C20.501 40.9327 19.9074 40.9327 19.5413 40.5666L13.5751 34.6004ZM50.8125 33.9375V34.875H14.238V33.9375V33H50.8125V33.9375Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        </a>
                                    </li>
                                    <li className="next-btn-content">
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            aria-label="Next Slide"
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
                                                stroke="currentColor"
                                                strokeWidth={1.875}
                                            />
                                            <path
                                                d="M14.25 33C13.7322 33 13.3125 33.4197 13.3125 33.9375C13.3125 34.4553 13.7322 34.875 14.25 34.875V33.9375V33ZM51.4874 34.6004C51.8535 34.2343 51.8535 33.6407 51.4874 33.2746L45.5212 27.3084C45.1551 26.9423 44.5615 26.9423 44.1954 27.3084C43.8293 27.6745 43.8293 28.2681 44.1954 28.6342L49.4987 33.9375L44.1954 39.2408C43.8293 39.6069 43.8293 40.2005 44.1954 40.5666C44.5615 40.9327 45.1551 40.9327 45.5212 40.5666L51.4874 34.6004ZM14.25 33.9375V34.875H50.8245V33.9375V33H14.25V33.9375Z"
                                                fill="currentColor"
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
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-12 col-xl-12">
                        <div className="line_bg"></div>
                    </div>
                </div>
            </div>
        </>
    );
};
