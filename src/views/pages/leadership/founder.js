"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const LeadershipPageFounder = ({ data = {}, slug = "founder" }) => {
    if (
        !data ||
        (!data["banner-image"] &&
            !data["one-liner"] &&
            !data.bg_image &&
            !data.designation &&
            !data.description &&
            !data.quotes &&
            !data.name &&
            !data.title &&
            !data.icon &&
            !data.image)
    ) {
        return null;
    }

    const {
        ["banner-image"]: bannerImage,
        ["one-liner"]: oneLiner,
        bg_image,
        designation,
        description,
        quotes,
        name,
        title,
        icon,
        image,
    } = data;

    return (
        <>
            <section
                className="founder__section"
                style={{
                    backgroundImage: bg_image?.src
                        ? `url(${getImageURL(bg_image?.src)})`
                        : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                }}
                id={slug}
            >
                <div className="section_bg" />
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row">
                        {(icon?.src ||
                            title ||
                            description ||
                            quotes ||
                            name ||
                            designation) && (
                            <div className="col-12 col-lg-6 col-xl-6 offset-xl-1">
                                <div className="section_header">
                                    {icon?.src && (
                                        <div className="icon_wrap">
                                            <OptimizedImage
                                                className="img-fluid"
                                                src={getImageURL(icon?.src)}
                                                alt={icon?.alt || ""}/>
                                        </div>
                                    )}
                                    {title && (
                                        <h3
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    )}
                                </div>
                                {description && (
                                    <div className="content__wrap fs-20 fw-600">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                                {quotes && (
                                    <div className="content__wrap blockquote fs-36 fw-300">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: quotes,
                                            }}
                                        />
                                    </div>
                                )}
                                {(name || designation) && (
                                    <div className="profile__wrap">
                                        {name && (
                                            <h4
                                                className="heading fs-28 fw-400"
                                                dangerouslySetInnerHTML={{
                                                    __html: name,
                                                }}
                                            />
                                        )}
                                        {designation && (
                                            <h5
                                                className="heading fs-20 fw-600"
                                                dangerouslySetInnerHTML={{
                                                    __html: designation,
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        {image?.src && (
                            <div className="col-12 col-lg-6 col-xl">
                                <div className="founder__img">
                                    <OptimizedImage
                                        className="img-fluid"
                                        src={getImageURL(image?.src)}
                                        alt={image?.alt || ""}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
