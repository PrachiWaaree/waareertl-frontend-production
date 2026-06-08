"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const GrievancePageSolution = ({
    data = {},
    slug = "grievance_solutions",
}) => {
    const { title, image } = data;

    return (
        <>
            <section className="address_concerns_sec">
                <div className="custom-container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-lg-7 col-xl-7">
                            <div className="section_header">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: title,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="address_concerns_bottom">
                                <div className="address_concerns_img">
                                    <OptimizedImage
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
