"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const WaareeEnergiesPagePhotoSection = ({ data = {}, slug="gallery_photo" }) => {
    const {
        title = "Photo Gallery",
        description = "",
        ["gallery-images"]: images = [],
        parent_class = "",
    } = data;

    // Check if there is any data to render
    const hasTitle = !!title && title !== "";
    const hasDescription = !!description && description !== "";
    const hasImages = Array.isArray(images) && images.length > 0;

    // If no data, render nothing
    if (!hasTitle && !hasDescription && !hasImages) {
        return null;
    }

    return (
        <section
            className={`photo__gallery${
                parent_class ? ` ${parent_class}` : ""
            }`}
            id={slug}
        >
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-10 col-xxl-8">
                        {(hasTitle || hasDescription) && (
                            <div className="section_header text-center">
                                {hasTitle && (
                                    <h4
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                )}
                                {hasDescription && (
                                    <div className="content__wrap text-center">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {hasImages && (
                    <div className="row">
                        <div className="col-12">
                            <div className="bento_row">
                                {images.map((item, index) => (
                                    <div
                                        className="bento"
                                        id={`B${index + 1}`}
                                        key={index}
                                    >
                                        <div className="bento_img">
                                            <OptimizedImage
                                                src={getImageURL(
                                                    item?.image?.src
                                                )}
                                                alt={item?.image?.alt || ""}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
