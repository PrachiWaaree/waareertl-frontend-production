"use client";
/* eslint-disable no-unused-vars */

import { Swiper, SwiperSlide } from "swiper/react";
//
import { Button, OptimizedImage } from "@/components";
import { useCommonContext } from "@/contexts";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const FoundationPageResource = ({
    data = {},
    slug = "foundation_resource",
}) => {
    const { title, button, resources, cta, parent_class } = data;

    const { is480, is768, is992, is1200, isDesktop } = useCommonContext();

    let slidesToShow = 1;

    if (is480) {
        slidesToShow = 1;
    } else if (is768) {
        slidesToShow = 2;
    } else if (is992 || is1200) {
        slidesToShow = 3;
    } else if (isDesktop) {
        slidesToShow = 4;
    }

    const { sliderButtons, nextSlide, prevSlide, options } =
        useSwiperSliderOptions({
            slidesPerView: 4,
            noSwiping: false,
            noSwipingClass: "img_wrap",
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                },
            },
        });

    return (
        <section
            className={`resource__section ${parent_class || ""}`}
            id={slug}
        >
            <div className="custom-container">
                <div className="section_header">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <h4
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: title || "Resources",
                                }}
                            />
                        </div>
                        <div className="col-12 col-md-4 col-lg-6 col-xl-7">
                            <div className="btn-group">
                                <Button
                                    label={cta?.title}
                                    href={cta?.url || "#"}
                                    onClick={(e) => {
                                        if (!cta?.url) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="custom-container-fluid">
                <div className="blog__slider media__slider">
                    <Swiper {...options}>
                        {resources?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <RenderBlog item={item} index={index} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                {resources?.length > slidesToShow && (
                    <div className="row">
                        <div className="col-12">
                            <ul className="blog__slider_btn list-unstyled justify-content-center">
                                <li
                                    className="prev-btn-blog"
                                    onClick={prevSlide}
                                    style={{
                                        filter: `saturate(${
                                            sliderButtons?.hasPrev ? 1 : 0
                                        })`,
                                    }}
                                >
                                    <a
                                        href="#!"
                                        aria-label="Previous Slide"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <svg
                                            width={87}
                                            height={87}
                                            viewBox="0 0 89 87"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            opacity={
                                                sliderButtons?.hasPrev
                                                    ? "1"
                                                    : "0.25"
                                            }
                                        >
                                            <rect
                                                x={-1}
                                                y={1}
                                                width={85}
                                                height={85}
                                                rx="42.5"
                                                transform="matrix(-1 0 0 1 85 0)"
                                                stroke="#5B5B5B"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M62.9744 42.0003C63.5265 41.9862 63.9855 42.4223 63.9997 42.9744C64.0138 43.5265 63.5777 43.9855 63.0256 43.9997L62.9744 42.0003ZM23.3112 44.725C22.9108 44.3446 22.8946 43.7117 23.275 43.3113L29.4737 36.7863C29.8541 36.3858 30.4871 36.3696 30.8875 36.75C31.2879 37.1304 31.3041 37.7633 30.9237 38.1638L25.4138 43.9637L31.2137 49.4737C31.6142 49.8541 31.6304 50.4871 31.25 50.8875C30.8696 51.2879 30.2367 51.3041 29.8362 50.9237L23.3112 44.725ZM63 43L63.0256 43.9997L24.0256 44.9997L24 44L23.9744 43.0003L62.9744 42.0003L63 43Z"
                                                fill="#5B5B5B"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li
                                    className="next-btn-blog"
                                    onClick={nextSlide}
                                    style={{
                                        filter: `saturate(${
                                            sliderButtons?.hasNext ? 1 : 0
                                        })`,
                                    }}
                                >
                                    <a
                                        href="#!"
                                        aria-label="Next Slide"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <svg
                                            width={87}
                                            height={87}
                                            viewBox="0 0 89 87"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            opacity={
                                                sliderButtons?.hasNext
                                                    ? "1"
                                                    : "0.25"
                                            }
                                        >
                                            <rect
                                                x={1}
                                                y={1}
                                                width={85}
                                                height={85}
                                                rx="42.5"
                                                stroke="#0DB02B"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M24.0256 42.0003C23.4735 41.9862 23.0145 42.4223 23.0003 42.9744C22.9862 43.5265 23.4223 43.9855 23.9744 43.9997L24.0256 42.0003ZM63.6888 44.725C64.0892 44.3446 64.1054 43.7117 63.725 43.3113L57.5263 36.7863C57.1459 36.3858 56.5129 36.3696 56.1125 36.75C55.7121 37.1304 55.6959 37.7633 56.0763 38.1638L61.5862 43.9637L55.7863 49.4737C55.3858 49.8541 55.3696 50.4871 55.75 50.8875C56.1304 51.2879 56.7633 51.3041 57.1638 50.9237L63.6888 44.725ZM24 43L23.9744 43.9997L62.9744 44.9997L63 44L63.0256 43.0003L24.0256 42.0003L24 43Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const RenderBlog = ({ item = {} }) => {
    const { template_name, name, slug, template_fields, publish_date } =
        item || {};

    return (
        <div className="item__wrap">
            <div className="single__item">
                <div className="img__wrap">
                    <OptimizedImage
                        className="img-fluid"
                        src={getImageURL(
                            template_fields?.thumbnail_image?.src ||
                                "/upload/media/resources_1_1748408224.png",
                        )}
                        alt={template_fields?.thumbnail_image?.alt}/>
                </div>

                <div className="content_block">
                    <div className="top__block">
                        <ul className="h5 heading fs-20 fw-600 list-unstyled">
                            <li className="text-gradient">{template_name}</li>
                        </ul>

                        <div
                            className="publish__date"
                            dangerouslySetInnerHTML={{
                                __html: publish_date,
                            }}
                        />
                    </div>

                    <div className="content__wrap">
                        <h4
                            className="heading fw-600 fs-20"
                            dangerouslySetInnerHTML={{
                                __html:
                                    name?.length > 60
                                        ? `${name?.substring(0, 60)}...`
                                        : name,
                            }}
                        />

                        <p
                            dangerouslySetInnerHTML={{
                                __html:
                                    template_fields?.subtitle?.length > 40
                                        ? `${template_fields?.subtitle?.substring(
                                              0,
                                              40,
                                          )}...`
                                        : template_fields?.subtitle,
                            }}
                        />
                    </div>

                    <div className="btn-group">
                        <Button label="Read more" href={`/${slug}`} srText={`about ${name}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};
