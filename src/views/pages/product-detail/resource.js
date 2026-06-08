"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//
import { Button, OptimizedImage } from "@/components";
import { useCommonContext } from "@/contexts";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const ProductPageResource = ({ data = {} }) => {
    const {
        title,
        parent_class,
        button,
        ["reference-by-blog"]: referenceBlog,
        ["reference-by-media"]: referenceMedia,
        ["reference-by-whitepaper"]: referenceWhitepaper,
        ["reference-by-case-study"]: referencecaseStudy,
    } = data;

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

    const [selected, setSelected] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    const handleChange = (event) => {
        const newValue = event?.target?.value;
        setSelected(newValue);
        setFilteredBlogs(getFilteredResources(newValue));
    };

    const getFilteredResources = (slug = "") => {
        switch (slug) {
            case "blog":
                return referenceBlog?.list || referenceBlog || [];
            case "media":
                return referenceMedia?.list || referenceMedia || [];
            case "whitepaper":
                return referenceWhitepaper?.list || referenceWhitepaper || [];
            case "case_study":
                return referencecaseStudy?.list || referencecaseStudy || [];
            default:
                return [
                    referenceBlog?.list?.[0] || referenceBlog?.[0],
                    referenceMedia?.list?.[0] || referenceMedia?.[0],
                    referenceWhitepaper?.list?.[0] ||
                        referenceWhitepaper?.[0],
                    referencecaseStudy?.list?.[0] ||
                        referencecaseStudy?.[0],
                ];
        }
    };

    const { sliderButtons, nextSlide, prevSlide, options } =
        useSwiperSliderOptions({
            slidesPerView: slidesToShow,
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

    useEffect(() => {
        setFilteredBlogs(getFilteredResources(""));
    }, []);

    return (
        <section className={`resource__section ${parent_class || ""}`}>
            <div className="custom-container">
                <div className="section_header">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-4 col-xl-5">
                            <h4
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: title || "Resources",
                                }}
                            />
                        </div>
                        <div className="col-12 col-md-8 col-lg-8 col-xl-7">
                            <div className="btn-group">
                                <form action="">
                                    <select
                                        className="form-field"
                                        name="options"
                                        aria-label="Filter resources"
                                        value={selected}
                                        onChange={handleChange}
                                    >
                                        <option value="">All Resources</option>
                                        <option value="blog">Blog</option>
                                        <option value="media">Media</option>
                                        <option value="whitepaper">
                                            Whitepaper
                                        </option>
                                        <option value="case_study">
                                            Case Study
                                        </option>
                                    </select>
                                </form>

                                <Button
                                    label={button?.title}
                                    href={button?.url}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-container-fluid">
                <div className="blog__slider">
                    <Swiper {...options}>
                        {filteredBlogs?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <RenderBlog item={item} index={index} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                {filteredBlogs?.length > slidesToShow && (
                    <div className="row">
                        <div className="col-12">
                            <ul className="blog__slider_btn list-unstyled justify-content-center">
                                <li
                                    className="prev-btn-blog"
                                    onClick={prevSlide}
                                >
                                    <a
                                        href="#!"
                                        aria-label="Previous Slide"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <svg
                                            width={65}
                                            height={65}
                                            viewBox="0 0 65 65"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            opacity={
                                                sliderButtons?.hasPrev ? 1 : 0.5
                                            }
                                            style={{
                                                filter: `saturate(${
                                                    sliderButtons?.hasPrev
                                                        ? 1
                                                        : 0
                                                })`,
                                            }}
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
                                    className="next-btn-blog"
                                    onClick={nextSlide}
                                >
                                    <a
                                        href="#!"
                                        aria-label="Next Slide"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <svg
                                            width={65}
                                            height={65}
                                            viewBox="0 0 65 65"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            opacity={
                                                sliderButtons?.hasNext ? 1 : 0.5
                                            }
                                            style={{
                                                filter: `saturate(${
                                                    sliderButtons?.hasNext
                                                        ? 1
                                                        : 0
                                                })`,
                                            }}
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
                )}
            </div>
        </section>
    );
};

const RenderBlog = ({ item }) => {
    return (
        <div className="item__wrap">
            <div className="single__item">
                <div className="img__wrap">
                    <OptimizedImage
                        className="img-fluid"
                        src={getImageURL(
                            item?.template_fields?.thumbnail_image?.src ||
                                "/upload/media/resources_1_1748408224.png"
                        )}
                        alt={item?.template_fields?.thumbnail_image?.alt}/>
                </div>
                <div className="content_block">
                    <h5
                        className="h5 heading fs-20 fw-600 text-gradient"
                        dangerouslySetInnerHTML={{
                            __html: item?.template_name,
                        }}
                    />

                    <div className="content__wrap fw-600 fs-20">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: item?.name,
                            }}
                        />
                    </div>

                    <div
                        className="publish__date"
                        dangerouslySetInnerHTML={{ __html: item?.publish_date }}
                    />

                    <div className="btn-group">
                        <Button
                            label="Read more"
                            href="#!"
                            srText={`about ${item?.name}`}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
