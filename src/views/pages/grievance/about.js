"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const GrievancePageAbout = ({
    data = {},
    slug = "grievance_solutions",
}) => {
    const { heading, description, image } = data;

    return (
        <>
            <section className="about_grievance_sec">
                <div className="custom-container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-lg-6 col-xl-6">
                            <div className="section_header">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />

                                <div className="content__wrap fs-24">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-6">
                            <div className="about_grievance_right text-right d-flex align-items-center justify-content-center">
                                <div className="about_grievance_img">
                                    <OptimizedImage
                                        className="img-fluid"
                                        src={getImageURL(image?.src)}
                                        alt={image?.alt || ""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
