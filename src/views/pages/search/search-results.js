"use client";
/* eslint-disable no-case-declarations, no-unused-vars, react-hooks/exhaustive-deps */

import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
//
import { API_ENDPOINTS } from "@/config";
import { getPaginationRange, POST_REQUEST } from "@/utilities";
import { getCookie } from "@/utilities/set-lang";
import { Button, ErrorMessage, OptimizedImage } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createQueryString, getImageURL, openLink } from "@/lib";

export const SearchResults = ({ data = {}, slug = "search_results" }) => {
    const searchParams = useSearchParams();

    const searchTerm = searchParams.get("search");
    const page = searchParams.get("page");

    const methods = useForm({
        defaultValues: {
            search: searchTerm || "",
        },
        resolver: yupResolver(
            yup.object().shape({
                search: yup.string().min(3).required(),
            }),
        ),
    });

    const [apiResponse, setApiResponse] = useState({ list: [], pages: {} });
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [currentLocale, setCurrentLocale] = useState("en");

    const handleActionClick = async (action = "", value = "") => {
        switch (action) {
            case "get_lang":
                return (await getCookie("lang"))?.value;

            case "fetch_result":
                const response = await POST_REQUEST(API_ENDPOINTS["SEARCH"], {
                    lang: currentLocale,
                    name: decodeURI(searchTerm),
                    page: value?.page || currentPage,
                    limit: value?.limit || 3,
                });

                if (response?.pages) {
                    setApiResponse(response);
                    setCurrentPage(response?.pages?.current_page);
                }

                openLink(`#${slug}`);

                break;

            case "page":
                const { page } = value;

                if (page >= 1) {
                    await onSubmit({ page });
                }

                break;
        }
    };

    const intialize = async () => {
        try {
            setCurrentLocale(await handleActionClick("get_lang"));
        } catch (error) {
            console.log("ERROR", error);
        }

        if (searchTerm) {
            await handleActionClick("fetch_result");
        }
    };

    const onSubmit = methods["handleSubmit"](async (data, props) => {
        const query = new URLSearchParams({
            search: data?.search?.trim(),
            page: props?.page || 1,
        });

        const url = `/search/?${query?.toString()}`;

        if (typeof window !== "undefined") {
            window.open(url, "_self");
        }
    });

    useEffect(() => {
        intialize();
    }, [searchTerm]);

    const hasNextPage = currentPage < apiResponse?.pages?.total_pages;

    const hasPrevPage = currentPage > 1;

    return (
        <>
            <section
                className="cs__form_section our_case_studies_sec bl__form_section"
                id={slug}
            >
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10">
                            <form
                                className="case_studies_form d-flex"
                                onSubmit={onSubmit}
                            >
                                <div className="form_field_wrap form_search">
                                    <input
                                        className="form-field left-icon"
                                        type="text"
                                        {...methods["register"]("search")}
                                        placeholder="Search"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                onSubmit();
                                            }
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cs_listing_section our_case_studies_sec bl_listing_section">
                <div className="section_overlay"></div>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10">
                            <div className="cs_list_wrapper d-flex">
                                {apiResponse?.list?.length ? (
                                    apiResponse?.list?.map((item, index) => {
                                        return (
                                            <div
                                                key={item?.id || index}
                                                className="item__wrap"
                                            >
                                                <div className="single__item">
                                                    <div className="img__wrap">
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                item
                                                                    ?.thumbnail_image
                                                                    ?.src ||
                                                                    "/upload/media/resources_1_1748408224.png",
                                                            )}
                                                            alt={
                                                                item
                                                                    ?.thumbnail_image
                                                                    ?.alt
                                                            }/>
                                                    </div>
                                                    <div className="content_block">
                                                        <div className="content__wrap">
                                                            <h4
                                                                className="heading fw-600 fs-20"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item?.name,
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="btn-group">
                                                            <Button
                                                                href={
                                                                    item?.slug
                                                                }
                                                                label="Read More"
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
                                        No results found
                                    </ErrorMessage>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {!!apiResponse?.list.length && (
                                <div className="pagination__wrap d-flex">
                                    <a
                                        className={`d-inline-flex prev_btn${
                                            !hasPrevPage ? " disable" : ""
                                        }`}
                                        href="#!"
                                        aria-label="Previous Page"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            hasPrevPage &&
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
                                        {apiResponse?.pages?.total_pages && (
                                            <>
                                                {getPaginationRange(
                                                    currentPage,
                                                    apiResponse?.pages
                                                        ?.total_pages,
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
                                            !hasNextPage ? " disable" : ""
                                        }`}
                                        href="#"
                                        aria-label="Next Page"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            hasNextPage &&
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
            </section>
        </>
    );
};
