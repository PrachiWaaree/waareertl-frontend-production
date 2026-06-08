"use client";
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
//
import { Button, OptimizedImage } from "@/components";
import { getImageURL, openLink, SHARE_LINKS } from "@/lib";

const RenderTitleWithTag = ({ title, tag = "h2" }) => {
    switch (tag) {
        case "h1":
            return <h1 dangerouslySetInnerHTML={{ __html: title }} />;
        case "h2":
            return <h2 dangerouslySetInnerHTML={{ __html: title }} />;
        case "h3":
            return <h3 dangerouslySetInnerHTML={{ __html: title }} />;
        case "h4":
            return <h4 dangerouslySetInnerHTML={{ __html: title }} />;
        case "h5":
            return <h5 dangerouslySetInnerHTML={{ __html: title }} />;
        default:
            return <h2 dangerouslySetInnerHTML={{ __html: title }} />;
    }
};

export const WhitepaperDetailPageDetailSection = ({ data = {} }) => {
    const {
        title,
        breadcrumbs = [],
        list = [],
        enable_previous_next = {},
    } = data;

    const [tocItems, setTocItems] = useState([]);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        if (Array.isArray(list)) {
            setTocItems(
                list.map((item, idx) => ({
                    id: `section-${idx}`,
                    text: item?.title || `Section ${idx + 1}`,
                }))
            );
        }
    }, [list]);

    const getSectionId = (idx) => `section-${idx}`;

    const previous = enable_previous_next?.previous;
    const next = enable_previous_next?.next;

    const getCurrentUrl = () => {
        if (typeof window !== "undefined") {
            return window.location.href;
        }
        return "";
    };

    const handleCopy = async () => {
        const url = getCurrentUrl();
        const result = await SHARE_LINKS.copy(url);
        setCopySuccess(result);
        if (result) {
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    return (
        <>
            <section className="leadership__section blog_header">
                <div className="circle lg__circle" />
                <div className="circle sm__circle" />
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-9">
                            <div className="section_header text-center">
                                <h1
                                    className="heading fs-72 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                            <div className="content__wrap fs-20 text-center">
                                <ul className="breadcrumb list-unstyled d-flex fw-600">
                                    {breadcrumbs.map((item, index) => {
                                        const crumb =
                                            item?.breadcrumbs_items || item;
                                        const isLast =
                                            index === breadcrumbs.length - 1;
                                        return (
                                            <li key={index}>
                                                <a
                                                    href={
                                                        crumb?.url_type ===
                                                        "external"
                                                            ? crumb?.external_url
                                                            : crumb?.url
                                                    }
                                                    className={
                                                        isLast ? "active" : ""
                                                    }
                                                >
                                                    {crumb?.title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog_detail_main">
                <div className="custom-container">
                    <div className="shape_main">
                        <div className="shape_part" />
                    </div>
                    <div className="blog_detail_inner_main">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-8 col-xl-8">
                                <div className="blog_detail_inner_left">
                                    {list?.map((section, idx) => (
                                        <div
                                            key={idx}
                                            id={getSectionId(idx)}
                                            style={{ scrollMarginTop: 100 }}
                                        >
                                            {section.title && (
                                                <RenderTitleWithTag
                                                    title={section.title}
                                                    tag={section.title_tag}
                                                />
                                            )}
                                            {section.description && (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: section.description,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {(previous || next) && (
                                    <div className="prev_next_blog d-flex justify-content-between">
                                        {previous && (
                                            <div className="prev_next_blog_left pos-relative">
                                                <div className="prev_blog_img">
                                                    <OptimizedImage
                                                        src={getImageURL(
                                                            enable_previous_next
                                                                ?.previous
                                                                ?.template_fields
                                                                ?.feature_image
                                                                ?.src
                                                        )}
                                                        alt={
                                                            enable_previous_next
                                                                ?.previous
                                                                ?.template_fields
                                                                ?.feature_image
                                                                ?.alt
                                                        }/>{" "}
                                                </div>
                                                <div className="blog_prev_next_data">
                                                    <h3 className="fs-20">
                                                        {previous?.name}
                                                    </h3>
                                                    <Button
                                                        href={previous?.slug}
                                                        label="Previous Whitepaper"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {next && previous && (
                                            <div className="blog__separator" />
                                        )}

                                        {next && (
                                            <div className="prev_next_blog_left pos-relative">
                                                <div className="prev_blog_img">
                                                    <OptimizedImage
                                                        src={getImageURL(
                                                            enable_previous_next
                                                                ?.next
                                                                ?.template_fields
                                                                ?.feature_image
                                                                ?.src
                                                        )}
                                                        alt={
                                                            enable_previous_next
                                                                ?.next
                                                                ?.template_fields
                                                                ?.feature_image
                                                                ?.alt
                                                        }/>
                                                </div>

                                                <div className="blog_prev_next_data">
                                                    <h3 className="fs-20">
                                                        {next?.name}
                                                    </h3>

                                                    <Button
                                                        href={next?.slug}
                                                        label="Next Whitepaper"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-12 col-lg-4 col-xl-4 d-none d-lg-block">
                                <div className="table_right_main_box">
                                    <div className="table_cantent_box">
                                        <h2 className="table_box_title fs-28">
                                            Table of content
                                        </h2>
                                        <ul>
                                            {tocItems.map((item, idx) => (
                                                <li key={item.id}>
                                                    <a
                                                        href={`#${item.id}`}
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            openLink(
                                                                `#${item.id}`
                                                            );
                                                        }}
                                                    >
                                                        {item.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="blog_detail_social">
                                        <div className="section_header text-center">
                                            <h3 className="heading fs-20 fw-600">
                                                Share on
                                            </h3>
                                        </div>
                                        <ul className="followus_menu justify-content-center">
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        SHARE_LINKS.linkedin(
                                                            getCurrentUrl()
                                                        );
                                                    }}
                                                    title="Share on LinkedIn"
                                                >
                                                    <OptimizedImage
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            "/upload/media/linkedin_1752821494.svg"
                                                        )}
                                                        alt="LinkedIn"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        SHARE_LINKS.twitter(
                                                            getCurrentUrl()
                                                        );
                                                    }}
                                                    title="Share on Twitter"
                                                >
                                                    <OptimizedImage
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            "/upload/media/twitter_1752821571.svg"
                                                        )}
                                                        alt="Twitter"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        SHARE_LINKS.facebook(
                                                            getCurrentUrl()
                                                        );
                                                    }}
                                                    title="Share on Facebook"
                                                >
                                                    <OptimizedImage
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            "/upload/media/facebook_1752821606.svg"
                                                        )}
                                                        alt="Facebook"/>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
