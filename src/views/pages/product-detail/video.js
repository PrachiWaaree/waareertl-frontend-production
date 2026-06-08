"use client";

import { useRef, useState } from "react";
import { getImageURL } from "@/lib";
import { Button } from "@/components";

export const ProductPageVideoSection = ({ data = {} }) => {
    const {
        video,
        heading,
        description,
        video_banner,
        product_video_buttons = [],
    } = data;

    const videoRef = useRef();
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

    const hasVideoSection =
        (video && video.src) || (video_banner && video_banner.src);
    const hasHeaderSection = heading || description;
    const hasButtons =
        Array.isArray(product_video_buttons) &&
        product_video_buttons.some((btnObj) => btnObj && btnObj.shop_button);

    if (!hasVideoSection && !hasHeaderSection && !hasButtons) {
        return null;
    }

    return (
        <>
            <section className="corporate__film_section product_detail_corporate">
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            {hasVideoSection && (
                                <div className="film__video">
                                    <div className="video__area">
                                        <div
                                            className="video__container"
                                            onClick={handleVideoClick}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className="video__overlay" />
                                            <video
                                                id="video-about"
                                                ref={videoRef}
                                                muted
                                                playsInline
                                                poster={
                                                    video_banner?.src
                                                        ? getImageURL(
                                                              video_banner.src
                                                          )
                                                        : undefined
                                                }
                                                width="100%"
                                                height="auto"
                                                onEnded={handleEnded}
                                                controls={false}
                                                onPlay={() =>
                                                    setIsPlaying(true)
                                                }
                                                onPause={() =>
                                                    setIsPlaying(false)
                                                }
                                            >
                                                {video?.src && (
                                                    <source
                                                        src={getImageURL(
                                                            video.src
                                                        )}
                                                        type="video/mp4"
                                                    />
                                                )}
                                                Your browser does not support
                                                the video tag.
                                            </video>
                                            {!isPlaying && (
                                                <a
                                                    type="button"
                                                    className="play__btn_wrap"
                                                    aria-label="Play Video"
                                                    href="#!"
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <svg
                                                        width={138}
                                                        height={138}
                                                        viewBox="0 0 138 138"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <circle
                                                            opacity="0.25"
                                                            cx={69}
                                                            cy={69}
                                                            r={69}
                                                            fill="white"
                                                        />
                                                        <circle
                                                            opacity="0.5"
                                                            cx={69}
                                                            cy={69}
                                                            r={49}
                                                            fill="white"
                                                        />
                                                        <circle
                                                            cx={69}
                                                            cy={69}
                                                            r={28}
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
                                </div>
                            )}
                            {/* Only render header/description/buttons if any exist */}
                            {(hasHeaderSection || hasButtons) && (
                                <div className="row justify-content-center">
                                    <div className="col-md-12 col-lg-8 col-xl-6">
                                        <div className="section_header">
                                            {heading && (
                                                <h3
                                                    className="heading text-center fs-48 fw-300"
                                                    dangerouslySetInnerHTML={{
                                                        __html: heading,
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
                                            {hasButtons && (
                                                <div className="prodtct_corporate_btn d-flex justify-content-center">
                                                    {product_video_buttons.map(
                                                        (btnObj, idx) => {
                                                            const btn =
                                                                btnObj.shop_button;
                                                            if (!btn)
                                                                return null;
                                                            return (
                                                                <div
                                                                    className="prodtct_corporate_btn_left"
                                                                    key={idx}
                                                                >
                                                                    <Button
                                                                        label={
                                                                            btn.title
                                                                        }
                                                                        href={
                                                                            btn.url_type ===
                                                                            "external"
                                                                                ? btn.url
                                                                                : btn.url
                                                                        }
                                                                        target={
                                                                            btn.open_new_tab ===
                                                                            "yes"
                                                                                ? "_blank"
                                                                                : undefined
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
