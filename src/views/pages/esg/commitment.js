"use client";

import { useState } from "react";
//
import { getImageURL } from "@/lib";
import { Collapse, OptimizedImage } from "@/components";

export const EsgPageCommitment = ({ data = {} }) => {
    const { title, description, image, faq_list } = data || {};

    const [activeFaq, setActiveFaq] = useState(0);

    return (
        <>
            <section className="commitments_section">
                {!!image?.src && (
                    <div className="commitments_bg">
                        <OptimizedImage
                            src={getImageURL(image?.src)}
                            alt={image?.alt || ""}/>
                    </div>
                )}
                <div className="custom-container">
                    <div className="row">
                        <div className="col-md-12 col-lg-10 col-xl-7">
                            <div className="section_header">
                                {!!title && (
                                    <h4
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                )}
                                {!!description && (
                                    <div className="content__wrap">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {!!faq_list?.length && (
                                <div className="commitment__tab_data">
                                    <div className="faq_accord_wrap">
                                        {faq_list?.map((faq, index) => {
                                            if (
                                                !faq?.question &&
                                                !faq?.answer &&
                                                !faq?.image?.src
                                            ) {
                                                return null;
                                            }

                                            const isActive =
                                                index === activeFaq;

                                            return (
                                                <div
                                                    className={`single_faq ${
                                                        isActive ? "active" : ""
                                                    }`}
                                                    key={index}
                                                >
                                                    {!!faq?.question && (
                                                        <h5
                                                            className="faq_title fs-36 fw-500"
                                                            onClick={() =>
                                                                !isActive &&
                                                                setActiveFaq(
                                                                    index
                                                                )
                                                            }
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: faq?.question,
                                                                }}
                                                            />
                                                        </h5>
                                                    )}

                                                    <Collapse show={isActive}>
                                                        <div className="faq_content__wrap">
                                                            <div className="commitment_inner_cnt d-flex">
                                                                <div className="commitment_left_cnt fs-20 fw-600">
                                                                    <div
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: faq?.answer,
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className="commitment_right_img">
                                                                    <OptimizedImage
                                                                        src={getImageURL(
                                                                            faq
                                                                                ?.image
                                                                                ?.src
                                                                        )}
                                                                        alt={
                                                                            faq
                                                                                ?.image
                                                                                ?.alt ||
                                                                            ""
                                                                        }/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
