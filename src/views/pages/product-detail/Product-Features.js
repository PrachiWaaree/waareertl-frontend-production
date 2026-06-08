"use client";
import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const ProductFeatureSection = ({ data = {} }) => {
    const { heading, description, image, button, feature_list } = data;

    return (
        <section className="specifications_section">
            <div className="custom-container">
                <div className="row justify-content-end">
                    <div className="col-md-12 col-lg-6 col-xl-6 d-flex">
                        <div className="specifications_left">
                            {image?.src && (
                                <OptimizedImage
                                    src={getImageURL(image?.src)}
                                    alt={image?.alt || ""}/>
                            )}
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="specifications_right">
                            <div className="section_header">
                                {heading && (
                                    <h3
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: heading,
                                        }}
                                    />
                                )}
                                {description && (
                                    <div className="content__wrap">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="specifications_data">
                                <ul>
                                    {Array.isArray(feature_list) &&
                                        feature_list.map((feature, idx) => (
                                            <li className="fs-20 fw-600" key={idx}>
                                                <div className="specifications_data_img">
                                                    {feature?.image?.src && (
                                                        <OptimizedImage
                                                            src={getImageURL(
                                                                feature.image
                                                                    .src
                                                            )}
                                                            alt={
                                                                feature?.image
                                                                    ?.alt || ""
                                                            }/>
                                                    )}
                                                </div>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            feature?.feature_name ||
                                                            "",
                                                    }}
                                                />
                                            </li>
                                        ))}
                                </ul>
                                {button?.title && (
                                    <div className="btn-group">
                                        <Button
                                            href={
                                                button?.url_type === "external"
                                                    ? button?.external_url ||
                                                      button?.url
                                                    : button?.url
                                            }
                                            label={button?.title}
                                            target={
                                                button?.open_new_tab === "yes"
                                                    ? "_blank"
                                                    : undefined
                                            }
                                            rel={
                                                button?.open_new_tab === "yes"
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
