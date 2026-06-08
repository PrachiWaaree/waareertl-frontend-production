"use client";
/* eslint-disable @next/next/no-img-element, no-unused-vars, react-hooks/exhaustive-deps */

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { POST_REQUEST } from "@/utilities";
import { Button, ErrorMessage } from "@/components";
import { getImageURL } from "@/lib";
import { ApplyForm } from "./apply-form";

export const CareerListing = ({ data = {}, slug = "career" }) => {
    const { title, description, heading: topHeading, career = {} } = data || {};

    const {
        filter_list = [],
        list = [],
        pages = {},
        tag_conditions = [],
        heading: careerHeading,
    } = career || {};

    const heading = careerHeading || topHeading || title;

    const [currentPage, setCurrentPage] = useState(pages?.current_page || 1);
    const [filteredList, setFilteredList] = useState(
        list && Array.isArray(list) && list.length > 0 ? list : [],
    );
    const [paginationData, setPaginationData] = useState(pages);

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [openForm, setOpenForm] = useState(false);

    const [visibleCount, setVisibleCount] = useState(3);

    const methods = useForm({
        defaultValues: {},
    });

    const { register, setValue, watch, getValues } = methods;

    const getLocationFilterSlug = () => {
        const locationFilter = filter_list.find(
            (filter) =>
                filter?.slug?.toLowerCase() === "location" ||
                filter?.name?.toLowerCase() === "location",
        );
        return locationFilter?.slug;
    };

    useEffect(() => {
        if (filter_list?.length) {
            filter_list.forEach((filter) => {
                if (filter?.slug) {
                    register(filter.slug);
                    setValue(filter.slug, "all");
                }
            });
        }
    }, [filter_list, register, setValue]);

    const onSubmit = methods["handleSubmit"](async (formData, props) => {
        // const locationSlug = getLocationFilterSlug();
        // const locationValue =
        //     formData?.[locationSlug] !== undefined
        //         ? formData[locationSlug]
        //         : getValues(locationSlug);

        // if (
        //     locationSlug &&
        //     (locationValue === "all" ||
        //         locationValue === "" ||
        //         locationValue === undefined)
        // ) {
        //     setFilteredList(
        //         list && Array.isArray(list) && list.length > 0 ? list : []
        //     );
        //     setPaginationData(pages);
        //     setCurrentPage(pages?.current_page || 1);
        //     setVisibleCount(3);
        //     return;
        // }

        const allFiltersAreDefault = Object.values(formData).every(
            (v) => v === "all",
        );

        if (allFiltersAreDefault) {
            // reset list if no filter selected
            setFilteredList(list && Array.isArray(list) ? list : []);
            setPaginationData(pages);
            setCurrentPage(pages?.current_page || 1);
            setVisibleCount(3);
            return;
        }

        let payload = {
            template_id: paginationData?.filters?.template_id,
            page: props?.page || 1,
            limit: paginationData?.filters?.limit,
            tags: {},
            conditions: [],
            tag_conditions: tag_conditions || [],
        };

        Object.entries(formData)?.forEach(([fieldName, fieldValue]) => {
            if (
                fieldName !== "search" &&
                fieldValue !== "all" &&
                fieldValue !== "" &&
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
        });

        const url = paginationData?.filters?.url;

        if (url) {
            const response = await POST_REQUEST(url, payload);
            if (response?.pages) {
                setPaginationData(response?.pages);
                setCurrentPage(response?.pages?.current_page);
            }
            if (response?.list) {
                setFilteredList(response?.list);
                setVisibleCount(3);
            }
        }
    });

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setShowApplyModal(true);
    };
    const handleCloseModal = () => {
        setShowApplyModal(false);
        setSelectedJob(null);
    };

    useEffect(() => {
        if (!list || !Array.isArray(list) || list.length === 0) {
            onSubmit();
        }
    }, []);

    const renderFilterSelects = () => {
        return filter_list?.map((filter, idx) => {
            const filterName = filter?.name;

            const filterSlug = filter?.slug;
            const options = filter?.tags;
            return (
                !!filterSlug &&
                !!options?.length && (
                    <div
                        className="form_field_wrap case_studies_select"
                        key={idx}
                    >
                        <select
                            className="form-field"
                            name={filterSlug}
                            {...register(filterSlug)}
                            onChange={(event) => {
                                register(filterSlug)?.onChange(event);
                                // Pass the updated form values to onSubmit
                                const formData = {
                                    ...getValues(),
                                    [filterSlug]: event.target.value,
                                };

                                onSubmit(formData);
                            }}
                        >
                            <option value="all">All {filterName}</option>
                            {options?.map((item) => (
                                <option
                                    key={item?.id}
                                    value={item?.id}
                                    dangerouslySetInnerHTML={{
                                        __html: item?.name,
                                    }}
                                />
                            ))}
                        </select>
                    </div>
                )
            );
        });
    };

    // Job card rendering
    const renderJobCard = (item, index) => {
        const tf = item?.template_fields || {};
        return (
            <div className="single__item_wrapper" key={item?.id || index}>
                <div className="item__wrap">
                    <div className="single__item">
                        <div className="circle-sm circle-overlay" />
                        <div className="content__block">
                            <h5
                                className="heading fs-24 fw-600"
                                dangerouslySetInnerHTML={{
                                    __html: item?.name || tf?.title,
                                }}
                            />

                            <div className="hr__seperator" />
                            <ul className="careers__venue d-flex list-unstyled">
                                {(tf?.location ||
                                    item?.tag_data?.Location?.[0]?.name) && (
                                    <li className="location d-inline-flex">
                                        <div className="icon_wrap">
                                            <img
                                                loading="lazy"
                                                className="img-fluid"
                                                src={getImageURL(
                                                    "/upload/media/location_icon_1755154019.webp",
                                                )}
                                                alt="Location Icon"
                                            />
                                        </div>
                                        <div
                                            className="icon__content fs-18 fw-500"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    tf?.location ||
                                                    item?.tag_data
                                                        ?.Location?.[0]?.name,
                                            }}
                                        />
                                    </li>
                                )}
                                {(tf?.work_type ||
                                    item?.tag_data?.work_type?.[0]?.name) && (
                                    <li className="location d-inline-flex">
                                        <div className="icon_wrap">
                                            <img
                                                loading="lazy"
                                                className="img-fluid"
                                                src={getImageURL(
                                                    "/upload/media/time_icon_1755154019.webp",
                                                )}
                                                alt="Work Icon"
                                            />
                                        </div>
                                        <div
                                            className="icon__content fs-18 fw-500"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    tf?.work_type ||
                                                    item?.tag_data
                                                        ?.work_type?.[0]?.name,
                                            }}
                                        />
                                    </li>
                                )}
                                {(tf?.department ||
                                    item?.tag_data?.Department?.[0]?.name) && (
                                    <li className="location d-inline-flex">
                                        <div className="icon_wrap">
                                            <img
                                                loading="lazy"
                                                className="img-fluid"
                                                src={getImageURL(
                                                    "/upload/media/department_icon_1755154019.webp",
                                                )}
                                                alt="Work Icon"
                                            />
                                        </div>
                                        <div
                                            className="icon__content fs-18 fw-500"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    tf?.department ||
                                                    item?.tag_data
                                                        ?.Department?.[0]?.name,
                                            }}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="content__wrap text-body-dark">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html:
                                        tf?.short_description ||
                                        tf?.description,
                                }}
                            />
                        </div>

                        <div className="btn-group text-center">
                            <Button
                                label="Apply Now"
                                onClick={() => handleApplyClick(item)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderApplyModal = () => {
        if (!showApplyModal || !selectedJob) return null;

        if (openForm) {
            return (
                <div className="career__modal_area">
                    <div className="career__modal active">
                        <div className="career__modal_wrapper">
                            <ApplyForm
                                openForm={openForm}
                                setOpenForm={setOpenForm}
                                job={selectedJob?.template_fields?.career_form}
                                selectedJob={selectedJob}
                            />
                        </div>
                    </div>
                    <div
                        className="career-overlay active"
                        onClick={handleCloseModal}
                    />
                </div>
            );
        }

        return (
            <div className="career__modal_area">
                <div className="career__modal active">
                    <div className="career__modal_wrapper">
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={handleCloseModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={38}
                                height={38}
                                viewBox="0 0 38 38"
                                fill="none"
                            >
                                <path
                                    d="M10.5937 25.794C10.1485 26.2392 10.1485 26.9609 10.5937 27.4061C11.0389 27.8513 11.7607 27.8513 12.2059 27.4061L10.5937 25.794ZM19.8058 19.8061C20.251 19.3609 20.251 18.6392 19.8058 18.1939C19.3606 17.7487 18.6389 17.7487 18.1937 18.1939L19.8058 19.8061ZM18.1937 18.1939C17.7485 18.6392 17.7485 19.3609 18.1937 19.8061C18.6389 20.2513 19.3606 20.2513 19.8058 19.8061L18.1937 18.1939ZM27.4058 12.2061C27.851 11.7609 27.851 11.0391 27.4058 10.5939C26.9606 10.1487 26.2389 10.1487 25.7937 10.5939L27.4058 12.2061ZM19.8058 18.1939C19.3606 17.7487 18.6389 17.7487 18.1937 18.1939C17.7485 18.6392 17.7485 19.3609 18.1937 19.8061L19.8058 18.1939ZM25.7937 27.4061C26.2389 27.8513 26.9606 27.8513 27.4058 27.4061C27.851 26.9609 27.851 26.2392 27.4058 25.794L25.7937 27.4061ZM18.1937 19.8061C18.6389 20.2513 19.3606 20.2513 19.8058 19.8061C20.251 19.3609 20.251 18.6392 19.8058 18.1939L18.1937 19.8061ZM12.2059 10.5939C11.7607 10.1487 11.0389 10.1487 10.5937 10.5939C10.1485 11.0391 10.1485 11.7609 10.5937 12.2061L12.2059 10.5939ZM12.2059 27.4061L19.8058 19.8061L18.1937 18.1939L10.5937 25.794L12.2059 27.4061ZM19.8058 19.8061L27.4058 12.2061L25.7937 10.5939L18.1937 18.1939L19.8058 19.8061ZM18.1937 19.8061L25.7937 27.4061L27.4058 25.794L19.8058 18.1939L18.1937 19.8061ZM19.8058 18.1939L12.2059 10.5939L10.5937 12.2061L18.1937 19.8061L19.8058 18.1939Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>

                        <div className="career__modal_header text-gradient">
                            <h4
                                className="heading fs-36 fw-500"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        selectedJob?.name ||
                                        selectedJob?.template_fields?.title,
                                }}
                            />
                        </div>

                        <div className="career__modal_body">
                            <ul className="careers__venue d-flex list-unstyled">
                                <li className="location d-inline-flex">
                                    <div className="icon__content fs-20 fw-600">
                                        Salary -{" "}
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    selectedJob?.template_fields
                                                        ?.salary || "N/A",
                                            }}
                                        />
                                    </div>
                                </li>
                                <li className="location d-inline-flex">
                                    <div className="icon_wrap">
                                        <img
                                            loading="lazy"
                                            className="img-fluid"
                                            src={getImageURL(
                                                "/upload/media/location_icon_1755154019.webp",
                                            )}
                                            alt=""
                                        />
                                    </div>

                                    <div
                                        className="icon__content fs-20 fw-600"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                selectedJob?.template_fields
                                                    ?.location ||
                                                selectedJob?.tag_data
                                                    ?.Location?.[0]?.name ||
                                                "Location",
                                        }}
                                    />
                                </li>
                                <li className="location d-inline-flex">
                                    <div className="icon_wrap">
                                        <img
                                            loading="lazy"
                                            className="img-fluid"
                                            src={getImageURL(
                                                "/upload/media/time_icon_1755154019.webp",
                                            )}
                                            alt=""
                                        />
                                    </div>

                                    <div
                                        className="icon__content fs-20 fw-600"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                selectedJob?.template_fields
                                                    ?.work_type ||
                                                selectedJob?.tag_data
                                                    ?.work_type?.[0]?.name ||
                                                "Full Time",
                                        }}
                                    />
                                </li>
                                <li className="location d-inline-flex">
                                    <div className="icon_wrap">
                                        <img
                                            loading="lazy"
                                            className="img-fluid"
                                            src={getImageURL(
                                                "/upload/media/department_icon_1755154019.webp",
                                            )}
                                            alt=""
                                        />
                                    </div>
                                    <div className="icon__content fs-20 fw-600">
                                        {selectedJob?.template_fields
                                            ?.department ||
                                            selectedJob?.tag_data
                                                ?.Department?.[0]?.name ||
                                            "Department"}
                                    </div>
                                </li>
                            </ul>

                            <div className="section_header">
                                <h5 className="heading fs-20 fw-600">
                                    <span className="text-gradient">
                                        Job Description
                                    </span>
                                </h5>
                            </div>

                            <div className="hr__seperator" />

                            {/* <div className="content__wrap">
                                {selectedJob?.template_fields?.description ? (
                                    selectedJob.template_fields.description
                                        .split("\n")
                                        .map((line, idx) => (
                                            <div key={idx}>{line}</div>
                                        ))
                                ) : (
                                    <div>No description available.</div>
                                )}
                            </div> */}
                            <div
                                className="content__wrap"
                                dangerouslySetInnerHTML={{
                                    __html: selectedJob?.template_fields
                                        ?.description,
                                }}
                            />
                        </div>

                        <div className="btn-group text-center">
                            <Button
                                label={
                                    !selectedJob?.template_fields?.career_form
                                        ? "Coming soon..."
                                        : "Apply Now"
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                        selectedJob?.template_fields
                                            ?.career_form
                                    ) {
                                        setOpenForm(true);
                                    } else {
                                        alert("Apply form coming soon!");
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="career-overlay active"
                    onClick={handleCloseModal}
                />
            </div>
        );
    };

    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = false;

    return (
        <>
            <section className="career__listing_section" id={slug}>
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10">
                            <form
                                className="case_studies_form d-flex"
                                onSubmit={onSubmit}
                                autoComplete="off"
                            >
                                {renderFilterSelects()}
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-12 col-xl-12">
                            <div className="section_header">
                                <h3
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                                {description && (
                                    <div
                                        className="description fs-18 fw-400 mt-2"
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                )}
                            </div>
                            <div className="career__list_wrapper d-flex">
                                {filteredList?.length ? (
                                    filteredList
                                        .slice(0, visibleCount)
                                        .map(renderJobCard)
                                ) : (
                                    <ErrorMessage>
                                        No Careers Found
                                    </ErrorMessage>
                                )}
                            </div>

                            {/* View More Button */}

                            {visibleCount < filteredList.length && (
                                <div className="btn-group load-more text-center">
                                    <Button
                                        label="View More"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setVisibleCount((prev) => prev + 3);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {renderApplyModal()}
            </section>
        </>
    );
};
