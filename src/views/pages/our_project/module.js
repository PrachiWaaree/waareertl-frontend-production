"use client";
/* eslint-disable no-unused-vars */

import { Button, OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { useCommonContext } from "@/contexts";

export const OurProjectPageModule = ({ data = {} }) => {
    const { title = "", project_detail = {} } = data || {};
    const projects = Array.isArray(project_detail?.list)
        ? project_detail.list
        : [];

    const filter_list = project_detail?.filter_list || [];

    const typeFilter = filter_list.find((f) => f.slug === "Type");
    const typeOptions = typeFilter
        ? typeFilter.tags.map((tag) => tag.name)
        : [
              ...new Set(
                  projects.flatMap(
                      (item) =>
                          item.tag_data?.Type?.map((type) => type.name) || [],
                  ),
              ),
          ];

    const countryFilter = filter_list.find((f) => f.slug === "Country");
    const countryOptions = countryFilter
        ? countryFilter.tags.map((tag) => tag.name)
        : [
              ...new Set(
                  projects.flatMap(
                      (item) =>
                          item.tag_data?.Country?.map(
                              (country) => country.name,
                          ) || [],
                  ),
              ),
          ];

    const { is480, is768, is992, is1200, isDesktop } = useCommonContext();
    const [selectedType, setSelectedType] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVideoUrl, setModalVideoUrl] = useState("");

    const filteredProjects = projects.filter((item) => {
        const typeMatch =
            !selectedType ||
            (item.tag_data?.Type &&
                item.tag_data.Type.some((type) => type.name === selectedType));
        const countryMatch =
            !selectedCountry ||
            (item.tag_data?.Country &&
                item.tag_data.Country.some(
                    (country) => country.name === selectedCountry,
                ));
        return typeMatch && countryMatch;
    });

    const {
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
        options: imagesSliderOptions,
    } = useSwiperSliderOptions({
        modules: [Navigation],
        clickable: true,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
        },
    });

    let slidesPerView = 1;
    if (is992) {
        slidesPerView = 3;
    } else if (is768 || is480) {
        slidesPerView = 2;
    } else {
        slidesPerView = 1;
    }

    const showSliderButtons = filteredProjects.length > slidesPerView;

    const handleOpenModal = (videoUrl) => {
        setModalVideoUrl(videoUrl);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalVideoUrl("");
    };

    return (
        <>
            <section className="module_listings">
                <div className="custom-container">
                    <div className="section_header">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-5 col-xl-6">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                            <div className="col-12 col-md-12 col-lg-7 col-xl-6">
                                <form action="">
                                    <div className="btn-group-select d-flex">
                                        <select
                                            className="form-field"
                                            id="type-select"
                                            name="type"
                                            value={selectedType}
                                            onChange={(e) =>
                                                setSelectedType(e.target.value)
                                            }
                                        >
                                            <option value="">All Types</option>
                                            {typeOptions.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className="form-field"
                                            id="country-select"
                                            name="country"
                                            value={selectedCountry}
                                            onChange={(e) =>
                                                setSelectedCountry(
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                All Countries / Regions
                                            </option>
                                            {countryOptions.map((country) => (
                                                <option
                                                    key={country}
                                                    value={country}
                                                >
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center pos-relative">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xl-12">
                            <div className="module_listings_slider swiper">
                                <Swiper {...imagesSliderOptions}>
                                    {filteredProjects.map((item, idx) => (
                                        <SwiperSlide key={item.id || idx}>
                                            <div className="item__wrap">
                                                <div className="single__item">
                                                    <div className="img__wrap">
                                                        {item.template_fields
                                                            ?.link && (
                                                            <div className="client_video_icon">
                                                                <a
                                                                    href="#!"
                                                                    className="client_model_click"
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        handleOpenModal(
                                                                            item
                                                                                .template_fields
                                                                                .link,
                                                                        );
                                                                    }}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width={
                                                                            96
                                                                        }
                                                                        height={
                                                                            96
                                                                        }
                                                                        viewBox="0 0 96 96"
                                                                        fill="none"
                                                                    >
                                                                        <circle
                                                                            opacity="0.25"
                                                                            cx={
                                                                                48
                                                                            }
                                                                            cy={
                                                                                48
                                                                            }
                                                                            r={
                                                                                48
                                                                            }
                                                                            fill="white"
                                                                        />
                                                                        <circle
                                                                            opacity="0.5"
                                                                            cx={
                                                                                48
                                                                            }
                                                                            cy={
                                                                                48
                                                                            }
                                                                            r="34.087"
                                                                            fill="white"
                                                                        />
                                                                        <circle
                                                                            cx={
                                                                                48
                                                                            }
                                                                            cy={
                                                                                48
                                                                            }
                                                                            r="19.4783"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M58.4348 48L42.2609 57.0368L42.2609 38.9632L58.4348 48Z"
                                                                            fill="#0DB02B"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        )}
                                                        <OptimizedImage
                                                            src={getImageURL(
                                                                item
                                                                    .template_fields
                                                                    ?.thumbnail_image
                                                                    ?.src || "",
                                                            )}
                                                            alt={
                                                                item
                                                                    .template_fields
                                                                    ?.thumbnail_image
                                                                    ?.alt ||
                                                                item.name ||
                                                                ""
                                                            }/>
                                                    </div>
                                                    <div className="content_block">
                                                        <div className="module_detailed_solor">
                                                            <ul className="d-flex fw-600 fs-20">
                                                                <li>
                                                                    {item
                                                                        .tag_data
                                                                        ?.Type?.[0]
                                                                        ?.name ||
                                                                        ""}
                                                                </li>
                                                                <li>
                                                                    {item
                                                                        .template_fields
                                                                        ?.capacity ||
                                                                        ""}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="title">
                                                            <h3
                                                                className="fs-28 fw-600"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item?.name,
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="content__wrap fw-400">
                                                            <p
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        item
                                                                            ?.template_fields
                                                                            ?.short_description ||
                                                                        "",
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="module_location d-flex">
                                                            <span>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={20}
                                                                    height={20}
                                                                    viewBox="0 0 20 20"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        d="M10 0C5.865 0 2.5 3.38833 2.5 7.55417C2.5 13.4733 9.295 19.585 9.58417 19.8417C9.70333 19.9475 9.85167 20 10 20C10.1483 20 10.2967 19.9475 10.4158 19.8425C10.705 19.585 17.5 13.4733 17.5 7.55417C17.5 3.38833 14.135 0 10 0ZM10 11.6667C7.7025 11.6667 5.83333 9.7975 5.83333 7.5C5.83333 5.2025 7.7025 3.33333 10 3.33333C12.2975 3.33333 14.1667 5.2025 14.1667 7.5C14.1667 9.7975 12.2975 11.6667 10 11.6667Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <div className="module_location_address fs-18 fw-500">
                                                                {item.tag_data?.Country?.map(
                                                                    (
                                                                        country,
                                                                        i,
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                country.id ||
                                                                                i
                                                                            }
                                                                        >
                                                                            {
                                                                                country.name
                                                                            }
                                                                            {i <
                                                                            item
                                                                                .tag_data
                                                                                .Country
                                                                                .length -
                                                                                1
                                                                                ? ", "
                                                                                : ""}
                                                                        </span>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        {showSliderButtons && (
                            <ul className="module_listings_slider_btn list-unstyled justify-content-center d-flex">
                                <li
                                    className={
                                        "prev-btn-module" +
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
                                        "next-btn-module" +
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
            </section>

            {isModalOpen && (
                <div className="module_modal" style={{ display: "block" }}>
                    <div className="popup-bg" onClick={handleCloseModal} />
                    <div className="popup-content">
                        <div
                            className="close-btn"
                            onClick={handleCloseModal}
                            style={{ cursor: "pointer" }}
                        >
                            ✖
                        </div>
                        <iframe
                            id="video"
                            width="100%"
                            height="100%"
                            src={modalVideoUrl}
                            frameBorder={0}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </>
    );
};
