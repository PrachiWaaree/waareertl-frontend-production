"use client";

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const HomePageSustain = ({ data = {}, slug="sustain-&-reliable" }) => {
    if (!data || Object.keys(data).length === 0) return null;

    const { description, image, title, button } = data;

    if (!title && !description && !image?.src && !button?.title) return null;

    return (
        <section className="sustain__section" id={slug}>
            <div className="custom-container">
                <div className="row align-items-center">
                    {(title || description || (button && button.title)) && (
                        <div className="col-12 col-lg-7 col-xl-6">
                            <div className="section_header">
                                {title && (
                                    <h3
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                )}
                            </div>
                            {description && (
                                <div className="content__wrap fs-20">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            )}
                            {button && button.title && (
                                <div className="btn-group">
                                    <Button
                                        label={button.title}
                                        href={button.url}
                                        target={
                                            button.open_new_tab === "yes"
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            button.open_new_tab === "yes"
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {image && image.src && (
                        <div className="col">
                            <div className="img__wrap">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(image.src)}
                                    alt={image.alt || ""}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
