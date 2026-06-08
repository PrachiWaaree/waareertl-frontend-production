"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const SolutionDetailPageEmpoweringSection = ({
    data = {},
    slug = "left_image_right_text",
}) => {
    const { heading, description, image } = data;

    return (
        <>
            <section className="empowering_large_scale_section" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-12 col-lg-7">
                            <div className="img__wrapper">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(image?.src || "")}
                                    alt={image?.alt}/>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-5">
                            <div className="section_header">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                            </div>
                            <div className="content__wrap fs-24">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
