"use client";

import { useRef, useState } from "react";
import { getImageURL } from "@/lib";

export const AboutPageVideo = ({ data = {}, slug = "video" }) => {
    const { video, image, title, youtube_embeded_url } = data;

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef();

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

    return (
        <section className="corporate__film_section" id={slug}>
            <div className="custom-container">
                <div className="row">
                    <div className="col-12">
                        <div className="film__wrapper theme-gradient-home">
                            <div className="section_header text-center">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: title,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="film__video">
                            <div className="video__area">
                                <div
                                    className="video__container"
                                    style={{ position: "relative" }}
                                >
                                    {!youtube_embeded_url && !isPlaying && (
                                        <div className="video__overlay" />
                                    )}
                                    {youtube_embeded_url ? (
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                paddingTop: "56.25%",
                                            }}
                                        >
                                            <iframe
                                                src={youtube_embeded_url}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "12px",
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <video
                                                ref={videoRef}
                                                id="video-about"
                                                playsInline
                                                poster={getImageURL(image?.src)}
                                                width="100%"
                                                height="auto"
                                                onEnded={handleEnded}
                                                controls={false}
                                                style={{
                                                    cursor: "pointer",
                                                    borderRadius: "12px",
                                                }}
                                                onClick={handleVideoClick}
                                            >
                                                <source
                                                    src={getImageURL(
                                                        video?.src
                                                    )}
                                                    type="video/mp4"
                                                />
                                            </video>

                                            {/* Play button overlay only when video is NOT playing */}
                                            {!isPlaying && (
                                                <a
                                                    type="button"
                                                    className="play__btn_wrap"
                                                    aria-label="Play Video"
                                                    href="#!"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleVideoClick();
                                                    }}
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform:
                                                            "translate(-50%, -50%)",
                                                        zIndex: 2,
                                                    }}
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
