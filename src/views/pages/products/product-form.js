"use client";
/* eslint-disable no-unused-vars */

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname } from "next/navigation";
import { getImageURL } from "@/lib";
import {
    FormProvider,
    getVisibleFieldKeys,
    RenderDynamicForm,
    handleFormSubmit,
} from "@/components";

const createDynamicSchema = (formData, watchedValues = {}) => {
    const visibleFieldKeys = getVisibleFieldKeys(formData, watchedValues);
    const { schema } = getSchemaValues({
        formData,
        parentKey: null,
        defaultValues: {},
        visibleFieldKeys,
    });

    return yup.object().shape(schema);
};

const getSchemaValues = ({
    formData = {},
    parentKey = null,
    defaultValues = {},
    visibleFieldKeys = [],
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
                        visibleFieldKeys,
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

                    if (!visibleFieldKeys.includes(field_key)) {
                        return;
                    }

                    let validation = yup.string();
                    values[field_key] = default_value || "";

                    switch (fieldName) {
                        case "text":
                        case "pincode":
                            if (type === "number") {
                                validation = yup.number();
                                values[field_key] = default_value || null;
                            }

                            if (type === "email") {
                                validation = validation.email();
                            }

                            if (!!min && !!max && max === min) {
                                validation = validation.test(
                                    "min-max-same",
                                    `${field_name} must be ${max} characters`,
                                    function (value) {
                                        return (
                                            !!value &&
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
                            }

                            break;

                        case "options":
                            if (type === "checkbox") {
                                validation = yup.array();
                                values[field_key] = [];
                            }

                            if (!!options?.length && Array.isArray(options)) {
                                validation = validation.oneOf(
                                    options?.map((item) => item?.value),
                                );
                            }

                            if (required === "1") {
                                validation = validation.required(
                                    `${field_name} is required`,
                                );
                            }

                            break;

                        case "checkbox":
                            validation = yup.boolean();
                            values[field_key] = default_value || false;

                            if (required === "1") {
                                validation = validation.test(
                                    "required",
                                    `${field_name || field_key} is required`,
                                    function (value) {
                                        return value === true;
                                    },
                                );
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

export const ProductPageForm = ({ data = {}, slug = "product_form" }) => {
    const { parent_class = "", form, title, image } = data;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const sectionRef = useRef(null);

    const pathname = usePathname()?.split("/");

    const initialSchema = getSchemaValues({
        formData: form || {},
        visibleFieldKeys: [],
    });

    const methods = useForm({
        resolver: yupResolver(yup.object().shape(initialSchema.schema)),
        defaultValues: initialSchema.values,
        mode: "onChange",
    });

    const watchedValues = methods.watch();

    useEffect(() => {
        if (!form) return;

        const visibleFieldKeys = getVisibleFieldKeys(form, watchedValues);
        const newSchema = createDynamicSchema(form, watchedValues);

        const currentErrors = methods.formState.errors;
        Object.keys(currentErrors).forEach((fieldKey) => {
            if (!visibleFieldKeys.includes(fieldKey)) {
                methods.clearErrors(fieldKey);
            }
        });
    }, [watchedValues, form, methods]);

    const onSubmit = async (formData) => {
        setIsSubmitting(true);

        try {
            const response = await handleFormSubmit({
                data: formData,
                methods: methods,
                formData: form,
                formId: form?.id,
                pageId: pathname?.[pathname?.length - 1],
            });

            if (response?.status) {
                methods.clearErrors();
                methods.reset();
                setIsSubmitted(true);
                setSuccessMessage(
                    response.message || "Form submitted successfully!",
                );
            } else {
                setSuccessMessage(
                    response?.message ||
                        "Failed to submit form. Please try again.",
                );
            }
        } catch (error) {
            console.error("Error during form submission:", error);

            setSuccessMessage(
                "There was an error submitting the form. Please try again.",
            );
        } finally {
            setIsSubmitting(false);

            if (isSubmitted && sectionRef.current) {
                sectionRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`cta__section ${parent_class || ""}`}
            style={{
                backgroundImage: `url(${getImageURL(image?.src)})`,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
            }}
            id={slug}
        >
            <div className="custom-container">
                <div className="row">
                    <div className="col-12 col-md-7 col-lg-7 col-xl-6">
                        <div className="section_header">
                            <h4
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: title,
                                }}
                            />
                        </div>

                        {!isSubmitted ? (
                            <FormProvider
                                methods={methods}
                                onSubmit={methods.handleSubmit(
                                    onSubmit,
                                    // onError
                                )}
                                className="cta__form faq__form"
                            >
                                {!!form && (
                                    <RenderDynamicForm
                                        formData={form}
                                        isSubmitting={isSubmitting}
                                    />
                                )}
                            </FormProvider>
                        ) : (
                            <div className="success-message">
                                <div className="d-flex">
                                    <div
                                        className="icon_wrap text-primary"
                                        style={{
                                            marginTop: "5px",
                                            marginRight: "10px",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className="alert alert-success"
                                        role="alert"
                                    >
                                        <h5 className="alert-heading fs-28 text-primary">
                                            Success!
                                        </h5>
                                        <p className="mb-0 fs-26">
                                            {successMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
