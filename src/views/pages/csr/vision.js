"use client";
import { OptimizedImage } from "@/components";
import { useState } from "react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Swiper, SwiperSlide } from "swiper/react";

export const CsrPageVision = ({ data = {}, slug="csr_vision" }) => {
    const { title = "", vision_slider = [] } = data;
    const [activeTab, setActiveTab] = useState(0);

    const {
        prevSlide: prevCategorySlide,
        nextSlide: nextCategorySlide,
        options: tabSliderOptions,
    } = useSwiperSliderOptions({
        slidesPerView: vision_slider.length > 5 ? 5 : vision_slider.length,
        allowTouchMove: true,
        centeredSlides: false,
        slideToClickedSlide: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                allowTouchMove: true,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView:
                    vision_slider.length > 5 ? 5 : vision_slider.length,
            },
        },
    });

    const renderCircleDecorations = () => {
        const maxCircles = Math.min(1, vision_slider?.length || 0);
        return Array.from({ length: maxCircles }, (_, index) => (
            <div key={index} className={`tab_circle_3 circle__wrapper`}>
                <div className="circle-1" />
                <div className="circle-2 theme-gradient-1" />
            </div>
        ));
    };

    return (
        <>
            <section className="team__section csr_our_vision_sec" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-12 col-xl-10">
                            <div className="section_header text-center">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="item__tab_wrapper">
                                <div className="custom-container ">
                                    <div className="row">
                                        <div className="col-12">
                                            <Swiper
                                                {...tabSliderOptions}
                                                className="item__tablist our_vision_slider swiper-container overflow_visible"
                                            >
                                                {vision_slider.map(
                                                    (tab, idx) => {
                                                        const isActive =
                                                            activeTab === idx;

                                                        return (
                                                            <SwiperSlide
                                                                key={idx}
                                                            >
                                                                <div
                                                                    className={`list_item ${
                                                                        isActive
                                                                            ? "active"
                                                                            : ""
                                                                    }`}
                                                                    onClick={() => {
                                                                        if (
                                                                            !isActive
                                                                        ) {
                                                                            setActiveTab(
                                                                                idx
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="#!"
                                                                        className={`item__tab ${
                                                                            isActive
                                                                                ? "active"
                                                                                : ""
                                                                        }`}
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                        // id={`vision-tab-${idx}`}
                                                                    >
                                                                        <h4
                                                                            className="heading fs-28 fw-400"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                    tab.title ||
                                                                                    "Untitled Tab",
                                                                            }}
                                                                        />
                                                                        <div className="shape" />
                                                                    </a>
                                                                </div>
                                                                {idx <
                                                                    vision_slider.length -
                                                                        1 &&
                                                                    renderCircleDecorations()}
                                                            </SwiperSlide>
                                                        );
                                                    }
                                                )}
                                            </Swiper>
                                            {vision_slider.length > 3 && (
                                                <ul className="category__slider_btn">
                                                    <li
                                                        className="prev-btn-category"
                                                        onClick={() => {
                                                            prevCategorySlide();
                                                        }}
                                                    >
                                                        <a
                                                            href="#!"
                                                            onClick={(e) =>
                                                                e.preventDefault()
                                                            }
                                                        >
                                                            <svg
                                                                width={45}
                                                                height={45}
                                                                viewBox="0 0 45 45"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <rect
                                                                    x={-1}
                                                                    y={1}
                                                                    width={43}
                                                                    height={43}
                                                                    rx="21.5"
                                                                    transform="matrix(-1 0 0 1 43 0)"
                                                                    stroke="#5B5B5B"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                />
                                                                <path
                                                                    d="M37.4685 21.1158C38.0206 21.1017 38.4797 21.5377 38.4938 22.0898C38.508 22.6419 38.0719 23.101 37.5198 23.1151L37.4685 21.1158ZM6.81525 23.6095C6.41484 23.2291 6.39861 22.5961 6.779 22.1957L12.9777 15.6707C13.3581 15.2703 13.9911 15.2541 14.3915 15.6345C14.7919 16.0148 14.8081 16.6478 14.4277 17.0482L8.91774 22.8482L14.7177 28.3582C15.1181 28.7386 15.1344 29.3715 14.754 29.772C14.3736 30.1724 13.7406 30.1886 13.3402 29.8082L6.81525 23.6095ZM37.4941 22.1155L37.5198 23.1151L7.52963 23.8841L7.50399 22.8845L7.47836 21.8848L37.4685 21.1158L37.4941 22.1155Z"
                                                                    fill="#5B5B5B"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </li>

                                                    <li
                                                        className="next-btn-category"
                                                        onClick={() => {
                                                            nextCategorySlide();
                                                        }}
                                                    >
                                                        <a
                                                            href="#!"
                                                            onClick={(e) =>
                                                                e.preventDefault()
                                                            }
                                                        >
                                                            <svg
                                                                width={45}
                                                                height={45}
                                                                viewBox="0 0 45 45"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <rect
                                                                    x={1}
                                                                    y={1}
                                                                    width={43}
                                                                    height={43}
                                                                    rx="21.5"
                                                                    stroke="#0DB02B"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                />
                                                                <path
                                                                    d="M7.53149 21.1158C6.97939 21.1017 6.52034 21.5377 6.50619 22.0898C6.49203 22.6419 6.92812 23.101 7.48023 23.1151L7.53149 21.1158ZM38.1848 23.6095C38.5852 23.2291 38.6014 22.5961 38.221 22.1957L32.0223 15.6707C31.6419 15.2703 31.0089 15.2541 30.6085 15.6345C30.2081 16.0148 30.1919 16.6478 30.5723 17.0482L36.0823 22.8482L30.2823 28.3582C29.8819 28.7386 29.8656 29.3715 30.246 29.772C30.6264 30.1724 31.2594 30.1886 31.6598 29.8082L38.1848 23.6095ZM7.50586 22.1155L7.48023 23.1151L37.4704 23.8841L37.496 22.8845L37.5216 21.8848L7.53149 21.1158L7.50586 22.1155Z"
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-container">
                    {vision_slider.map((item, idx) => (
                        <div
                            key={idx}
                            className={`item__tab_data${
                                activeTab === idx ? " tab-active" : ""
                            }`}
                            data-id={`tab-${idx}`}
                            style={{
                                display: activeTab === idx ? "block" : "none",
                            }}
                        >
                            <div className="team__slider_wrap">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-6 col-lg-7 col-xl-7">
                                        <div className="epc_left_col">
                                            <div className="section_header">
                                                <h4 className="heading fs-28 fw-400">
                                                    {item.title}
                                                </h4>
                                                <div className="content__wrap">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.description,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-5 col-xl-5">
                                        <div className="epc_wrapper">
                                            <div className="epc__slider">
                                                <div className="legacy__block theme-gradient-1">
                                                    <div className="img__wrap">
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={
                                                                item.image?.src
                                                                    ? getImageURL(
                                                                          item
                                                                              .image
                                                                              .src
                                                                      )
                                                                    : ""
                                                            }
                                                            alt={
                                                                item.image
                                                                    ?.alt || ""
                                                            }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};
