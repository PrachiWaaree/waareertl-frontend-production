"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCommonContext } from "@/contexts";

export const SolutionDetailPageBenefitSection = ({
    data = {},
    slug = "benefit",
}) => {
    const { title, description, list = [] } = data;

    const { is480, is768, is992, is1200, isDesktop } = useCommonContext();
    const {
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
        options: imagesSliderOptions,
    } = useSwiperSliderOptions({
        clickable: true,
        slidesPerView: 1,
        autoHeight: true,
        spaceBetween: 20,
        modules: [Navigation],
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1025: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        },
    });

    const showSliderButtons = !(isDesktop || is1200);

    return (
        <>
            <section className="core_value solution_detail_core" id={slug}>
                <div className="custom-container">
                    <div className="row">
                        <div className="col-md-12 col-xl-12">
                            <div className="section_header">
                                <h4
                                    className="heading fs-48 fw-300 text-center"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-xl-12">
                            <div className="core_value_slider swiper">
                                <Swiper {...imagesSliderOptions}>
                                    {list.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="item__wrap">
                                                <div className="single__item text-center d-flex">
                                                    <div className="img__wrap">
                                                        <OptimizedImage
                                                            src={getImageURL(
                                                                item?.icon
                                                                    ?.src || ""
                                                            )}
                                                            alt={
                                                                item?.icon
                                                                    ?.alt || ""
                                                            }/>
                                                    </div>
                                                    <div className="content_block">
                                                        <h4
                                                            className="fs-28 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.title,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            {showSliderButtons && (
                                <ul className="core_value_slider_btn list-unstyled justify-content-center d-flex">
                                    <li
                                        className={
                                            "prev-btn-core-value" +
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
                                                width={65}
                                                height={65}
                                                viewBox="0 0 67 65"
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
                                            "next-btn-core-value" +
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
                                                width={65}
                                                height={65}
                                                viewBox="0 0 67 65"
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
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
