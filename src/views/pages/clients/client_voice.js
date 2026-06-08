"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { useCommonContext } from "@/contexts";

export const ClientPageVoice = ({ data = {}, slug = "client_voice" }) => {
    const { title, client_list = [] } = data;

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVideo, setModalVideo] = useState("");
    const { is480, is768, is992, is1200, isDesktop } = useCommonContext();

    const {
        nextSlide,
        prevSlide,
        options,
        sliderButtons: { hasNext, hasPrev },
    } = useSwiperSliderOptions({
        modules: [Navigation],
        clickable: true,

        spaceBetween: 33,

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            992: {
                slidesPerView: 2.5,
                spaceBetween: 25,
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 25,
            },

            1281: {
                slidesPerView: 3,
                spaceBetween: 33,
            },
        },
        on: {
            init: function () {
                setEqualSlideHeights();
            },
            resize: function () {
                setEqualSlideHeights();
            },
            slideChange: function () {
                setEqualSlideHeights();
            },
        },
    });

    const handleOpenModal = (videoUrl) => {
        setModalVideo(videoUrl);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalVideo("");
    };

    useEffect(() => {
        if (!modalOpen) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") handleCloseModal();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [modalOpen]);

    const hasTitle = !!title && String(title).trim() !== "";
    const hasClientList = Array.isArray(client_list) && client_list.length > 0;

    if (!hasTitle && !hasClientList) {
        return null;
    }

    return (
        <>
            <section className="client_voices" id={slug}>
                <div className="custom-container">
                    <div className="row">
                        <div className="col-md-12 col-xl-12">
                            {hasTitle && (
                                <div className="section_header">
                                    <h4
                                        className="heading fs-48 fw-300 text-center"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row justify-content-center pos-relative">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xl-10">
                            {hasClientList && (
                                <div className="client_voices_slider swiper">
                                    <Swiper {...options}>
                                        {client_list.map((client, idx) => {
                                            const hasThumbnail =
                                                client?.thumbnail_image?.src;
                                            const hasDescription =
                                                !!client?.description &&
                                                String(
                                                    client.description
                                                ).trim() !== "";
                                            const hasIcon = client?.icon?.src;
                                            const hasCompanyName =
                                                !!client?.company_name &&
                                                String(
                                                    client.company_name
                                                ).trim() !== "";
                                            const hasPosition =
                                                !!client?.position &&
                                                String(
                                                    client.position
                                                ).trim() !== "";
                                            const hasVideo =
                                                client?.video_link?.url;

                                            if (
                                                !hasThumbnail &&
                                                !hasDescription &&
                                                !hasIcon &&
                                                !hasCompanyName &&
                                                !hasPosition &&
                                                !hasVideo
                                            ) {
                                                return null;
                                            }

                                            return (
                                                <SwiperSlide key={idx}>
                                                    <div className="item__wrap">
                                                        <div className="single__item">
                                                            <div className="img__wrap">
                                                                {hasVideo && (
                                                                    <div className="client_video_icon">
                                                                        <a
                                                                            href="#!"
                                                                            className="client_model_click"
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.preventDefault();
                                                                                handleOpenModal(
                                                                                    client
                                                                                        ?.video_link
                                                                                        ?.url ||
                                                                                        ""
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
                                                                {hasThumbnail && (
                                                                    <OptimizedImage
                                                                        src={getImageURL(
                                                                            client
                                                                                ?.thumbnail_image
                                                                                ?.src
                                                                        )}
                                                                        alt={
                                                                            client
                                                                                ?.thumbnail_image
                                                                                ?.alt ||
                                                                            ""
                                                                        }/>
                                                                )}
                                                            </div>
                                                            <div className="content_block">
                                                                {hasDescription && (
                                                                    <div className="content__wrap fw-400">
                                                                        <p
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: client?.description,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                                {(hasIcon ||
                                                                    hasCompanyName ||
                                                                    hasPosition) && (
                                                                    <div className="client_deta_voices d-flex">
                                                                        {hasIcon && (
                                                                            <div className="client_deta_img">
                                                                                <OptimizedImage
                                                                                    src={getImageURL(
                                                                                        client
                                                                                            ?.icon
                                                                                            ?.src
                                                                                    )}
                                                                                    alt={
                                                                                        client
                                                                                            ?.icon
                                                                                            ?.alt ||
                                                                                        ""
                                                                                    }/>
                                                                            </div>
                                                                        )}
                                                                        {(hasCompanyName ||
                                                                            hasPosition) && (
                                                                            <div className="client_deta_right">
                                                                                {hasCompanyName && (
                                                                                    <div
                                                                                        className="title_name fs-16 fw-600"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html: client?.company_name,
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                                {hasPosition && (
                                                                                    <div
                                                                                        className="designation fs-16 fw-300"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html: client?.position,
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </div>
                            )}
                        </div>
                        {hasClientList && (
                            <ul className="client_voices_slider_btn list-unstyled justify-content-center d-flex">
                                <li
                                    className={
                                        "prev-btn-client-voices" +
                                        (!hasPrev
                                            ? " swiper-button-disabled"
                                            : "")
                                    }
                                >
                                    <a
                                        href="#"
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
                                        "next-btn-client-voices" +
                                        (!hasNext
                                            ? " swiper-button-disabled"
                                            : "")
                                    }
                                >
                                    <a
                                        href="#"
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

            {modalOpen && (
                <div className="client_modal" style={{ display: "block" }}>
                    <div
                        className="popup-bg"
                        onClick={handleCloseModal}
                        style={{ cursor: "pointer" }}
                    />
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
                            src={modalVideo}
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
