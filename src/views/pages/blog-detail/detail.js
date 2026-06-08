"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components";
import {
    getAbsoluteURL,
    getImageURL,
    openLink,
    SHARE_LINKS,
    updateMediaUrls,
} from "@/lib";
import { cleanSEOTags, stripHtml } from "@/utilities";
import { BlogForm } from "./blog-form";
import { useRouter } from "next/navigation";

const RenderTitleWithTag = ({ title, tag = "h2" }) => {
    switch (tag) {
        case "h1":
            return (
                <h1 dangerouslySetInnerHTML={{ __html: cleanSEOTags(title) }} />
            );
        case "h2":
            return (
                <h2 dangerouslySetInnerHTML={{ __html: cleanSEOTags(title) }} />
            );
        case "h3":
            return (
                <h3 dangerouslySetInnerHTML={{ __html: cleanSEOTags(title) }} />
            );
        case "h4":
            return (
                <h4 dangerouslySetInnerHTML={{ __html: cleanSEOTags(title) }} />
            );
        case "h5":
            return (
                <h5 dangerouslySetInnerHTML={{ __html: cleanSEOTags(title) }} />
            );
        default:
            return (
                <h2 dangerouslySetInnerHTML={{ __html: cleanSEOTags(title) }} />
            );
    }
};

const TEMPLATE_NAME_LABELS = {
    Whitepaper: "Whitepaper",
    title_description: "Title & Description",
};

function getPrevNextImage(obj) {
    if (obj?.template_fields?.feature_image?.src) {
        return {
            src: obj.template_fields.feature_image.src,
            alt: obj.template_fields.feature_image.alt || obj.name || "",
        };
    }
    if (obj?.template_fields?.featured_image?.src) {
        return {
            src: obj.template_fields.featured_image.src,
            alt: obj.template_fields.featured_image.alt || obj.name || "",
        };
    }
    if (obj?.template_fields?.image?.src) {
        return {
            src: obj.template_fields.image.src,
            alt: obj.template_fields.image.alt || obj.name || "",
        };
    }
    return { src: "", alt: "" };
}

