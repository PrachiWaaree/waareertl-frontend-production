"use client";
/* eslint-disable no-case-declarations, react-hooks/exhaustive-deps, react/jsx-key */

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//

import { POST_REQUEST } from "@/utilities";
import { Button, ErrorMessage, OptimizedImage } from "@/components";
import { getImageURL, openLink, useSwiperSliderOptions } from "@/lib";

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

export const DownloadCentreList = ({
    data = {},
    slug = "download_center_list",
}) => {
    const { documents } = data || {};
    const { filter_list, tag_conditions, pages } = documents || {};
    const { tags } = filter_list?.[0] || {};
    const initialList =
        Array.isArray(documents?.list) && documents.list.length > 0
            ? documents.list
            : [];

    const { nextSlide, prevSlide, options } = useSwiperSliderOptions({
        clickable: true,
        loop: true,
        centeredSlides: true,
        watchSlidesProgress: true,
        slidesPerView: "auto",

        breakpoints: {
            260: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 3.2,
                spaceBetween: 20,
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

    const [filteredList, setFilteredList] = useState(initialList);
    const [paginationData, setPaginationData] = useState(pages);
    const [currentPage, setCurrentPage] = useState(pages?.current_page || 1);

    // Helper function to get URL parameter
    const getUrlParameter = (name) => {
        if (typeof window === "undefined") return null;
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    // Helper function to find tag by name (URL-decoded)
    const findTagByName = (tagName) => {
        if (!tagName || !tags) return null;
        const decodedTagName = decodeURIComponent(tagName);
        return tags.find((tag) => tag.name === decodedTagName);
    };

    // Initialize form with URL parameter if it exists
    const getInitialTypeValue = () => {
        const urlType = getUrlParameter("type");
        if (urlType) {
            const matchingTag = findTagByName(urlType);
            if (matchingTag) {
                return matchingTag.id?.toString();
            }
        }
        return tags?.[0]?.id?.toString() || null;
    };

    const methods = useForm({
        defaultValues: {
            search: "",
            type: getInitialTypeValue(),
            category: "all",
        },
    });
    const { register, setValue } = methods;

    const isNextDisabled =
        !paginationData?.total_pages ||
        currentPage >= paginationData?.total_pages;

    const isPrevDisabled = currentPage <= 1;

    const selectedTypeFilter = methods["watch"]("type");
    const selectedTag = tags?.find(
        (tag) => tag?.id?.toString() === selectedTypeFilter
    );
    const selectedCategoryFilter = methods["watch"]("category");

    // Effect to handle URL parameter changes and set initial state
    useEffect(() => {
        if (tags && tags.length > 0) {
            const urlType = getUrlParameter("type");
            if (urlType) {
                const matchingTag = findTagByName(urlType);
                if (matchingTag) {
                    setValue("type", matchingTag.id?.toString());
                }
            }
        }
    }, [tags, setValue]);

    const onSubmit = methods["handleSubmit"](async (data, props) => {
        let payload = {
            template_id: paginationData?.filters?.template_id,
            page: props?.page || 1,
            limit: paginationData?.filters?.limit,
            tags: {},
            conditions: [],
            tag_conditions: tag_conditions || [],
        };

        Object.entries(data)?.map((item) => {
            const fieldName = item[0];
            const fieldValue = item[1];

            if (
                fieldName === "search" &&
                !!fieldValue &&
                fieldValue !== "all"
            ) {
                payload.conditions = [
                    ...payload.conditions,
                    {
                        field: fieldName,
                        operator: "like",
                        value: `${fieldValue}`,
                    },
                ];
            }

            if (
                fieldName !== "search" &&
                !!fieldValue &&
                fieldValue !== "all"
            ) {
                payload.tags = {
                    ...payload?.tags,
                    [fieldName]: fieldValue,
                };
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

    useEffect(() => {
        onSubmit();
    }, [selectedTypeFilter, selectedCategoryFilter]);

    return (
        <section className="download__opt_section" id={slug}>
            <div className="custom-container">
                <div className="row top__row">
                    <div className="col-12">
                        <div className="download_srch">
                            <div className="form_field_wrap form_search">
                                <input
                                    className="form-field left-icon"
                                    type="text"
                                    {...register("search")}
                                    placeholder="Search"
                                    onBlur={() => {
                                        onSubmit();
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onSubmit();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="d-none d-lg-block">
                            <div className="download__tab_wrapper list-unstyled d-flex">
                                {tags?.map((tag, index) => {
                                    const isSelected =
                                        selectedTypeFilter ===
                                        tag?.id?.toString();

                                    return (
                                        <RenderTag
                                            key={index}
                                            tag={tag}
                                            isSelected={isSelected}
                                            methods={methods}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="d-block d-lg-none">
                            <div className="dtab__slider_wrap">
                                <Swiper
                                    {...options}
                                    className="dtab__slider download__tab_wrapper list-unstyled d-flex"
                                >
                                    {tags?.map((tag, index) => {
                                        const isSelected =
                                            selectedTypeFilter ===
                                            tag?.id?.toString();

                                        return (
                                            <SwiperSlide key={index}>
                                                <RenderTag
                                                    tag={tag}
                                                    isSelected={isSelected}
                                                    methods={methods}
                                                />
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                                <div className="dtab-pagination" />
                            </div>

                            <ul className="dtab__slider_btn">
                                <li
                                    className="prev-btn-dtab"
                                    onClick={() => {
                                        prevSlide();
                                    }}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <svg
                                            width={45}
                                            height={45}
                                            viewBox="0 0 45 45"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x={-1}
                                                y={1}
                                                width={43}
                                                height={43}
                                                rx="21.5"
                                                transform="matrix(-1 0 0 1 43 0)"
                                                stroke="#5B5B5B"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M37.4685 21.1158C38.0206 21.1017 38.4797 21.5377 38.4938 22.0898C38.508 22.6419 38.0719 23.101 37.5198 23.1151L37.4685 21.1158ZM6.81525 23.6095C6.41484 23.2291 6.39861 22.5961 6.779 22.1957L12.9777 15.6707C13.3581 15.2703 13.9911 15.2541 14.3915 15.6345C14.7919 16.0148 14.8081 16.6478 14.4277 17.0482L8.91774 22.8482L14.7177 28.3582C15.1181 28.7386 15.1344 29.3715 14.754 29.772C14.3736 30.1724 13.7406 30.1886 13.3402 29.8082L6.81525 23.6095ZM37.4941 22.1155L37.5198 23.1151L7.52963 23.8841L7.50399 22.8845L7.47836 21.8848L37.4685 21.1158L37.4941 22.1155Z"
                                                fill="#5B5B5B"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li
                                    className="next-btn-dtab"
                                    onClick={() => {
                                        nextSlide();
                                    }}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <svg
                                            width={45}
                                            height={45}
                                            viewBox="0 0 45 45"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x={1}
                                                y={1}
                                                width={43}
                                                height={43}
                                                rx="21.5"
                                                stroke="#0DB02B"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M7.53149 21.1158C6.97939 21.1017 6.52034 21.5377 6.50619 22.0898C6.49203 22.6419 6.92812 23.101 7.48023 23.1151L7.53149 21.1158ZM38.1848 23.6095C38.5852 23.2291 38.6014 22.5961 38.221 22.1957L32.0223 15.6707C31.6419 15.2703 31.0089 15.2541 30.6085 15.6345C30.2081 16.0148 30.1919 16.6478 30.5723 17.0482L36.0823 22.8482L30.2823 28.3582C29.8819 28.7386 29.8656 29.3715 30.246 29.772C30.6264 30.1724 31.2594 30.1886 31.6598 29.8082L38.1848 23.6095ZM7.50586 22.1155L7.48023 23.1151L37.4704 23.8841L37.496 22.8845L37.5216 21.8848L7.53149 21.1158L7.50586 22.1155Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row middle__row" id="case_studies_form">
                    <div className="col-12">
                        <div className="section_header">
                            <div className="row">
                                <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                                    <h4
                                        className="heading fs-48 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: selectedTag?.name,
                                        }}
                                    />
                                </div>

                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                    <div className="btn-group">
                                        {selectedTag?.filter_list?.map(
                                            (item) => {
                                                return (
                                                    <select
                                                        name="options"
                                                        className="form-field"
                                                        aria-label={`Filter by ${item?.name || "category"}`}
                                                        {...register(
                                                            "category"
                                                        )}
                                                    >
                                                        <option value="all">
                                                            All {item?.name}
                                                        </option>

                                                        {item?.tags?.map(
                                                            (tag) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            tag.id
                                                                        }
                                                                        value={
                                                                            tag.id
                                                                        }
                                                                    >
                                                                        {
                                                                            tag.name
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row bottom__row">
                    <div className="col-12">
                        <div
                            className="item__tab_data tab-active"
                            data-id="dl_1"
                        >
                            <div className="download__tab_item">
                                <div className="download__item_wrapper d-flex">
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
                                                                        ?.thumbnail_image
                                                                        ?.src
                                                                )}
                                                                alt={
                                                                    item
                                                                        ?.template_fields
                                                                        ?.thumbnail_image
                                                                        ?.alt
                                                                }/>
                                                        </div>

                                                        <div className="content_block">
                                                            <ul className="heading fs-20 fw-600 list-unstyled ">
                                                                <li
                                                                    className="text-gradient"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item?.tag_data?.type?.[0]
                                                                            ?.name,
                                                                    }}
                                                                />
                                                            </ul>

                                                            <h5
                                                                className="heading fs-20 fw-600"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item?.name,
                                                                }}
                                                            />

                                                            <div className="publish__date">
                                                                Last Updated:{" "}
                                                                <span
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item?.updated_at,
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="btn-group">
                                                                <Button
                                                                    href={getImageURL(
                                                                        item
                                                                            ?.template_fields
                                                                            ?.document
                                                                            ?.src
                                                                    )}
                                                                    target="_blank"
                                                                    label="Download Now"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <ErrorMessage
                                            style={{
                                                paddingTop: "30px",
                                            }}
                                        >
                                            No data found
                                        </ErrorMessage>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="item__tab_data" data-id="dl_2">
                            <div className="download__tab_item">
                                <div className="download__item_wrapper d-flex">
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
                                                                        ?.thumbnail_image
                                                                        ?.src
                                                                )}
                                                                alt={
                                                                    item
                                                                        ?.template_fields
                                                                        ?.thumbnail_image
                                                                        ?.alt
                                                                }/>
                                                        </div>
                                                        <div className="content_block">
                                                            <ul className="heading fs-20 fw-600 list-unstyled ">
                                                                <li
                                                                    className="text-gradient"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item?.tag_data?.type?.[0]
                                                                            ?.name,
                                                                    }}
                                                                />
                                                            </ul>
                                                            <h5
                                                                className="heading fs-20 fw-600"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item?.name,
                                                                }}
                                                            />

                                                            <div className="publish__date">
                                                                Last Updated:{" "}
                                                                <span
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: item?.updated_at,
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="btn-group">
                                                                <Button
                                                                    href={getImageURL(
                                                                        item
                                                                            ?.template_fields
                                                                            ?.document
                                                                            ?.src
                                                                    )}
                                                                    target="_blank"
                                                                    label="Download Now"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <ErrorMessage
                                            style={{
                                                paddingTop: "30px",
                                            }}
                                        >
                                            No data found
                                        </ErrorMessage>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                {!!filteredList?.length && (
                                    <div className="pagination__wrap d-flex">
                                        <a
                                            className={`d-inline-flex prev_btn${
                                                isPrevDisabled ? " disable" : ""
                                            }`}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                !isPrevDisabled &&
                                                    handleActionClick("page", {
                                                        page: currentPage - 1,
                                                    });
                                            }}
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
                                                    )?.map((item, index) => (
                                                        <li key={index}>
                                                            {item === "..." ? (
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
                                            className={`next_btn d-inline-flex ${
                                                isNextDisabled ? "disable" : ""
                                            }`}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                !isNextDisabled &&
                                                    handleActionClick("page", {
                                                        page: currentPage + 1,
                                                    });
                                            }}
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
                </div>
            </div>
        </section>
    );
};

const RenderTag = ({ tag, isSelected = false, methods = {} }) => {
    const { setValue } = methods;

    const handleTagClick = () => {
        setValue?.("type", String(tag?.id));

        const url = new URL(window.location);
        url.searchParams.set("type", tag?.name || "");
        window.history.pushState({}, "", url);
    };

    return (
        <div
            className={`d-flex item__tab ${isSelected ? "active" : ""}`}
            onClick={handleTagClick}
        >
            <a
                className="single__item fs-20"
                href={`?type=${tag?.name}`}
                onClick={(e) => e.preventDefault()}
                dangerouslySetInnerHTML={{ __html: tag?.name }}
            />
        </div>
    );
};
