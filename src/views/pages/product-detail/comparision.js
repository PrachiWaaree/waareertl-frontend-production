"use client";
/* eslint-disable no-unused-vars */
import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";
import { currencyFormat } from "@/utilities";
import React, { useState } from "react";

const TABLE_FIELDS = [
    { label: "Price", key: "price", isPrice: true },
    { label: "SKU", key: "sku" },
    { label: "Weight", key: "weight" },
    { label: "Width", key: "width" },
    { label: "Height", key: "height" },
    { label: "Depth", key: "depth" },
];

export const ProductPageComparision = ({ data = {} }) => {
    const { title, description, image, product_comparison_list = [] } = data;

    // Default to first two products if available
    const [selectedIndexes, setSelectedIndexes] = useState([0, 1]);

    const handleSelect = (colIdx, e) => {
        const idx = Number(e.target.value);
        if (!isNaN(idx)) {
            setSelectedIndexes((prev) => {
                const updated = [...prev];
                updated[colIdx] = idx;
                // Prevent selecting the same product in both columns
                if (updated[0] === updated[1]) {
                    const nextIdx = product_comparison_list.findIndex(
                        (_, i) => i !== idx
                    );
                    updated[colIdx === 0 ? 1 : 0] =
                        nextIdx !== -1 ? nextIdx : idx;
                }
                return updated;
            });
        }
    };

    // Get the two selected products for comparison
    const selectedProducts = selectedIndexes.map(
        (idx) => product_comparison_list[idx] || {}
    );

    // Helper to get image for comparison (thumbnail_image or product_image)
    const getProductImage = (product) => {
        if (product?.thumbnail_image?.src) {
            return {
                src: getImageURL(product.thumbnail_image.src),
                alt: product.thumbnail_image.alt || product.name || "",
            };
        }
        if (product?.product_image?.src) {
            return {
                src: getImageURL(product.product_image.src),
                alt: product.product_image.alt || product.name || "",
            };
        }
        return { src: "", alt: "" };
    };

    // Helper to get button data
    const getButtonData = (product) => {
        // Prefer template_fields.button, fallback to shop_buy_link, fallback to quote_cta
        if (product?.template_fields?.button) {
            return product.template_fields.button;
        }
        if (product?.shop_buy_link) {
            return {
                title: "Shop Now",
                ...product.shop_buy_link,
            };
        }
        if (product?.quote_cta) {
            return {
                title: product.quote_cta.title || "Request A Quote",
                ...product.quote_cta,
            };
        }
        return null;
    };

    // Helper to get href for button
    const getButtonHref = (button) => {
        if (!button) return "#";
        if (button.url_type === "external") {
            return button.url || button.external_url || "#";
        }
        return button.url || "#";
    };

    // Helper to get if button should open in new tab
    const getButtonTarget = (button) => {
        if (!button) return undefined;
        if (button.open_new_tab === "yes") return "_blank";
        return undefined;
    };

    return (
        <>
            {product_comparison_list?.length >= 2 && (
                <section className="product_comparison">
                    <div className="custom-container">
                        <div className="row">
                            <div className="col-md-12 col-lg-4 col-xl-4">
                                <div className="section_header">
                                    <h4
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />

                                    <div className="content__wrap">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="product_comparison_left_img">
                                    <OptimizedImage
                                        src={getImageURL(image?.src || "")}
                                        alt={image?.alt || ""}/>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-8 col-xl-8">
                                <div className="product_comparison_table_main">
                                    <div className="table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th />
                                                    {[0, 1]?.map((colIdx) => (
                                                        <th key={colIdx}>
                                                            <div className="select_part_comparison">
                                                                <select
                                                                    className="form-field"
                                                                    name={`options${colIdx}`}
                                                                    required=""
                                                                    value={
                                                                        selectedIndexes[
                                                                            colIdx
                                                                        ]
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSelect(
                                                                            colIdx,
                                                                            e
                                                                        )
                                                                    }
                                                                >
                                                                    {product_comparison_list?.map(
                                                                        (
                                                                            product,
                                                                            idx
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    product?.id ||
                                                                                    idx
                                                                                }
                                                                                value={
                                                                                    idx
                                                                                }
                                                                                disabled={
                                                                                    selectedIndexes[
                                                                                        (colIdx +
                                                                                            1) %
                                                                                            2
                                                                                    ] ===
                                                                                    idx
                                                                                }
                                                                            >
                                                                                {
                                                                                    product?.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    {[0, 1]?.map((colIdx) => {
                                                        const product =
                                                            selectedProducts[
                                                                colIdx
                                                            ];
                                                        const img = getImageURL(
                                                            product
                                                                ?.template_fields
                                                                ?.thumbnail_image
                                                                ?.src
                                                        );

                                                        return (
                                                            <td key={colIdx}>
                                                                <div className="compare_img">
                                                                    {img ? (
                                                                        <OptimizedImage
                                                                            src={
                                                                                img
                                                                            }
                                                                            alt={
                                                                                img
                                                                            }/>
                                                                    ) : (
                                                                        <div
                                                                            style={{
                                                                                width: 100,
                                                                                height: 100,
                                                                                background:
                                                                                    "#eee",
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                                {TABLE_FIELDS?.map((field) => (
                                                    <tr key={field?.key}>
                                                        <td>
                                                            <span>
                                                                {field?.label}
                                                                {field?.isPrice
                                                                    ? ":"
                                                                    : ""}
                                                            </span>
                                                        </td>
                                                        {[0, 1]?.map(
                                                            (colIdx) => {
                                                                const product =
                                                                    selectedProducts[
                                                                        colIdx
                                                                    ];

                                                                if (
                                                                    field?.isPrice
                                                                ) {
                                                                    // Show MRP and Price
                                                                    return (
                                                                        <td
                                                                            key={
                                                                                colIdx
                                                                            }
                                                                        >
                                                                            <div className="mrp_part_comparison">
                                                                                <div className="cut_price">
                                                                                    MRP:{" "}
                                                                                    {currencyFormat(
                                                                                        product
                                                                                            ?.template_fields
                                                                                            ?.mrp
                                                                                    )}
                                                                                </div>

                                                                                <div className="final_price">
                                                                                    {product
                                                                                        ?.template_fields
                                                                                        ?.price ||
                                                                                        "-"}
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    );
                                                                }
                                                                return (
                                                                    <td
                                                                        key={
                                                                            colIdx
                                                                        }
                                                                        className="px-6 py-4 text-gray-700"
                                                                    >
                                                                        {product
                                                                            ?.template_fields?.[
                                                                            field
                                                                                ?.key
                                                                        ] ||
                                                                            "-"}
                                                                    </td>
                                                                );
                                                            }
                                                        )}
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td />
                                                    {[0, 1]?.map((colIdx) => {
                                                        const product =
                                                            selectedProducts[
                                                                colIdx
                                                            ];
                                                        const button =
                                                            getButtonData(
                                                                product
                                                            );

                                                        if (!button)
                                                            return (
                                                                <td
                                                                    key={colIdx}
                                                                ></td>
                                                            );
                                                        return (
                                                            <td key={colIdx}>
                                                                <div className="btn-group">
                                                                    <Button
                                                                        label={
                                                                            button?.title ||
                                                                            "Shop Now"
                                                                        }
                                                                        href={getButtonHref(
                                                                            button
                                                                        )}
                                                                        target={getButtonTarget(
                                                                            button
                                                                        )}
                                                                    />
                                                                </div>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};
