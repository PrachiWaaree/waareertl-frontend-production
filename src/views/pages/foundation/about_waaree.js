"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const FoundationPageAbout = ({ data = {}, slug="about_waaree" }) => {
    const { description, title, bottom_image, right_image, top_image } = data;

    return (
        <>
            <section className="about_foundation_section" id={slug}>
                <div className="section_overlay"></div>
                <div className="custom-container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-lg-6 col-xl-6">
                            <div className="section_header">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />

                                <div className="content__wrap">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-6">
                            <div className="foundation_img text-right d-flex align-items-center justify-content-center">
                                <div className="founation_left_img">
                                    <div className="foundation_top_img">
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(top_image?.src)}
                                            alt={top_image?.alt || ""}/>
                                    </div>
                                    <div className="foundation_bottom_img">
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(bottom_image?.src)}
                                            alt={bottom_image?.alt || ""}/>
                                    </div>
                                </div>
                                <div className="founation_right_img">
                                    <div className="foundation_right_center">
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(right_image?.src)}
                                            alt={right_image?.alt || ""}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
