"use client";
/* eslint-disable no-case-declarations */

import { Button, ErrorMessage, OptimizedImage } from "@/components";
import { getImageURL, openLink } from "@/lib";
import { POST_REQUEST } from "@/utilities";
import { useState } from "react";
import { useForm } from "react-hook-form";

const getPaginationRange = (current, total, siblingCount = 1) => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (total <= totalPageNumbers) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblingCount, 1);
    const rightSibling = Math.min(current + siblingCount, total);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    const range = [];

    range.push(1);

    if (showLeftEllipsis) {
        range.push("...");
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== total) {
            range.push(i);
        }
    }

    if (showRightEllipsis) {
        range.push("...");
    }

    if (total !== 1) {
        range.push(total);
    }

    return range;
};

export const MediaPageDigitalSection = ({
    data = {},
    slug = "digital_press",
}) => {
    const { title, digital_press, featured_press } = data;
    const { press, title: pressTitle } = digital_press[0];

    const { filter_list, list, pages, tag_conditions } = press;
    const { name, featured } = featured_press[0];

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredList, setFilteredList] = useState(list || []);
    const [paginationData, setPaginationData] = useState(pages || {});

    const methods = useForm({
        defaultValues: {
            publish_date: new Date(),
            search: "",
        },
    });

    const { register } = methods;

    const onSubmit = methods["handleSubmit"](async (data, props) => {
        let payload = {
            template_id: paginationData?.filters?.template_id,
            page: props?.page || 1,
            limit: paginationData?.filters?.limit,
            tags: {},
            conditions: [],
            sort: {
                sort_by: "published_date",
                sort_type: "desc",
            },
            tag_conditions: tag_conditions || [],
        };

        Object.entries(data)?.map((item) => {
            const fieldName = item[0];
            const fieldValue = item[1];

            if (
                fieldName !== "search" &&
                fieldValue !== "all" &&
                fieldName !== "publish_date" &&
                fieldName !== "page"
            ) {
                payload.tags = {
                    ...payload.tags,
                    [fieldName]: fieldValue,
                };
            }

            if (fieldName === "search" && !!fieldValue) {
                payload.conditions = [
                    ...payload.conditions,
                    {
                        field: fieldName,
                        operator: "like",
                        value: `${fieldValue}`,
                    },
                ];
            }
        });

        const url = paginationData?.filters?.url;

        if (url) {
            const response = await POST_REQUEST(url, payload);

            if (response?.pages) {
                openLink("#case_studies_form");
                setPaginationData(response?.pages);
                setCurrentPage(response?.pages?.current_page);
            }

            if (response?.list) {
                setFilteredList(response?.list);
            }
        }
    });

    const handleActionClick = async (action = "", value = {}) => {
        switch (action) {
            case "page":
                const { page } = value;

                if (page >= 1 && page <= paginationData?.total_pages) {
                    await onSubmit({ page });
                }

                break;
        }
    };

    const isNextDisabled =
        !paginationData?.total_pages ||
        currentPage >= paginationData?.total_pages;

    const isPrevDisabled = currentPage <= 1;

    return (
        <>
            {title && Array.isArray(filter_list) && filter_list.length > 0 && (
                <section
                    className="cs__form_section our_case_studies_sec bl__form_section pr__form_section"
                    id={slug}
                >
                    <div className="circle lg__circle" />
                    <div className="circle sm__circle" />

                    <div className="custom-container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-11 col-xl-10">
                                <div className="section_header text-center">
                                    <h1
                                        className="heading fs-72 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                </div>

                                <form
                                    className="case_studies_form d-flex"
                                    onSubmit={onSubmit}
                                >
                                    {filter_list?.map((filter, index) => {
                                        // if (!["Category"]?.includes(tag)) {
                                        const filterName = filter?.name;
                                        const filterSlug = filter?.slug;
                                        const options = filter?.tags;

                                        return (
                                            !!filterSlug &&
                                            !!options?.length && (
                                                <div
                                                    className="form_field_wrap case_studies_select"
                                                    key={index}
                                                >
                                                    <select
                                                        className="form-field"
                                                        name={filterSlug}
                                                        {...register(
                                                            filterSlug
                                                        )}
                                                        onChange={(event) => {
                                                            register(
                                                                filterSlug
                                                            )?.onChange(event);
                                                            onSubmit();
                                                        }}
                                                    >
                                                        <option value="all">
                                                            All {filterName}
                                                        </option>

                                                        {options?.map(
                                                            (item) => (
                                                                <option
                                                                    key={
                                                                        item?.id
                                                                    }
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                >
                                                                    {item?.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            )
                                        );
                                    })}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {name && Array.isArray(featured) && featured.length > 0 && (
                <section className="feature__pr_section">
                    <div className="custom-container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-11 col-xl-10">
                                <div className="row top__row">
                                    <div className="col-12">
                                        <div className="section_header text-center">
                                            <h2
                                                className="heading fs-48 fw-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: name,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {featured?.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="item__wrap"
                                                >
                                                    <div className="single__item">
                                                        <div className="row">
                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                                <div className="img__wrap">
                                                                    <OptimizedImage
                                                                        className="img-fluid"
                                                                        src={getImageURL(
                                                                            item
                                                                                ?.template_fields
                                                                                ?.featured_image
                                                                                ?.src
                                                                        )}
                        alt=""/>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                                <div className="content_block">
                                                                    <div className="top__block d-flex">
                                                                        <div
                                                                            className="publish__date fw-500 text-white"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: item?.publish_date,
                                                                            }}
                                                                        />

                                                                        <ul className="h5 heading fs-18 fw-500 list-unstyled text-white">
                                                                            <li>
                                                                                Source
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="content__wrap text-white">
                                                                        <h4
                                                                            className="heading fw-500 fs-36"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: item?.name,
                                                                            }}
                                                                        />

                                                                        <p
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: item
                                                                                    ?.template_fields
                                                                                    ?.short_description,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="btn-group">
                                                                        <Button
                                                                            href={
                                                                                item?.slug
                                                                            }
                                                                            label={
                                                                                item
                                                                                    ?.template_fields
                                                                                    ?.button
                                                                                    ?.title ||
                                                                                "Read more"
                                                                            }
                                                                            srText={`about ${item?.name}`}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {pressTitle &&
                Array.isArray(filteredList) &&
                filteredList.length > 0 && (
                    <section
                        className="cs_listing_section our_case_studies_sec bl_listing_section pr_listing_section"
                        id="case_studies_form"
                    >
                        <div className="section_overlay"></div>
                        <div className="custom-container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-11 col-xl-10">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="section_header">
                                                <h3
                                                    className="heading fs-48 fw-300"
                                                    dangerouslySetInnerHTML={{
                                                        __html: pressTitle,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-11 col-xl-10">
                                    <div className="cs_list_wrapper d-flex">
                                        {filteredList?.length ? (
                                            filteredList?.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="item__wrap"
                                                    >
                                                        <div className="single__item">
                                                            <div className="img__wrap">
                                                                <OptimizedImage
                                                                    className="img-fluid"
                                                                    src={getImageURL(
                                                                        item
                                                                            ?.template_fields
                                                                            ?.image
                                                                            ?.src ||
                                                                            "/upload/media/resources_1_1748408224.png"
                                                                    )}
                                                                    alt={
                                                                        item
                                                                            ?.template_fields
                                                                            ?.image
                                                                            ?.alt
                                                                    }/>
                                                            </div>
                                                            <div className="content_block">
                                                                <div className="top__block">
                                                                    <ul className="h5 heading fs-20 fw-600 list-unstyled">
                                                                        <li className="text-gradient">
                                                                            {
                                                                                item?.template_name
                                                                            }
                                                                        </li>
                                                                        {item?.tag_data?.Category?.map(
                                                                            (
                                                                                category
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        category.id
                                                                                    }
                                                                                    className="text-gradient"
                                                                                >
                                                                                    {
                                                                                        category.name
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>

                                                                    <div
                                                                        className="publish__date"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item?.publish_date,
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className="content__wrap">
                                                                    <h4
                                                                        className="heading fw-600 fs-20"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item?.name,
                                                                        }}
                                                                    />
                                                                    <p
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item
                                                                                ?.template_fields
                                                                                ?.short_description,
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="btn-group">
                                                                    <Button
                                                                        href={
                                                                            item?.slug
                                                                        }
                                                                        label={
                                                                            item
                                                                                ?.template_fields
                                                                                ?.button
                                                                                ?.title ||
                                                                            "Read more"
                                                                        }
                                                                        srText={`about ${item?.name}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <ErrorMessage>
                                                No Press Found
                                            </ErrorMessage>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {!!filteredList.length && (
                                        <div className="pagination__wrap d-flex">
                                            <a
                                                className={`d-inline-flex prev_btn${
                                                    isPrevDisabled
                                                        ? " disable"
                                                        : ""
                                                }`}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    !isPrevDisabled &&
                                                        handleActionClick(
                                                            "page",
                                                            {
                                                                page:
                                                                    currentPage -
                                                                    1,
                                                            }
                                                        );
                                                }}
                                                aria-disabled={isPrevDisabled}
                                                tabIndex={
                                                    isPrevDisabled ? -1 : 0
                                                }
                                            >
                                                <svg
                                                    width={65}
                                                    height={65}
                                                    viewBox="0 0 65 65"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x={-1}
                                                        y={1}
                                                        width={63}
                                                        height={63}
                                                        rx="31.5"
                                                        transform="matrix(-1 0 0 1 63 0)"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    />
                                                    <path
                                                        d="M51.9744 31.0003C52.5265 30.9862 52.9855 31.4223 52.9997 31.9744C53.0138 32.5265 52.5777 32.9855 52.0256 32.9997L51.9744 31.0003ZM12.3112 33.725C11.9108 33.3446 11.8946 32.7117 12.275 32.3113L18.4737 25.7863C18.8541 25.3858 19.4871 25.3696 19.8875 25.75C20.2879 26.1304 20.3041 26.7633 19.9237 27.1638L14.4138 32.9637L20.2137 38.4737C20.6142 38.8541 20.6304 39.4871 20.25 39.8875C19.8696 40.2879 19.2367 40.3041 18.8362 39.9237L12.3112 33.725ZM52 32L52.0256 32.9997L13.0256 33.9997L13 33L12.9744 32.0003L51.9744 31.0003L52 32Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </a>

                                            <ul className="nav_pagination list-unstyled justify-content-center fs-20">
                                                {paginationData?.total_pages && (
                                                    <>
                                                        {getPaginationRange(
                                                            currentPage,
                                                            paginationData?.total_pages
                                                        ).map((item, index) => (
                                                            <li key={index}>
                                                                {item ===
                                                                "..." ? (
                                                                    <span className="dots">
                                                                        ...
                                                                    </span>
                                                                ) : (
                                                                    <a
                                                                        href="#!"
                                                                        className={
                                                                            currentPage ===
                                                                            item
                                                                                ? "active"
                                                                                : ""
                                                                        }
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.preventDefault();
                                                                            handleActionClick(
                                                                                "page",
                                                                                {
                                                                                    page: item,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </a>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                            </ul>

                                            <a
                                                className={`next_btn d-inline-flex${
                                                    isNextDisabled
                                                        ? " disable"
                                                        : ""
                                                }`}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    !isNextDisabled &&
                                                        handleActionClick(
                                                            "page",
                                                            {
                                                                page:
                                                                    currentPage +
                                                                    1,
                                                            }
                                                        );
                                                }}
                                                aria-disabled={isNextDisabled}
                                                tabIndex={
                                                    isNextDisabled ? -1 : 0
                                                }
                                            >
                                                <svg
                                                    width={65}
                                                    height={65}
                                                    viewBox="0 0 65 65"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x={1}
                                                        y={1}
                                                        width={63}
                                                        height={63}
                                                        rx="31.5"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    />
                                                    <path
                                                        d="M13.0256 31.0003C12.4735 30.9862 12.0145 31.4223 12.0003 31.9744C11.9862 32.5265 12.4223 32.9855 12.9744 32.9997L13.0256 31.0003ZM52.6888 33.725C53.0892 33.3446 53.1054 32.7117 52.725 32.3113L46.5263 25.7863C46.1459 25.3858 45.5129 25.3696 45.1125 25.75C44.7121 26.1304 44.6959 26.7633 45.0763 27.1638L50.5862 32.9637L44.7863 38.4737C44.3858 38.8541 44.3696 39.4871 44.75 39.8875C45.1304 40.2879 45.7633 40.3041 46.1638 39.9237L52.6888 33.725ZM13 32L12.9744 32.9997L51.9744 33.9997L52 33L52.0256 32.0003L13.0256 31.0003L13 32Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
        </>
    );
};
