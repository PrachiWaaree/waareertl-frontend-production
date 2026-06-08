"use client";
/* eslint-disable no-unused-vars */

import { getImageURL } from "@/lib";
import { Button } from "@/components";

export const AboutPageInspired = ({ data = {} }) => {
    const { button, description, title } = data;

    return (
        <>
            <section className="inspired__section case-study-inspired">
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                            {(title || description) && (
                                <div className="section_header text-center">
                                    {title && (
                                        <h4
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    )}
                                    {description && (
                                        <h4
                                            className="heading fs-36 fw-500"
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                            {button && button.length > 0 && (
                                <div className="btn-group text-center">
                                    {button.map(
                                        (item, index) =>
                                            item?.cta?.title && (
                                                <Button
                                                    key={index}
                                                    label={item?.cta?.title}
                                                    href={
                                                        item?.cta?.url_type ===
                                                        "external"
                                                            ? item?.cta
                                                                  ?.external_url
                                                            : item?.cta?.url
                                                    }
                                                />
                                            )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
