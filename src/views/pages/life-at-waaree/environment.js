"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

const hasContent = (str) => !!str && String(str).trim() !== "";

export const LifeAtWaareeEnvironemtSection = ({ data = {} }) => {
    const { title, description, image, parent_class } = data || {};

    const hasAnyData =
        hasContent(title) ||
        hasContent(description) ||
        (image && hasContent(image?.src));

    if (!hasAnyData) {
        return null;
    }

    return (
        <>
            <section className={`work__environment ${parent_class}`}>
                <div className="custom-container">
                    <div className="row justify-content-center align-items-center">
                        {(hasContent(title) || hasContent(description)) && (
                            <div className="col-12 col-md-12 col-lg-6 col-xl-5">
                                {hasContent(title) && (
                                    <div className="section_header">
                                        <h2
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    </div>
                                )}
                                {hasContent(description) && (
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
                        {image && hasContent(image?.src) && (
                            <div className="col-12 col-md-10 col-lg-6 col-xl-6 offset-xl-1">
                                <div className="img__wrapper">
                                    <OptimizedImage
                                        className="img-fluid"
                                        src={getImageURL(image?.src)}
                                        alt={image?.alt || ""}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
