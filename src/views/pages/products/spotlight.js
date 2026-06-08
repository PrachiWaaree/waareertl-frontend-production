"use client";
/* eslint-disable @next/next/no-img-element */
import { OptimizedImage } from "@/components";

import { useMediaQuery } from "@uidotdev/usehooks";
import { getImageURL } from "@/lib";

export const ProductPageSpotlight = ({ data = {}, slug = "innovative" }) => {
    const {
        title,
        ["background-image"]: backgroundImg,
        image,
        spotlight,
    } = data;

    const is768 = useMediaQuery("only screen and (max-width : 767px)");

    return (
        <section className="spotlight__section" id={slug}>
            <div className="custom-container">
                <div className="row">
                    <div className="col-12">
                        <div
                            className="spotlight__bg"
                            style={{
                                backgroundImage: `url(${getImageURL(
                                    backgroundImg?.src
                                )})`,
                                backgroundSize: "cover",
                                backgroundPosition: "50% 50%",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="section-overlay"></div>
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg col-xl-3 col-xxl-4"></div>
                                <div className="col-md-12 col-lg-10 col-xl-9 col-xxl-8">
                                    <div className="section_header text-center">
                                        <h4
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    </div>
                                    <div className="spotlight__block">
                                        <div
                                            className="spotlight__img"
                                            style={{
                                                display: is768
                                                    ? "none"
                                                    : "block",
                                            }}
                                        >
                                            <img loading="lazy"
                                                className="img-fluid"
                                                src={getImageURL(image?.src)}
                                                alt={image?.alt}
                                                style={{
                                                    display: is768
                                                        ? "none"
                                                        : "block",
                                                }}
                                            />
                                        </div>
                                        <div className="spotlight__wrapper">
                                            {spotlight?.map((light, index) => (
                                                <div
                                                    className={`spotlight spotlight__${
                                                        index + 1
                                                    }`}
                                                    key={index}
                                                >
                                                    <div className="img__wrap">
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                light?.icon?.src
                                                            )}
                                                            alt=""/>
                                                    </div>
                                                    <div className="content__wrap">
                                                        <h5
                                                            className="heading fs-20 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: light?.title,
                                                            }}
                                                        />

                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: light?.description,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
