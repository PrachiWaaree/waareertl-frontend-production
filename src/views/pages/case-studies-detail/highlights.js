"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const CaseStudyDetailPageHighlightSection = ({ data = {} }) => {
    const { heading, image, highlight_list = [] } = data;

    const hasHeading = !!heading;
    const hasImage = !!(image && image.src);
    const hasHighlights =
        Array.isArray(highlight_list) && highlight_list.length > 0;

    if (!hasHeading && !hasImage && !hasHighlights) {
        return null;
    }

    const leftHighlights = highlight_list.slice(
        0,
        Math.ceil(highlight_list.length / 2)
    );
    const rightHighlights = highlight_list.slice(
        Math.ceil(highlight_list.length / 2)
    );

    return (
        <>
            <section className="key-highlights">
                <div className="custom-container">
                    {hasHeading && (
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-11 col-xl-9">
                                <div className="section_header text-center">
                                    <h2
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: heading,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {(hasHighlights || hasImage) && (
                        <div className="highlight-wrapper">
                            {hasHighlights && (
                                <div className="highlight_left_box_main">
                                    {leftHighlights.map((item, idx) => (
                                        <div
                                            className={`highlight-box box-${
                                                idx + 1
                                            }`}
                                            key={idx}
                                        >
                                            <div className="icon_cantent">
                                                <div
                                                    className="title fs-28"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title,
                                                    }}
                                                />
                                                <div
                                                    className="subtext fs-18"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.subtitle,
                                                    }}
                                                />
                                            </div>
                                            <div className="icon">
                                                <OptimizedImage
                                                    src={getImageURL(
                                                        item.icon?.src
                                                    )}
                                                    alt={
                                                        item.icon?.alt || "icon"
                                                    }/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {hasImage && (
                                <div className="infinity-loop">
                                    <OptimizedImage
                                        src={getImageURL(image?.src)}
                                        alt={image?.alt || ""}/>
                                </div>
                            )}
                            {hasHighlights && (
                                <div className="highlight_right_box_main">
                                    {rightHighlights.map((item, idx) => (
                                        <div
                                            className={`highlight-box box-${
                                                leftHighlights.length + idx + 1
                                            }`}
                                            key={idx}
                                        >
                                            <div className="icon">
                                                <OptimizedImage
                                                    src={getImageURL(
                                                        item.icon?.src
                                                    )}
                                                    alt={
                                                        item.icon?.alt || "icon"
                                                    }/>
                                            </div>
                                            <div className="icon_cantent">
                                                <div
                                                    className="title fs-28"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title,
                                                    }}
                                                />
                                                <div
                                                    className="subtext fs-18"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.subtitle,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
