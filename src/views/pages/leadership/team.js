"use client";
/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */

import { getImageURL, openLink, useSwiperSliderOptions } from "@/lib";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { useCommonContext } from "@/contexts";
import { Fade, OptimizedImage } from "@/components";
import { cleanSEOTags } from "@/utilities";

export const LeadershipPageTeam = ({ data = {}, slug = "teams" }) => {
    const {
        ["banner-image"]: bannerImage,
        ["one-liner"]: oneLiner,
        parent_class,
        category,
        description,
        list,
        title,
    } = data;

    const { is480 } = useCommonContext();

    const [selectedData, setSelectedData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(0);

    const teamsData =
        Array.isArray(category) && category[selectedCategory]?.teams;

    const {
        prevSlide: prevCategorySlide,
        nextSlide: nextCategorySlide,
        options: tabSliderOptions,
    } = useSwiperSliderOptions({
        slidesPerView: 3,
        allowTouchMove: true,
        centeredSlides: false,
        slideToClickedSlide: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                allowTouchMove: true,
                centeredSlidesBounds: true,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
                centeredSlidesBounds: false,
            },
        },
    });

    const hasSection =
        (title || description) &&
        Array.isArray(category) &&
        category.length > 0 &&
        Array.isArray(teamsData) &&
        teamsData.length > 0;

    if (!hasSection) {
        return null;
    }

    // Determine if category slider buttons should be shown
    const showCategorySliderButtons =
        Array.isArray(category) && category.length > 3;

    return (
        <>
            {(title || description) && (
                <section
                    className={`team__section ${parent_class || ""}`}
                    id={slug}
                >
                    {(title || description) && (
                        <div className="custom-container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-8 col-xl-6">
                                    <div className="section_header text-center">
                                        {title && (
                                            <h4
                                                className="heading fs-48 fw-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: cleanSEOTags(title),
                                                }}
                                            />
                                        )}
                                        {description && (
                                            <div className="content__wrap text-center">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanSEOTags(
                                                            description,
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {Array.isArray(category) && category.length > 0 && (
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center">
                                    <div className="item__tab_wrapper">
                                        <div className="tab_circle_1 circle__wrapper">
                                            <div className="circle-1" />
                                            <div className="circle-2 theme-gradient-1" />
                                        </div>
                                        <div className="tab_circle_2 circle__wrapper">
                                            <div className="circle-1" />
                                            <div className="circle-2 theme-gradient-1" />
                                        </div>
                                        <div className="custom-container">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div>
                                                        <Swiper
                                                            {...tabSliderOptions}
                                                            className="item__tablist category__slider swiper-container"
                                                        >
                                                            {category?.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => {
                                                                    const isActive =
                                                                        selectedCategory ===
                                                                        index;

                                                                    if (
                                                                        !item?.title
                                                                    )
                                                                        return null;

                                                                    return (
                                                                        <SwiperSlide
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {({
                                                                                isActive:
                                                                                    slideActive,
                                                                            }) => {
                                                                                if (
                                                                                    selectedCategory !==
                                                                                        index &&
                                                                                    !!slideActive &&
                                                                                    !!is480
                                                                                ) {
                                                                                    setSelectedCategory(
                                                                                        index,
                                                                                    );
                                                                                }

                                                                                return (
                                                                                    <div
                                                                                        className={`list_item ${
                                                                                            isActive
                                                                                                ? "active"
                                                                                                : ""
                                                                                        }`}
                                                                                    >
                                                                                        <a
                                                                                            href="#!"
                                                                                            onClick={(
                                                                                                e,
                                                                                            ) => {
                                                                                                e.preventDefault();
                                                                                                setSelectedCategory(
                                                                                                    index,
                                                                                                );
                                                                                            }}
                                                                                            className={`item__tab ${
                                                                                                isActive
                                                                                                    ? "active"
                                                                                                    : ""
                                                                                            }`}
                                                                                        >
                                                                                            {item?.title && (
                                                                                                <h4
                                                                                                    className="heading fs-28 fw-600"
                                                                                                    dangerouslySetInnerHTML={{
                                                                                                        __html: cleanSEOTags(
                                                                                                            item?.title,
                                                                                                        ),
                                                                                                    }}
                                                                                                />
                                                                                            )}
                                                                                            <div className="shape" />
                                                                                        </a>
                                                                                    </div>
                                                                                );
                                                                            }}
                                                                        </SwiperSlide>
                                                                    );
                                                                },
                                                            )}
                                                        </Swiper>

                                                        {showCategorySliderButtons && (
                                                            <ul className="category__slider_btn">
                                                                <li
                                                                    className={`prev-btn-category${
                                                                        !tabSliderOptions
                                                                            .navigation
                                                                            ?.hasPrev
                                                                            ? " swiper-button-disable"
                                                                            : ""
                                                                    }`}
                                                                    onClick={
                                                                        prevCategorySlide
                                                                    }
                                                                >
                                                                    <a
                                                                        href="#!"
                                                                        onClick={(
                                                                            e,
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                    >
                                                                        <svg
                                                                            width="45"
                                                                            height="45"
                                                                            viewBox="0 0 45 45"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            {/* <g opacity="0.25"> */}
                                                                            <rect
                                                                                x="-1"
                                                                                y="1"
                                                                                width="43"
                                                                                height="43"
                                                                                rx="21.5"
                                                                                transform="matrix(-1 0 0 1 43 0)"
                                                                                stroke="#5B5B5B"
                                                                                strokeWidth="2"
                                                                            ></rect>
                                                                            <path
                                                                                d="M37.4685 21.1158C38.0206 21.1017 38.4797 21.5377 38.4938 22.0898C38.508 22.6419 38.0719 23.101 37.5198 23.1151L37.4685 21.1158ZM6.81525 23.6095C6.41484 23.2291 6.39861 22.5961 6.779 22.1957L12.9777 15.6707C13.3581 15.2703 13.9911 15.2541 14.3915 15.6345C14.7919 16.0148 14.8081 16.6478 14.4277 17.0482L8.91774 22.8482L14.7177 28.3582C15.1181 28.7386 15.1344 29.3715 14.754 29.772C14.3736 30.1724 13.7406 30.1886 13.3402 29.8082L6.81525 23.6095ZM37.4941 22.1155L37.5198 23.1151L7.52963 23.8841L7.50399 22.8845L7.47836 21.8848L37.4685 21.1158L37.4941 22.1155Z"
                                                                                fill="#5B5B5B"
                                                                            ></path>
                                                                            {/* </g> */}
                                                                        </svg>
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className={`next-btn-category${
                                                                        !tabSliderOptions
                                                                            .navigation
                                                                            ?.hasNext
                                                                            ? " swiper-button-disable"
                                                                            : ""
                                                                    }`}
                                                                    onClick={
                                                                        nextCategorySlide
                                                                    }
                                                                >
                                                                    <a
                                                                        href="#!"
                                                                        onClick={(
                                                                            e,
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                    >
                                                                        <svg
                                                                            width="45"
                                                                            height="45"
                                                                            viewBox="0 0 45 45"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <rect
                                                                                x="1"
                                                                                y="1"
                                                                                width="43"
                                                                                height="43"
                                                                                rx="21.5"
                                                                                stroke="#0DB02B"
                                                                                strokeWidth="2"
                                                                            ></rect>
                                                                            <path
                                                                                d="M7.53149 21.1158C6.97939 21.1017 6.52034 21.5377 6.50619 22.0898C6.49203 22.6419 6.92812 23.101 7.48023 23.1151L7.53149 21.1158ZM38.1848 23.6095C38.5852 23.2291 38.6014 22.5961 38.221 22.1957L32.0223 15.6707C31.6419 15.2703 31.0089 15.2541 30.6085 15.6345C30.2081 16.0148 30.1919 16.6478 30.5723 17.0482L36.0823 22.8482L30.2823 28.3582C29.8819 28.7386 29.8656 29.3715 30.246 29.772C30.6264 30.1724 31.2594 30.1886 31.6598 29.8082L38.1848 23.6095ZM7.50586 22.1155L7.48023 23.1151L37.4704 23.8841L37.496 22.8845L37.5216 21.8848L7.53149 21.1158L7.50586 22.1155Z"
                                                                                fill="#0DB02B"
                                                                            ></path>
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
                        </div>
                    )}

                    {Array.isArray(teamsData) && teamsData.length > 0 && (
                        <RenderTeamSlider
                            slug={slug}
                            teamsData={teamsData}
                            setSelectedData={setSelectedData}
                        />
                    )}

                    <RenderTeamModal
                        selectedData={selectedData}
                        onClose={() => setSelectedData(null)}
                    />
                </section>
            )}
        </>
    );
};

const RenderTeamSlider = ({ teamsData = [], setSelectedData, slug }) => {
    const {
        refreshSlider,
        sliderButtons,
        nextSlide,
        prevSlide,
        options: teamsSliderOptions,
    } = useSwiperSliderOptions({
        loop: false,
        slidesPerView: 3,
        modules: [Navigation],
        slideToClickedSlide: false,
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
        },
    });

    useEffect(() => {
        if (teamsData?.length) {
            refreshSlider();
        }
    }, [teamsData]);

    // Determine if team slider buttons should be shown
    const showTeamSliderButtons =
        Array.isArray(teamsData) && teamsData.length > 3;

    return (
        <Fade show={!!teamsData?.length} duration={0.2}>
            <div className="custom-container">
                <div className="item__tab_data tab-active">
                    <div className="team__slider_wrap">
                        <div className="row justify-content-center">
                            <div className="col-12 col-xl-10">
                                <div className="team__slider swiper">
                                    <Swiper {...teamsSliderOptions}>
                                        {teamsData?.map(
                                            (item, index) =>
                                                item && (
                                                    <SwiperSlide key={index}>
                                                        <RenderSlide
                                                            item={item}
                                                            onClick={() => {
                                                                setSelectedData(
                                                                    item,
                                                                );

                                                                openLink(
                                                                    `#${slug}`,
                                                                );
                                                            }}
                                                        />
                                                    </SwiperSlide>
                                                ),
                                        )}
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        {showTeamSliderButtons && (
                            <ul className="team__slider_btn list-unstyled justify-content-center">
                                <li
                                    className={`prev-btn-team${
                                        !sliderButtons?.hasPrev
                                            ? " swiper-button-disable"
                                            : ""
                                    }`}
                                    onClick={prevSlide}
                                    style={{
                                        filter: `saturate(${
                                            sliderButtons?.hasPrev ? 1 : 0
                                        })`,
                                    }}
                                >
                                    <a
                                        href="#!"
                                        onClick={(e) => e.preventDefault()}
                                    >
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
                                                stroke="#0DB02B"
                                                strokeWidth={1.7931}
                                            />
                                            <path
                                                d="M60.9824 43.0517C61.4776 43.0517 61.879 43.4531 61.879 43.9482C61.879 44.4434 61.4776 44.8448 60.9824 44.8448V43.9482V43.0517ZM25.3715 44.5822C25.0213 44.2321 25.0213 43.6644 25.3715 43.3143L31.0771 37.6087C31.4272 37.2585 31.9949 37.2585 32.345 37.6087C32.6951 37.9588 32.6951 38.5265 32.345 38.8766L27.2733 43.9482L32.345 49.0199C32.6951 49.37 32.6951 49.9377 32.345 50.2878C31.9949 50.6379 31.4272 50.6379 31.0771 50.2878L25.3715 44.5822ZM60.9824 43.9482V44.8448H26.0054V43.9482V43.0517H60.9824V43.9482Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li
                                    className={`next-btn-team${
                                        !sliderButtons?.hasNext
                                            ? " swiper-button-disable"
                                            : ""
                                    }`}
                                    onClick={nextSlide}
                                    style={{
                                        filter: `saturate(${
                                            sliderButtons?.hasNext ? 1 : 0
                                        })`,
                                    }}
                                >
                                    <a
                                        href="#!"
                                        onClick={(e) => e.preventDefault()}
                                    >
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
                        )}
                    </div>
                </div>
            </div>
        </Fade>
    );
};

const RenderSlide = ({ item, onClick }) => {
    if (!item) return null;
    return (
        <div className="single__item" onClick={onClick}>
            <div className="img__bg" />
            <div className="img__wrap">
                {item?.image?.src && (
                    <OptimizedImage
                        className="img-fluid"
                        src={getImageURL(item?.image?.src)}
                        alt={item?.image?.alt || ""}/>
                )}
            </div>
            <div className="content__area text-center theme-gradient-1">
                {item?.name && (
                    <h4
                        className="heading fs-28 fw-600 text-white"
                        dangerouslySetInnerHTML={{
                            __html: cleanSEOTags(item?.name),
                        }}
                    />
                )}

                {item?.designation && (
                    <h5
                        className="sub-heading fs-20 fw-600 text-white"
                        dangerouslySetInnerHTML={{
                            __html: cleanSEOTags(item?.designation),
                        }}
                    />
                )}

                <div className="btn-group">
                    <div className="btn-inner">
                        <span className="btn_icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={31}
                                height={16}
                                viewBox="0 0 31 16"
                                fill="none"
                            >
                                <path
                                    d="M30.2071 8.70711C30.5976 8.31659 30.5976 7.68342 30.2071 7.2929L23.8431 0.928934C23.4526 0.53841 22.8195 0.53841 22.4289 0.928934C22.0384 1.31946 22.0384 1.95262 22.4289 2.34315L28.0858 8L22.4289 13.6569C22.0384 14.0474 22.0384 14.6805 22.4289 15.0711C22.8195 15.4616 23.4526 15.4616 23.8431 15.0711L30.2071 8.70711ZM0.5 8L0.5 9L29.5 9L29.5 8L29.5 7L0.5 7L0.5 8Z"
                                    fill="white"
                                />
                            </svg>
                        </span>
                        <span className="btn_icon on-hover">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={50}
                                height={16}
                                viewBox="0 0 50 16"
                                fill="none"
                            >
                                <path
                                    d="M49.7071 8.70711C50.0976 8.31658 50.0976 7.68342 49.7071 7.29289L43.3431 0.928932C42.9526 0.538408 42.3195 0.538408 41.9289 0.928932C41.5384 1.31946 41.5384 1.95262 41.9289 2.34315L47.5858 8L41.9289 13.6569C41.5384 14.0474 41.5384 14.6805 41.9289 15.0711C42.3195 15.4616 42.9526 15.4616 43.3431 15.0711L49.7071 8.70711ZM0 8V9H49V8V7H0V8Z"
                                    fill="white"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RenderTeamModal = ({ selectedData, onClose }) => {
    const isActive = !!selectedData;

    // If no selectedData, don't render the modal or overlay
    if (!isActive) return null;

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("team__modal")) {
            onClose();
        }
    };

    return (
        <>
            <div
                className={`team-overlay ${isActive ? "active" : ""}`}
                onClick={onClose}
            />

            <div
                className={`team__modal ${isActive ? "active" : ""}`}
                onClick={handleOutsideClick}
            >
                <div className="team__modal_wrapper">
                    <button
                        className="team-close-modal"
                        type="button"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={52}
                            height={52}
                            viewBox="0 0 52 52"
                            fill="none"
                        >
                            <circle cx={26} cy={26} r={26} fill="#0DB02B" />
                            <path
                                d="M18.1955 17.8366C18.7845 17.3562 19.6531 17.3904 20.2023 17.9392L26.1418 23.8777L32.0812 17.9392L32.1955 17.8366C32.7845 17.3562 33.6531 17.3904 34.2023 17.9392L34.3049 18.0534C34.7533 18.6033 34.7533 19.3961 34.3049 19.946L34.2023 20.0603L28.2629 25.9987L34.3449 32.0808L34.4474 32.195C34.8959 32.745 34.8959 33.5386 34.4474 34.0886L34.3449 34.2028C33.7957 34.752 32.9263 34.7859 32.3371 34.3054L32.2228 34.2028L26.1408 28.1208L20.0597 34.2028C19.5108 34.7511 18.6421 34.7858 18.0529 34.3054L17.9387 34.2028C17.3533 33.617 17.353 32.6664 17.9387 32.0808L24.0197 25.9987L18.0812 20.0603C17.4958 19.4745 17.4956 18.5248 18.0812 17.9392L18.1955 17.8366Z"
                                fill="white"
                            />
                        </svg>
                    </button>

                    <div className="team__modal_detail">
                        <div className="team__member">
                            <div className="single__item">
                                <div className="img__bg" />
                                <div className="img__wrap">
                                    {selectedData?.image?.src && (
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(
                                                selectedData?.image?.src,
                                            )}
                                            alt={selectedData?.image?.alt || ""}/>
                                    )}
                                </div>

                                {Array.isArray(selectedData?.cta) &&
                                    selectedData.cta.length > 0 && (
                                        <div className="content__area">
                                            <div className="btn-group text-center theme-gradient-1 overflow-hidden">
                                                {selectedData.cta.map(
                                                    (item, index) =>
                                                        (item?.url ||
                                                            item?.icon
                                                                ?.src) && (
                                                            <a
                                                                key={index}
                                                                href={
                                                                    item?.url ||
                                                                    "#"
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="primary_text_btn fs-16 text-white fw-400"
                                                            >
                                                                {item?.icon
                                                                    ?.src && (
                                                                    <span className="btn_icon">
                                                                        <OptimizedImage
                                                                            src={getImageURL(
                                                                                item
                                                                                    .icon
                                                                                    .src,
                                                                            )}
                                                                            alt={
                                                                                item
                                                                                    .icon
                                                                                    ?.alt ||
                                                                                "icon"
                                                                            }/>
                                                                    </span>
                                                                )}
                                                            </a>
                                                        ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                            {selectedData?.detail_button?.url && (
                                <div className="justify-content-center text-center pt-20">
                                    <a
                                        href={selectedData?.detail_button?.url}
                                        target={
                                            selectedData?.detail_button
                                                ?.open_new_tab === "yes"
                                                ? "_blank"
                                                : "_self"
                                        }
                                        rel="noopener noreferrer"
                                        className="primary_text_btn fs-16 fw-400"
                                    >
                                        <span className="btn_text">
                                            {selectedData?.detail_button
                                                ?.title || "View Details"}
                                        </span>
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="team__member_detail">
                            {(selectedData?.name ||
                                selectedData?.designation) && (
                                <div className="content__area">
                                    {selectedData?.name && (
                                        <h4
                                            className="heading fs-28 fw-600"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.name,
                                            }}
                                        />
                                    )}

                                    {selectedData?.designation && (
                                        <h5
                                            className="sub-heading fs-18 fw-500"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.designation,
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                            {selectedData?.exp_title &&
                                selectedData?.experience && (
                                    <div className="content__wrap">
                                        <h4
                                            className="heading fs-20 fw-600 text-gradient"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.exp_title,
                                            }}
                                        />

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.experience,
                                            }}
                                        />
                                    </div>
                                )}
                            {selectedData?.edu_title &&
                                selectedData?.education && (
                                    <div className="content__wrap">
                                        <h4
                                            className="heading fs-20 fw-600 text-gradient"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.edu_title,
                                            }}
                                        />

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.education,
                                            }}
                                        />
                                    </div>
                                )}
                            {selectedData?.thought &&
                                selectedData?.leadership_thought && (
                                    <div className="content__wrap">
                                        <h4
                                            className="heading fs-20 fw-600 text-gradient"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.thought,
                                            }}
                                        />
                                        <div className="quote-icon-left">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={33}
                                                height={25}
                                                viewBox="0 0 33 25"
                                                fill="none"
                                            >
                                                <path
                                                    d="M33 13.1985L24.996 13.1985C25.1328 7.3652 26.7873 6.70304 28.8653 6.51404L29.6667 6.4147L29.6667 0.00035723L28.743 0.0498568C26.0295 0.202523 23.0295 0.69169 21.028 3.16253C19.2735 5.32853 18.5 8.8672 18.5 14.2994L18.5 24.3652L33 24.3652L33 13.1985Z"
                                                    fill="url(#paint0_linear_3235_515)"
                                                />
                                                <path
                                                    d="M14.5 24.3652L14.5 13.1985L6.60282 13.1985C6.73965 7.3652 8.34066 6.70304 10.4187 6.51404L11.1667 6.4147L11.1667 0.00035723L10.2963 0.0498568C7.58282 0.202523 4.55598 0.69169 2.55448 3.16253C0.800143 5.32853 -2.50053e-05 8.8672 -2.54802e-05 14.2994L-2.63602e-05 24.3652L14.5 24.3652Z"
                                                    fill="url(#paint1_linear_3235_515)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_3235_515"
                                                        x1="18.5"
                                                        y1="12.1828"
                                                        x2={33}
                                                        y2="12.1828"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#0DB02B" />
                                                        <stop
                                                            offset={1}
                                                            stopColor="#28A9E2"
                                                        />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_3235_515"
                                                        x1="-2.46842e-05"
                                                        y1="12.1828"
                                                        x2="14.5"
                                                        y2="12.1828"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#0DB02B" />
                                                        <stop
                                                            offset={1}
                                                            stopColor="#28A9E2"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.leadership_thought,
                                            }}
                                        />

                                        <div className="quote-icon-right">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={33}
                                                height={25}
                                                viewBox="0 0 33 25"
                                                fill="none"
                                            >
                                                <path
                                                    d="M-9.76223e-07 11.1667L8.00401 11.1667C7.86718 17 6.21268 17.6622 4.13467 17.8512L3.33334 17.9505L3.33334 24.3649L4.25701 24.3154C6.97051 24.1627 9.97052 23.6735 11.972 21.2027C13.7265 19.0367 14.5 15.498 14.5 10.0659L14.5 1.26763e-06L0 0L-9.76223e-07 11.1667Z"
                                                    fill="url(#paint0_linear_3235_518)"
                                                />
                                                <path
                                                    d="M18.5 0L18.5 11.1667L26.3972 11.1667C26.2603 17 24.6593 17.6622 22.5813 17.8512L21.8333 17.9505L21.8333 24.3649L22.7037 24.3154C25.4172 24.1627 28.444 23.6735 30.4455 21.2027C32.1999 19.0367 33 15.498 33 10.0659L33 1.26763e-06L18.5 0Z"
                                                    fill="url(#paint1_linear_3235_518)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_3235_518"
                                                        x1="14.5"
                                                        y1="12.1824"
                                                        x2="-1.06502e-06"
                                                        y2="12.1824"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#0DB02B" />
                                                        <stop
                                                            offset={1}
                                                            stopColor="#28A9E2"
                                                        />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_3235_518"
                                                        x1={33}
                                                        y1="12.1824"
                                                        x2="18.5"
                                                        y2="12.1824"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#0DB02B" />
                                                        <stop
                                                            offset={1}
                                                            stopColor="#28A9E2"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
