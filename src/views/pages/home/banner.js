"use client";

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const HomePageBanner = ({ data = {}, slug = "home-banner" }) => {
    const { list = [], banner_scroll_text, link } = data;

    const hasBannerData =
        Array.isArray(list) &&
        list.some(
            (item) =>
                (item?.video?.src || item?.thumbnail_image?.src) &&
                (item?.title ||
                    item?.description ||
                    (item?.button?.title && item?.button?.url))
        );

    if (!hasBannerData) return null;

    const options = {
        loop: true,
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        pagination: {
            el: ".banner-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: ".prev-btn-solution",
            nextEl: ".next-btn-solution",
        },
        breakpoints: {
            260: { slidesPerView: 1, centeredSlides: true, spaceBetween: 20 },
            600: { slidesPerView: 1, spaceBetween: 20 },
            767: { slidesPerView: 1, spaceBetween: 20 },
        },
    };

    return (
        <section className="home__banner" id={slug}>
            <div className="banner__rtl_wrapper">
                <div className="banner__rtl_slider">
                    <Swiper {...options} className="banner-swiper">
                        {list.map((item, idx) => {
                            const {
                                video,
                                thumbnail_image,
                                title,
                                description,
                                button,
                            } = item || {};
                            const videoSrc = video?.src
                                ? getImageURL(video.src)
                                : null;
                            const thumbSrc = thumbnail_image?.src
                                ? getImageURL(thumbnail_image.src)
                                : null;

                            if (
                                !(
                                    videoSrc ||
                                    thumbSrc ||
                                    title ||
                                    description ||
                                    (button?.title && button?.url)
                                )
                            ) {
                                return null;
                            }

                            return (
                                <SwiperSlide key={idx}>
                                    <div className="item__wrap">
                                        <div className="img__wrap">
                                            {videoSrc ? (
                                                <video
                                                    id={`video-main-${idx}`}
                                                    autoPlay
                                                    playsInline
                                                    loop
                                                    muted
                                                    poster={thumbSrc || ""}
                                                    width="100%"
                                                    height="auto"
                                                >
                                                    <source
                                                        src={videoSrc}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            ) : thumbSrc ? (
                                                <OptimizedImage
                                                    className="img-fluid bg_img"
                                                    src={thumbSrc}
                                                    alt={
                                                        thumbnail_image?.alt ||
                                                        "Banner"
                                                    }
                                                />
                                            ) : null}
                                        </div>
                                        <div className="single__item">
                                            <div className="custom-container">
                                                <div className="row justify-content-center">
                                                    <div className="col-12 col-md-10 col-lg-8">
                                                        <div className="banner__area">
                                                            <div className="banner__content text-white text-center">
                                                                {title && (
                                                                    <h1
                                                                        className="h1 fs-72 fw-300 text-white"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: title,
                                                                        }}
                                                                    />
                                                                )}
                                                                {description && (
                                                                    <div className="content__wrap fs-20 text-white">
                                                                        <p
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: description,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                                {button?.title && (
                                                                    <Button
                                                                        label={
                                                                            button.title
                                                                        }
                                                                        href={
                                                                            button?.url_type ===
                                                                            "external"
                                                                                ? button?.external_url
                                                                                : button?.url
                                                                        }
                                                                        target={
                                                                            button.open_new_tab ===
                                                                            "yes"
                                                                                ? "_blank"
                                                                                : undefined
                                                                        }
                                                                        rel={
                                                                            button.open_new_tab ===
                                                                            "yes"
                                                                                ? "noopener noreferrer"
                                                                                : undefined
                                                                        }
                                                                        type={
                                                                            button.url_type
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <div className="banner-pagination" />
                </div>

                <div className="scroll_main_deta">
                    <a
                        href={link?.url || "#"}
                        onClick={(e) => {
                            if (
                                link?.url?.startsWith("#") &&
                                link.open_new_tab !== "yes"
                            ) {
                                e.preventDefault();
                                const targetElement = document.getElementById(
                                    link.url.slice(1)
                                );
                                if (targetElement) {
                                    const y =
                                        targetElement.getBoundingClientRect()
                                            .top +
                                        window.pageYOffset -
                                        50;
                                    window.scrollTo({
                                        top: y,
                                        behavior: "smooth",
                                    });
                                }
                            }
                        }}
                        target={
                            link?.open_new_tab === "yes" ? "_blank" : undefined
                        }
                        rel={
                            link?.open_new_tab === "yes"
                                ? "noopener noreferrer"
                                : undefined
                        }
                    >
                        <div
                            className="scroll_deta text-white"
                            dangerouslySetInnerHTML={{
                                __html: banner_scroll_text,
                            }}
                        />
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={8}
                                height={42}
                                viewBox="0 0 8 42"
                                fill="none"
                            >
                                <path
                                    d="M3.64644 41.3536C3.84171 41.5488 4.15829 41.5488 4.35355 41.3536L7.53553 38.1716C7.73079 37.9763 7.73079 37.6597 7.53553 37.4645C7.34027 37.2692 7.02369 37.2692 6.82843 37.4645L4 40.2929L1.17157 37.4645C0.976309 37.2692 0.659727 37.2692 0.464464 37.4645C0.269202 37.6597 0.269202 37.9763 0.464464 38.1716L3.64644 41.3536ZM4 0L3.5 -2.18557e-08L3.5 41L4 41L4.5 41L4.5 2.18557e-08L4 0Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};
