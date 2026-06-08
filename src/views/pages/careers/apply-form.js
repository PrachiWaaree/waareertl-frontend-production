/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
    FormProvider,
    generateFormSchema,
    RenderDynamicForm,
    handleFormSubmit,
    Button,
} from "@/components";

export const ApplyForm = ({ openForm, setOpenForm, job, selectedJob }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Generate form schema from the career form data
    const formSchema = job
        ? generateFormSchema(job, {})
        : { resolver: null, defaultValues: {} };

    const methods = useForm({
        ...(formSchema.resolver ? { resolver: formSchema.resolver } : {}),
        defaultValues: formSchema.defaultValues || {},
        mode: "onChange",
    });

    const onSubmit = async (formData) => {
        setIsSubmitting(true);

        try {
            const response = await handleFormSubmit({
                data: formData,
                methods: methods,
                formData: job,
                formId: job?.id,
                extraData: {
                    job_id: selectedJob?.id,
                    job_title:
                        selectedJob?.name ||
                        selectedJob?.template_fields?.title,
                },
            });

            if (response?.status) {
                methods?.clearErrors();
                methods?.reset();
                setIsSubmitted(true);
                setSuccessMessage(
                    response.message || "Application submitted successfully!",
                );
            } else {
                setSuccessMessage(
                    response?.message ||
                        "Failed to submit application. Please try again.",
                );
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            setSuccessMessage(
                "There was an error submitting your application. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setOpenForm(false);
        setIsSubmitted(false);
        setSuccessMessage("");
        methods?.reset();
    };

    if (!job) {
        return (
            <div className="apply-form-wrapper">
                <div className="career__modal_header">
                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={handleClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={38}
                            height={38}
                            viewBox="0 0 38 38"
                            fill="none"
                        >
                            <path
                                d="M10.5937 25.794C10.1485 26.2392 10.1485 26.9609 10.5937 27.4061C11.0389 27.8513 11.7607 27.8513 12.2059 27.4061L10.5937 25.794ZM19.8058 19.8061C20.251 19.3609 20.251 18.6392 19.8058 18.1939C19.3606 17.7487 18.6389 17.7487 18.1937 18.1939L19.8058 19.8061ZM18.1937 18.1939C17.7485 18.6392 17.7485 19.3609 18.1937 19.8061C18.6389 20.2513 19.3606 20.2513 19.8058 19.8061L18.1937 18.1939ZM27.4058 12.2061C27.851 11.7609 27.851 11.0391 27.4058 10.5939C26.9606 10.1487 26.2389 10.1487 25.7937 10.5939L27.4058 12.2061ZM19.8058 18.1939C19.3606 17.7487 18.6389 17.7487 18.1937 18.1939C17.7485 18.6392 17.7485 19.3609 18.1937 19.8061L19.8058 18.1939ZM25.7937 27.4061C26.2389 27.8513 26.9606 27.8513 27.4058 27.4061C27.851 26.9609 27.851 26.2392 27.4058 25.794L25.7937 27.4061ZM18.1937 19.8061C18.6389 20.2513 19.3606 20.2513 19.8058 19.8061C20.251 19.3609 20.251 18.6392 19.8058 18.1939L18.1937 19.8061ZM12.2059 10.5939C11.7607 10.1487 11.0389 10.1487 10.5937 10.5939C10.1485 11.0391 10.1485 11.7609 10.5937 12.2061L12.2059 10.5939ZM12.2059 27.4061L19.8058 19.8061L18.1937 18.1939L10.5937 25.794L12.2059 27.4061ZM19.8058 19.8061L27.4058 12.2061L25.7937 10.5939L18.1937 18.1939L19.8058 19.8061ZM18.1937 19.8061L25.7937 27.4061L27.4058 25.794L19.8058 18.1939L18.1937 19.8061ZM19.8058 18.1939L12.2059 10.5939L10.5937 12.2061L18.1937 19.8061L19.8058 18.1939Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <h4 className="heading fs-36 fw-500 text-gradient">
                        Application Form Not Available
                    </h4>
                </div>
                <div className="career__modal_body">
                    <p>
                        The application form for this position is not available
                        at the moment. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="apply-form-wrapper">
            <div className="career__modal_header">
                <button
                    type="button"
                    className="modal-close-btn"
                    onClick={handleClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={38}
                        height={38}
                        viewBox="0 0 38 38"
                        fill="none"
                    >
                        <path
                            d="M10.5937 25.794C10.1485 26.2392 10.1485 26.9609 10.5937 27.4061C11.0389 27.8513 11.7607 27.8513 12.2059 27.4061L10.5937 25.794ZM19.8058 19.8061C20.251 19.3609 20.251 18.6392 19.8058 18.1939C19.3606 17.7487 18.6389 17.7487 18.1937 18.1939L19.8058 19.8061ZM18.1937 18.1939C17.7485 18.6392 17.7485 19.3609 18.1937 19.8061C18.6389 20.2513 19.3606 20.2513 19.8058 19.8061L18.1937 18.1939ZM27.4058 12.2061C27.851 11.7609 27.851 11.0391 27.4058 10.5939C26.9606 10.1487 26.2389 10.1487 25.7937 10.5939L27.4058 12.2061ZM19.8058 18.1939C19.3606 17.7487 18.6389 17.7487 18.1937 18.1939C17.7485 18.6392 17.7485 19.3609 18.1937 19.8061L19.8058 18.1939ZM25.7937 27.4061C26.2389 27.8513 26.9606 27.8513 27.4058 27.4061C27.851 26.9609 27.851 26.2392 27.4058 25.794L25.7937 27.4061ZM18.1937 19.8061C18.6389 20.2513 19.3606 20.2513 19.8058 19.8061C20.251 19.3609 20.251 18.6392 19.8058 18.1939L18.1937 19.8061ZM12.2059 10.5939C11.7607 10.1487 11.0389 10.1487 10.5937 10.5939C10.1485 11.0391 10.1485 11.7609 10.5937 12.2061L12.2059 10.5939ZM12.2059 27.4061L19.8058 19.8061L18.1937 18.1939L10.5937 25.794L12.2059 27.4061ZM19.8058 19.8061L27.4058 12.2061L25.7937 10.5939L18.1937 18.1939L19.8058 19.8061ZM18.1937 19.8061L25.7937 27.4061L27.4058 25.794L19.8058 18.1939L18.1937 19.8061ZM19.8058 18.1939L12.2059 10.5939L10.5937 12.2061L18.1937 19.8061L19.8058 18.1939Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                <div className="text-gradient">
                    <h4 className="heading fs-36 fw-500">
                        Apply for{" "}
                        {selectedJob?.name ||
                            selectedJob?.template_fields?.title ||
                            job?.title}
                    </h4>
                </div>
            </div>

            <div className="career__modal_body">
                {!isSubmitted ? (
                    <div className="form-container">
                        <FormProvider
                            methods={methods}
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className="apply-form-dynamic"
                        >
                            <div className="apply-form-fields">
                                <RenderDynamicForm
                                    formData={job}
                                    isSubmitting={isSubmitting}
                                />
                            </div>

                            <div className="btn-group text-center apply-form-submit">
                                <Button
                                    type="submit"
                                    label={
                                        isSubmitting
                                            ? "Submitting Application..."
                                            : "Submit Application"
                                    }
                                    disabled={isSubmitting}
                                />
                            </div>
                        </FormProvider>
                    </div>
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
                                    Application Submitted!
                                </h5>
                                <p className="mb-0 fs-36">{successMessage}</p>
                            </div>
                        </div>

                        <div
                            className="btn-group text-center"
                            style={{ marginTop: "20px" }}
                        >
                            <Button label="Close" onClick={handleClose} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
