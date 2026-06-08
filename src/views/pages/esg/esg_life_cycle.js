"use client";

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const EsgLifeCyle = ({ data = {} }) => {
    const { heading, description, document_list, image } = data;

    return (
        <section className="life_cycle_sec">
            <div className="custom-container">
                <div className="life_cycle_inner row d-flex">
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <div className="life_cycle_left">
                            <div className="life_cycle_img">
                                <OptimizedImage
                                    src={getImageURL(image?.[0]?.src)}
                                    alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <div className="life_cycle_right">
                            <div className="section_header">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />

                                <div className="content__wrap">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>

                                {document_list?.map((pdf, index) => (
                                    <div
                                        className="life_cycle_btn d-flex"
                                        key={index}
                                    >
                                        <div className="life_cycle_pdf_icon">
                                            <OptimizedImage
                                                src={getImageURL(
                                                    "https://waaree-rtl.devsproject.com/upload/media/pdf_icon_1754311164.svg"
                                                )}
                                                alt="pdf"/>
                                        </div>
                                        <div className="btn-group">
                                            <Button
                                                label={
                                                    pdf?.cta?.title ||
                                                    "Download PDF"
                                                }
                                                href={pdf?.cta?.url || "#"}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
