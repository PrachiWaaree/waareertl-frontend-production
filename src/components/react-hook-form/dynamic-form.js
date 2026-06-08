"use client";

import * as yup from "yup";
import { isEmpty } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { API_ENDPOINTS } from "@/config";
import { POST_REQUEST } from "@/utilities";
//
import { Button } from "../common";
import { RHFInput } from "./rhf-input";
import { RHFSelect } from "./rhf-select";
import { RHFCheckbox } from "./rhf-checkbox";
import { useFormContext } from "react-hook-form";
import { RHFDatePicker } from "./rhf-datepicker";
import { RHFMedia } from "./rhf-media";

export const getSchemaValues = ({
    formData = {},
    parentKey = null,
    defaultValues = {},
}) => {
    const { fields, section_field_key = null } = formData;

    let schemaShape = {};
    let values = {};

    if (Array.isArray(fields)) {
        fields?.forEach((section) => {
            if (!!section?.fields?.length && Array.isArray(section?.fields)) {
                const { values: returnedValues, schema: returnedSchemaShape } =
                    getSchemaValues({
                        formData: section,
                        parentKey: section_field_key,
                        defaultValues: defaultValues,
                    });

                schemaShape = {
                    ...schemaShape,
                    ...(parentKey
                        ? {
                              [parentKey]: yup
                                  .object()
                                  .shape(returnedSchemaShape),
                          }
                        : {
                              ...returnedSchemaShape,
                          }),
                };

                values = {
                    ...values,
                    ...returnedValues,
                };
            } else {
                const sectionValue = Object.entries(section)?.[0];
                const fieldName = sectionValue?.[0];
                const params = sectionValue?.[1];

                if (!!sectionValue?.length && !["cta"]?.includes(fieldName)) {
                    const {
                        field_key,
                        field_name,
                        max,
                        min,
                        required,
                        type,
                        options,
                        default_value = "",
                    } = params;

                    let validation = yup.string();
                    values[field_key] = default_value || "";

                    switch (fieldName) {
                        case "text":
                        case "pincode":
                            if (type === "number") {
                                validation = yup.number().nullable();
                                values[field_key] = default_value || null;
                            } else {
                                validation = yup.string().trim();
                            }

                            if (type === "email") {
                                validation = validation.email();
                            }

                            if (!!min && !!max && max === min) {
                                validation = validation.test(
                                    "min-max-same",
                                    `${field_name} must be ${max} characters`,
                                    function (value) {
                                        if (!value) return true;
                                        return (
                                            value?.toString().length ===
                                            parseInt(min)
                                        );
                                    },
                                );
                            } else {
                                if (max) {
                                    validation = validation.max(parseInt(max));
                                }

                                if (min) {
                                    validation = validation.min(parseInt(min));
                                }
                            }

                            if (required === "1") {
                                validation = validation.required(
                                    `${field_name} is required`,
                                );
                            } else {
                                validation = validation
                                    .nullable()
                                    .notRequired();
                            }

                            break;

                        case "options":
                            if (type === "checkbox") {
                                validation = yup.array().nullable();
                                values[field_key] = [];
                            } else {
                                validation = yup.string().nullable();
                            }

                            if (!!options?.length && Array.isArray(options)) {
                                const validValues = options?.map(
                                    (item) => item?.value,
                                );
                                validation = validation.test(
                                    "valid-option",
                                    `${field_name} must be one of the following values: ${validValues.join(
                                        ", ",
                                    )}`,
                                    function (value) {
                                        if (!value || value === "") return true;
                                        return validValues.includes(value);
                                    },
                                );
                            }

                            if (required === "1") {
                                validation = validation.required(
                                    `${field_name} is required`,
                                );
                            } else {
                                validation = validation
                                    .nullable()
                                    .notRequired();
                            }

                            break;

                        case "checkbox":
                            validation = yup.boolean().nullable();
                            values[field_key] = default_value || false;

                            if (required === "1") {
                                validation = validation.test(
                                    "required",
                                    `${field_name || field_key} is required`,
                                    function (value) {
                                        return value === true;
                                    },
                                );
                            } else {
                                validation = validation
                                    .nullable()
                                    .notRequired();
                            }

                            break;
                    }

                    schemaShape = {
                        ...schemaShape,
                        [field_key]: validation,
                    };
                }
            }
        });
    }

    return { values: values, schema: schemaShape };
};

