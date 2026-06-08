"use client";

import { getImageURL } from "@/lib";

export const LeadershipPageBanner = ({ data = {}, slug = "page-banner" }) => {
    const { ["banner-image"]: bannerImage, breadcrumbs = [] } = data;

    return (
        <>
            {bannerImage && bannerImage.src && (
                <section className="inner__banner" id={slug}>
                    <div
                        className="inner__banner_bg theme-gradient-home"
                        style={{
                            backgroundImage: `url(${getImageURL(
                                bannerImage?.src,
                            )})`,
                            backgroundSize: "cover",
                            backgroundPosition: "50% 50%",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="section_grad_bg" />
                        <div className="section_white_overlay" />
                        <div className="custom-container">
                            <div className="row">
                                <div className="col-12"></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {Array.isArray(breadcrumbs) && breadcrumbs.length > 0 && (
                <section className="breadcrumb__section">
                    <div className="custom-container">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 text-center">
                                <ol className="breadcrumb list-unstyled">
                                    {breadcrumbs.map((item, index) => {
                                        if (!item || !item.breadcrumb_items) {
                                            return null;
                                        }

                                        const { breadcrumb_items } = item;

                                        if (
                                            !breadcrumb_items.url ||
                                            !breadcrumb_items.title
                                        ) {
                                            return null;
                                        }

                                        const href = breadcrumb_items?.url;

                                        const isLast =
                                            index === breadcrumbs.length - 1;

                                        return (
                                            <li key={index}>
                                                <a
                                                    href={href}
                                                    className={
                                                        isLast ? "active" : ""
                                                    }
                                                    onClick={(e) => {
                                                        if (isLast) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    {breadcrumb_items?.title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};
