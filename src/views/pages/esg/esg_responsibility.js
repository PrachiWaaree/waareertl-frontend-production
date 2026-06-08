"use client";
/* eslint-disable no-unused-vars */

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const EsgOurResponsibility = ({ data = {} }) => {
    const { title, description, esg_responsibility = [] } = data;

    return (
        <section className="our_extended_sec">
            <div className="section_bg" />
            <div className="section_overlay" />
            <div className="custom-container">
                <div className="our_extended_inner row align-items-center">
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <div className="our_extended_left">
                            <div className="our_extended_img">
                                <OptimizedImage
                                        src={getImageURL(
                                            "https://waaree-rtl.devsproject.com/upload/media/our_extended_1754455961.webp"
                                        )}
                                        alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <div className="our_extended_right">
                            <div className="section_header">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />

                                <div className="content__wrap para_content">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