export const generateFormSchema = (formData = {}, defaultValues = {}) => {
    const { values, schema } = getSchemaValues({
        formData: formData,
        parentKey: null,
        defaultValues: defaultValues,
    });

    return {
        resolver: yupResolver(yup.object().shape(schema)),
        defaultValues: values,
    };
};

const clearLocationFields = (methods) => {
    const locationFields = [
        "state_serial_no",
        "district_serial_no",
        "city_serial_no",
        "location",
        "zone",
        "state",
        "district",
        "city",
    ];

    locationFields.forEach((fieldName) => {
        methods.setValue(fieldName, "", {
            shouldDirty: true,
            shouldValidate: true,
        });
    });
};

export const handlePincodeVerification = async ({ pincode, methods = {} }) => {
    try {
        const response = await POST_REQUEST(API_ENDPOINTS["location"], {
            pincode: pincode,
        });

        if (response?.status === true && response?.data?.length > 0) {
            const locationData = response.data[0];

            const fieldsToUpdate = {
                state_serial_no: locationData?.state_serial_no,
                district_serial_no: locationData?.district_serial_no,
                city_serial_no: locationData?.city_serial_no,
                location: locationData?.location,
                zone: locationData?.zone,
                state: locationData?.statename,
                district: locationData?.district,
                city: locationData?.city,
            };

            Object.entries(fieldsToUpdate).forEach(([fieldName, value]) => {
                if (methods.setValue && value !== undefined) {
                    methods.setValue(fieldName, value, {
                        shouldDirty: true,
                        shouldValidate: true,
                    });
                }
            });

            methods.setValue("_location_data_available", true, {
                shouldDirty: false,
                shouldValidate: false,
            });

            return { success: true, data: locationData };
        } else {
            methods.setValue("_location_data_available", false, {
                shouldDirty: false,
                shouldValidate: false,
            });

            clearLocationFields(methods);

            if (methods.setError) {
                methods.setError("pincode", {
                    type: "custom",
                    message: "Invalid pincode or location not found",
                });
            }
            return { success: false, error: "Location not found" };
        }
    } catch (error) {
        methods.setValue("_location_data_available", false, {
            shouldDirty: false,
            shouldValidate: false,
        });

        clearLocationFields(methods);

        if (methods.setError) {
            methods.setError("pincode", {
                type: "custom",
                message: "Failed to verify pincode. Please try again.",
            });
        }
        return { success: false, error: error.message };
    }
};

export const handleFormSubmit = async ({
    data = {},
    methods = {},
    formData = {},
    formId = null,
    pageId = null,
    extraData = {},
}) => {
    try {
        const watchedValues = methods.watch ? methods.watch() : data;

        const actualFormId = formId || data.form_id || formData?.id || null;
        const actualPageId = pageId || data.page_id || null;
        const jobId = extraData?.job_id || null;

        const actualData = data.fields ? data.fields : data;

        const visibleFieldKeys = getVisibleFieldKeys(formData, watchedValues);

        const fields = {};

        Object.entries(actualData).forEach(([key, value]) => {
            if (key === "form_id" || key === "page_id") {
                return;
            }

            const isSystemField = key.startsWith("_");
            const isVisibleField =
                visibleFieldKeys.includes(key) || visibleFieldKeys.length === 0;

            const hasValue = (() => {
                if (value === undefined || value === null) return false;
                if (Array.isArray(value) && value.length === 0) return false;
                return true;
            })();

            if ((isVisibleField || isSystemField) && hasValue) {
                let finalValue = value;

                if (typeof value === "string") {
                    finalValue = value.trim();
                }

                if (value && typeof value === "object") {
                    if (value.path && value.name) {
                        finalValue = value.path;
                    } else if (
                        Array.isArray(value) &&
                        value.length > 0 &&
                        value[0].path
                    ) {
                        finalValue = value.map((file) => file.path);
                    }
                }

                switch (key) {
                    case "state":
                        finalValue = value;
                        break;
                    case "city":
                        finalValue = value;
                        break;
                    case "district":
                        finalValue = value;
                        break;
                    case "name":
                        if (
                            typeof finalValue === "string" &&
                            !finalValue.includes(" ")
                        ) {
                            finalValue = `${finalValue} ${finalValue}`;
                        }
                        break;
                    default:
                        break;
                }

                fields[key] = finalValue;
            }
        });

        Object.entries(extraData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                let finalValue = value;
                if (typeof value === "string") {
                    finalValue = value.trim();
                }
                fields[key] = finalValue;
            }
        });

        const payload = {
            form_id: actualFormId,
            fields: fields,
        };

        if (actualPageId) {
            payload.page_id = actualPageId;
        }

        if (jobId) {
            payload.jobId = jobId;
        }

        if (Object.keys(fields).length === 0) {
            console.warn("No valid data to submit");
            return {
                status: false,
                message: "No valid data to submit",
                errors: {},
            };
        }

        const response = await POST_REQUEST(API_ENDPOINTS["FORM"], payload);

        if (
            response?.status === false &&
            !isEmpty(response?.errors) &&
            methods.setError
        ) {
            Object.entries(response.errors).forEach(
                ([fieldName, errorMessage]) => {
                    if (errorMessage && fieldName) {
                        methods.setError(fieldName, {
                            type: "server",
                            message: Array.isArray(errorMessage)
                                ? errorMessage[0]
                                : errorMessage,
                        });
                    }
                },
            );
        }

        return response;
    } catch (error) {
        console.error("Form submission error:", error);

        if (methods.setError) {
            methods.setError("root", {
                type: "submit",
                message: "Failed to submit form. Please try again.",
            });
        }

        return {
            status: false,
            message: "Failed to submit form. Please try again.",
            errors: { general: "Network error or server unavailable" },
        };
    }
};

