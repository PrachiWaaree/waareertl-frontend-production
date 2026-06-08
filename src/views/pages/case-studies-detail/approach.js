"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const CaseStudyDetailPageApproachSection = ({ data = {} }) => {
    const { heading, image, description, subheading } = data;

    const hasHeading = !!heading;
    const hasSubheading = !!subheading;
    const hasDescription = !!description;
    const hasImage = image && image.src;

    return (
        <>
            <section className="our__approach_section">
                <div className="custom-container">
                    {hasHeading && (
                        <div className="row top__row">
                            <div className="col-12">
                                <div className="section_header text-center">
                                    <h3
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: heading,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {(hasSubheading || hasDescription || hasImage) && (
                        <div className="row">
                            {(hasSubheading || hasDescription) && (
                                <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                                    <div className="approach_block">
                                        {hasSubheading && (
                                            <div className="section_header">
                                                <h4
                                                    className="heading fs-28 fw-400"
                                                    dangerouslySetInnerHTML={{
                                                        __html: subheading,
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
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
