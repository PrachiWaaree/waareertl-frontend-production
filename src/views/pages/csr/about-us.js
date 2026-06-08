"use client";

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const CsrAboutUs = ({ data = {}, slug="csr_about_us" }) => {
    const { heading, description, button } = data;

    return (
        <section className="who__we_are_section csr_about_us_sec" id={slug}>
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-7">
                        <div className="img__wrapper">
                            <OptimizedImage
                                className="img-fluid"
                                src={getImageURL(
                                    "https://waaree-rtl.devsproject.com/upload/media/who_we_are_1749702722.webp"
                                )}
                                alt=""/>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-5">
                        <div className="section_header">
                            <h2
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{ __html: heading }}
                            />
                        </div>
                        <div className="content__wrap">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        </div>
                        <div className="btn-group">
                            <Button label={button?.title} href={button?.url} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
