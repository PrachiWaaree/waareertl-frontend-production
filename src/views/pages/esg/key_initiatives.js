"use client";
import { OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const EsgPageKeyInitiatives = ({ data = {}, slug = "our_key" }) => {
    const { title, description, focus_list = [], parent_class } = data || {};

    const hasHeader = !!title || !!description;
    const hasFocusList = Array.isArray(focus_list) && focus_list.length > 0;
    const {
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
        options,
    } = useSwiperSliderOptions({
        clickable: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        modules: [Navigation],
        breakpoints: {
            320: { slidesPerView: 1, slidesPerGroup: 1 },
            600: { slidesPerView: 2, slidesPerGroup: 1 },
            992: { slidesPerView: 3, slidesPerGroup: 1 },
            1200: { slidesPerView: 4, slidesPerGroup: 1 },
        },
    });

    if (!hasHeader && !hasFocusList) return null;

    return (
        <section
            className={`our_key_section${
                parent_class ? ` ${parent_class}` : ""
            }`}
            id={slug}
        >
            <div className="custom-container">
                {hasHeader && (
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-10 col-xxl-8">
                            <div className="section_header text-center">
                                {title && (
                                    <h2
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                )}
                                {description && (
                                    <div className="content__wrap text-center">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {hasFocusList && (
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10">
                            <div className="key_inner_box">
                                <div className="our_key_item_wrapper our_key_item_slider">
                                    <Swiper {...options}>
                                        {focus_list.map((item, idx) => {
                                            const {
                                                icon,
                                                title: itemTitle,
                                                description: itemDesc,
                                            } = item || {};

                                            if (!itemTitle && !itemDesc)
                                                return null;
                                            return (
                                                <SwiperSlide key={idx}>
                                                    <div className="item__wrap">
                                                        <div className="single__item">
                                                            {icon?.src && (
                                                                <div className="img__wrap">
                                                                    <OptimizedImage
                                                                        className="img-fluid"
                                                                        src={getImageURL(
                                                                            icon?.src
                                                                        )}
                                                                        alt={
                                                                            icon?.alt ||
                                                                            ""
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="content_head">
                                                                {itemTitle && (
                                                                    <h3
                                                                        className="heading fs-20 fw-600"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: itemTitle,
                                                                        }}
                                                                    />
                                                                )}
                                                                {itemDesc && (
                                                                    <div
                                                                        className="desc"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: itemDesc,
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </div>
                                <ul className="key__slider_btn list-unstyled justify-content-center">
                                    <li
                                        className={
                                            "prev-btn-key" +
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
                                    <li
                                        className={
                                            "next-btn-key" +
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
                )}
            </div>
        </section>
    );
};
