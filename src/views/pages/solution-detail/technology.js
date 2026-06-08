"use client";
import { OptimizedImage } from "@/components";

import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const SolutionDetailPageTechnologySection = ({
    data = {},
    slug = "technology",
}) => {
    const { heading, description, list = [] } = data;

    const {
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
        options: imagesSliderOptions,
    } = useSwiperSliderOptions({
        modules: [Navigation, Pagination],
        slidesPerView: 2.5,
        spaceBetween: 20,
        slidesPerGroup: 1,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2.6,
            },
        },
    });

    return (
        <>
            <section className="tech_approach_sec overflow-hidden" id={slug}>
                <div className="custom-container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-12 col-lg-5">
                            <div className="tech_aooroach_col">
                                <div className="tech_approach_left">
                                    <div className="section_header">
                                        <h2
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: heading,
                                            }}
                                        />
                                    </div>
                                    <div className="content__wrap">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="slider_pagination">
                                    <ul className="blog__slider_btn tect_approch_btn list-unstyled justify-content-center">
                                        <li
                                            className={
                                                "prev-btn-tech_approach" +
                                                (!hasPrev
                                                    ? " swiper-button-disabled"
                                                    : "")
                                            }
                                        >
                                            <a
                                                href="#!"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    prevSlide();
                                                }}
                                                style={{
                                                    ...(!hasPrev && {
                                                        filter: "saturate(0)",
                                                        opacity: 0.5,
                                                    }),
                                                }}
                                            >
                                                <svg
                                                    width={56}
                                                    height={56}
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
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                "next-btn-tech_approach" +
                                                (!hasNext
                                                    ? " swiper-button-disabled"
                                                    : "")
                                            }
                                        >
                                            <a
                                                href="#!"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    nextSlide();
                                                }}
                                                style={{
                                                    ...(!hasNext && {
                                                        filter: "saturate(0)",
                                                        opacity: 0.5,
                                                    }),
                                                }}
                                            >
                                                <svg
                                                    width={56}
                                                    height={56}
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
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-7">
                            <div className="tech_approach_right">
                                <Swiper
                                    {...imagesSliderOptions}
                                    className="tech_approach_slider"
                                >
                                    {list?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="tech_approach_col">
                                                <div className="tech_approach_img">
                                                    <OptimizedImage
                                                        src={getImageURL(
                                                            item?.image?.src ||
                                                                "",
                                                        )}
                                                        alt={
                                                            item?.image?.alt ||
                                                            item?.title ||
                                                            ""
                                                        }/>
                                                </div>
                                                <div className="tech_approach_cnt theme-gradient-1 text-center">
                                                    <h4
                                                        className="heading fs-28 fw-600 text-white"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.title,
                                                        }}
                                                    />
                                                    <div className="text-white">
                                                        <div
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
                                {/* <div className="swiper-pagination" /> */}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
