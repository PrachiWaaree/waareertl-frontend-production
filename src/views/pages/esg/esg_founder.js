"use client";

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const EsgFounder = ({ data = {} }) => {
    const {
        title,
        description,
        image,
        bg_image,
        icon,
        ["button"]: button = [],
    } = data;

    return (
        <section
            className="founder__section"
            style={{
                backgroundImage: `url(${getImageURL(bg_image?.src || "")})`,
            }}
        >
            <div className="section_bg" />
            <div className="section_overlay" />
            <div className="custom-container">
                <div className="row">
                    <div className="col-12 col-lg-6 col-xl-6 offset-xl-1">
                        <div className="section_header">
                            <div className="icon_wrap">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(icon?.src || "")}
                                    alt=""/>
                            </div>
                            <h3
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: data?.quotes,
                                }}
                            />
                        </div>
                        <div className="content__wrap fs-20 fw-600">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        </div>
                        <div className="content__wrap blockquote fs-36 fw-300">
                            <p dangerouslySetInnerHTML={{ __html: title }} />
                        </div>
                        <div className="profile__wrap">
                            <h4
                                className="heading fs-28 fw-600"
                                dangerouslySetInnerHTML={{
                                    __html: data?.name,
                                }}
                            />

                            <h5
                                className="heading fs-20 fw-600"
                                dangerouslySetInnerHTML={{
                                    __html: data?.designation,
                                }}
                            />
                        </div>
                        {!!button && button?.title && (
                            <div className="btn-group">
                                <Button
                                    href={button?.url || "#"}
                                    label={button?.title || "Read More"}
                                    aria-label={`Read more about ${data?.name || "founder"}`}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-12 col-lg-6 col-xl">
                        <div className="founder__img">
                            <OptimizedImage
                                className="img-fluid"
                                src={getImageURL(
                                    image?.src ||
                                        "/upload/media/hitesh_1754457884.webp",
                                )}
                                alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
