"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { POST_REQUEST } from "@/utilities";
import { ErrorMessage } from "@/components";

const MapWithMarkers = dynamic(
    () => import("./map").then((mod) => mod.MapWithMarkers),
    { ssr: false },
);

const isEmptyNode = (node) => {
    if (!node) return true;
    if (typeof node === "string") return node.trim() === "";
    if (Array.isArray(node)) return node.every(isEmptyNode);
    if (React.isValidElement(node)) {
        // If children is empty or only empty nodes
        const children = node.props.children;
        if (
            children === undefined ||
            children === null ||
            (Array.isArray(children) && children.every(isEmptyNode)) ||
            (typeof children === "string" && children.trim() === "")
        ) {
            return true;
        }
    }
    return false;
};

export const PartnerpageLocation = ({ data = {}, slug="franchise_location" }) => {
    const { heading, description, location = {} } = data;

    const initialLocationsList = Array.isArray(location.list)
        ? location.list
        : [];
    const filterList = Array.isArray(location.filter_list)
        ? location.filter_list
        : [];

    const stateFilter = filterList.find((f) => f.slug === "state");
    const availableStates =
        stateFilter && Array.isArray(stateFilter.tags) ? stateFilter.tags : [];

    const stateOptions = useMemo(() => {
        return availableStates.map((state) => ({
            id: state.id,
            name: state.name,
        }));
    }, [availableStates]);

    const [selectedStateId, setSelectedStateId] = useState("");
    const [selectedCityId, setSelectedCityId] = useState("");
    const [locationsList, setLocationsList] = useState(initialLocationsList);

    const cityOptions = useMemo(() => {
        if (!selectedStateId) return [];
        const cityMap = {};
        locationsList.forEach((loc) => {
            const stateArr = loc?.tag_data?.state || [];
            const cityArr = loc?.tag_data?.city || [];
            if (
                stateArr.length > 0 &&
                String(stateArr[0].id) === String(selectedStateId) &&
                cityArr.length > 0
            ) {
                const city = cityArr[0];
                if (city && city.id != null && city.name != null) {
                    cityMap[city.id] = city.name;
                }
            }
        });
        return Object.entries(cityMap).map(([id, name]) => ({ id, name }));
    }, [selectedStateId, locationsList]);

    const filteredLocations = useMemo(() => {
        if (!selectedStateId) return locationsList;
        if (!selectedCityId) {
            return locationsList.filter((loc) => {
                const stateArr = loc?.tag_data?.state || [];
                return (
                    stateArr.length > 0 &&
                    String(stateArr[0].id) === String(selectedStateId)
                );
            });
        }
        return locationsList.filter((loc) => {
            const stateArr = loc?.tag_data?.state || [];
            const cityArr = loc?.tag_data?.city || [];
            return (
                stateArr.length > 0 &&
                String(stateArr[0].id) === String(selectedStateId) &&
                cityArr.length > 0 &&
                cityArr[0] != null &&
                cityArr[0].id != null &&
                String(cityArr[0].id) === String(selectedCityId)
            );
        });
    }, [selectedStateId, selectedCityId, locationsList]);

    const buildPayload = (stateId, cityId) => {
        const payload = {
            template_id: location?.pages?.filters?.template_id,
            page: 1,
            limit: location?.pages?.filters?.limit,
            tags: {},
            conditions: [],
            sort: location?.sort || {
                sort_by: "published_date",
                sort_type: "desc",
            },
            tag_conditions: location?.tag_conditions || [],
        };

        if (stateId) {
            payload.tags["state"] = stateId;
        }
        if (cityId) {
            payload.tags["city"] = cityId;
        }
        return payload;
    };

    const handleStateChange = async (e) => {
        const stateId = e.target.value;
        setSelectedStateId(stateId);
        setSelectedCityId("");

        const payload = buildPayload(stateId, null);
        const url = location?.pages?.filters?.url;
        if (url) {
            try {
                const response = await POST_REQUEST(url, payload);
                if (Array.isArray(response?.list)) {
                    setLocationsList(response.list);
                }
            } catch (err) {}
        }
    };

    const handleCityChange = async (e) => {
        const cityId = e.target.value;
        setSelectedCityId(cityId);

        const payload = buildPayload(selectedStateId, cityId);
        const url = location?.pages?.filters?.url;
        if (url) {
            try {
                const response = await POST_REQUEST(url, payload);
                if (Array.isArray(response?.list)) {
                    setLocationsList(response.list);
                }
            } catch (err) {}
        }
    };

    if (!Array.isArray(locationsList) || locationsList.length === 0) {
        return <ErrorMessage>No location data available.</ErrorMessage>;
    }

    const renderIfNotEmpty = (className, children) => {
        if (isEmptyNode(children)) return null;
        return <div className={className}>{children}</div>;
    };

    return (
        <>
            <section className="franchise_location franchise_location_partner" id={slug}>
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-12 col-xl-4">
                                    <div className="section_header">
                                        <h4
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: heading,
                                            }}
                                        />

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                    {renderIfNotEmpty(
                                        "franchise_location_main",
                                        filteredLocations.length > 0 ? (
                                            filteredLocations.map(
                                                (location, idx) => {
                                                    const hasName =
                                                        !!location.name &&
                                                        location.name.trim() !==
                                                            "";
                                                    const hasAddress =
                                                        !!location
                                                            .template_fields
                                                            ?.address &&
                                                        location.template_fields.address.trim() !==
                                                            "";
                                                    const hasContact =
                                                        !!location
                                                            .template_fields
                                                            ?.contact &&
                                                        location.template_fields.contact.trim() !==
                                                            "";
                                                    const hasEmail =
                                                        !!location
                                                            .template_fields
                                                            ?.email &&
                                                        location.template_fields.email.trim() !==
                                                            "";

                                                    if (
                                                        !hasName &&
                                                        !hasAddress &&
                                                        !hasContact &&
                                                        !hasEmail
                                                    ) {
                                                        return null;
                                                    }

                                                    return (
                                                        <div
                                                            className="franchise_box_location"
                                                            key={
                                                                location.id ||
                                                                idx
                                                            }
                                                        >
                                                            <h4
                                                                className="title_box fs-20 fw-600"
                                                                dangerouslySetInnerHTML={
                                                                    location.template_name
                                                                        ? {
                                                                              __html: location.template_name,
                                                                          }
                                                                        : {
                                                                              __html: "Franchise Locations",
                                                                          }
                                                                }
                                                            />
                                                            {renderIfNotEmpty(
                                                                "franchise_box_cantent",
                                                                <>
                                                                    {hasName && (
                                                                        <h3
                                                                            className="title_box_inner fs-20 fw-600"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: location.name,
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {hasAddress && (
                                                                        <p
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: location
                                                                                    .template_fields
                                                                                    .address,
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {hasContact && (
                                                                        <span>
                                                                            <a
                                                                                href={`tel:${location.template_fields.contact}`}
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: location
                                                                                        .template_fields
                                                                                        .contact,
                                                                                }}
                                                                            />
                                                                        </span>
                                                                    )}
                                                                    {hasEmail && (
                                                                        <span>
                                                                            <a
                                                                                href={`mailto:${location.template_fields.email}`}
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: location
                                                                                        .template_fields
                                                                                        .email,
                                                                                }}
                                                                            />
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <div className="franchise_box_location">
                                                <div className="franchise_box_cantent">
                                                    <p>
                                                        No franchise locations
                                                        found for the selected
                                                        filters.
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="col-md-12 col-xl-8">
                                    <div className="franchise_map_main">
                                        <div className="franchise_map_select row">
                                            <div className="col-12 col-md-6">
                                                <select
                                                    className="form-field"
                                                    id="state-select"
                                                    name="state"
                                                    value={selectedStateId}
                                                    onChange={handleStateChange}
                                                >
                                                    <option value="">
                                                        State
                                                    </option>
                                                    {stateOptions.map(
                                                        (state) => (
                                                            <option
                                                                key={state.id}
                                                                value={state.id}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: state.name,
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <select
                                                    className="form-field"
                                                    id="city-select"
                                                    name="city"
                                                    value={selectedCityId}
                                                    onChange={handleCityChange}
                                                    disabled={
                                                        !selectedStateId ||
                                                        cityOptions.length === 0
                                                    }
                                                >
                                                    <option value="">
                                                        City
                                                    </option>
                                                    {cityOptions
                                                        .filter(
                                                            (city) =>
                                                                city.id !=
                                                                    null &&
                                                                city.name !=
                                                                    null
                                                        )
                                                        .map((city) => (
                                                            <option
                                                                key={city.id}
                                                                value={city.id}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: city.name,
                                                                }}
                                                            />
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12">
                                            <div className="partner_map">
                                                <MapWithMarkers
                                                    locations={
                                                        filteredLocations
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
