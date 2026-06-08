"use client";
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components";
import { getImageURL } from "@/lib";

export const AboutPageSustainability = ({
    data = {},
    slug = "sustainability",
}) => {
    const { button, description, heading, image } = data;

    if (!heading || !description || !image?.src) {
        return null;
    }

    return (
        <section className="sustainability_section" id={slug}>
            <div className="custom-container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-5">
                        <div className="section_header">
                            {heading ? (
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                            ) : null}
                        </div>
                        <div className="content__wrap">
                            {description ? (
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            ) : null}
                        </div>
                        {button &&
                        button?.title &&
                        (button?.url || button?.external_url) ? (
                            <Button
                                label={button?.title}
                                href={
                                    button?.url_type === "external"
                                        ? button?.external_url
                                        : button?.url
                                }
                            />
                        ) : null}
                    </div>
                    <div className="col-12 col-lg-7">
                        <div className="img__wrapper">
                            {image?.src ? (
                                <img loading="lazy"
                                
                                    className="img-fluid"
                                    src={getImageURL(image?.src)}
                                    alt={image?.alt || ""}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
