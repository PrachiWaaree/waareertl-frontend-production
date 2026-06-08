"use client";
/* eslint-disable no-unused-vars */

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Controller } from "swiper/modules";
//
import { Button, OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const SolutionDetailPageProjectSection = ({
    data = {},
    slug = "solution_slider",
}) => {
    const { initiatives, description, heading, parent_class } = data;

    const {
        nextSlide,
        prevSlide,
        options: imagesSliderOptions,
    } = useSwiperSliderOptions({
        modules: [EffectCoverflow, Controller],
        effect: "coverflow",
        centeredSlides: true,
        watchSlidesProgress: true,
        // centeredSlidesBounds: true,
        loop: true,
        slidesPerView: "auto",
        grabCursor: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 85,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
        },
        breakpoints: {
            1199: {
                coverflowEffect: {
                    depth: 250,
                    stretch: 85,
                    modifier: 2.5,
                },
            },
            991: {
                slidesPerView: 1,
                coverflowEffect: {
                    depth: 250,
                    stretch: 0,
                    modifier: 1.5,
                },
            },
        },
    });

    return (
        <>
            <section className={`ongoing__section ${parent_class}`} id={slug}>
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

                                <div className="content__wrap text-center">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center ongoing_sliding_row">
                        <div className="col-12 col-md-10 col-lg-10 col-xl-10">
                            <div className="ongoing__wrapper">
                                <div className="ongoing__slider">
                                    <Swiper {...imagesSliderOptions}>
                                        {initiatives?.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="single__item">
                                                    <div className="img__wrap">
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                item?.image?.src
                                                            )}
                                                            alt={
                                                                item?.image?.alt
                                                            }/>
                                                    </div>
                                                    <div className="award__content theme-gradient-1 text-left">
                                                        <div className="onging_list">
                                                            <ul className="d-flex">
                                                                <li className="location_vd d-flex">
                                                                    <span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={
                                                                                18
                                                                            }
                                                                            height={
                                                                                18
                                                                            }
                                                                            viewBox="0 0 18 18"
                                                                            fill="none"
                                                                        >
                                                                            <g clipPath="url(#clip0_6676_2144)">
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    clipRule="evenodd"
                                                                                    d="M9 8.4375C8.06794 8.4375 7.3125 7.68206 7.3125 6.75C7.3125 5.81794 8.06794 5.0625 9 5.0625C9.93206 5.0625 10.6875 5.81794 10.6875 6.75C10.6875 7.68206 9.93206 8.4375 9 8.4375ZM9 3.9375C7.44694 3.9375 6.1875 5.19637 6.1875 6.75C6.1875 8.30363 7.44694 9.5625 9 9.5625C10.5531 9.5625 11.8125 8.30363 11.8125 6.75C11.8125 5.19637 10.5531 3.9375 9 3.9375ZM9 16.3125C8.06456 16.3176 3.375 9.10181 3.375 6.75C3.375 3.64388 5.89331 1.125 9 1.125C12.1067 1.125 14.625 3.64388 14.625 6.75C14.625 9.07031 9.92081 16.3176 9 16.3125ZM9 0C5.27231 0 2.25 3.02231 2.25 6.75C2.25 9.57263 7.87781 18.0062 9 18C10.1048 18.0062 15.75 9.53438 15.75 6.75C15.75 3.02231 12.7277 0 9 0Z"
                                                                                    fill="white"
                                                                                />
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_6676_2144">
                                                                                    <rect
                                                                                        width={
                                                                                            18
                                                                                        }
                                                                                        height={
                                                                                            18
                                                                                        }
                                                                                        fill="white"
                                                                                    />
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                    </span>
                                                                    <div
                                                                        className="fs-16"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item?.location,
                                                                        }}
                                                                    />
                                                                    {/* Mumbai
                                                                    </div> */}
                                                                </li>
                                                                <li className="location_vd d-flex">
                                                                    <span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={
                                                                                22
                                                                            }
                                                                            height={
                                                                                22
                                                                            }
                                                                            viewBox="0 0 22 22"
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                d="M1.22223 10.9998C1.22223 7.54287 1.22223 5.81439 2.36776 4.74044C3.51331 3.6665 5.35702 3.6665 9.04445 3.6665H10.5111C14.1985 3.6665 16.0423 3.6665 17.1878 4.74044C18.3333 5.81439 18.3333 7.54287 18.3333 10.9998C18.3333 14.4568 18.3333 16.1853 17.1878 17.2592C16.0423 18.3332 14.1985 18.3332 10.5111 18.3332H9.04445C5.35702 18.3332 3.51331 18.3332 2.36776 17.2592C1.22223 16.1853 1.22223 14.4568 1.22223 10.9998Z"
                                                                                stroke="white"
                                                                            />
                                                                            <path
                                                                                d="M20.7778 13.4446V8.55566"
                                                                                stroke="white"
                                                                                strokeLinecap="round"
                                                                            />
                                                                            <path
                                                                                d="M10.3016 8.55566L8.55554 11.0001H11L9.25395 13.4446"
                                                                                stroke="white"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                    </span>
                                                                    <div
                                                                        className="fs-16"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item?.capacity,
                                                                        }}
                                                                    />
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <h4
                                                            className="heading fs-20 fw-600 text-white"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.title,
                                                            }}
                                                        />
                                                        <div className="fs-16 fw-400 text-white">
                                                            <p
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item?.description,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <ul className="ongoing__slider_btn">
                                <li
                                    className="prev-btn-ongoing"
                                    onClick={() => {
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
                                            stroke="#0DB02B"
                                            strokeWidth={2}
                                        />
                                        <path
                                            d="M62.9744 42.0003C63.5265 41.9862 63.9855 42.4223 63.9997 42.9744C64.0138 43.5265 63.5777 43.9855 63.0256 43.9997L62.9744 42.0003ZM23.3112 44.725C22.9108 44.3446 22.8946 43.7117 23.275 43.3113L29.4737 36.7863C29.8541 36.3858 30.4871 36.3696 30.8875 36.75C31.2879 37.1304 31.3041 37.7633 30.9237 38.1638L25.4138 43.9637L31.2137 49.4737C31.6142 49.8541 31.6304 50.4871 31.25 50.8875C30.8696 51.2879 30.2367 51.3041 29.8362 50.9237L23.3112 44.725ZM63 43L63.0256 43.9997L24.0256 44.9997L24 44L23.9744 43.0003L62.9744 42.0003L63 43Z"
                                            fill="#0DB02B"
                                        />
                                    </svg>
                                </li>
                                <li
                                    className="next-btn-ongoing"
                                    onClick={nextSlide}
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
                                            strokeWidth={2}
                                        />
                                        <path
                                            d="M24.0256 42.0003C23.4735 41.9862 23.0145 42.4223 23.0003 42.9744C22.9862 43.5265 23.4223 43.9855 23.9744 43.9997L24.0256 42.0003ZM63.6888 44.725C64.0892 44.3446 64.1054 43.7117 63.725 43.3113L57.5263 36.7863C57.1459 36.3858 56.5129 36.3696 56.1125 36.75C55.7121 37.1304 55.6959 37.7633 56.0763 38.1638L61.5862 43.9637L55.7863 49.4737C55.3858 49.8541 55.3696 50.4871 55.75 50.8875C56.1304 51.2879 56.7633 51.3041 57.1638 50.9237L63.6888 44.725ZM24 43L23.9744 43.9997L62.9744 44.9997L63 44L63.0256 43.0003L24.0256 42.0003L24 43Z"
                                            fill="#0DB02B"
                                        />
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
