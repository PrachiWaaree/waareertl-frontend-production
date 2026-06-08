"use client";
/* eslint-disable @next/next/no-img-element */

import { getImageURL, useSwiperSliderOptions, getAbsoluteURL } from "@/lib";
import { cleanSEOTags } from "@/utilities";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { Button } from "@/components";

export const AboutPageTrustedClient = ({
    data = {},
    slug = "trusted_client",
}) => {
    const {
        short_description,
        description,
        thumbnail_image,
        title,
        video,
        button,
        icon_slider = [],
        youtube_embeded_url,
    } = data;

    const videoRef = useRef();
    const youtubeRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = () => {
        if (!videoRef.current) return;
        if (!isPlaying) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const getYouTubeId = (url = "") => {
        try {
            const clean = url.split("?")[0].split("#")[0];
            const match = clean.match(
                /(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]+)/,
            );
            return match ? match[1] : "";
        } catch {
            return "";
        }
    };

    const { options } = useSwiperSliderOptions({
        slidesPerView: 6,
        modules: [Autoplay],
        spaceBetween: 25,
        loop: true,
        speed: 4000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        freeMode: { enabled: true },
        breakpoints: {
            240: { slidesPerView: 1.1 },
            600: { slidesPerView: 3 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
        },
    });

    if (
        !short_description &&
        !description &&
        !thumbnail_image?.src &&
        !title &&
        !video?.src &&
        !youtube_embeded_url &&
        !button &&
        (!icon_slider || icon_slider.length === 0)
    ) {
        return null;
    }

    return (
        <section className="trusted__section" id={slug}>
            <div className="custom-container">
                <div className="row">
                    <div className="col-12">
                        <div className="trusted__bg_wrapper">
                            <div className="section_bg" />

                            <div className="row align-items-end">
                                {(video?.src && thumbnail_image?.src) ||
                                youtube_embeded_url ||
                                short_description ? (
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <div className="trusted__video">
                                            {video?.src &&
                                                thumbnail_image?.src && (
                                                    <div className="video__area">
                                                        <div
                                                            className="video__container"
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <video
                                                                ref={videoRef}
                                                                id="video-trusted"
                                                                playsInline
                                                                poster={getImageURL(
                                                                    thumbnail_image?.src,
                                                                )}
                                                                width="100%"
                                                                height="auto"
                                                                onEnded={
                                                                    handleEnded
                                                                }
                                                                controls={false}
                                                                onClick={
                                                                    handleVideoClick
                                                                }
                                                                onPlay={() =>
                                                                    setIsPlaying(
                                                                        true,
                                                                    )
                                                                }
                                                                onPause={() =>
                                                                    setIsPlaying(
                                                                        false,
                                                                    )
                                                                }
                                                            >
                                                                <source
                                                                    src={getImageURL(
                                                                        video?.src,
                                                                    )}
                                                                    type="video/mp4"
                                                                />
                                                            </video>

                                                            {!isPlaying && (
                                                                <a
                                                                    href="#!"
                                                                    className="play__btn_wrap"
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        handleVideoClick();
                                                                    }}
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        top: "50%",
                                                                        left: "50%",
                                                                        transform:
                                                                            "translate(-50%, -50%)",
                                                                        zIndex: 2,
                                                                    }}
                                                                >
                                                                    <svg
                                                                        width={
                                                                            138
                                                                        }
                                                                        height={
                                                                            138
                                                                        }
                                                                        viewBox="0 0 138 138"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <circle
                                                                            opacity="0.25"
                                                                            cx="69"
                                                                            cy="69"
                                                                            r="69"
                                                                            fill="white"
                                                                        />
                                                                        <circle
                                                                            opacity="0.5"
                                                                            cx="69"
                                                                            cy="69"
                                                                            r="49"
                                                                            fill="white"
                                                                        />
                                                                        <circle
                                                                            cx="69"
                                                                            cy="69"
                                                                            r="28"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M84 69L60.75 81.9904L60.75 56.0096L84 69Z"
                                                                            fill="#0DB02B"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                            {!video?.src &&
                                                youtube_embeded_url && (
                                                    <div className="video__area">
                                                        <div
                                                            className="video__container"
                                                            style={{
                                                                position:
                                                                    "relative",
                                                            }}
                                                        >
                                                            {/* YouTube Embed with ref */}
                                                            <div
                                                                ref={youtubeRef}
                                                            >
                                                                <LiteYouTubeEmbed
                                                                    id={getYouTubeId(
                                                                        youtube_embeded_url,
                                                                    )}
                                                                    title={
                                                                        title ||
                                                                        "YouTube video"
                                                                    }
                                                                    noCookie
                                                                    poster="maxresdefault"
                                                                    className="lite-youtube"
                                                                />
                                                            </div>

                                                            {!isPlaying && (
                                                                <a
                                                                    href="#!"
                                                                    className="play__btn_wrap"
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        setIsPlaying(
                                                                            true,
                                                                        );

                                                                        youtubeRef.current
                                                                            ?.querySelector(
                                                                                ".lty-playbtn",
                                                                            )
                                                                            ?.click();
                                                                    }}
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        top: "50%",
                                                                        left: "50%",
                                                                        transform:
                                                                            "translate(-50%, -50%)",
                                                                        zIndex: 3,
                                                                    }}
                                                                >
                                                                    <svg
                                                                        width={
                                                                            138
                                                                        }
                                                                        height={
                                                                            138
                                                                        }
                                                                        viewBox="0 0 138 138"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <circle
                                                                            opacity="0.25"
                                                                            cx="69"
                                                                            cy="69"
                                                                            r="69"
                                                                            fill="white"
                                                                        />
                                                                        <circle
                                                                            opacity="0.5"
                                                                            cx="69"
                                                                            cy="69"
                                                                            r="49"
                                                                            fill="white"
                                                                        />
                                                                        <circle
                                                                            cx="69"
                                                                            cy="69"
                                                                            r="28"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M84 69L60.75 81.9904L60.75 56.0096L84 69Z"
                                                                            fill="#0DB02B"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </div>

                                        {short_description && (
                                            <div className="trusted__content">
                                                <div className="content__wrap text-center">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: cleanSEOTags(
                                                                short_description,
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : null}

                                {(title ||
                                    description ||
                                    (button &&
                                        button?.title &&
                                        (button?.url ||
                                            button?.external_url))) && (
                                    <div className="col-12 col-md-6 col-lg-6 trusted_col">
                                        <div className="trusted__area">
                                            {title && (
                                                <div className="section_header">
                                                    <h4
                                                        className="heading fs-48 fw-300"
                                                        dangerouslySetInnerHTML={{
                                                            __html: cleanSEOTags(
                                                                title,
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {description && (
                                                <div className="content__wrap">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: cleanSEOTags(
                                                                description,
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {button &&
                                                button?.title &&
                                                (button?.url ||
                                                    button?.external_url) && (
                                                    <Button
                                                        role="button"
                                                        label={button?.title}
                                                        href={getAbsoluteURL(
                                                            button?.url_type ===
                                                                "external"
                                                                ? button?.external_url
                                                                : button?.url,
                                                        )}
                                                    />
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {icon_slider && icon_slider.length > 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="trusted__client">
                                            <div className="trusted__slider swiper">
                                                <Swiper {...options}>
                                                    {icon_slider.map(
                                                        (item, idx) =>
                                                            item?.icon?.src && (
                                                                <SwiperSlide
                                                                    key={idx}
                                                                >
                                                                    <img
                                                                        loading="lazy"
                                                                        className="img-fluid"
                                                                        src={getImageURL(
                                                                            item
                                                                                .icon
                                                                                ?.src,
                                                                        )}
                                                                        alt={
                                                                            item
                                                                                .icon
                                                                                ?.alt ||
                                                                            " About Trusted Client Icon"
                                                                        }
                                                                    />
                                                                </SwiperSlide>
                                                            ),
                                                    )}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
