"use client";
/* eslint-disable no-unused-vars */

import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
//
import { Button, OptimizedImage } from "@/components";
import { POST_REQUEST } from "@/utilities";
import { getImageURL, usePagintation, getAbsoluteURL } from "@/lib";

export const ProductPageDetails = ({ data = {}, slug = "product" }) => {
    const { title, button, ["product-details"]: productDetail } = data || {};

    const {
        filter_list = [],
        list = [],
        pages = {},
        tag_conditions = [],
        sort,
    } = productDetail || {};

    const filtered_filter_list = filter_list?.filter(
        (filter) =>
            !(
                filter?.name === "Type Of Product" &&
                filter?.slug === "type_of_product"
            ),
    );

    const {
        hasNext,
        limit,
        template_id,
        url: endpoint,
        current_page,
        onUpdatePagintaion,
    } = usePagintation({
        data: pages,
    });

    const { register, watch } = useForm({});

    const selectedFilters = watch();

    // Use a ref to always get the latest products in fetchApi
    const currentProductsRef = useRef([]);
    const [currentProducts, setCurrentProducts] = useState([]);

    // Keep ref in sync with state
    useEffect(() => {
        currentProductsRef.current = currentProducts;
    }, [currentProducts]);

    const fetchApi = async (page, filters) => {
        let payload = {
            template_id,
            page: page,
            limit: limit,
            tag: {},
            tag_conditions: tag_conditions || [],
            sort: sort || {},
        };

        if (!isEmpty(filters)) {
            Object.entries(filters).forEach(([filterName, filterValue]) => {
                if (filterValue !== "all") {
                    payload.tag = {
                        ...payload?.tag,
                        [filterName]: filterValue,
                    };
                }
            });
        }

        const response = await POST_REQUEST(endpoint, payload);

        if (response?.list?.length) {
            setCurrentProducts(
                page === 1
                    ? response?.list
                    : [...currentProductsRef.current, ...response?.list],
            );
        }

        if (response?.pages) {
            onUpdatePagintaion(response?.pages);
        }
    };

    const handleLoadMore = () => {
        const newPage = current_page + 1;
        fetchApi(newPage, selectedFilters);
    };

    useEffect(() => {
        if (list?.length) {
            setCurrentProducts(list);
        }
    }, [list]);

    const renderFilters = () => {
        if (!filtered_filter_list?.length) {
            return null;
        }

        return filtered_filter_list?.map((filter, idx) => (
            <select
                key={filter?.id}
                className="form-field"
                name={filter?.slug}
                {...register(filter?.slug)}
                onChange={(event) => {
                    register(filter?.slug)?.onChange(event);
                    fetchApi(1, {
                        ...selectedFilters,
                        [filter?.slug]: event?.target?.value,
                    });
                }}
            >
                <option value="all">All {filter?.name}</option>
                {filter?.tags?.map((tag) => (
                    <option key={tag?.id} value={tag?.id}>
                        {tag?.name}
                    </option>
                ))}
            </select>
        ));
    };

    return (
        <>
            <section className="module__listing_section" id={slug}>
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section_header">
                                <div className="row top__row">
                                    <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                                        <h4
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="btn-group">
                                            {renderFilters()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="module__wrapper">
                                {currentProducts?.map((product, index) => {
                                    const tf = product?.template_fields || {};

                                    const productSlug =
                                        product?.slug?.startsWith("/")
                                            ? product.slug
                                            : `/${product.slug}`;

                                    const resolvedButtonUrl =
                                        tf?.button?.url?.trim()
                                            ? tf.button.url
                                            : tf?.shop_buy_link?.url?.trim()
                                              ? tf.shop_buy_link.url
                                              : productSlug;

                                    const resolvedButtonType =
                                        resolvedButtonUrl === productSlug
                                            ? "internal"
                                            : tf?.button?.url_type ||
                                              "external";

                                    const openInNewTab =
                                        tf?.button?.open_new_tab === "yes";

                                    return (
                                        <div
                                            className="module__list"
                                            key={product.id || index}
                                        >
                                            <div className="row">
                                                <div className="col-12 col-md-4 col-lg-5 col-xl-5">
                                                    <div className="module__img">
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                tf
                                                                    ?.thumbnail_image
                                                                    ?.src,
                                                            )}
                                                            alt={
                                                                tf
                                                                    ?.thumbnail_image
                                                                    ?.alt
                                                            }/>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-8 col-lg-7 col-xl-7">
                                                    <div className="module__details">
                                                        <div className="module__header">
                                                            <h4
                                                                className="heading fs-36 fw-500"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: product?.name,
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="module__body">
                                                            <div className="module__card">
                                                                <h5 className="heading fs-20 fw-600 text-primary">
                                                                    Features
                                                                </h5>
                                                                <div className="content__wrap">
                                                                    <ol>
                                                                        {tf?.product_details?.features?.map(
                                                                            (
                                                                                feature,
                                                                                idx,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        feature?.title
                                                                                    }
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                    </ol>
                                                                </div>
                                                            </div>
                                                            <div className="module__card">
                                                                <h5 className="heading fs-20 fw-600 text-primary">
                                                                    Specifications
                                                                </h5>
                                                                <div className="spec__wrapper">
                                                                    {tf?.product_details?.specification?.map(
                                                                        (
                                                                            spec,
                                                                            idx,
                                                                        ) => (
                                                                            <div
                                                                                className="spec__card"
                                                                                key={
                                                                                    idx
                                                                                }
                                                                            >
                                                                                <div className="img__wrap">
                                                                                    <OptimizedImage
                                                                                        className="img-fluid"
                                                                                        src={getImageURL(
                                                                                            spec
                                                                                                ?.icon
                                                                                                ?.src,
                                                                                        )}
                                                                                        alt={
                                                                                            spec
                                                                                                ?.icon
                                                                                                ?.alt
                                                                                        }/>
                                                                                </div>
                                                                                <div className="content__wrap">
                                                                                    <h5 className="heading fs-20 fw-600 text-gradient">
                                                                                        {
                                                                                            spec?.title
                                                                                        }
                                                                                    </h5>
                                                                                    <p>
                                                                                        {
                                                                                            spec?.description
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="module__card">
                                                                <h5 className="heading fs-20 fw-600 text-primary">
                                                                    Applications:
                                                                </h5>
                                                                <div className="content__wrap">
                                                                    <p>
                                                                        {
                                                                            tf?.description
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="module__footer">
                                                            <div className="btn-group">
                                                                {tf?.button
                                                                    ?.title && (
                                                                    <Button
                                                                        label={
                                                                            tf
                                                                                .button
                                                                                .title
                                                                        }
                                                                        onClick={() => {
                                                                            const finalUrl =
                                                                                getAbsoluteURL(
                                                                                    resolvedButtonUrl,
                                                                                );

                                                                            if (
                                                                                openInNewTab
                                                                            ) {
                                                                                window.open(
                                                                                    finalUrl,
                                                                                    "_blank",
                                                                                    "noopener,noreferrer",
                                                                                );
                                                                            } else {
                                                                                window.location.href =
                                                                                    finalUrl;
                                                                            }
                                                                        }}
                                                                    />
                                                                )}

                                                                {tf
                                                                    ?.download_cta
                                                                    ?.src && (
                                                                    <a
                                                                        className="primary_text_btn"
                                                                        href={getImageURL(
                                                                            tf
                                                                                ?.download_cta
                                                                                ?.src,
                                                                        )}
                                                                        download
                                                                    >
                                                                        <span className="primary_text_btn">
                                                                            {
                                                                                tf?.download
                                                                            }
                                                                        </span>
                                                                    </a>
                                                                )}
                                                                {tf?.quote_cta
                                                                    ?.title && (
                                                                    <a
                                                                        className="primary_text_btn"
                                                                        href={
                                                                            tf
                                                                                ?.quote_cta
                                                                                ?.url
                                                                        }
                                                                        target={
                                                                            tf
                                                                                ?.quote_cta
                                                                                ?.url_type ===
                                                                            "external"
                                                                                ? "_blank"
                                                                                : "_self"
                                                                        }
                                                                        rel={
                                                                            tf
                                                                                ?.quote_cta
                                                                                ?.url_type ===
                                                                            "external"
                                                                                ? "noopener noreferrer"
                                                                                : undefined
                                                                        }
                                                                    >
                                                                        <span className="primary_text_btn">
                                                                            {
                                                                                tf
                                                                                    ?.quote_cta
                                                                                    ?.title
                                                                            }
                                                                        </span>
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {!!hasNext && (
                                <div className="module__action text-center">
                                    <Button
                                        label={button?.title}
                                        onClick={handleLoadMore}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
