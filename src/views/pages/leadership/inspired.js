"use client";
/* eslint-disable no-unused-vars */

import { Button } from "@/components";
import { openLink } from "@/lib";
import { _setDefaults } from "gsap/gsap-core";

export const LeadershipPageInspired = ({
    data,
    slug = "leadership_inspired",
}) => {
    if (
        !data ||
        typeof data !== "object" ||
        (!data.title &&
            !data.description &&
            (!Array.isArray(data.button) || data.button.length === 0))
    ) {
        return null;
    }

    const { description, title, button, parent_class } = data;

    return (
        <>
            <section
                className={`inspired__section ${parent_class || ""}`}
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

                            {Array.isArray(button) && button.length > 0 && (
                                <div className="btn-group text-center">
                                    {button.map((item, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                label={item?.cta?.title}
                                                href={item?.cta?.url}
                                                openNewTab={
                                                    item?.cta?.open_new_tab ===
                                                    "yes"
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
