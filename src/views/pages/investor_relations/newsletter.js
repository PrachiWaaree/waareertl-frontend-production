"use client";
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
//
import {
    ErrorMessage,
    FormProvider,
    handleFormSubmit,
    RenderDynamicForm,
    generateFormSchema,
} from "@/components";

export const InvestorRelationPageNewsletter = ({
    data = {},
    slug = "newsletter",
}) => {
    const { heading, form } = data;

    const pathname = usePathname()?.split("/");
    const methods = useForm(generateFormSchema(form));
    const [successMessage, setSuccessMessage] = useState("");

    const [error, setError] = useState(null);

    const onSubmit = methods["handleSubmit"](async (data) => {
        setError(null);

        let payload = {
            form_id: form?.id,
            page_id: pathname?.[pathname?.length - 1],
            fields: data,
        };

        const {
            status,
            message,
            data: returnedData,
            errors,
        } = await handleFormSubmit({ data: payload, methods: methods });

        if (status) {
            methods["clearErrors"]();
            methods["reset"]();
            setSuccessMessage(message || "Form submitted successfully!");
            return true;
        } else {
            setError(message);
            return false;
        }
    });

    return (
        <>
            <section className="sing_up_newsletter_main" id={slug}>
                <div className="custom-container">
                    <div className="sing_up_newsletter d-flex justify-content-center align-items-center text-center">
                        <div className="sing_up_newsletter_title">
                            <h2
                                className="fs-48 fw-300"
                                dangerouslySetInnerHTML={{ __html: heading }}
                            />
                        </div>

                        <FormProvider
                            methods={methods}
                            onSubmit={onSubmit}
                            style={{
                                width: "auto",
                            }}
                        >
                            {methods["formState"]["isSubmitSuccessful"] ? (
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
                                            <h5 className="alert-heading fs-48 text-primary">
                                                Success!
                                            </h5>
                                            <p className="mb-0 fs-36">
                                                {successMessage}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <RenderDynamicForm formData={form} />

                                    {!!error && (
                                        <ErrorMessage>{error}</ErrorMessage>
                                    )}
                                </>
                            )}
                        </FormProvider>
                    </div>
                </div>
            </section>
        </>
    );
};
