"use client";
/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text, no-unused-vars */

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Button, Collapse, ErrorMessage, Fade } from "@/components";

export const InvestorRelationPage = ({
    data = {},
    slug = "shareholders_investor",
}) => {
    const { types = [] } = data;

    const [activeType, setActiveType] = useState(0);
    const [activeCategory, setActiveCategory] = useState(0);

    const selectedTypeData = types?.[activeType];

    const {
        options: mainSliderOptions,
        nextSlide,
        prevSlide,
    } = useSwiperSliderOptions({
        slidesPerView: "auto",
        spaceBetween: 20,
        breakpoints: {
            600: { slidesPerView: 3.2 },
            767: { slidesPerView: 3 },
        },
    });

    const handleActionClick = async (action = "", value = "") => {
        switch (action) {
            case "type":
                setActiveType(value);
                setActiveCategory(0);

                break;
        }
    };

    const handleTabClick = (tab) => {
        const url = new URL(window.location);
        url.searchParams.set("type", tab?.title || "");
        window.history.pushState({}, "", url);

        const section = document.getElementById(slug);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const typeParam = params.get("type");
        if (typeParam) {
            const index = types.findIndex((t) => t.title === typeParam);
            if (index >= 0) {
                setActiveType(index);
                setActiveCategory(0);

                const section = document.getElementById(slug);
                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }
        }
    }, [types, slug]);

    return (
        <>
            {/* <section className="intester_main" id={slug}>
                <div className="custom-container">
                    <div className="tabbing_up_invester d-none d-lg-block">
                        <ul className="list-unstyled justify-content-center d-flex">
                            {types?.map((tab, index) => {
                                const isActive = activeType === index;

                                return (
                                    <li
                                        key={index}
                                        className="intesterclick"
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        <a
                                            href={`?type=${tab?.title}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleActionClick(
                                                    "type",
                                                    index
                                                );
                                            }}
                                            className={
                                                isActive ? "activelink" : ""
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: tab?.title,
                                            }}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="d-block d-lg-none">
                        <div className="investor_slider_wrap">
                            <div className="tab_invesret_mobile_slider tabbing_up_invester">
                                <Swiper {...mainSliderOptions}>
                                    {types?.map((tab, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="intesterclick">
                                                <a
                                                    href={`?type=${tab?.title}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleActionClick(
                                                            "type",
                                                            index
                                                        );
                                                    }}
                                                    className={
                                                        activeType === index
                                                            ? "activelink"
                                                            : ""
                                                    }
                                                    dangerouslySetInnerHTML={{
                                                        __html: tab?.title,
                                                    }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <ul className="invester_slider_btn list-unstyled">
                                <li
                                    className="prev-btn-invester"
                                    onClick={prevSlide}
                                >
                                    <a
                                        href="#!"
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
                                                x={-0.891304}
                                                y={0.891304}
                                                width={38.3261}
                                                height={39.2174}
                                                rx="19.163"
                                                transform="matrix(-1 0 0 1 40.7721 2)"
                                                stroke="#0DB02B"
                                                strokeWidth={1.78261}
                                            />
                                            <path
                                                d="M35.8691 21.6087C36.3614 21.6087 36.7604 22.0077 36.7604 22.5C36.7604 22.9923 36.3614 23.3913 35.8691 23.3913V22.5V21.6087ZM8.49976 23.1302C8.15169 22.7822 8.15169 22.2178 8.49976 21.8698L14.172 16.1975C14.5201 15.8495 15.0844 15.8495 15.4325 16.1975C15.7806 16.5456 15.7806 17.1099 15.4325 17.458L10.3905 22.5L15.4325 27.542C15.7806 27.8901 15.7806 28.4544 15.4325 28.8025C15.0844 29.1505 14.5201 29.1505 14.172 28.8025L8.49976 23.1302ZM35.8691 22.5V23.3913H9.13001V22.5V21.6087H35.8691V22.5Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li
                                    className="next-btn-invester"
                                    onClick={nextSlide}
                                >
                                    <a
                                        href="#!"
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
                                                x={3.33662}
                                                y={2.8913}
                                                width={38.3261}
                                                height={39.2174}
                                                rx="19.163"
                                                stroke="#0DB02B"
                                                strokeWidth={1.78261}
                                            />
                                            <path
                                                d="M9.13086 21.6087C8.63861 21.6087 8.23956 22.0077 8.23956 22.5C8.23956 22.9923 8.63861 23.3913 9.13086 23.3913V22.5V21.6087ZM36.5002 23.1302C36.8483 22.7822 36.8483 22.2178 36.5002 21.8698L30.828 16.1975C30.4799 15.8495 29.9156 15.8495 29.5675 16.1975C29.2194 16.5456 29.2194 17.1099 29.5675 17.458L34.6095 22.5L29.5675 27.542C29.2194 27.8901 29.2194 28.4544 29.5675 28.8025C29.9156 29.1505 30.4799 29.1505 30.828 28.8025L36.5002 23.1302ZM9.13086 22.5V23.3913H35.87V22.5V21.6087H9.13086V22.5Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <RenderSubCategory
                    data={selectedTypeData}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            </section> */}
        </>
    );
};

