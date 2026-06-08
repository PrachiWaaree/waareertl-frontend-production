"use client";
import { getImageURL } from "@/lib";
import { Button, OptimizedImage } from "@/components";

export const LifeAtWaareeWhyWaaree = ({ data = {} }) => {
    if (!data) return null;

    const { heading, description, image, list, button } = data || {};

    if (
        !heading &&
        !description &&
        (!image || !image.src) &&
        (!Array.isArray(list) || list.length === 0) &&
        !button
    ) {
        return null;
    }

    const buttonHref = button?.url || button?.external_url || "#";

    return (
        <section className="why__choose_section">
            <div className="custom-container">
                <div className="row align-items-center">
                    {image && image.src && (
                        <div className="col-12 col-lg-6 col-xl-7">
                            <div className="img__wrapper">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(image.src)}
                                    alt={image.alt || ""}/>
                            </div>
                        </div>
                    )}

                    {(heading ||
                        description ||
                        (Array.isArray(list) && list.length > 0) ||
                        button) && (
                        <div className={`col-12 col-lg-6 col-xl-5`}>
                            <div className="content__block">
                                {(heading || description) && (
                                    <div className="section_header">
                                        {heading && (
                                            <h4
                                                className="heading fs-48 fw-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: heading,
                                                }}
                                            />
                                        )}
                                        {description && (
                                            <div className="content__wrap">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: description,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {Array.isArray(list) && list.length > 0 && (
                                    <div className="content__wrap_list">
                                        <ul className="d-flex list-unstyled">
                                            {list.map((item, idx) => (
                                                <li
                                                    className="d-flex align-items-center"
                                                    key={idx}
                                                >
                                                    {item.icon &&
                                                        item.icon.src && (
                                                            <div className="icon__wrap">
                                                                <OptimizedImage
                                                                    className="img-fluid"
                                                                    src={getImageURL(
                                                                        item
                                                                            .icon
                                                                            .src
                                                                    )}
                                                                    alt={
                                                                        item
                                                                            .icon
                                                                            .alt ||
                                                                        ""
                                                                    }/>
                                                            </div>
                                                        )}
                                                    {item.text && (
                                                        <div className="content__wrap">
                                                            <div
                                                                className="heading fs-20 fw-600"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.text,
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Button */}
                                {button &&
                                    button?.title &&
                                    (button?.url || button?.external_url) && (
                                        <div className="btn-group">
                                            <Button
                                                label={button?.title}
                                                href={buttonHref}
                                                target={
                                                    button?.open_new_tab ===
                                                    "yes"
                                                        ? "_blank"
                                                        : undefined
                                                }
                                                rel={
                                                    button?.open_new_tab ===
                                                    "yes"
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                className="primary_btn"
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
