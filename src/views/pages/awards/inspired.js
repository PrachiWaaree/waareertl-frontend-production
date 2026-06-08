"use client";

import { Button } from "@/components";

export const AwardsPageInspired = ({ data = {}, slug="awards_inspired" }) => {
    const { description, title, button, parent_class } = data;

    return (
        <>
            <section
                className={`inspired__section award__inspired ${
                    parent_class || ""
                }`}
                id={slug}
            >
                <div className="circle__area">
                    <div className="circle lg__circle" />
                    <div className="circle sm__circle" />
                </div>
                <div className="section_overlay" />
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
                                            className="heading fs-28 fw-600"
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                            {Array.isArray(button) && button.length > 0 && (
                                <div className="btn-group text-center">
                                    {button.map((item, index) =>
                                        item?.cta?.title ? (
                                            <Button
                                                key={index}
                                                href={
                                                    item?.cta?.url_type ===
                                                    "external"
                                                        ? item?.cta
                                                              ?.external_url
                                                        : item?.cta?.url
                                                }
                                                label={item?.cta?.title}
                                            />
                                        ) : null
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
