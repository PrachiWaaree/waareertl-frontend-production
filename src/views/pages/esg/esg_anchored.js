"use client";

import { OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const EsgAnchored = ({ data = {} }) => {
    const { title } = data;

    return (
        <section className="anchored_governance_main">
            <div className="circle lg__circle" />
            <div className="circle sm__circle" />
            <div className="section_overlay" />
            <div className="custom-container">
                <div className="section_header">
                    <h3
                        className="heading fs-48 fw-300"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </div>
                <div className="anchored_governance_data">
                    <div className="mobile_scroll">
                        <OptimizedImage
                            src={getImageURL(data["image-ft"]?.src||
                                "https://waaree-rtl.devsproject.com/upload/media/anchored_img_1754467697.png"
                            )}
                            alt=""/>
                    </div>
                </div>
            </div>
            <div className="anchored_governance_data_bg">
                <OptimizedImage
                    src={getImageURL(
                        data["image-bg"]?.src||
                        "https://waaree-rtl.devsproject.com/upload/media/anchored_bg_1754467707.png"
                    )}
                    alt=""/>
            </div>
        </section>
    );
};
