"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const CaseStudyDetailPageOutcomeSection = ({ data = {} }) => {
    const { heading, image, description, highlight_list = [] } = data;

    const hasImage = image && image.src;
    const hasHeading = !!heading;
    const hasDescription = !!description;

    return (
        <>
            <section className="outcome__section">
                <div className="custom-container">
                    <div className="row">
                        {hasImage && (
                            <div className="col-12 col-md-8 col-lg-6 col-xl-6">
                                <div className="img__wrapper">
                                    <OptimizedImage
                                        className="img-fluid"
                                        src={getImageURL(image?.src)}
                                        alt={image?.alt || ""}/>
                                </div>
                            </div>
                        )}
                        {(hasHeading || hasDescription) && (
                            <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                                <div className="outcome_block">
                                    {hasHeading && (
                                        <div className="section_header">
                                            <h4
                                                className="heading fs-48 fw-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: heading,
                                                }}
                                            />
                                        </div>
                                    )}
                                    {hasDescription && (
                                        <div className="content__wrap">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: description,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
