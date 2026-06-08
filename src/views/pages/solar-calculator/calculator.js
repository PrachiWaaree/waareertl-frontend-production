"use client";

import { Button, OptimizedImage } from "@/components";
import { useState } from "react";
import { getAbsoluteURL, getImageURL, useSwiperSliderOptions } from "@/lib";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cleanSEOTags, POST_REQUEST } from "@/utilities";

// API function
const submitCalculatorData = async (calculatorId, fields) => {
    try {
        const payload = {
            calculator_id: calculatorId.toString(),
            fields: fields,
        };

        const response = await POST_REQUEST("/calculator", payload);
        return response;
    } catch (error) {
        console.error("Calculator API error:", error);
        return {
            status: false,
            message: "Failed to calculate. Please try again.",
            fields: {},
        };
    }
};

export const SolarPageCalculatorSection = ({
    data = {},
    slug = "install_solar",
}) => {
    const { title, cards = [], ["button"]: button } = data;
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [formValues, setFormValues] = useState({});
    const [calculationResults, setCalculationResults] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const getButtonHref = (btn) => {
        let url = "";
        if (btn?.url_type === "external") {
            url = btn?.external_url || btn?.url;
        } else {
            url = btn?.url;
        }
        if (typeof url === "string") {
            return url;
        }
        return "";
    };

    const { options } = useSwiperSliderOptions({
        clickable: "true",
        slidesPerView: 1,
        noSwiping: false,
        noSwipingClass: "img_wrap",
        spaceBetween: 16,
        modules: [Pagination, Navigation],
        navigation: {
            prevEl: ".prev-btn-info",
            nextEl: ".next-btn-info",
        },
        pagination: {
            el: ".waree__info-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            600: {
                slidesPerView: 2,
                pagination: {
                    el: ".waree__info-pagination",
                    clickable: true,
                },
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    const selectedCard = selectedIndex !== null ? cards[selectedIndex] : null;

    const handleCardSelect = (index) => {
        setSelectedIndex(index);
        setIsVisible(false);
        setCalculationResults(null);
        setValidationErrors({});

        const card = cards[index];

        if (card?.calculator?.fields) {
            const initialValues = {};
            card.calculator.fields.forEach((section) => {
                section.fields.forEach((field) => {
                    const fieldData = field.text || field.options;
                    if (
                        fieldData &&
                        fieldData.field_key &&
                        fieldData.default_value !== null
                    ) {
                        initialValues[fieldData.field_key] =
                            fieldData.default_value;
                    }
                });
            });
            setFormValues(initialValues);
        }
    };

    const handleInputChange = (fieldKey, value) => {
        setFormValues((prev) => ({
            ...prev,
            [fieldKey]: value,
        }));

        if (validationErrors[fieldKey]) {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldKey];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        const calculator = selectedCard?.calculator;

        if (!calculator) return false;

        // Check required fields
        calculator.fields.forEach((section) => {
            section.fields.forEach((field) => {
                const fieldData = field.text || field.options;
                if (fieldData && fieldData.hidden_field !== "yes") {
                    const fieldKey = fieldData.field_key;
                    const value = formValues[fieldKey];

                    if (
                        fieldKey === "site_location" &&
                        (!value || value === "")
                    ) {
                        errors[fieldKey] = "Please select your location";
                    } else if (
                        fieldKey === "area" &&
                        (!value || value.toString().trim() === "")
                    ) {
                        errors[fieldKey] = "Please enter available roof area";
                    } else if (
                        fieldKey === "monthly_electricity" &&
                        (!value || value.toString().trim() === "")
                    ) {
                        errors[fieldKey] =
                            "Please enter monthly electricity details";
                    }
                }
            });
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCalculate = async (e) => {
        e.preventDefault();
        if (!selectedCard?.calculator?.id) return;

        if (!validateForm()) {
            return;
        }

        setIsCalculating(true);
        try {
            const apiValues = { ...formValues };

            let siteLocationField = null;
            selectedCard.calculator.fields.forEach((section) => {
                section.fields.forEach((field) => {
                    const fieldData = field.text || field.options;
                    if (fieldData?.field_key === "site_location") {
                        siteLocationField = fieldData;
                    }
                });
            });

            if (siteLocationField && apiValues.site_location) {
                const selectedOption = siteLocationField.options?.find(
                    (opt) => opt.label === apiValues.site_location,
                );
                if (selectedOption) {
                    apiValues.site_location = selectedOption.value;
                }
            }

            const response = await submitCalculatorData(
                selectedCard.calculator.id,
                apiValues,
            );

            if (response.status) {
                setCalculationResults(response.fields);
            } else {
                console.error("Calculation failed:", response.message);
            }
        } catch (error) {
            console.error("Calculation error:", error);
        } finally {
            setIsCalculating(false);
        }
    };

    const renderStaticFormFields = () => {
        const calculator = selectedCard?.calculator;
        if (!calculator) return null;

        let siteLocationField = null;

        let areaField = null;
        let monthlyElectricityField = null;

        calculator.fields.forEach((section) => {
            section.fields.forEach((field) => {
                const fieldData = field.text || field.options;
                if (fieldData && fieldData.hidden_field !== "yes") {
                    if (fieldData.field_key === "site_location") {
                        siteLocationField = fieldData;
                    } else if (fieldData.field_key === "area") {
                        areaField = fieldData;
                    } else if (fieldData.field_key === "monthly_electricity") {
                        monthlyElectricityField = fieldData;
                    }
                }
            });
        });

        return (
            <>
                {siteLocationField && (
                    <div className="location_left">
                        <label>Select Your Location</label>

                        <select
                            value={
                                formValues[siteLocationField.field_key] || ""
                            }
                            onChange={(e) =>
                                handleInputChange(
                                    siteLocationField.field_key,
                                    e.target.value,
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: validationErrors[
                                    siteLocationField.field_key
                                ]
                                    ? "1px solid #dc3545"
                                    : "1px solid #ccc",
                            }}
                            className="form-field"
                        >
                            <option value="">Select Location</option>
                            {siteLocationField.options?.map((option, index) => (
                                <option key={index} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {validationErrors[siteLocationField.field_key] && (
                            <div
                                style={{
                                    color: "#dc3545",
                                    fontSize: "14px",
                                    marginTop: "4px",
                                }}
                            >
                                {validationErrors[siteLocationField.field_key]}
                            </div>
                        )}
                    </div>
                )}

                {areaField && (
                    <div className="location_left">
                        <label>Enter available roof area</label>
                        <div className="input_box_inner d-flex">
                            <input
                                type="text"
                                placeholder="Enter Roof Area"
                                value={formValues[areaField.field_key] || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        areaField.field_key,
                                        e.target.value,
                                    )
                                }
                                style={{
                                    border: validationErrors[
                                        areaField.field_key
                                    ]
                                        ? "1px solid #dc3545"
                                        : undefined,
                                }}
                            />
                            <div className="value_data">
                                <div
                                    className="wrap-drop"
                                    id="noble-gases"
                                    style={{ textAlign: "center" }}
                                >
                                    <span>sq.ft</span>
                                </div>
                            </div>
                        </div>
                        {validationErrors[areaField.field_key] && (
                            <div
                                style={{
                                    color: "#dc3545",
                                    fontSize: "14px",
                                    marginTop: "4px",
                                }}
                            >
                                {validationErrors[areaField.field_key]}
                            </div>
                        )}
                    </div>
                )}

                {monthlyElectricityField && (
                    <div className="location_left">
                        <label>Enter monthly electricity details</label>
                        <div className="input_box_inner d-flex">
                            <input
                                type="text"
                                placeholder="Enter Electricity Details"
                                value={
                                    formValues[
                                        monthlyElectricityField.field_key
                                    ] || ""
                                }
                                onChange={(e) =>
                                    handleInputChange(
                                        monthlyElectricityField.field_key,
                                        e.target.value,
                                    )
                                }
                                style={{
                                    border: validationErrors[
                                        monthlyElectricityField.field_key
                                    ]
                                        ? "1px solid #dc3545"
                                        : undefined,
                                }}
                            />
                            <div className="value_icon">₹</div>
                        </div>
                        {validationErrors[
                            monthlyElectricityField.field_key
                        ] && (
                            <div
                                style={{
                                    color: "#dc3545",
                                    fontSize: "14px",
                                    marginTop: "4px",
                                }}
                            >
                                {
                                    validationErrors[
                                        monthlyElectricityField.field_key
                                    ]
                                }
                            </div>
                        )}
                    </div>
                )}
            </>
        );
    };

    const getDisplayValue = (fieldKey, value) => {
        switch (fieldKey) {
            case "total_upfront_cost":
            case "system_cost":
            case "cost_of_solar_panels":
            case "installation_and_maintenance_cost":
                return `₹ ${value?.toLocaleString() || 0}`;
            case "required_solar_capacity":
            case "required_solar_system_size":
                return `${value || 0} kW`;
            case "monthly_solar_generation":
            case "monthly_electricity_consumption":
                return `${value || 0} kWh`;
            case "co2_emission_reduced":
                return `${value || 0} T`;
            case "solar_panel_required":
                return value || 0;
            default:
                return value || 0;
        }
    };

    const resultFieldMappings = [
        { key: "year_25_saving", label: "25 Years Savings" },
        { key: "required_solar_capacity", label: "Solar Plant Capacity" },
        { key: "solar_panel_required", label: "Solar Panels Required" },
        { key: "monthly_solar_generation", label: "Monthly Solar Generation" },
        { key: "co2_emission_reduced", label: "CO2 Emission Reduced" },
        { key: "system_cost", label: "Price Of System" },
    ];

    const scrollToInstallSolar = () => {
        const el = document.getElementById("install_solar");
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 150;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <section className="solar_info_section" id={slug}>
            <div className="custom-container">
                {isVisible && (
                    <div className="solar_info_inner_main">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-9 col-xl-8">
                                <h2
                                    className="fs-48 fw-300 text-center"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-11 col-xl-10">
                                <div className="solar__info_col waree__info_slider swiper">
                                    <Swiper {...options}>
                                        {cards.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div
                                                    className={`single__item${
                                                        selectedIndex === index
                                                            ? " active"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleCardSelect(index)
                                                    }
                                                >
                                                    <a tabIndex={-1}>
                                                        <div className="top__info">
                                                            <div className="section_header text-center">
                                                                <h4
                                                                    className="heading"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: cleanSEOTags(
                                                                            item?.title,
                                                                        ),
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="bottom__info">
                                                            <OptimizedImage
                                                                className="img-fluid"
                                                                src={getImageURL(
                                                                    item?.image
                                                                        ?.src,
                                                                )}
                                                                alt={
                                                                    item?.image
                                                                        ?.alt ||
                                                                    ""
                                                                }/>
                                                        </div>
                                                    </a>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="waree__info-pagination" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Calculator form for selected card */}
                {selectedCard && selectedCard.calculator && (
                    <div className="calculator_form_main">
                        <div className="calculator_form_title">
                            <h2
                                className="fs-48 fw-300 text-center"
                                dangerouslySetInnerHTML={{
                                    __html: cleanSEOTags(selectedCard.title),
                                }}
                            />
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-12 col-xl-7 col-md-12">
                                <div className="location_form_main">
                                    <form onSubmit={handleCalculate}>
                                        <div className="location_box_inner d-flex justify-content-between">
                                            {renderStaticFormFields()}
                                        </div>
                                        <div className="form_location_btn">
                                            <Button
                                                role="button"
                                                label={
                                                    isCalculating
                                                        ? "Calculating..."
                                                        : "Calculate"
                                                }
                                                type="submit"
                                                disabled={isCalculating}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="location_form_bg">
                                    <OptimizedImage
                                        src={getImageURL(
                                            selectedCard?.image?.src,
                                        )}
                                        alt={selectedCard?.image?.alt || ""}/>
                                </div>
                            </div>

                            <div className="col-12 col-lg-12 col-xl-5 col-md-12">
                                <div className="solar-estimator">
                                    <div className="solar_estimator_title">
                                        <h2 className="fs-28">
                                            Estimate Solar System Details
                                        </h2>
                                    </div>
                                    <div className="solar-grid">
                                        {resultFieldMappings.map(
                                            (mapping, index) => (
                                                <div
                                                    key={index}
                                                    className="solar-field"
                                                >
                                                    <label className="solar-label">
                                                        {mapping.label}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="solar-input"
                                                        value={
                                                            calculationResults
                                                                ? getDisplayValue(
                                                                      mapping.key,
                                                                      calculationResults[
                                                                          mapping
                                                                              .key
                                                                      ],
                                                                  )
                                                                : getDisplayValue(
                                                                      mapping.key,
                                                                      0,
                                                                  )
                                                        }
                                                        readOnly
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </div>
                                    <div className="solor_system_bg">
                                        <OptimizedImage
                                            src={getImageURL(
                                                "/upload/media/solor_system_bg_1754041898.png",
                                            )}
                                            alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="btn-group text-center">
                            <Button
                                label={button?.title}
                                href={getAbsoluteURL(getButtonHref(button))}
                                target={
                                    button?.open_new_tab === "no"
                                        ? "_blank"
                                        : undefined
                                }
                                onClick={() => {
                                    setSelectedIndex(null);
                                    setIsVisible(true);
                                    setCalculationResults(null);
                                    setFormValues({});
                                    setValidationErrors({});
                                    scrollToInstallSolar();
                                }}
                            />
                        </div>
                    </div>
                )}

                {selectedCard && !selectedCard.calculator && (
                    <div className="calculator_form_main">
                        <div className="calculator_form_title">
                            <h2 className="fs-48 fw-300 text-center">
                                {selectedCard.title} Calculator Coming Soon
                            </h2>
                        </div>
                        <div className="btn-group text-center">
                            <Button
                                role="button"
                                label="Back to Options"
                                onClick={() => {
                                    setSelectedIndex(null);
                                    setIsVisible(true);
                                    scrollToInstallSolar();
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