export const getVisibleFieldKeys = (formData, watchedValues) => {
    const visibleKeys = new Set();

    const processFields = (fields) => {
        if (!Array.isArray(fields)) return;

        fields.forEach((section) => {
            const shouldRenderSection = checkSectionVisibility(
                section,
                watchedValues,
            );

            if (!shouldRenderSection) {
                return;
            }

            if (Array.isArray(section?.fields) && section?.fields?.length > 0) {
                processFields(section.fields);
            } else {
                const sectionValue = Object.entries(section)?.[0];
                const fieldName = sectionValue?.[0];
                const params = sectionValue?.[1];

                if (sectionValue?.length && !["cta"]?.includes(fieldName)) {
                    const { field_key } = params;
                    if (field_key) {
                        visibleKeys.add(field_key);
                    }
                }
            }
        });
    };

    processFields(formData?.fields || []);
    return Array.from(visibleKeys);
};

export const RenderDynamicForm = ({
    formData = {},
    isSubmitting = false,
    errMessege = "",
}) => {
    const { fields } = formData;
    const methods = useFormContext();

    const watchedValues = methods.watch();

    return (
        <>
            {!!Array.isArray(fields) &&
                fields?.map((section, index) => {
                    const shouldRenderSection = checkSectionVisibility(
                        section,
                        watchedValues,
                    );

                    if (!shouldRenderSection) {
                        return null;
                    }

                    if (
                        Array.isArray(section?.fields) &&
                        !!section?.fields?.length
                    ) {
                        return (
                            <div
                                key={index}
                                className={section?.section_field_class}
                            >
                                <RenderDynamicForm
                                    formData={section}
                                    isSubmitting={isSubmitting}
                                    errMessege={errMessege}
                                />
                            </div>
                        );
                    } else {
                        const sectionValue = Object.entries(section)?.[0];
                        const fieldType = sectionValue[0];
                        const params = sectionValue[1];

                        return (
                            <RenderField
                                key={index}
                                fieldType={fieldType}
                                params={params}
                                isSubmitting={isSubmitting}
                                errMessege={errMessege}
                            />
                        );
                    }
                })}
        </>
    );
};

const checkSectionVisibility = (section, watchedValues) => {
    const { section_dependency_field, section_dependency_field_value } =
        section;

    if (!section_dependency_field) {
        return true;
    }

    const dependencyFieldValue = watchedValues[section_dependency_field];

    if (section_dependency_field_value && dependencyFieldValue) {
        return dependencyFieldValue === section_dependency_field_value;
    }

    return false;
};

