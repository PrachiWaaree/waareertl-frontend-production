"use client";

import { Button } from "@/components";
import { openLink } from "@/lib";

export const LeadershipPagePurpose = ({ data, slug = "purpose" }) => {
    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
        return null;
    }

    const { button, parent_class, description, subtitle, title } = data;

    const hasTitle = !!title;
    const hasSubtitle = !!subtitle;
    const hasDescription = !!description;
    const hasButton =
        button?.title &&
        (button?.url_type === "external" ||
            (button?.url_type !== "external" && button?.url));

    if (!hasTitle && !hasSubtitle && !hasDescription && !hasButton) {
        return null;
    }

    return (
        <>
            <section
                className={`leadership__section ${parent_class || ""}`}
                id={slug}
            >
                <div className="circle lg__circle" />
                <div className="circle sm__circle" />
                <div className="section_overlay" />
                <div className="custom-container">
                    {(hasTitle || hasSubtitle) && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-7">
                                {hasTitle && (
                                    <div className="section_header text-center">
                                        <h1
                                            className="heading fs-72 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    </div>
                                )}
                                {hasSubtitle && (
                                    <div className="content__wrap fs-20 text-center">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: subtitle,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {hasDescription && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-9 col-xl-8">
                                <div className="content__wrap bottom_content fs-36 fw-300 text-center">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {!!hasButton && (
                        <div className="btn-group text-center">
                            <Button
                                label={button?.title}
                                href={button?.url}
                                onClick={(e) => {
                                    e.preventDefault();
                                    openLink(button?.url);
                                }}
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
