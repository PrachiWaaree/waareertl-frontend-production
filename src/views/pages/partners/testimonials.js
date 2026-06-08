"use client";

import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export const PartnerPagetestimonials = ({
    data = {},
    slug = "testimonials",
}) => {
    const { heading, testimonial_slider } = data || {};

    const videoRefs = useRef([]);
    const [playingIndex, setPlayingIndex] = useState(null);

    const { options } = useSwiperSliderOptions({
        clickable: true,
        slidesPerView: 1,
        spaceBetween: 16,
        modules: [Navigation],
        loop: true,
        navigation: {
            prevEl: ".prev-btn-partner-testimonial",
            nextEl: ".next-btn-partner-testimonial",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            600: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 1,
            },
            1200: {
                slidesPerView: 1,
            },
        },
    });

    const handleVideoClick = (idx) => {
        const ref = videoRefs.current[idx];
        if (!ref) return;
        if (playingIndex !== idx) {
            if (playingIndex !== null && videoRefs.current[playingIndex]) {
                videoRefs.current[playingIndex].pause();
            }
            ref.play();
            setPlayingIndex(idx);
        } else {
            ref.pause();
            setPlayingIndex(null);
        }
    };

    const handleEnded = () => {
        setPlayingIndex(null);
    };

    const handlePlay = (idx) => {
        setPlayingIndex(idx);
    };

    const handlePause = (idx) => {
        if (playingIndex === idx) {
            setPlayingIndex(null);
        }
    };

    if (
        !heading ||
        !Array.isArray(testimonial_slider) ||
        testimonial_slider.length === 0
    ) {
        return null;
    }

    return (
        <section className="partnership_testimonial_sec" id={slug}>
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-10">
                        <div className="section_header">
                            <h3
                                className="heading text-center fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: heading,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="partnership_wrapper_inr">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12 col-lg-10 col-xl-10">
                            <div className="partnership_testimonial_slider swiper">
                                <Swiper {...options}>
                                    {testimonial_slider.map((item, idx) => {
                                        const {
                                            image,
                                            video,
                                            description,
                                            name,
                                            designation,
                                        } = item || {};

                                        return (
                                            <SwiperSlide key={idx}>
                                                <div className="service_enquiry partnership_testimonial_inner d-flex">
                                                    <div className="trusted__video">
                                                        <div className="video__area">
                                                            <div
                                                                className="video__container"
                                                                style={{
                                                                    position:
                                                                        "relative",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() =>
                                                                    handleVideoClick(
                                                                        idx
                                                                    )
                                                                }
                                                            >
                                                                <div className="video__overlay" />
                                                                <video
                                                                    ref={(el) =>
                                                                        (videoRefs.current[
                                                                            idx
                                                                        ] = el)
                                                                    }
                                                                    id={`video-trusted-${idx}`}
                                                                    muted
                                                                    playsInline
                                                                    poster={
                                                                        image?.src
                                                                            ? getImageURL(
                                                                                  image?.src
                                                                              )
                                                                            : undefined
                                                                    }
                                                                    width="100%"
                                                                    height="auto"
                                                                    onEnded={
                                                                        handleEnded
                                                                    }
                                                                    controls={
                                                                        false
                                                                    }
                                                                    onPlay={() =>
                                                                        handlePlay(
                                                                            idx
                                                                        )
                                                                    }
                                                                    onPause={() =>
                                                                        handlePause(
                                                                            idx
                                                                        )
                                                                    }
                                                                >
                                                                    {video?.src && (
                                                                        <source
                                                                            src={getImageURL(
                                                                                video?.src
                                                                            )}
                                                                            type="video/mp4"
                                                                        />
                                                                    )}
                                                                    Your browser
                                                                    does not
                                                                    support the
                                                                    video tag.
                                                                </video>
                                                                {!!video?.src &&
                                                                    playingIndex !==
                                                                        idx && (
                                                                        <a
                                                                            type="button"
                                                                            className="play__btn_wrap"
                                                                            aria-label="Play Video"
                                                                            href="#!"
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.preventDefault();
                                                                                handleVideoClick(
                                                                                    idx
                                                                                );
                                                                            }}
                                                                        >
                                                                            <svg
                                                                                width={
                                                                                    138
                                                                                }
                                                                                height={
                                                                                    138
                                                                                }
                                                                                viewBox="0 0 138 138"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <circle
                                                                                    opacity="0.25"
                                                                                    cx={
                                                                                        69
                                                                                    }
                                                                                    cy={
                                                                                        69
                                                                                    }
                                                                                    r={
                                                                                        69
                                                                                    }
                                                                                    fill="white"
                                                                                />
                                                                                <circle
                                                                                    opacity="0.5"
                                                                                    cx={
                                                                                        69
                                                                                    }
                                                                                    cy={
                                                                                        69
                                                                                    }
                                                                                    r={
                                                                                        49
                                                                                    }
                                                                                    fill="white"
                                                                                />
                                                                                <circle
                                                                                    cx={
                                                                                        69
                                                                                    }
                                                                                    cy={
                                                                                        69
                                                                                    }
                                                                                    r={
                                                                                        28
                                                                                    }
                                                                                    fill="white"
                                                                                />
                                                                                <path
                                                                                    d="M84 69L60.75 81.9904L60.75 56.0096L84 69Z"
                                                                                    fill="#0DB02B"
                                                                                />
                                                                            </svg>
                                                                        </a>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="single__item">
                                                        <div className="content__wrap fs-16 fw-400">
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        description ||
                                                                        "",
                                                                }}
                                                            />
                                                        </div>
                                                        {name && (
                                                            <h5
                                                                className="heading fs-20 fw-600 text-gradient"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: name,
                                                                }}
                                                            />
                                                        )}
                                                        {designation && (
                                                            <div
                                                                className="fs-18 fw-500"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: designation,
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <ul className="partner__testimonial__slider_btn list-unstyled justify-content-center">
                        <li
                            className="prev-btn-partner-testimonial swiper-button-disabled"
                            tabIndex={-1}
                            role="button"
                            aria-label="Previous slide"
                            aria-controls="swiper-wrapper-fe66096f4b3ef10d"
                            aria-disabled="true"
                        >
                            <a href="javascript:void(0);">
                                <svg
                                    width={87}
                                    height={87}
                                    viewBox="0 0 87 87"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x={-0.896552}
                                        y={0.896552}
                                        width={76.2069}
                                        height={76.2069}
                                        rx="38.1034"
                                        transform="matrix(-1 0 0 1 80.7069 4.5)"
                                        stroke="#5B5B5B"
                                        strokeWidth={1.7931}
                                    />
                                    <path
                                        d="M60.9824 43.0517C61.4776 43.0517 61.879 43.4531 61.879 43.9482C61.879 44.4434 61.4776 44.8448 60.9824 44.8448V43.9482V43.0517ZM25.3715 44.5822C25.0213 44.2321 25.0213 43.6644 25.3715 43.3143L31.0771 37.6087C31.4272 37.2585 31.9949 37.2585 32.345 37.6087C32.6951 37.9588 32.6951 38.5265 32.345 38.8766L27.2733 43.9482L32.345 49.0199C32.6951 49.37 32.6951 49.9377 32.345 50.2878C31.9949 50.6379 31.4272 50.6379 31.0771 50.2878L25.3715 44.5822ZM60.9824 43.9482V44.8448H26.0054V43.9482V43.0517H60.9824V43.9482Z"
                                        fill="#5B5B5B"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li
                            className="next-btn-partner-testimonial"
                            tabIndex={0}
                            role="button"
                            aria-label="Next slide"
                            aria-controls="swiper-wrapper-fe66096f4b3ef10d"
                            aria-disabled="false"
                        >
                            <a href="javascript:void(0);">
                                <svg
                                    width={87}
                                    height={87}
                                    viewBox="0 0 87 87"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x={5.39655}
                                        y={5.39655}
                                        width={76.2069}
                                        height={76.2069}
                                        rx="38.1034"
                                        stroke="#0DB02B"
                                        strokeWidth={1.7931}
                                    />
                                    <path
                                        d="M26.0176 43.0517C25.5224 43.0517 25.121 43.4531 25.121 43.9482C25.121 44.4434 25.5224 44.8448 26.0176 44.8448V43.9482V43.0517ZM61.6285 44.5822C61.9787 44.2321 61.9787 43.6644 61.6285 43.3143L55.9229 37.6087C55.5728 37.2585 55.0051 37.2585 54.655 37.6087C54.3049 37.9588 54.3049 38.5265 54.655 38.8766L59.7267 43.9482L54.655 49.0199C54.3049 49.37 54.3049 49.9377 54.655 50.2878C55.0051 50.6379 55.5728 50.6379 55.9229 50.2878L61.6285 44.5822ZM26.0176 43.9482V44.8448H60.9946V43.9482V43.0517H26.0176V43.9482Z"
                                        fill="#0DB02B"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
