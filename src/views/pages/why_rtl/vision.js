"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const WhyRtlPageVision = ({ data = {}, slug="vision_mission" }) => {
    const { list = [] } = data;

    return (
        <>
            <section className="vision_mission">
                <div className="custom-container">
                    <div className="row justify-content-center">
                        {Array.isArray(list) &&
                            list.map((item, idx) => {
                                const { image, heading, description } =
                                    item || {};
                                return (
                                    <div
                                        className="col-12 col-lg-6 col-xs-6 col-md-9"
                                        key={idx}
                                        id={slug}
                                    >
                                        <div className="item__wrap">
                                            <div className="single__item">
                                                <div className="img__wrap">
                                                    <OptimizedImage
                                                        src={
                                                            image?.src
                                                                ? getImageURL(
                                                                      image.src
                                                                  )
                                                                : ""
                                                        }
                                                        alt={image?.alt || ""}/>
                                                </div>
                                                <div className="content_block text-white">
                                                    <h2
                                                        className="heading fs-72 fw-300"
                                                        dangerouslySetInnerHTML={{
                                                            __html: heading,
                                                        }}
                                                    />
                                                    <div className="content_block_inner fs-28">
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: description,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>
        </>
    );
};
