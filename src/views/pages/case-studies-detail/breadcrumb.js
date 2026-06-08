"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const CaseStudyDetailPageBreadcrumbSection = ({ data = {} }) => {
    const { title, subtitle, breadcrumbs = [] } = data;

    return (
        <>
            <section className="csd__banner_section">
                <div className="circle lg__circle" />
                <div className="circle sm__circle" />
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-7">
                            <div className="section_header text-center">
                                {title && (
                                    <h1
                                        className="heading fs-72 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                )}
                                {subtitle && (
                                    <div className="content__wrap fs-20 text-center">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: subtitle,
                                            }}
                                        />
                                    </div>
                                )}
                                {Array.isArray(breadcrumbs) &&
                                    breadcrumbs.length > 0 && (
                                        <div className="banner__address">
                                            {breadcrumbs.map((item, idx) => {
                                                const label =
                                                    item?.breadcrumbs_items;
                                                const image = item?.image;
                                                return label ? (
                                                    <div
                                                        className="address__content"
                                                        key={idx}
                                                    >
                                                        {image?.src && (
                                                            <div className="icon__wrap">
                                                                <OptimizedImage
                                                                    className="img-fluid"
                                                                    src={getImageURL(
                                                                        image?.src
                                                                    )}
                                                                    alt={
                                                                        image?.alt ||
                                                                        ""
                                                                    }/>
                                                            </div>
                                                        )}
                                                        <div className="icon__content fs-20 fw-600">
                                                            {label}
                                                        </div>
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
