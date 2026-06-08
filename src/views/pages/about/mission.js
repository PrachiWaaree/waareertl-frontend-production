"use client";
/* eslint-disable @next/next/no-img-element, no-unused-vars */

import { getImageURL } from "@/lib";

export const AboutPageMission = ({ data = {}, slug = "mission" }) => {
    const {
        ["banner-image"]: bannerImage,
        ["one-liner"]: oneLiner,
        cta,
        button,
        image,
        title,
        vision = [],
    } = data;

    return (
        <>
            <section className="vision__mission_section" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-7">
                            <div className="section_header text-center">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row vision_row">
                        <div className="col-12 col-md-6 col-lg-6 vision_col">
                            <div className="img__wrapper d-flex">
                                <img loading="lazy"
                                 
                                    className="img-fluid"
                                    src={getImageURL(image?.src)}
                                    alt={image?.alt}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 vision_col">
                            <div className="content__block">
                                {vision.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${
                                            index === 0 ? "vision" : "mission"
                                        }__area theme-gradient-home`}
                                    >
                                        <div className="icon__block">
                                            <div className="img__wrap">
                                                <img loading="lazy"
                                                
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        item?.icon?.src
                                                    )}
                                                    alt={item?.icon?.alt || ""}
                                                />
                                            </div>
                                            <h4
                                                className="heading fs-36 fw-500"
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.title,
                                                }}
                                            />
                                        </div>
                                        <div className="content__wrap">
                                            <p
                                                className="fs-18 fw-400"
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.description,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
