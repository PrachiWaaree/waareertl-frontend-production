"use client";
/* eslint-disable no-unused-vars */

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button, OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const SolutionDetailPageRelatedSection = ({
    data = {},
    slug = "related_solution",
}) => {
    const { solution_list = [], title, button } = data;

    const {
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
        options: imagesSliderOptions,
    } = useSwiperSliderOptions({
        modules: [Navigation],
        clickable: true,
        loop: true,
        slidesPerView: 4,
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
        <>
            <section className="our_solution_section related_solution_sec">
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-10">
                            <div className="section_header">
                                <h3
                                    className="heading text-center fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                            {/* Desktop view */}
                            <div className="our_solution_inner d-flex d-none d-lg-flex">
                                {Array.isArray(solution_list) &&
                                    solution_list.map((item) => (
                                        <div
                                            className="item__wrap"
                                            key={item.id}
                                        >
                                            <div className="single__item">
                                                <a
                                                    href={
                                                        item.slug
                                                            ? `/solutions/${item.slug}`
                                                            : "#!"
                                                    }
                                                >
                                                    <div className="img__wrap">
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                item
                                                                    .template_fields
                                                                    ?.thumbnail_image
                                                                    ?.src
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
                                                    <div className="content_block d-flex justify-content-between align-items-center">
                                                        <h4
                                                            className="heading text-white fw-500 fs-36"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.name,
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
                            {/* Mobile/Tablet view */}
                            <div className="our_solution_inner d-block d-lg-none">
                                <div className="our_solution_slider">
                                    <Swiper {...imagesSliderOptions}>
                                        {Array.isArray(solution_list) &&
                                            solution_list.map((item) => (
                                                <SwiperSlide key={item.id}>
                                                    <div className="item__wrap">
                                                        <div className="single__item">
                                                            <a
                                                                href={
                                                                    item.slug
                                                                        ? `/solutions/${item.slug}`
                                                                        : "#!"
                                                                }
                                                            >
                                                                <div className="img__wrap">
                                                                    <OptimizedImage
                                                                        className="img-fluid"
                                                                        src={getImageURL(
                                                                            item
                                                                                .template_fields
                                                                                ?.thumbnail_image
                                                                                ?.src
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
                                                                <div className="content_block d-flex justify-content-between align-items-center">
                                                                    <h4
                                                                        className="heading text-white fw-500 fs-36"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item.name,
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
                                                className={
                                                    "prev-btn-solution" +
                                                    (!hasPrev
                                                        ? " swiper-button-disabled"
                                                        : "")
                                                }
                                            >
                                                <a
                                                    href="#!"
                                                    aria-label="Previous Slide"
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
                                                stroke="#0DB02B"
                                                strokeWidth={1.875}
                                            />
                                             <path
                                                d="M50.8125 33C51.3303 33 51.75 33.4197 51.75 33.9375C51.75 34.4553 51.3303 34.875 50.8125 34.875V33.9375V33ZM13.5751 34.6004C13.209 34.2343 13.209 33.6407 13.5751 33.2746L19.5413 27.3084C19.9074 26.9423 20.501 26.9423 20.8671 27.3084C21.2332 27.6745 21.2332 28.2681 20.8671 28.6342L15.5638 33.9375L20.8671 39.2408C21.2332 39.6069 21.2332 40.2005 20.8671 40.5666C20.501 40.9327 19.9074 40.9327 19.5413 40.5666L13.5751 34.6004ZM50.8125 33.9375V34.875H14.238V33.9375V33H50.8125V33.9375Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                                </a>
                                            </li>
                                            <li
                                                className={
                                                    "next-btn-solution" +
                                                    (!hasNext
                                                        ? " swiper-button-disabled"
                                                        : "")
                                                }
                                            >
                                                <a
                                                    href="#!"
                                                    aria-label="Next Slide"
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
                                                stroke="#0DB02B"
                                                strokeWidth={1.875}
                                            />
                                            <path
                                                d="M14.25 33C13.7322 33 13.3125 33.4197 13.3125 33.9375C13.3125 34.4553 13.7322 34.875 14.25 34.875V33.9375V33ZM51.4874 34.6004C51.8535 34.2343 51.8535 33.6407 51.4874 33.2746L45.5212 27.3084C45.1551 26.9423 44.5615 26.9423 44.1954 27.3084C43.8293 27.6745 43.8293 28.2681 44.1954 28.6342L49.4987 33.9375L44.1954 39.2408C43.8293 39.6069 43.8293 40.2005 44.1954 40.5666C44.5615 40.9327 45.1551 40.9327 45.5212 40.5666L51.4874 34.6004ZM14.25 33.9375V34.875H50.8245V33.9375V33H14.25V33.9375Z"
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
                                {button?.title && (
                                    <Button label={button.title} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
