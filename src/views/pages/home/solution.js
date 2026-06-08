"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button, OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const HomePageSolution = ({ data = {}, slug = "waaree_solutions" }) => {
    const { heading, subheading, description, list = [], button } = data;

    const {
        nextSlide,
        prevSlide,
        options: imagesSliderOptions,
    } = useSwiperSliderOptions({
        modules: [Navigation],
        clickable: "true",
        loop: true,
        slidesPerView: "4",
        navigation: {
            prevEl: ".prev-btn-solution",
            nextEl: ".next-btn-solution",
        },
        breakpoints: {
            260: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 20,
            },
            600: {
                centeredSlides: false,
                slidesPerView: 2,
                spaceBetween: 20,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });

    return (
        <section className="our_solution_section" id={slug}>
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-10">
                        <div className="section_header">
                            {heading && (
                                <h3
                                    className="heading text-center fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                            )}
                            {subheading && (
                                <h5
                                    className="heading_small fs-20 fw-600 text-center"
                                    dangerouslySetInnerHTML={{
                                        __html: subheading,
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
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                        {/* Desktop view */}
                        <div className="our_solution_inner d-flex d-none d-lg-flex">
                            {Array.isArray(list) &&
                                list.map((item, idx) => (
                                    <div className="item__wrap" key={idx}>
                                        <div className="single__item">
                                            <a
                                                href={item?.button?.url || "#"}
                                                target={
                                                    item?.button
                                                        ?.open_new_tab === "yes"
                                                        ? "_blank"
                                                        : undefined
                                                }
                                                rel={
                                                    item?.button
                                                        ?.open_new_tab === "yes"
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                            >
                                                <div className="img__wrap">
                                                    <OptimizedImage
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            item?.image?.src
                                                        )}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="content_block d-flex justify-content-between align-items-center">
                                                    <h4
                                                        className="heading text-white fw-500 fs-36"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.title,
                                                        }}
                                                    />

                                                    <div className="small_arrow">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={20}
                                                            height={20}
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M0.292893 18.2929C-0.0976311 18.6834 -0.0976311 19.3166 0.292893 19.7071C0.683418 20.0976 1.31658 20.0976 1.70711 19.7071L1 19L0.292893 18.2929ZM19.4229 1.57712C19.4229 1.02483 18.9752 0.577119 18.4229 0.577119L9.42288 0.577119C8.87059 0.577119 8.42288 1.02483 8.42288 1.57712C8.42288 2.1294 8.87059 2.57712 9.42288 2.57712L17.4229 2.57712L17.4229 10.5771C17.4229 11.1294 17.8706 11.5771 18.4229 11.5771C18.9752 11.5771 19.4229 11.1294 19.4229 10.5771L19.4229 1.57712ZM1 19L1.70711 19.7071L19.13 2.28423L18.4229 1.57712L17.7158 0.870012L0.292893 18.2929L1 19Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {/* Mobile view */}
                        <div className="our_solution_inner d-block d-lg-none">
                            <div className="our_solution_slider">
                                <Swiper {...imagesSliderOptions}>
                                    {Array.isArray(list) &&
                                        list.map((item, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div className="item__wrap">
                                                    <div className="single__item">
                                                        <a
                                                            href={
                                                                item?.button
                                                                    ?.url || "#"
                                                            }
                                                            target={
                                                                item?.button
                                                                    ?.open_new_tab ===
                                                                "yes"
                                                                    ? "_blank"
                                                                    : undefined
                                                            }
                                                            rel={
                                                                item?.button
                                                                    ?.open_new_tab ===
                                                                "yes"
                                                                    ? "noopener noreferrer"
                                                                    : undefined
                                                            }
                                                        >
                                                            <div className="img__wrap">
                                                                <OptimizedImage
                                                                    className="img-fluid"
                                                                    src={getImageURL(
                                                                        item
                                                                            ?.image
                                                                            ?.src
                                                                    )}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="content_block d-flex justify-content-between align-items-center">
                                                                <h4
                                                                    className="heading text-white fw-500 fs-36"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item?.title,
                                                                    }}
                                                                />

                                                                <div className="small_arrow">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width={
                                                                            20
                                                                        }
                                                                        height={
                                                                            20
                                                                        }
                                                                        viewBox="0 0 20 20"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M0.292893 18.2929C-0.0976311 18.6834 -0.0976311 19.3166 0.292893 19.7071C0.683418 20.0976 1.31658 20.0976 1.70711 19.7071L1 19L0.292893 18.2929ZM19.4229 1.57712C19.4229 1.02483 18.9752 0.577119 18.4229 0.577119L9.42288 0.577119C8.87059 0.577119 8.42288 1.02483 8.42288 1.57712C8.42288 2.1294 8.87059 2.57712 9.42288 2.57712L17.4229 2.57712L17.4229 10.5771C17.4229 11.1294 17.8706 11.5771 18.4229 11.5771C18.9752 11.5771 19.4229 11.1294 19.4229 10.5771L19.4229 1.57712ZM1 19L1.70711 19.7071L19.13 2.28423L18.4229 1.57712L17.7158 0.870012L0.292893 18.2929L1 19Z"
                                                                            fill="currentColor"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <ul className="blog__slider_btn list-unstyled justify-content-center">
                                        <li
                                            className="prev-btn-solution"
                                            onClick={prevSlide}
                                        >
                                            <a
                                                href="#!"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                                aria-label="Previous Slide"
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
                                            className="next-btn-solution"
                                            onClick={nextSlide}
                                        >
                                            <a
                                                href="#!"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                                aria-label="Next Slide"
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
                                </div>
                            </div>
                        </div>
                        <div className="btn-group text-center">
                            <Button
                                label={button?.title}
                                href={button?.url}
                                target={
                                    button?.open_new_tab === "yes"
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    button?.open_new_tab === "yes"
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
