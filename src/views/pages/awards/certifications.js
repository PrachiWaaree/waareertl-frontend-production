"use client";
/* eslint-disable @next/next/no-img-element, no-unused-vars */

import { Button } from "@/components";
//
import { Pagination } from "swiper/modules";
import { useCommonContext } from "@/contexts";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const AwardsPageCertifications = ({
    data = {},
    slug = "certifications",
}) => {
    const {
        ["background_image"]: backgroundImage,
        ["one-liner"]: oneLiner,
        cta,
        button,
        certificates,
        title,
    } = data;

    const { is768 } = useCommonContext();

    const { options } = useSwiperSliderOptions({
        slidesPerView: 1,
        enabled: true,
        modules: [Pagination],
        pagination: {
            enabled: true,
            type: "bullets",
            clickable: true,
        },
        breakpoints: {
            767: {
                pagination: {
                    enabled: false,
                },
            },
        },
    });

    const hasSectionData =
        (backgroundImage && backgroundImage.src) ||
        title ||
        (Array.isArray(certificates) && certificates.length > 0) ||
        (button && button.title);

    if (!hasSectionData) {
        return null;
    }

    return (
        <>
            <section className="certification__section" id={slug}>
                <div className="custom-container">
                    <div
                        className="certificate__section_bg"
                        style={{
                            backgroundImage: backgroundImage?.src
                                ? `url(${getImageURL(backgroundImage?.src)})`
                                : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "50% 50%",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="section-overlay" />
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-2 col-lg-4 col-xl-5" />
                            <div className="col-12 col-sm-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="certificate__wrapper">
                                    {title && (
                                        <div className="section_header">
                                            <h2
                                                className="heading fs-48 fw-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: title,
                                                }}
                                            />
                                        </div>
                                    )}
                                    {Array.isArray(certificates) &&
                                    certificates.length > 0 ? (
                                        is768 ? (
                                            <div className="certificate__slider item__wrap">
                                                <Swiper {...options}>
                                                    {certificates.map(
                                                        (item, index) => (
                                                            <SwiperSlide
                                                                key={index}
                                                            >
                                                                <RenderCertificate
                                                                    key={index}
                                                                    item={item}
                                                                />
                                                            </SwiperSlide>
                                                        ),
                                                    )}
                                                </Swiper>
                                            </div>
                                        ) : (
                                            <div className="lg-block item__wrap">
                                                {certificates.map(
                                                    (item, index) => (
                                                        <RenderCertificate
                                                            key={index}
                                                            item={item}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        )
                                    ) : null}
                                    {button && button.title && (
                                        <Button
                                            label={button?.title}
                                            href={
                                                button?.url_type === "external"
                                                    ? button?.external_url
                                                    : button?.url
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const RenderCertificate = ({ item }) => {
    if (!item) return null;
    return (
        <div className="single__item">
            {item.icon && item.icon.src && (
                <div className="icon__wrap">
                    <img
                        loading="lazy"
                        className="img-fluid"
                        src={getImageURL(item?.icon?.src)}
                        alt={item?.icon?.alt}
                    />
                </div>
            )}
            <div className="content__wrap">
                {item.name && (
                    <h4
                        className="heading fs-28 fw-400"
                        dangerouslySetInnerHTML={{
                            __html: item.name,
                        }}
                    ></h4>
                )}
            </div>
            {item.button && item.button.title && (
                <Button
                    label={item?.button?.title}
                    href={
                        item?.button?.url_type === "external"
                            ? item?.button?.url
                            : item?.button?.external_url
                    }
                />
            )}
        </div>
    );
};
