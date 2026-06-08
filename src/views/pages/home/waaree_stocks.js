"use client";

import { cleanSEOTags } from "@/utilities";
import React from "react";
import { TradingViewChart, Button } from "@/components";
import { getImageURL, getAbsoluteURL } from "@/lib";

export const HomePageWaareeStocks = ({ data = {}, slug = "waaree-stocks" }) => {
    const { button, description, title } = data;

    return (
        <section className="sustainability_section stock_chart" id={slug}>
            <div className="custom-container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="section_header">
                                    {title ? (
                                        <h2
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: cleanSEOTags(title),
                                            }}
                                        />
                                    ) : null}
                                </div>
                                <div className="content__wrap investor_doc">
                                    <ul className="list-unstyled">
                                        {data?.document_list?.map(
                                            (item, index) => {
                                                const fileUrl = getImageURL(
                                                    item?.document?.src,
                                                );
                                                const fileName = item?.title;

                                                return (
                                                    <li
                                                        key={index}
                                                        className="d-inline-flex align-items-center"
                                                    >
                                                        <div className="img_wrap">
                                                            <svg
                                                                width="56"
                                                                height="56"
                                                                viewBox="0 0 56 56"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <rect
                                                                    width="56"
                                                                    height="56"
                                                                    rx="8"
                                                                    fill="#0DB02B"
                                                                />
                                                                <g clip-path="url(#clip0_10631_723)">
                                                                    <path
                                                                        d="M39.5879 19.7474L33.8942 14.1553C33.7415 14.0054 33.5361 13.9214 33.322 13.9214H18.9274C17.2476 13.9214 15.8809 15.2879 15.8809 16.9679V38.7443C15.8809 40.424 17.2474 41.7908 18.9274 41.7908H36.7857C38.4654 41.7908 39.8322 40.4242 39.8322 38.7443V20.33C39.8322 20.1107 39.7442 19.9009 39.5879 19.7474ZM34.1385 16.6843L37.0191 19.5135H34.3981C34.255 19.5135 34.1385 19.3969 34.1385 19.2539V16.6843ZM36.7857 40.1578H18.9274C18.1481 40.1578 17.5138 39.5238 17.5138 38.7443V16.9679C17.5138 16.1884 18.1479 15.5544 18.9274 15.5544H32.5057V19.2539C32.5057 20.2974 33.3547 21.1464 34.3983 21.1464H38.1992V38.7443C38.1992 39.5238 37.5652 40.1578 36.7857 40.1578Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M33.5237 26.876H22.0138C21.5628 26.876 21.1973 27.2415 21.1973 27.6925C21.1973 28.1434 21.5628 28.5089 22.0138 28.5089H33.5237C33.9746 28.5089 34.3401 28.1434 34.3401 27.6925C34.3401 27.2415 33.9746 26.876 33.5237 26.876"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M22.0138 31.7751H31.3987C31.8496 31.7751 32.2152 31.4096 32.2152 30.9586C32.2152 30.5076 31.8496 30.1421 31.3987 30.1421H22.0138C21.5628 30.1421 21.1973 30.5076 21.1973 30.9586C21.1973 31.4096 21.5628 31.7751 22.0138 31.7751Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M32.5309 33.4077H22.0138C21.5628 33.4077 21.1973 33.7732 21.1973 34.2242C21.1973 34.6752 21.5628 35.0407 22.0138 35.0407H32.5309C32.9817 35.0407 33.3474 34.6752 33.3474 34.2242C33.3474 33.7732 32.9817 33.4077 32.5309 33.4077Z"
                                                                        fill="white"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_10631_723">
                                                                        <rect
                                                                            width="27.8694"
                                                                            height="27.8694"
                                                                            fill="white"
                                                                            transform="translate(13.9219 13.9214)"
                                                                        />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </div>

                                                        <div className="content_doc fs-18">
                                                            {fileUrl ? (
                                                                <a
                                                                    href={
                                                                        fileUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {fileName}
                                                                </a>
                                                            ) : (
                                                                <span>
                                                                    {fileName}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                    {description ? (
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: cleanSEOTags(
                                                    description,
                                                ),
                                            }}
                                        />
                                    ) : null}
                                    {button?.title && (button?.url || button?.url_1) ? (
                                        <div className="btn-group text-left investor_doc_btn">
                                            <Button
                                                label={button.title}
                                                href={getAbsoluteURL(button.url || button.url_1)}
                                                openNewTab={button.open_new_tab === "yes"}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="chart__wrapper">
                                    <TradingViewChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
