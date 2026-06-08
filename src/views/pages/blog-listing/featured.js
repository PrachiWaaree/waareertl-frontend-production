"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

export const BlogListingPageFeaturedSection = ({
    data = {},
    slug = "featured-blog",
}) => {
    const { title, description, ["blog-slider"]: blogSlider } = data;

    const { options } = useSwiperSliderOptions({
        loop: true,
        // effect: "coverflow",
        centeredSlides: true,
        modules: [Pagination],
        pagination: {
            el: ".featured_slide_pagination",
            clickable: true,
            // dynamicBullets: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2.5,
            },
            768: {
                slidesPerView: 1.35,
            },
            1080: {
                slidesPerView: 1.35,
            },
            1200: {
                slidesPerView: 1.35,
            },
            1400: {
                slidesPerView: "auto",
            },
        },
    });

    return (
        <section className="featured_blog_section" id={slug}>
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="section_header text-center">
                            <h4
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />

                            <div className="content__wrap text-center">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                                {/* {" "} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Array.isArray(blogSlider) && blogSlider?.length > 0 && (
                <div>
                    <Swiper className="featured_slider_new" {...options}>
                        {blogSlider?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="featured_inner_section">
                                    <div className="featured_image">
                                        <img loading="lazy"
                                            src={getImageURL(
                                                item?.template_fields?.image
                                                    ?.src ||
                                                    item?.template_fields
                                                        ?.feature_image?.src
                                            )}
                                            alt={
                                                item?.template_fields?.image
                                                    ?.alt ||
                                                item?.template_fields
                                                    ?.feature_image?.alt
                                            }
                                        />
                                        <div className="featured_inner_content pos-absolute">
                                            <div className="row align-items-end">
                                                <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                                                    <div className="top__block">
                                                        <ul className="h5 heading fs-20 fw-600 list-unstyled">
                                                            <li className="text-gradient">
                                                                Blog
                                                            </li>
                                                            {item?.tag_data?.category?.map(
                                                                (tag) => (
                                                                    <li
                                                                        className="text-gradient"
                                                                        key={
                                                                            tag?.id
                                                                        }
                                                                    >
                                                                        {
                                                                            tag?.name
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                        <div
                                                            className="publish__date fs-20 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.publish_date,
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        className="content_part_featured fs-20 fw-600"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item
                                                                ?.template_fields
                                                                ?.short_description,
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-sm-right">
                                                    <div className="btn-group">
                                                        <Button
                                                            href={item?.slug}
                                                            openNewTab={false}
                                                            label={
                                                                item
                                                                    ?.template_fields
                                                                    ?.button
                                                                    ?.title ||
                                                                "Read more"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="featured_slide_pagination" />
                </div>
            )}
        </section>
    );
};
