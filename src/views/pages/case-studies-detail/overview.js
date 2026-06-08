"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const CaseStudyDetailPageOverviewSection = ({ data = {} }) => {
    const { heading, image, description, overview_list = [] } = data;

    return (
        <>
            <section className="csd__info_section">
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="section__shape">
                        <div className="shape" />
                    </div>
                    <div className="row justify-content-between align-items-center top__row">
                        <div className="col-12 col-md-8 col-lg-5 col-xl-6">
                            <div className="img__wrap">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(image?.src)}
                                    alt={image?.alt}/>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 offset-lg-1 col-lg-6 offset-xl-1 col-xl-5">
                            <div className="section_header">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                                <div className="content_wrap">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="csd__section_content">
                        <div className="row">
                            {Array.isArray(overview_list) &&
                                overview_list.map((item, idx) => (
                                    <div
                                        className={`col-12 col-md-6`}
                                        key={idx}
                                    >
                                        <div
                                            className={
                                                idx === 0
                                                    ? "content__col_left"
                                                    : "content__col_right"
                                            }
                                        >
                                            <div className="section_header">
                                                <h2 className="heading fs-28 fw-400">
                                                    {item.title}
                                                </h2>
                                            </div>
                                            <div className="content_wrap">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
