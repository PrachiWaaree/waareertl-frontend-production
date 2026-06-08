"use client";
/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
//
import {
    FormProvider,
    handleFormSubmit,
    RenderDynamicForm,
    generateFormSchema,
} from "@/components";
import { getImageURL } from "@/lib";
import { useEffect, useRef, useState } from "react";

export const HomePageForm = ({ data = {}, slug = "home-form" }) => {
    const { form, title, subtitle, image, background } = data;

    const [errMessege, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const successRef = useRef(null);

    const pathname = usePathname()?.split("/");
    const methods = useForm(generateFormSchema(form));

    const onSubmit = methods["handleSubmit"](async (data) => {
        setIsSubmitting(true);
        try {
            let payload = {
                form_id: form?.id,
                page_id: pathname?.[pathname?.length - 1],
                fields: data,
            };

            const response = await handleFormSubmit({
                data: payload,
                methods: methods,
            });

            if (response?.status) {
                methods["clearErrors"]();
                methods["reset"]();
                setIsSubmitted(true);
                setSuccessMessage(
                    response?.message || "Form submitted successfully!"
                );
            } else {
                setSuccessMessage(
                    response?.message ||
                        "Failed to submit form. Please try again."
                );
                setErrorMessage(response?.errors?.error);
            }
        } catch (error) {
            console.error("Form submit error:", error);
            setErrorMessage("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    });

    useEffect(() => {
        if (isSubmitted && successRef.current) {
            successRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [isSubmitted]);

    const sectionClassName =
        background === "disable"
            ? "get_in_touch_main without__form"
            : "get_in_touch_main";

    return (
        <section className={sectionClassName}>
            <div className="custom-container">
                <div
                    className="cta__section"
                    style={{
                        backgroundImage: `url(${getImageURL(image?.src)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                    }}
                    id={slug}
                >
                    <div className="row">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
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
                                    onSubmit={onSubmit}
                                    className="cta__form"
                                >
                                    <RenderDynamicForm
                                        formData={form}
                                        errMessege={errMessege}
                                        isSubmitting={isSubmitting}
                                    />
                                </FormProvider>
                            ) : (
                                <div
                                    ref={successRef}
                                    className="success-message"
                                >
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