export const BlogDetailPageDetailSection = ({
    data = {},
    slug = "title_description",
}) => {
    const {
        title,
        breadcrumbs = [],
        list = [],
        enable_previous_next = {},
        ["tag-list"]: tagList = [],
        comment_form,
        faq,
    } = data;

    const [tocItems, setTocItems] = useState([]);
    const [copySuccess, setCopySuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (Array.isArray(list)) {
            setTocItems(
                list
                    .map((item, idx) =>
                        item?.title
                            ? {
                                  id: `section-${idx}`,
                                  text: item.title,
                              }
                            : null,
                    )
                    .filter(Boolean),
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

    // Open previous/next on the same page
    const handlePrevNextClick = (e, slug) => {
        e.preventDefault();
        if (!slug) return;
        router.push(`/${slug.replace(/^\/+/, "")}`);
    };

    // faq schema

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: Array.isArray(faq)
            ? faq.map((faq) => ({
                  "@type": "Question",
                  name: stripHtml(faq.question),
                  acceptedAnswer: {
                      "@type": "Answer",
                      text: stripHtml(faq.answer),
                  },
              }))
            : [],
    };

    useEffect(() => {
        if (!faq || faq.length === 0) return;

        // Remove existing breadcrumb schema if any
        const existingSchema = document.querySelector(
            "script[data-dfaqs-schema]",
        );
        if (existingSchema) {
            existingSchema.remove();
        }

        // Create and inject new schema into head
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-dfaqs-schema", "true");
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);

        // Cleanup function
        return () => {
            const scriptToRemove = document.querySelector(
                "script[data-dfaqs-schema]",
            );
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [faq]);

    return (
        <>
            <section className="leadership__section blog_header" id={slug}>
                <div className="circle lg__circle" />
                <div className="circle sm__circle" />
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-9">
                            <div className="section_header text-center">
                                <h1
                                    className="heading fs-72 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: cleanSEOTags(title),
                                    }}
                                />
                            </div>
                            <div className="content__wrap fs-20 text-center">
                                <ul className="breadcrumb list-unstyled d-flex fw-600">
                                    {Array.isArray(tagList) && tagList.map((item, index) => {
                                        const crumb =
                                            item?.breadcrumbs_items || item;
                                        const isLast =
                                            index === breadcrumbs.length - 1;
                                        return (
                                            <li key={index}>{crumb?.title}</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog_detail_main">
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="shape_main">
                        <div className="shape_part" />
                    </div>
                    <div className="blog_detail_inner_main">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-8 col-xl-8">
                                <div className="blog_detail_inner_left">
                                    {Array.isArray(list) && list.map((section, idx) => (
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
                                                        __html: cleanSEOTags(
                                                            updateMediaUrls(
                                                                section.description,
                                                            ),
                                                        ),
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    {Array.isArray(faq) && faq.length > 0 && (
                                        <>
                                            <h2>FAQs </h2>
                                            {faq.map((section, idx) => (
                                                <li key={idx}>
                                                    <strong>
                                                        {section.question && (
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: cleanSEOTags(
                                                                        updateMediaUrls(
                                                                            idx +
                                                                                1 +
                                                                                ". " +
                                                                                section.question,
                                                                        ),
                                                                    ),
                                                                }}
                                                            />
                                                        )}
                                                    </strong>
                                                    {section.answer && (
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: cleanSEOTags(
                                                                    updateMediaUrls(
                                                                        section.answer,
                                                                    ),
                                                                ),
                                                            }}
                                                        />
                                                    )}
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </div>

                                {!!comment_form && (
                                    <BlogForm data={comment_form} />
                                )}

                                {(previous || next) && (
                                    <div className="prev_next_blog__wrap">
                                        <div className="prev_next_blog d-flex justify-content-between">
                                            {previous && (
                                                <div className="prev_next_blog_left pos-relative">
                                                    <div className="prev_blog_img">
                                                        <img
                                                            loading="lazy"
                                                            src={getImageURL(
                                                                getPrevNextImage(
                                                                    previous,
                                                                ).src,
                                                            )}
                                                            alt={
                                                                getPrevNextImage(
                                                                    previous,
                                                                ).alt ||
                                                                "Blog Image"
                                                            }
                                                        />{" "}
                                                    </div>
                                                    <div className="blog_prev_next_data">
                                                        <h3
                                                            className="fs-20 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: previous?.name,
                                                            }}
                                                        />

                                                        <Button
                                                            role="button"
                                                            href={getAbsoluteURL(
                                                                `/${previous?.slug?.replace(
                                                                    /^\/+/,
                                                                    "",
                                                                )}`,
                                                            )}
                                                            onClick={(e) =>
                                                                handlePrevNextClick(
                                                                    e,
                                                                    previous?.slug,
                                                                )
                                                            }
                                                            openNewTab={false}
                                                            label={`Previous ${
                                                                TEMPLATE_NAME_LABELS[
                                                                    previous
                                                                        ?.template_name
                                                                ] ||
                                                                previous?.template_name
                                                            }`}
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
                                                        <img
                                                            loading="lazy"
                                                            src={getImageURL(
                                                                getPrevNextImage(
                                                                    next,
                                                                ).src,
                                                            )}
                                                            alt={
                                                                getPrevNextImage(
                                                                    next,
                                                                ).alt ||
                                                                "Blog Image"
                                                            }
                                                        />
                                                    </div>

                                                    <div className="blog_prev_next_data">
                                                        <h3
                                                            className="fs-20 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: cleanSEOTags(
                                                                    next?.name,
                                                                ),
                                                            }}
                                                        />

                                                        <Button
                                                            role="button"
                                                            href={getAbsoluteURL(
                                                                `/${next?.slug?.replace(
                                                                    /^\/+/,
                                                                    "",
                                                                )}`,
                                                            )}
                                                            onClick={(e) =>
                                                                handlePrevNextClick(
                                                                    e,
                                                                    next?.slug,
                                                                )
                                                            }
                                                            openNewTab={false}
                                                            label={`Next ${
                                                                TEMPLATE_NAME_LABELS[
                                                                    next
                                                                        ?.template_name
                                                                ] ||
                                                                next?.template_name
                                                            }`}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-12 col-lg-4 col-xl-4 d-none d-lg-block">
                                <div className="table_right_main_box">
                                    {tocItems.length > 0 && (
                                        <div className="table_cantent_box">
                                            <h2 className="table_box_title fs-28">
                                                Table of content
                                            </h2>
                                            <ul>
                                                {tocItems.map((item, idx) => (
                                                    <li key={item.id}>
                                                        <a
                                                            href={`#${item.id}`}
                                                            onClick={(
                                                                event,
                                                            ) => {
                                                                event.preventDefault();
                                                                openLink(
                                                                    `#${item.id}`,
                                                                );
                                                            }}
                                                        >
                                                            {item.text}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
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
                                                            getCurrentUrl(),
                                                        );
                                                    }}
                                                    title="Share on LinkedIn"
                                                >
                                                    <img
                                                        loading="lazy"
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            "/upload/media/linkedin_1752821494.svg",
                                                        )}
                                                        alt="LinkedIn"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        SHARE_LINKS.twitter(
                                                            getCurrentUrl(),
                                                        );
                                                    }}
                                                    title="Share on Twitter"
                                                >
                                                    <img
                                                        loading="lazy"
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            "/upload/media/twitter_1752821571.svg",
                                                        )}
                                                        alt="Twitter"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        SHARE_LINKS.facebook(
                                                            getCurrentUrl(),
                                                        );
                                                    }}
                                                    title="Share on Facebook"
                                                >
                                                    <img
                                                        loading="lazy"
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            "/upload/media/facebook_1752821606.svg",
                                                        )}
                                                        alt="Facebook"
                                                    />
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
