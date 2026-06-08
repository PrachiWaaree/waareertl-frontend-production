"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { useState } from "react";
import { getImageURL } from "@/lib";

const MAPS = [
    {
        key: "india",
        label: "India",
        mapKey: "india_map",
        addressesKey: "india_addresses",
    },
    {
        key: "uae",
        label: "UAE",
        mapKey: "uae_map",
        addressesKey: "uae_addresses",
    },
    {
        key: "usa",
        label: "USA",
        mapKey: "usa_map",
        addressesKey: "usa_addresses",
    },
];

const LocationPinSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={61}
        height={60}
        viewBox="0 0 61 60"
        fill="none"
    >
        <path
            d="M30.7656 0C18.3606 0 8.26562 10.165 8.26562 22.6625C8.26562 40.42 28.6506 58.755 29.5181 59.525C29.8756 59.8425 30.3206 60 30.7656 60C31.2106 60 31.6556 59.8425 32.0131 59.5275C32.8806 58.755 53.2656 40.42 53.2656 22.6625C53.2656 10.165 43.1706 0 30.7656 0ZM30.7656 35C23.8731 35 18.2656 29.3925 18.2656 22.5C18.2656 15.6075 23.8731 10 30.7656 10C37.6581 10 43.2656 15.6075 43.2656 22.5C43.2656 29.3925 37.6581 35 30.7656 35Z"
            fill="currentColor"
        />
    </svg>
);

export const CsrPageMapSection = ({ data = {}, slug="csr_map" }) => {
    const {
        description,
        title,
        arrow_icon,
        location_pin,
        india_map,
        uae_map,
        usa_map,
        india_addresses = [],
        uae_addresses = [],
        usa_addresses = [],
    } = data;

    // Map key to data
    const mapData = {
        india: {
            map: india_map,
            addresses: india_addresses,
        },
        uae: {
            map: uae_map,
            addresses: uae_addresses,
        },
        usa: {
            map: usa_map,
            addresses: usa_addresses,
        },
    };

    // Default to India if available, else first available
    const getDefaultTab = () => {
        if (india_map?.src) return "india";
        if (uae_map?.src) return "uae";
        if (usa_map?.src) return "usa";
        return "india";
    };

    const [activeTab, setActiveTab] = useState(getDefaultTab());

    const currentMap = mapData[activeTab]?.map;
    const currentAddresses = mapData[activeTab]?.addresses || [];

    return (
        <section className="our_reach_sec" id={slug}>
            <div className="custom-container">
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="value__block">
                            <div className="section_header">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: title,
                                    }}
                                />
                            </div>
                            <div className="content__wrap">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                        </div>
                        <ul className="our_reach_list list-unstyled d-flex">
                            {MAPS.map((tab, idx) => (
                                <li
                                    key={tab.key}
                                    className={`our_reach_list_col d-flex${
                                        activeTab === tab.key ? " active" : ""
                                    }`}
                                    data-tag={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="fs-36 fw-300">
                                        {tab.label}
                                    </div>
                                    <div className="our-reach-arrow-icon d-flex">
                                        <OptimizedImage
                                            src={getImageURL(arrow_icon?.src)}
                                            alt={arrow_icon?.alt || ""}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-12 col-lg-8">
                        <div className="ourlist" id={activeTab}>
                            <div className="map_location_pin">
                                <div className="our_reach_list_map">
                                    {currentMap?.src ? (
                                        <OptimizedImage
                                            src={getImageURL(currentMap?.src)}
                                            alt={currentMap?.alt || ""}/>
                                    ) : (
                                        <div
                                            style={{
                                                minHeight: 300,
                                                background: "#f5f5f5",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <span>No map available</span>
                                        </div>
                                    )}
                                    {Array.isArray(currentAddresses) &&
                                    currentAddresses.length > 0 ? (
                                        currentAddresses
                                            .filter(
                                                (addr) =>
                                                    addr?.location_name ||
                                                    addr?.location
                                            )
                                            .map((addr, idx) => (
                                                <div
                                                    className={`location location-${
                                                        idx + 1
                                                    }`}
                                                    key={idx}
                                                >
                                                    <div className="location__details">
                                                        <div className="location__msg">
                                                            <h4 className="heading fs-20 fw-600">
                                                                {addr.location_name ||
                                                                    "-"}
                                                            </h4>
                                                            {addr.location && (
                                                                <div className="content__wrap">
                                                                    <ul>
                                                                        <li>
                                                                            <span>
                                                                                {
                                                                                    addr.location
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="location_pin">
                                                            <OptimizedImage
                                                                className="img-fluid"
                                                                src={getImageURL(
                                                                    location_pin?.src
                                                                )}
                                                                alt={
                                                                    location_pin?.alt ||
                                                                    ""
                                                                }
                                                                width={
                                                                    location_pin
                                                                        ?.dimensions
                                                                        ?.width
                                                                }
                                                                height={
                                                                    location_pin
                                                                        ?.dimensions
                                                                        ?.height
                                                                }/>
                                                        </div>
                                                    </div>
                                                    <div className="location_map">
                                                        <LocationPinSVG />
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="location location-1">
                                            <div className="location__details">
                                                <div className="location__msg">
                                                    <h4 className="heading fs-20 fw-600">
                                                        No address available
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
