"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";
import { useState } from "react";
//
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { useCommonContext } from "@/contexts";

export const ProductPageExploreModule = ({
    data = {},
    slug = "explore-modules",
}) => {
    const { title, product_list, parent_class, link } = data;

    const hasTitle = !!title;

    let sliderItems = Array.isArray(product_list) ? product_list : [];
    const hasModuleList = sliderItems.length > 0;
    const showButtons = sliderItems.length > 4;

    const [sliderData, setSliderData] = useState(null);

    const { is480, is768, is992, is1200, isDesktop } = useCommonContext();

    const shouldUseSwiper = is480 || sliderItems.length > 2;

    const {
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
        options,
    } = useSwiperSliderOptions({
        modules: [Navigation],
        clickable: "true",
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,

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
            },
        },
    });

    const renderItem = (item, index) => (
        <div key={index} className="item__wrap">
            <div className="single__item">
                {item?.image?.src && (
                    <div className="img_wrap">
                        <OptimizedImage
                            className="img-fluid"
                            src={getImageURL(item.image.src)}
                            alt={item.image.alt || item.title || ""}/>
                    </div>
                )}
                {(item?.title || item?.one_liner) && (
                    <div className="content_block text-center">
                        <a
                            href={item?.link?.url || "#"}
                            target={
                                item?.link?.open_new_tab === "yes"
                                    ? "_blank"
                                    : "_self"
                            }
                        >
                            {item?.title && (
                                <div className="content_head">
                                    <h3
                                        className="h3 heading fs-28 fw-400"
                                        dangerouslySetInnerHTML={{
                                            __html: item.title,
                                        }}
                                    />
                                </div>
                            )}
                            {item?.one_liner && (
                                <div className="content_wrap fw-500">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: item.one_liner,
                                        }}
                                    />
                                </div>
                            )}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section
            className={`explore__module_section ${parent_class || ""}`}
            id={slug}
        >
            <div className="custom-container">
                {hasTitle && (
                    <div className="row">
                        <div className="col-12">
                            <div className="section_header text-center">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {hasModuleList && (
                    <div className="row">
                        <div className="col-12">
                            {shouldUseSwiper ? (
                                <div className="module__slider swiper">
                                    <div className="swiper-wrapper">
                                        <Swiper {...options}>
                                            {sliderItems?.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    {renderItem(item, index)}
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            ) : (
                                <div className="module__grid">
                                    <div className="row">
                                        {sliderItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`col-12 ${sliderItems.length === 1
                                                        ? "col-md-12"
                                                        : sliderItems.length ===
                                                            2
                                                            ? "col-md-6"
                                                            : "col-md-4 col-lg-3"
                                                    }`}
                                            >
                                                {renderItem(item, index)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {hasModuleList && showButtons && (
                    <div className="row">
                        <div className="col-12">
                            <ul className="module__slider_btn list-unstyled justify-content-center">
                                <li className="prev-btn-module">
                                    <a
                                        href="#!"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            prevSlide();
                                        }}
                                    >
                                        <svg
                                            width="65"
                                            height="65"
                                            viewBox="0 0 65 65"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="-1"
                                                y="1"
                                                width="63"
                                                height="63"
                                                rx="31.5"
                                                transform="matrix(-1 0 0 1 63 0)"
                                                stroke="#0DB02B"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M51.9744 31.0003C52.5265 30.9862 52.9855 31.4223 52.9997 31.9744C53.0138 32.5265 52.5777 32.9855 52.0256 32.9997L51.9744 31.0003ZM12.3112 33.725C11.9108 33.3446 11.8946 32.7117 12.275 32.3113L18.4737 25.7863C18.8541 25.3858 19.4871 25.3696 19.8875 25.75C20.2879 26.1304 20.3041 26.7633 19.9237 27.1638L14.4138 32.9637L20.2137 38.4737C20.6142 38.8541 20.6304 39.4871 20.25 39.8875C19.8696 40.2879 19.2367 40.3041 18.8362 39.9237L12.3112 33.725ZM52 32L52.0256 32.9997L13.0256 33.9997L13 33L12.9744 32.0003L51.9744 31.0003L52 32Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li className="next-btn-module">
                                    <a
                                        href="#!"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            nextSlide();
                                        }}
                                    >
                                        <svg
                                            width="65"
                                            height="65"
                                            viewBox="0 0 65 65"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="1"
                                                y="1"
                                                width="63"
                                                height="63"
                                                rx="31.5"
                                                stroke="#0DB02B"
                                                strokeWidth="2"
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
                )}
            </div>
        </section>
    );
};
