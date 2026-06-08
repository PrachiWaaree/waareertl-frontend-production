"use client";
/* eslint-disable no-case-declarations, react-hooks/exhaustive-deps */
import { ErrorMessage, RHFDatePicker, OptimizedImage } from "@/components";
import { getImageURL, openLink } from "@/lib";
import { getPaginationRange, POST_REQUEST } from "@/utilities";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const tabs = [
    {
        name: "Upcoming",
    },
    {
        name: "Past-Events",
    },
];

export const EventPageWebinarSection = ({
    data = {},
    slug = "events_webinars",
}) => {
    const { title, description, parent_class, events } = data;

    const currentDate = new Date().toDateString();

    const { filter_list, list, pages, tag_conditions } = events;
    const initialList = Array.isArray(list) && list.length > 0 ? list : [];

    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(pages?.current_page || 1);
    const [filteredList, setFilteredList] = useState(initialList);
    const [paginationData, setPaginationData] = useState(pages || {});
    const sectionRef = useRef(null);

    const methods = useForm({
        defaultValues: {
            date: null,
            search: "",
        },
        mode: "onChange",
    });

    const { register } = methods;

    const onSubmit = methods["handleSubmit"](async (data, props) => {
        let payload = {
            template_id: paginationData?.filters?.template_id,
            page: props?.page || 1,
            limit: paginationData?.filters?.limit,
            tags: {},
            conditions: [],
            tag_conditions: tag_conditions || [],
            sort: {
                sort_by: "published_date",
                sort_type: "desc",
            },
        };

        Object.entries(data)?.map((item) => {
            const fieldName = item[0];
            const fieldValue = item[1];

            if (
                fieldName !== "search" &&
                fieldValue !== "all" &&
                fieldName !== "date" &&
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

            if (fieldValue instanceof Date && !props?.restrictDate) {
                payload.conditions = [
                    ...payload.conditions,
                    {
                        field: "date",
                        operator: "eq",
                        value: fieldValue?.toDateString(),
                    },
                ];
            }
        });

        if (!!props?.operator && !!props?.date) {
            payload.conditions = [
                ...payload.conditions,
                {
                    field: "published_date",
                    operator: props?.operator,
                    value: props?.date,
                },
            ];
        }

        const url = paginationData?.filters?.url;

        if (url) {
            const response = await POST_REQUEST(url, payload);

            if (response?.pages) {
                openLink("#case_studies_form");
                setPaginationData(response?.pages);
                setCurrentPage(response?.pages?.current_page);
            }

            if (response?.list) {
                // No client-side date sorting, just use the list as is
                setFilteredList([...response.list]);
            }
        }
    });

    const handleActionClick = async (action = "", value = {}) => {
        switch (action) {
            case "page":
                const { page } = value;

                if (page >= 1 && page <= paginationData?.total_pages) {
                    switch (activeTab) {
                        case 0:
                            await onSubmit({
                                page,
                                operator: "gt",
                                date: currentDate,
                            });
                            sectionRef?.current?.scrollIntoView({
                                behaviour: "smooth",
                            });
                            break;

                        case 1:
                            await onSubmit({
                                page,
                                operator: "lteq",
                                date: currentDate,
                            });
                            sectionRef?.current?.scrollIntoView({
                                behaviour: "smooth",
                            });
                            break;
                    }
                }

                break;

            case "tab":
                if (typeof value === "number") {
                    setActiveTab(value);

                    const isSameTab = value === activeTab;

                    if (!isSameTab) {
                        methods["setValue"]("date", null);
                    }

                    switch (value) {
                        case 0:
                            await onSubmit({
                                operator: "gt",
                                date: currentDate,
                                ...(!isSameTab && {
                                    restrictDate: true,
                                }),
                            });
                            break;

                        case 1:
                            await onSubmit({
                                operator: "lteq",
                                date: currentDate,
                                ...(!isSameTab && {
                                    restrictDate: true,
                                }),
                            });
                            break;
                    }
                }
        }
    };

    useEffect(() => {
        handleActionClick("tab", activeTab);
    }, [methods["watch"]("date")]);

    useEffect(() => {
        handleActionClick("tab", activeTab);
    }, []);

    const isNextDisabled =
        !paginationData?.total_pages ||
        currentPage >= paginationData?.total_pages;

    const isPrevDisabled = currentPage <= 1;

    // No client-side date sorting, just use the filteredList as is
    const sortedFilteredList = [...filteredList];

    return (
        <>
            <section
                className={`cs__form_section our_case_studies_sec ${
                    parent_class || ""
                }`}
                ref={sectionRef}
                id={slug}
            >
                <div className="circle lg__circle" />
                <div className="circle sm__circle" />
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10">
                            <div className="our_case_studies_inner">
                                <div
                                    className="section_header text-center"
                                    id="case_studies_form"
                                >
                                    <h1
                                        className="heading fs-72 fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                </div>
                                <div className="content__wrap fs-20 text-center">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                                <form
                                    className="case_studies_form d-flex"
                                    onSubmit={onSubmit}
                                >
                                    {filter_list?.map((filter, index) => {
                                        if (
                                            !["Event-Type", "Type"]?.includes(
                                                filter?.slug,
                                            )
                                        ) {
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
                                                            //
                                                            className="form-field"
                                                            name={filterSlug}
                                                            {...register(
                                                                filterSlug,
                                                            )}
                                                            onChange={(
                                                                event,
                                                            ) => {
                                                                register(
                                                                    filterSlug,
                                                                )?.onChange(
                                                                    event,
                                                                );
                                                                onSubmit();
                                                            }}
                                                        >
                                                            <option value="all">
                                                                {filterName}
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
                                                                        {
                                                                            item?.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                )
                                            );
                                        }
                                    })}
                                    <div className="form_field_wrap case_studies_select">
                                        <RHFDatePicker
                                            {...(activeTab === 1 && {
                                                maxDate: new Date(),
                                            })}
                                            {...(activeTab === 0 && {
                                                minDate: new Date(),
                                            })}
                                            // showMonthYearPicker
                                            methods={methods}
                                            placeholderText="Select Date"
                                            customInput={
                                                <input
                                                    name="date"
                                                    className="form-field"
                                                    placeholder="Select Date"
                                                />
                                            }
                                        />
                                    </div>

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
                                            style={{
                                                backgroundImage: `url(${getImageURL(
                                                    "/upload/media/case_studies_search_icon_1751437101.svg",
                                                )})`,
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="event_listing_section">
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10">
                            <div className="event_tabbing">
                                <ul className="event_tabbing_row d-flex justify-content-center align-items-center fs-18">
                                    {tabs?.map((item, index) => {
                                        const isActive = activeTab === index;

                                        return (
                                            <li
                                                key={index}
                                                className={`item__tab__event ${
                                                    isActive ? "active" : ""
                                                }`}
                                                onClick={() =>
                                                    handleActionClick(
                                                        "tab",
                                                        index,
                                                    )
                                                }
                                            >
                                                {item?.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="event__tab_details">
                                <div
                                    className="event_list_wrapper d-flex tab-active"
                                    data-id={
                                        activeTab === "Upcoming"
                                            ? "upcoming_event"
                                            : "past_event"
                                    }
                                >
                                    {sortedFilteredList?.length ? (
                                        sortedFilteredList?.map(
                                            (item, index) => (
                                                <div
                                                    className="item__wrap"
                                                    key={index}
                                                >
                                                    <div className="single__item">
                                                        <div className="img__wrap">
                                                            <OptimizedImage
                                                                className="img-fluid"
                                                                src={getImageURL(
                                                                    item
                                                                        ?.template_fields
                                                                        ?.featured_image
                                                                        ?.src,
                                                                )}
                                                                alt={
                                                                    item
                                                                        ?.template_fields
                                                                        ?.featured_image
                                                                        ?.alt
                                                                }/>
                                                        </div>
                                                        <div className="content_block">
                                                            <div className="top__block">
                                                                <ul className="event_venue d-flex list-unstyled">
                                                                    <li className="location d-inline-flex">
                                                                        <div className="icon_wrap d-inline-flex">
                                                                            <OptimizedImage
                                                                                className="img-fluid"
                                                                                src={getImageURL(
                                                                                    "/upload/media/calendar_icon_1751886518.webp",
                                                                                )}
                                                                                alt="calender"/>
                                                                        </div>
                                                                        <div
                                                                            className="icon__content d-inline-flex"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: item?.publish_date,
                                                                            }}
                                                                        />
                                                                    </li>
                                                                    <li className="location d-inline-flex">
                                                                        <div className="icon_wrap d-inline-flex">
                                                                            <OptimizedImage
                                                                                className="img-fluid"
                                                                                src={getImageURL(
                                                                                    "/upload/media/clock_icon_1751886527.webp",
                                                                                )}
                                                                                alt="clock"/>
                                                                        </div>
                                                                        <div
                                                                            className="icon__content d-inline-flex"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: item?.publish_time,
                                                                            }}
                                                                        />
                                                                    </li>
                                                                    <li className="location d-inline-flex">
                                                                        <div className="icon_wrap d-inline-flex">
                                                                            <OptimizedImage
                                                                                className="img-fluid"
                                                                                src={getImageURL(
                                                                                    "/upload/media/case_studies_location_icon_1751432735.svg",
                                                                                )}
                                                                                alt="location"/>
                                                                        </div>
                                                                        <div
                                                                            className="icon__content d-inline-flex"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: item?.tag_data?.[
                                                                                    "location"
                                                                                ]?.[0]
                                                                                    ?.name,
                                                                            }}
                                                                        />
                                                                    </li>
                                                                </ul>
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

                                                            {!!item?.tag_data?.[
                                                                "Event-Type"
                                                            ]?.length && (
                                                                <div className="bottom__block">
                                                                    <h5 className="heading fs-20 fw-600">
                                                                        Event
                                                                        Type
                                                                    </h5>
                                                                    <ul className="event_venue d-flex list-unstyled">
                                                                        {item?.tag_data?.[
                                                                            "Event-Type"
                                                                        ]?.map(
                                                                            (
                                                                                event,
                                                                                eventIndex,
                                                                            ) => (
                                                                                <li
                                                                                    className="location d-inline-flex"
                                                                                    key={
                                                                                        eventIndex
                                                                                    }
                                                                                >
                                                                                    <div className="icon_wrap d-inline-flex">
                                                                                        <OptimizedImage
                                                                                            className="img-fluid"
                                                                                            src={getImageURL(
                                                                                                event
                                                                                                    ?.image
                                                                                                    ?.src,
                                                                                            )}
                                                                                            alt={
                                                                                                event
                                                                                                    ?.image
                                                                                                    ?.alt
                                                                                            }/>
                                                                                    </div>
                                                                                    <div
                                                                                        className="icon__content d-inline-flex"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html: event?.name,
                                                                                        }}
                                                                                    />
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* <div className="btn-group">
                                                                <Button
                                                                    key={index}
                                                                    href={
                                                                        item?.slug
                                                                    }
                                                                    label={
                                                                        item
                                                                            ?.template_fields
                                                                            ?.button
                                                                            ?.title ||
                                                                        "Know more"
                                                                    }
                                                                />
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )
                                    ) : (
                                        <ErrorMessage>
                                            No events Found
                                        </ErrorMessage>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            {!!sortedFilteredList.length && (
                                <div className="pagination__wrap d-flex">
                                    <a
                                        className={`d-inline-flex prev_btn${
                                            isPrevDisabled ? " disable" : ""
                                        }`}
                                        href="javascript:void(0);"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            !isPrevDisabled &&
                                                handleActionClick("page", {
                                                    page: currentPage - 1,
                                                });
                                        }}
                                        aria-disabled={isPrevDisabled}
                                        tabIndex={isPrevDisabled ? -1 : 0}
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
                                                    paginationData?.total_pages,
                                                ).map((item, index) => (
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
                                                                    e,
                                                                ) => {
                                                                    e.preventDefault();
                                                                    handleActionClick(
                                                                        "page",
                                                                        {
                                                                            page: item,
                                                                        },
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
                                            isNextDisabled ? " disable" : ""
                                        }`}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            !isNextDisabled &&
                                                handleActionClick("page", {
                                                    page: currentPage + 1,
                                                });
                                        }}
                                        aria-disabled={isNextDisabled}
                                        tabIndex={isNextDisabled ? -1 : 0}
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
        </>
    );
};
