"use client";
/* eslint-disable @next/next/no-img-element */

import { getImageURL } from "@/lib";

export const AboutPageWhoWeAre = ({ data = {}, slug = "who_we_are" }) => {
    const { image, description, heading } = data;

    return (
        <>
            <section className="who__we_are_section utiliy_who__we_sec" id={slug}>
                <div className="custom-container">
                    <div className="row">
                        {image?.src && (
                            <div className="col-12 col-lg-7">
                                <div className="img__wrapper">
                                    <img loading="lazy"
                                    
                                        className="img-fluid"
                                        src={getImageURL(image?.src)}
                                        alt={image?.alt || ""}
                                    />
                                </div>
                            </div>
                        )}
                        {(heading || description) && (
                            <div className="col-12 col-lg-5">
                                {heading && (
                                    <div className="section_header">
                                        <h2
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: heading,
                                            }}
                                        />
                                    </div>
                                )}
                                {description && (
                                    <div className="content__wrap">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
