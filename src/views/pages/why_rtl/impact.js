"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const WhyRtlPageImpact = ({ data = {}, slug = "our_impact impact_our_sec" }) => {
    const { heading, description, image, parent_class } = data;
    return (
        <>
            <section className={`our_impact ${parent_class || ""}`} id={slug}>
                <div className="custom-container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-5 ">
                            <div className="our_impact_left">
                                <div className="section_header">
                                    <h2
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: heading,
                                        }}
                                    />
                                </div>
                                <div className="content__wrap ">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7 ">
                            <div className="our_impact_img_wrapper">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(image?.src || "")}
                                    alt={image?.alt || ""}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
