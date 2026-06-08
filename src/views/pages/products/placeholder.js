"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { useCommonContext } from "@/contexts";
import { getImageURL } from "@/lib";

export const ProductPagePlaceholder = ({ data = {}, slug="graph" }) => {
    const { bg_image, name } = data;
    const { is480 } = useCommonContext();

    return (
        <>
            <section className="graph__section" id={slug}>
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className={`graph__wrapper `}>
                                <div
                                    className="img_content fs-48 fw-300 text-black"
                                    dangerouslySetInnerHTML={{ __html: name }}
                                />

                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(bg_image?.src)}
                                    alt={bg_image?.alt}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
