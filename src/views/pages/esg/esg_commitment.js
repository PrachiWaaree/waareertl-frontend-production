"use client";

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const EsgCommitment = ({ data = {} }) => {
    const { heading, description, document_list,image } = data;

    return (
        <section className="sbti_commitment_section">
            <div className="custom-container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-lg-6 col-xl-6">
                        <div className="section_header">
                            <h2
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{ __html: heading }}
                            />

                            <div className="content__wrap">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />

                                <div className="sbti_commitment_btn d-flex">
                                    {document_list?.map((item, index) => (
                                        <div
                                            className="sbti_commitment_btn_inner"
                                            key={index}
                                        >
                                            <Button
                                                label={item?.cta?.title}
                                                href={item?.cta?.url}
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-6">
                        <div className="foundation_img text-right d-flex align-items-center justify-content-center">
                            <div className="founation_left_img">
                                <div className="foundation_top_img">
                                    <OptimizedImage
                                        className="img-fluid"
                                        src={getImageURL(image?.[0]?.src||
                                            "https://waaree-rtl.devsproject.com/upload/media/sbti1_1754399325.webp"
                                        )}
                                        alt=""/>
                                </div>
                                <div className="foundation_bottom_img">
                                    <OptimizedImage
                                        className="img-fluid"
                                        src={getImageURL(image?.[2]?.src||
                                            "https://waaree-rtl.devsproject.com/upload/media/sbti2_1754399301.webp"
                                        )}
                                        alt=""/>
                                </div>
                            </div>
                            <div className="founation_right_img">
                                <div className="foundation_right_center">
                                    <OptimizedImage
                                        className="img-fluid"
                                        src={getImageURL(image?.[1]?.src||
                                            "https://waaree-rtl.devsproject.com/upload/media/sbti3_1754399315.webp"
                                        )}
                                        alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
