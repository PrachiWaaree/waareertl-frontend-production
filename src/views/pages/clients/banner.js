"use client";

import { Button } from "@/components";
import { getImageURL } from "@/lib";

export const ClientPageBanner = ({ data = {}, slug="client-banner" }) => {
    const {
        ["banner-image"]: bannerImage,
        breadcrumbs = [],
        title,
        description,
        button,
    } = data;

    if (
        !bannerImage?.src &&
        (!title || title === "") &&
        (!description || description === "")
    ) {
        return null;
    }

    const hasBreadcrumbs =
        Array.isArray(breadcrumbs) &&
        breadcrumbs.some(
            (item) =>
                item?.breadcrumb_items &&
                item.breadcrumb_items.title &&
                item.breadcrumb_items.title !== ""
        );

    const hasTitle = !!title;

    const hasDescription = !!description;

    return (
        <>
            <section className="inner__banner_rtl" id={slug}>
                <div
                    className="inner__banner_rtl_bg"
                    style={{
                        backgroundImage: bannerImage?.src
                            ? `url(${getImageURL(bannerImage.src)})`
                            : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="section_grad_bg" />
                    <div className="custom-container">
                        <div className="row">
                            <div className="col-12">
                                {hasBreadcrumbs && (
                                    <ol className="breadcrumb list-unstyled">
                                        {breadcrumbs.map((item, idx) => {
                                            const breadcrumb =
                                                item?.breadcrumb_items || {};
                                            const { title, url, open_new_tab } =
                                                breadcrumb;
                                            if (!title) return null;
                                            const isLast =
                                                idx ===
                                                breadcrumbs.filter(
                                                    (b) =>
                                                        b?.breadcrumb_items &&
                                                        b.breadcrumb_items.title
                                                ).length -
                                                    1;
                                            return (
                                                <li key={idx}>
                                                    <a
                                                        href={url || "#"}
                                                        className={
                                                            isLast
                                                                ? "active"
                                                                : undefined
                                                        }
                                                        target={
                                                            open_new_tab ===
                                                            "yes"
                                                                ? "_blank"
                                                                : undefined
                                                        }
                                                        rel={
                                                            open_new_tab ===
                                                            "yes"
                                                                ? "noopener noreferrer"
                                                                : undefined
                                                        }
                                                    >
                                                        {title}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ol>
                                )}
                                {(hasTitle || hasDescription) && (
                                    <div className="inner_banner_wrapper">
                                        <div className="section_header">
                                            {hasTitle && (
                                                <h1
                                                    className="heading fs-72 fw-300 text-white"
                                                    dangerouslySetInnerHTML={{
                                                        __html: title,
                                                    }}
                                                />
                                            )}
                                        </div>
                                        {hasDescription && (
                                            <div className="content__wrap fs-20 fw-400 text-white">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: description,
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="btn-group">
                                            {button &&
                                                button.title &&
                                                button.url && (
                                                    <Button
                                                        label={button?.title}
                                                        href={button.url}
                                                        target={
                                                            button.open_new_tab ===
                                                            "yes"
                                                                ? "_blank"
                                                                : undefined
                                                        }
                                                        rel={
                                                            button.open_new_tab ===
                                                            "yes"
                                                                ? "noopener noreferrer"
                                                                : undefined
                                                        }
                                                        type={button.url_type}
                                                    />
                                                )}
                                        </div>
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