const RenderField = ({
    params = {},
    fieldType,
    isSubmitting = false,
    errMessege = "",
}) => {
    const {
        class: className,
        field_key,
        field_name,
        helper_text,
        placeholder,
        options,
        type,
        wrapper_class = "",
        dropdown_allow,
        input_class = "",
        parent_class = "",
    } = params;

    const methods = useFormContext();

    if (type === "hidden") {
        return (
            <RHFInput
                name={field_key}
                type="hidden"
                value={params.default_value || ""}
            />
        );
    }

    const pincodeValue = methods.watch("pincode");

    const handlePincodeChange = async (e) => {
        const value = e.target.value;

        methods.setValue(field_key, value);

        if (value.length === 6) {
            const result = await handlePincodeVerification({
                pincode: value,
                methods,
            });

            if (!result.success) {
                methods.setValue("_location_data_available", false);

                clearLocationFields(methods);
            } else {
                methods.setValue("_location_data_available", true);
            }
        } else {
            methods.setValue("_location_data_available", false);
            clearLocationFields(methods);
        }
    };

    const isLocationDataAvailable = methods.watch("_location_data_available");
    const shouldBeEditable =
        (fieldType === "state" || fieldType === "city") &&
        (!isLocationDataAvailable ||
            !pincodeValue ||
            pincodeValue.length !== 6);

    const handleDateChange = (e) => {
        const date = e.target.value;
        methods.setValue(field_key, date);
    };

    switch (fieldType) {
        case "text":
            return (
                <div className={wrapper_class}>
                    {dropdown_allow === "1" && options?.length ? (
                        <RHFSelect
                            name={field_key}
                            options={options}
                            label={field_name}
                            disabled={isSubmitting}
                        />
                    ) : (
                        <RHFInput
                            name={field_key}
                            className={className}
                            placeholder={placeholder || field_name}
                            type="text"
                            component={type}
                            disabled={isSubmitting}
                        />
                    )}
                </div>
            );

        case "state":
        case "city":
            return (
                <div className={wrapper_class}>
                    {dropdown_allow === "1" && options?.length ? (
                        <RHFSelect
                            name={field_key}
                            options={options}
                            label={field_name}
                            disabled={!shouldBeEditable || isSubmitting}
                        />
                    ) : (
                        <RHFInput
                            name={field_key}
                            className={className}
                            placeholder={placeholder || field_name}
                            type="text"
                            readOnly={!shouldBeEditable}
                            disabled={!shouldBeEditable || isSubmitting}
                        />
                    )}
                </div>
            );

        case "district":
        case "location":
        case "zone":
            return (
                <div className={wrapper_class}>
                    {dropdown_allow === "1" && options?.length ? (
                        <RHFSelect
                            name={field_key}
                            options={options}
                            label={field_name}
                            disabled={!shouldBeEditable || isSubmitting}
                        />
                    ) : (
                        <RHFInput
                            name={field_key}
                            className={className}
                            placeholder={placeholder || field_name}
                            type="text"
                            disabled={!shouldBeEditable || isSubmitting}
                        />
                    )}
                </div>
            );

        case "options":
            return (
                <div className={wrapper_class}>
                    <RHFSelect
                        name={field_key}
                        options={options}
                        label={field_name}
                        disabled={isSubmitting}
                    />
                </div>
            );

        case "checkbox":
            return (
                <>
                    <div className={wrapper_class}>
                        <RHFCheckbox
                            name={field_key}
                            label={helper_text}
                            inputClassName={input_class}
                            parentClassName={parent_class}
                            disabled={isSubmitting}
                        />
                        {!!errMessege && (
                            <div
                                className="error-message"
                                style={{ marginTop: 25 }}
                            >
                                {errMessege}
                            </div>
                        )}
                    </div>
                </>
            );

        case "cta":
            return (
                <div className={wrapper_class}>
                    <Button
                        role="button"
                        type={type}
                        label={isSubmitting ? "Submitting..." : field_name}
                        disabled={isSubmitting}
                    />
                </div>
            );

        case "pincode":
            return (
                <div className={wrapper_class}>
                    <RHFInput
                        name={field_key}
                        className={className}
                        placeholder={placeholder || field_name}
                        type="text"
                        onChange={handlePincodeChange}
                        disabled={isSubmitting}
                    />
                </div>
            );
        case "date":
            return (
                <div className={wrapper_class}>
                    <RHFDatePicker
                        name={field_key}
                        className={className}
                        placeholder={placeholder || field_name}
                        onChange={handleDateChange}
                        disabled={isSubmitting}
                    />
                </div>
            );
        case "media":
            return (
                <div className={wrapper_class}>
                    <RHFMedia
                        name={field_key}
                        label={field_name}
                        placeholder={placeholder || field_name}
                        className={className}
                        multiple={params.is_multiple === "yes"}
                        mediaType={
                            params.is_multiple === "no" ? "single" : "multiple"
                        }
                        disabled={isSubmitting}
                    />
                </div>
            );

        default:
            return <></>;
    }
};