const RenderSubCategory = ({ data, activeCategory, setActiveCategory }) => {
    const { title, description, category } = data || {};

    const selectedCategoryData = category?.[activeCategory];

    return (
        <div className="data_bottom_invester">
            <div className="intesterlist">
                <div className="all_tab_title">
                    <div className="custom-container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-9">
                                <div className="section_header text-center">
                                    <h2
                                        className="heading fs-36 fw-500"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                </div>

                                {description && (
                                    <div
                                        className="content__wrap fs-16 text-center"
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {category?.length ? (
                    <>
                        <div className="team__section governance_table_tabing committee_tab_main">
                            <RenderCategorySlider
                                categories={category}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />

                            <div className="custom-container">
                                <RenderCategoryContent
                                    data={selectedCategoryData}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="col-12 text-center">
                        <div className="error_msg_wrapper">
                            <ErrorMessage>
                                No content available for this section.
                            </ErrorMessage>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const RenderCategorySlider = ({
    categories,
    activeCategory,
    setActiveCategory,
}) => {
    const {
        prevSlide,
        nextSlide,
        options: categorySliderOptions,
    } = useSwiperSliderOptions({
        slidesPerView: categories?.length,
        allowTouchMove: false,
        centeredSlides: false,
        breakpoints: {
            320: {
                slideToClickedSlide: true,
                allowTouchMove: true,
                slidesPerView: "auto",
            },
            768: {
                slidesPerView: 2,
                slideToClickedSlide: true,
                allowTouchMove: true,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                infinite: false,
                slideToClickedSlide: false,
                slidesPerView: Math.min(6, categories?.length || 1),
            },
        },
    });

    const renderCircleDecorations = () => {
        const maxCircles = Math.min(5, categories?.length || 0);
        return Array.from({ length: maxCircles }, (_, index) => (
            <div key={index} className={`tab_circle_1 circle__wrapper`}>
                <div className="circle-1" />
                <div className="circle-2 theme-gradient-1" />
            </div>
        ));
    };

    if (!categories || categories.length === 0) {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <p>No categories available</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <div className="item__tab_wrapper">
                        <div className="custom-container container_padd">
                            <div className="row">
                                <div className="col-12">
                                    <Swiper
                                        {...categorySliderOptions}
                                        className="item__tablist governance_slider"
                                    >
                                        {categories.map(
                                            (category, categoryIndex) => {
                                                const isActive =
                                                    activeCategory ===
                                                    categoryIndex;

                                                return (
                                                    <SwiperSlide
                                                        key={categoryIndex}
                                                    >
                                                        <div
                                                            className={`list_item ${
                                                                isActive
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            onClick={() => {
                                                                if (!isActive) {
                                                                    setActiveCategory(
                                                                        categoryIndex
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            <a
                                                                href="#!"
                                                                className={`item__tab ${
                                                                    isActive
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                                onClick={(e) =>
                                                                    e.preventDefault()
                                                                }
                                                                id="quarterly-corporate-one"
                                                            >
                                                                <h4
                                                                    className="heading fs-20 fw-400"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html:
                                                                            category?.title ||
                                                                            "Untitled Category",
                                                                    }}
                                                                />
                                                                <div className="shape" />
                                                            </a>
                                                        </div>
                                                        {renderCircleDecorations()}
                                                    </SwiperSlide>
                                                );
                                            }
                                        )}
                                    </Swiper>

                                    {categories.length > 3 && (
                                        <ul className="category__slider_btn category_new">
                                            <li
                                                className="prev-btn-category"
                                                onClick={() => {
                                                    prevSlide();
                                                }}
                                            >
                                                <a
                                                    href="#!"
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }
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
                                                className="next-btn-category"
                                                onClick={() => {
                                                    nextSlide();
                                                }}
                                            >
                                                <a
                                                    href="#!"
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }
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
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RenderCategoryContent = ({ data }) => {
    const { type, accordian, cards, table_structure } = data || {};

    switch (type) {
        case "table":
            if (
                !Array.isArray(table_structure) ||
                table_structure.length === 0
            ) {
                return (
                    <div className="col-12 text-center">
                        <div className="error_msg_wrapper">
                            <ErrorMessage>
                                No content available for this section.
                            </ErrorMessage>
                        </div>
                    </div>
                );
            }

            return (
                <Fade show={true} unmountOnExit>
                    <div
                        className="item__tab_data tab-active"
                        data-id="quarterly-corporate-one"
                    >
                        {table_structure.map((tableData, tableIndex) => {
                            const tableHeaders = Object?.entries(tableData)
                                ?.map((item) => {
                                    const fieldName = item[0];
                                    const fieldValue = item[1];

                                    if (
                                        typeof fieldValue === "string" &&
                                        fieldName?.startsWith("column_") &&
                                        fieldValue.trim() !== ""
                                    ) {
                                        return item;
                                    }
                                    return null;
                                })
                                ?.filter((item) => !!item);

                            const tableContent = tableData?.list;
                            const validColumnKeys =
                                tableHeaders?.map((header) => header[0]) || [];

                            return (
                                <div
                                    key={tableIndex}
                                    className="table_quarterly_corporate"
                                >
                                    {tableData.title && (
                                        <h3 className="table-title mb-3">
                                            {tableData.title}
                                        </h3>
                                    )}

                                    <table className="fs-20 fw-600">
                                        <thead>
                                            <tr>
                                                <th
                                                    dangerouslySetInnerHTML={{
                                                        __html: "S.No.",
                                                    }}
                                                />

                                                {tableHeaders?.map(
                                                    (header, hIndex) => {
                                                        return (
                                                            <th
                                                                key={hIndex}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: header?.[1],
                                                                }}
                                                            />
                                                        );
                                                    }
                                                )}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {tableContent?.map(
                                                (row, rIndex) => {
                                                    return (
                                                        <tr key={rIndex}>
                                                            <td>
                                                                {rIndex + 1}
                                                            </td>

                                                            {validColumnKeys?.map(
                                                                (
                                                                    columnKey,
                                                                    colIndex
                                                                ) => {
                                                                    const rowItem =
                                                                        row[
                                                                            columnKey
                                                                        ];

                                                                    return (
                                                                        <td
                                                                            key={
                                                                                colIndex
                                                                            }
                                                                        >
                                                                            {typeof rowItem ===
                                                                            "string" ? (
                                                                                rowItem
                                                                            ) : rowItem?.src ? (
                                                                                <div className="pdf_icon_inner d-flex justify-content-center">
                                                                                    <div className="pdf_icon">
                                                                                        <img loading="lazy"
                                                                                            src={getImageURL(
                                                                                                "/upload/media/pdf_icon_1754311164.svg"
                                                                                            )}
                                                                                        />
                                                                                    </div>

                                                                                    <Button
                                                                                        href={getImageURL(
                                                                                            rowItem?.src
                                                                                        )}
                                                                                        target="_blank"
                                                                                        label="Download Report"
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                "-"
                                                                            )}
                                                                        </td>
                                                                    );
                                                                }
                                                            )}
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>

                                    {tableIndex <
                                        table_structure.length - 1 && (
                                        <div className="table-separator mb-4 mt-4"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Fade>
            );

        case "cards":
            return (
                <Fade show={true} unmountOnExit>
                    <div className="item__tab_data tab-active">
                        <div className="ipo_document_inner">
                            {cards?.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="ipo_document_left text-center"
                                >
                                    <div
                                        className="ipo_document_cantent d-flex justify-content-center align-items-center fs-28 fw-400"
                                        dangerouslySetInnerHTML={{
                                            __html: item.title,
                                        }}
                                    />
                                    <div className="ipo_btn">
                                        <Button
                                            href={getImageURL(
                                                item?.document?.src
                                            )}
                                            target="_blank"
                                            label="Download Report"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Fade>
            );

        case "accordian":
            return <DynamicAccordion accordionData={accordian} />;

        default:
            return (
                <ErrorMessage>
                    Content for this section is not available.
                </ErrorMessage>
            );
    }
};

const DynamicAccordion = ({ accordionData = [] }) => {
    const [activeAccordion, setActiveAccordion] = useState(0);

    if (!Array.isArray(accordionData) || accordionData.length === 0) {
        return (
            <Fade show={true} unmountOnExit>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-9">
                        <div className="item__tab_data tab-active">
                            <div className="faq__tab_data">
                                <div className="error_msg_wrapper">
                                    <ErrorMessage>
                                        No accordion data available.
                                    </ErrorMessage>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        );
    }

    return (
        <Fade show={true} unmountOnExit>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-9">
                    <div className="item__tab_data tab-active">
                        <div className="faq__tab_data">
                            <div className="faq_accord_wrap">
                                {accordionData?.map(
                                    (mainAccordion, mainIndex) => {
                                        const isActive =
                                            mainIndex === activeAccordion;

                                        return (
                                            <div
                                                key={mainIndex}
                                                className={`single_faq ${
                                                    isActive ? "active" : ""
                                                }`}
                                            >
                                                <h5
                                                    className="faq_title fs-28 fw-600"
                                                    onClick={() =>
                                                        setActiveAccordion(
                                                            mainIndex
                                                        )
                                                    }
                                                >
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                mainAccordion?.title ||
                                                                "Untitled",
                                                        }}
                                                    />
                                                </h5>

                                                <Collapse
                                                    show={isActive}
                                                    duration={0.2}
                                                >
                                                    <div className="faq_content__wrap">
                                                        <div className="committee_acordian">
                                                            {mainAccordion?.list?.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => {
                                                                    const itemData =
                                                                        item
                                                                            ?.list_items?.[0] ||
                                                                        item;

                                                                    const hasContent =
                                                                        itemData?.name ||
                                                                        itemData?.designation ||
                                                                        itemData?.sub_designation ||
                                                                        itemData?.additional_details;

                                                                    if (
                                                                        !hasContent
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="committee_acordian_left"
                                                                            >
                                                                                <div className="committee_title fs-20 fw-600">
                                                                                    No
                                                                                    data
                                                                                    available
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }

                                                                    return (
                                                                        <div
                                                                            className="committee_acordian_left"
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {itemData?.name && (
                                                                                <div
                                                                                    className="committee_title fs-20 fw-600"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: itemData.name,
                                                                                    }}
                                                                                />
                                                                            )}

                                                                            {itemData?.designation && (
                                                                                <div
                                                                                    className="committee_title_slogan fs-16 fw-400"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: itemData.designation,
                                                                                    }}
                                                                                />
                                                                            )}

                                                                            {itemData?.sub_designation && (
                                                                                <div
                                                                                    className="committee_title_data fs-16 fw-400"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: itemData.sub_designation,
                                                                                    }}
                                                                                />
                                                                            )}

                                                                            {itemData?.additional_details && (
                                                                                <div
                                                                                    className="committee_additional_details fs-14 fw-400"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: itemData.additional_details,
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}

                                                            {/* Show message if no list items */}
                                                            {(!mainAccordion?.list ||
                                                                mainAccordion
                                                                    .list
                                                                    .length ===
                                                                    0) && (
                                                                <div className="committee_acordian_left">
                                                                    <div className="committee_title fs-20 fw-600">
                                                                        No items
                                                                        available
                                                                        in this
                                                                        section
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};
