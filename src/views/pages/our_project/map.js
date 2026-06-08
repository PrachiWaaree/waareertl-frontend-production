"use client";
/* eslint-disable no-unused-vars */

import { Collapse } from "@/components";
import { India_Map_PATHS } from "@/config";
import { POST_REQUEST } from "@/utilities";
import { isEmpty, kebabCase } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const OurProjectPageMap = ({ data = {} }) => {
    const {
        ["banner-image"]: bannerImage,
        title,
        description,
        button,
        map = {},
    } = data;

    const { list = [], filter_list, pages } = map || {};

    const methods = useForm({
        defaultValues: {
            state: "all",
        },
        mode: "onChange",
    });

    const [filteredList, setFilteredList] = useState(list || []);
    const [statesData, setStatesData] = useState([]);
    const [activeStates, setActiveStates] = useState([]);
    const [activeAccordion, setActiveAccordion] = useState(0);
    const [activeState, setActiveState] = useState(null);

    const handleClick = (stateCode) => {
        const currentState = statesData?.find((state) => {
            return state?.name === stateCode;
        });
        methods.setValue("state", currentState?.id);
        onSubmit();
        setActiveState(stateCode);
    };

    useEffect(() => {
        if (!!filter_list?.length && Array.isArray(filter_list)) {
            let countryData = filter_list?.find(
                (item) => item?.slug === "Country"
            );

            if (!isEmpty(countryData)) {
                let indiaData = countryData?.tags?.find(
                    (item) => item?.name === "India"
                );

                if (!isEmpty(indiaData)) {
                    let stateFilters = indiaData?.filter_list?.find(
                        (item) => item?.slug === "state"
                    );

                    if (!isEmpty(stateFilters)) {
                        setStatesData(stateFilters?.tags);
                    }
                }
            }
        }
    }, [filter_list]);

    const onSubmit = methods["handleSubmit"](async (data) => {
        let payload = {
            template_id: pages?.filters?.template_id,
            page: 1,
            limit: pages?.filters?.limit,
            tags: {},
            conditions: [],
            tag_conditions: pages?.tag_conditions || [],
        };

        Object.entries(data)?.map((item) => {
            const fieldName = item[0];
            const fieldValue = item[1];

            if (fieldName === "state" && fieldValue !== "all") {
                payload.tags = {
                    ...payload.tags,
                    [fieldName]: fieldValue,
                };
            }
        });

        const url = pages?.filters?.url;

        if (url) {
            const response = await POST_REQUEST(url, payload);

            if (response?.list) {
                setFilteredList(response?.list);
                setActiveAccordion(0);

                let newStates = [];
                if (Array.isArray(response?.list)) {
                    response.list.forEach((item) => {
                        const stateName = kebabCase(
                            item?.tag_data?.state?.[0]?.name
                        );
                        if (!!stateName && !newStates.includes(stateName)) {
                            newStates.push(stateName);
                        }
                    });
                }
                setActiveStates(newStates);
            }
        }
    });

    return (
        <>
            <section className="our_reach">
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
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
                                    <div className="our_reach_main">
                                        <div className="our_reach_accordion">
                                            {filteredList?.map(
                                                (item, index) => {
                                                    const {
                                                        template_fields: {
                                                            company_name,
                                                            type,
                                                            short_description,
                                                        },
                                                    } = item || {};

                                                    const isActive =
                                                        index ===
                                                        activeAccordion;

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`acordian_item_reach ${
                                                                isActive
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <div
                                                                className="acordian_heading"
                                                                onClick={() =>
                                                                    setActiveAccordion(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className="acordian_title_up fs-28 fw-600"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: company_name,
                                                                    }}
                                                                />
                                                                <span
                                                                    className="acordian_title_bottom fs-20 fw-600"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: type,
                                                                    }}
                                                                />
                                                            </div>

                                                            <Collapse
                                                                show={isActive}
                                                                duration={0.2}
                                                            >
                                                                <div
                                                                    className="our_reach_acordian_contents"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: short_description,
                                                                    }}
                                                                />
                                                            </Collapse>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-lg-8 col-xl-8">
                                    <form onSubmit={onSubmit}>
                                        <div className="franchise_map_main">
                                            <div className="franchise_map_select row">
                                                <div className="col-12 col-md-12">
                                                    <select
                                                        className="form-field"
                                                        name="state"
                                                        {...methods.register(
                                                            "state"
                                                        )}
                                                        onChange={(event) => {
                                                            const value =
                                                                event.target
                                                                    .value;

                                                            const selectedItem =
                                                                statesData?.find(
                                                                    (item) =>
                                                                        String(
                                                                            item?.id
                                                                        ) ===
                                                                        value
                                                                );

                                                            const selectedName =
                                                                selectedItem?.name;

                                                            methods.setValue(
                                                                "state",
                                                                value
                                                            );

                                                            setActiveState(
                                                                selectedName
                                                            );

                                                            onSubmit();
                                                        }}
                                                    >
                                                        <option value="all">
                                                            All States
                                                        </option>
                                                        {statesData?.map(
                                                            (item) => (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="map_overfollow">
                                                <div
                                                    className="map_main"
                                                    id="map"
                                                    style={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <svg
                                                        version="1.1"
                                                        id="svg2"
                                                        x="0px"
                                                        y="0px"
                                                        viewBox="0 0 611.9 695.7"
                                                        style={{
                                                            enableBackground:
                                                                "new 0 0 611.9 695.7",
                                                        }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    >
                                                        {India_Map_PATHS?.map(
                                                            (state) => {
                                                                const hasData =
                                                                    statesData.find(
                                                                        (s) =>
                                                                            s.name ===
                                                                            state.id
                                                                    );

                                                                return (
                                                                    <g
                                                                        key={
                                                                            state.id
                                                                        }
                                                                        onClick={
                                                                            hasData
                                                                                ? () =>
                                                                                      handleClick(
                                                                                          state.id
                                                                                      )
                                                                                : undefined
                                                                        }
                                                                    >
                                                                        {state.paths.map(
                                                                            (
                                                                                p,
                                                                                i
                                                                            ) => {
                                                                                const isPin =
                                                                                    p
                                                                                        .props
                                                                                        .class ===
                                                                                    "st1";

                                                                                if (
                                                                                    isPin &&
                                                                                    !hasData
                                                                                )
                                                                                    return null;

                                                                                const isActive =
                                                                                    activeState ===
                                                                                    state.id;

                                                                                return (
                                                                                    <path
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                        d={
                                                                                            p
                                                                                                .props
                                                                                                .d
                                                                                        }
                                                                                        className={
                                                                                            p
                                                                                                .props
                                                                                                .class
                                                                                        }
                                                                                        style={{
                                                                                            cursor: hasData
                                                                                                ? "pointer"
                                                                                                : "default",
                                                                                            fill:
                                                                                                p
                                                                                                    .props
                                                                                                    .class ===
                                                                                                "st0"
                                                                                                    ? isActive
                                                                                                        ? "#22c55e"
                                                                                                        : "#d1d5db"
                                                                                                    : "#d1d5db",
                                                                                            transition:
                                                                                                "fill 0.2s ease-in-out",
                                                                                        }}
                                                                                    />
                                                                                );
                                                                            }
                                                                        )}
                                                                    </g>
                                                                );
                                                            }
                                                        )}
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
