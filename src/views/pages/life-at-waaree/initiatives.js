"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";
import { EffectCoverflow, Navigation } from "swiper/modules";

const sliderOptions = {
    modules: [EffectCoverflow, Navigation],
    effect: "coverflow",
    centeredSlides: true,
    watchSlidesProgress: true,
    loop: true,
    grabCursor: true,
    slidesPerView: "auto",
    breakpoints: {
        1200: {
            slidesPerView: 4,
        },
    },
    coverflowEffect: {
        rotate: 0,
        stretch: 10,
        depth: 120,
        modifier: 2.5,
        slideShadows: false,
    },
    className: "initiate__slider",
};

export const LifeAtWaareeHrInitiatives = ({
    data = {},
    slug = "hr-initiative",
}) => {
    const { title, hr_details = [] } = data || {};

    const sliderRef = useRef(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!title && (!hr_details || hr_details.length === 0)) {
        return null;
    }

    const goPrev = () => {
        if (mainSwiper) mainSwiper.slidePrev();
    };
    const goNext = () => {
        if (mainSwiper) mainSwiper.slideNext();
    };

    const swiperOptions = {
        ...sliderOptions,
        onSwiper: (swiper) => setMainSwiper(swiper),
        onSlideChange: (swiper) => {
            setActiveIndex(swiper.realIndex);
        },
    };

    return (
        <>
            {(!!title || (hr_details && hr_details.length > 0)) && (
                <section className="hr__initiative_section" id={slug}>
                    <div className="custom-container">
                        {!!title && (
                            <div className="row">
                                <div className="col-12">
                                    <div className="section_header">
                                        <h4
                                            className="heading fs-48 fw-300 text-center"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {hr_details && hr_details.length > 0 && (
                            <div className="row">
                                <div className="col-12">
                                    <div className="row justify-content-center relative_btn">
                                        <div className="col-12 col-xl-10">
                                            <div className="item__wrapper">
                                                <Swiper
                                                    {...swiperOptions}
                                                    ref={sliderRef}
                                                >
                                                    {hr_details.map(
                                                        (item, idx) => (
                                                            <SwiperSlide
                                                                key={idx}
                                                            >
                                                                <div className="item__wrap">
                                                                    <div className="single__item">
                                                                        <div className="img__wrap">
                                                                            <OptimizedImage
                                                                                className="img-fluid"
                                                                                src={getImageURL(
                                                                                    item
                                                                                        .image
                                                                                        ?.src
                                                                                )}
                                                                                alt={
                                                                                    item
                                                                                        .image
                                                                                        ?.alt ||
                                                                                    item.title ||
                                                                                    ""
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        )
                                                    )}
                                                </Swiper>
                                                {hr_details[activeIndex] &&
                                                    (hr_details[activeIndex]
                                                        .title ||
                                                        hr_details[activeIndex]
                                                            .subtitle) && (
                                                        <div className="initiate_bottom_cnt">
                                                            <div className="initiate__content_slider">
                                                                <div className="swiper-wrapper">
                                                                    <div className="swiper-slide">
                                                                        <div className="single__item">
                                                                            <div className="content__area">
                                                                                {hr_details[
                                                                                    activeIndex
                                                                                ]
                                                                                    .title && (
                                                                                    <h5 className="heading fs-28 fw-400">
                                                                                        {
                                                                                            hr_details[
                                                                                                activeIndex
                                                                                            ]
                                                                                                .title
                                                                                        }
                                                                                    </h5>
                                                                                )}
                                                                                {hr_details[
                                                                                    activeIndex
                                                                                ]
                                                                                    .subtitle && (
                                                                                    <div className="content__wrap">
                                                                                        <p>
                                                                                            {
                                                                                                hr_details[
                                                                                                    activeIndex
                                                                                                ]
                                                                                                    .subtitle
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                            <ul className="hr_initiative_btn initiative__slider_btn list-unstyled justify-content-center">
                                                <li className="prev-btn-initiative">
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            goPrev();
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
                                                    </a>
                                                </li>
                                                <li className="next-btn-initiative">
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            goNext();
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
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};
