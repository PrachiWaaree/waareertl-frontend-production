"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
//
import { Button, OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const MediaPagePrintMediaSection = ({
    data = {},
    slug = "print_media",
}) => {
    const { title, medias } = data;

    const { options } = useSwiperSliderOptions({
        loop: true,
        centeredSlides: true,
        modules: [Pagination],
        pagination: {
            el: ".featured_slide_pagination",
            clickable: true,
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
        <section className="featured_blog_section pr_featured_blog" id={slug}>
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="section_header text-center">
                            {title && (
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {medias?.length > 0 && (
                <div>
                    <Swiper className="featured_slider_new" {...options}>
                        {medias?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="featured_inner_section">
                                    <div className="featured_image">
                                        {item?.template_fields?.thumbnail_image
                                            ?.src && (
                                            <OptimizedImage
                                                src={getImageURL(
                                                    item?.template_fields
                                                        ?.thumbnail_image?.src
                                                )}
                                                alt={
                                                    item?.template_fields
                                                        ?.thumbnail_image
                                                        ?.alt || ""
                                                }/>
                                        )}
                                        <div className="featured_inner_content pos-absolute">
                                            <div className="row align-items-end">
                                                <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                                                    <div className="top__block">
                                                        {Array.isArray(
                                                            item?.tag_data?.type
                                                        ) &&
                                                            item?.tag_data?.type
                                                                .length > 0 && (
                                                                <ul className="h5 heading fs-20 fw-600 list-unstyled">
                                                                    {item.tag_data.type.map(
                                                                        (tag) =>
                                                                            tag?.name && (
                                                                                <li
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
                                                                    <li>
                                                                        Template
                                                                    </li>
                                                                </ul>
                                                            )}
                                                        {item?.publish_date && (
                                                            <div
                                                                className="publish__date"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item?.publish_date,
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    {item?.name && (
                                                        <div
                                                            className="content_part_featured fs-20 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item?.name,
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-sm-right">
                                                    <div className="btn-group">
                                                        {item?.slug && (
                                                            <Button
                                                                href={
                                                                    item?.slug
                                                                }
                                                                label="Read more"
                                                                srText={`about ${item?.name}`}
                                                            />
                                                        )}
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
