"use client";
/* eslint-disable no-unused-vars */
import {
    FormProvider,
    generateFormSchema,
    handleFormSubmit,
    RenderDynamicForm,
} from "@/components";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const BlogForm = ({ data = {} }) => {
    const { fields, id, title } = data;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const pathname = usePathname();

    const pathSegments = pathname?.split("/").filter(Boolean);
    const pageId = pathSegments?.slice(-2).join("/");

    const methods = useForm(generateFormSchema(data || {}));

    const onSubmit = methods["handleSubmit"](async (data) => {
        let payload = {
            form_id: id,
            page_id: pageId,
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

            setIsSubmitted(true);
            setSuccessMessage(message || "Form submitted successfully!");
        }
    });

    return (
        <div className="blog_comment_form">
            {/* <div className="row"> */}
            {/* <div className="col-12 col-md-7 col-lg-7 col-xl-6"> */}
            <div className="section_header">
                <h4
                    className="heading fs-36 fw-300"
                    dangerouslySetInnerHTML={{
                        __html: title,
                    }}
                />
            </div>

            {!isSubmitted ? (
                <FormProvider
                    methods={methods}
                    onSubmit={onSubmit}
                    className="cta__form faq__form"
                >
                    {!!data && <RenderDynamicForm formData={data} />}
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
                        <div className="alert alert-success" role="alert">
                            <h5 className="alert-heading fs-48 text-primary">
                                Success!
                            </h5>
                            <p className="mb-0 fs-36">{successMessage}</p>
                        </div>
                    </div>
                </div>
            )}
            {/* </div> */}
            {/* </div> */}
        </div>
    );
};
