"use client";
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePathname } from "next/navigation";
//
import {
    Fade,
    Button,
    FormProvider,
    RenderDynamicForm,
    generateFormSchema,
    handleFormSubmit,
    OptimizedImage,
} from "@/components";
import { useCommonContext } from "@/contexts";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const EnquiryPageSlider = ({ data = {}, slug = "enquiry_tabbing" }) => {
    const { slider_list = [] } = data;

    const { is480 } = useCommonContext();
    const [activeTab, setActiveTab] = useState(0);

    const {
        prevSlide: prevCategorySlide,
        nextSlide: nextCategorySlide,
        options: tabSliderOptions,
    } = useSwiperSliderOptions({
        slidesPerView: 4,
        allowTouchMove: true,
        centeredSlides: false,
        slideToClickedSlide: true,
        loop: false,
        breakpoints: {
            260: {
                slidesPerView: "auto",
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    // Hide arrows if only one item
    const showArrows = slider_list.length > 1;

    return (
        <>
            <section className="team__section ef_section" id={slug}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="item__tab_wrapper">
                                {/* <div className="tab_circle_1 circle__wrapper">
                                    <div className="circle-1" />
                                    <div className="circle-2 theme-gradient-1" />
                                </div>
                                <div className="tab_circle_2 circle__wrapper">
                                    <div className="circle-1" />
                                    <div className="circle-2 theme-gradient-1" />
                                </div>
                                <div className="tab_circle_3 circle__wrapper">
                                    <div className="circle-1" />
                                    <div className="circle-2 theme-gradient-1" />
                                </div> */}
                                <div className="custom-container">
                                    <div className="row">
                                        <div className="col-12">
                                            {slider_list.length > 1 ? (
                                                <>
                                                    <Swiper
                                                        {...tabSliderOptions}
                                                        className="item__tablist etab__slider"
                                                    >
                                                        {slider_list.map(
                                                            (item, index) => (
                                                                <SwiperSlide
                                                                    key={index}
                                                                >
                                                                    {({
                                                                        isActive:
                                                                            slideActive,
                                                                    }) => {
                                                                        if (
                                                                            activeTab !==
                                                                                index &&
                                                                            !!slideActive &&
                                                                            !!is480
                                                                        ) {
                                                                            setActiveTab(
                                                                                index
                                                                            );
                                                                        }

                                                                        return (
                                                                            <div
                                                                                className={`list_item ${
                                                                                    activeTab ===
                                                                                    index
                                                                                        ? "active"
                                                                                        : ""
                                                                                }`}
                                                                                style={{
                                                                                    width: "100%",
                                                                                }}
                                                                            >
                                                                                <a
                                                                                    href="#!"
                                                                                    className={`item__tab ${
                                                                                        activeTab ===
                                                                                        index
                                                                                            ? "active"
                                                                                            : ""
                                                                                    }`}
                                                                                    onClick={(
                                                                                        event
                                                                                    ) => {
                                                                                        event.preventDefault();
                                                                                        setActiveTab(
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <h4
                                                                                        className="heading fs-36 fw-300"
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html: item.title,
                                                                                        }}
                                                                                    />
                                                                                    <div className="shape" />
                                                                                </a>
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </SwiperSlide>
                                                            )
                                                        )}
                                                    </Swiper>

                                                    {showArrows && (
                                                        <div className="etab__slider_wrapper">
                                                            <ul className="etab__slider_btn">
                                                                <li
                                                                    className="prev-btn-etab"
                                                                    onClick={
                                                                        prevCategorySlide
                                                                    }
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                    >
                                                                        <svg
                                                                            width={
                                                                                45
                                                                            }
                                                                            height={
                                                                                45
                                                                            }
                                                                            viewBox="0 0 45 45"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <rect
                                                                                x={
                                                                                    -1
                                                                                }
                                                                                y={
                                                                                    1
                                                                                }
                                                                                width={
                                                                                    43
                                                                                }
                                                                                height={
                                                                                    43
                                                                                }
                                                                                rx="21.5"
                                                                                transform="matrix(-1 0 0 1 43 0)"
                                                                                stroke="#5B5B5B"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                            />
                                                                            <path
                                                                                d="M37.4685 21.1158C38.0206 21.1017 38.4797 21.5377 38.4938 22.0898C38.508 22.6419 38.0719 23.101 37.5198 23.1151L37.4685 21.1158ZM6.81525 23.6095C6.41484 23.2291 6.39861 22.5961 6.779 22.1957L12.9777 15.6707C13.3581 15.2703 13.9911 15.2541 14.3915 15.6345C14.7919 16.0148 14.8081 16.6478 14.4277 17.0482L8.91774 22.8482L14.7177 28.3582C15.1181 28.7386 15.1344 29.3715 14.754 29.772C14.3736 30.1724 13.7406 30.1886 13.3402 29.8082L6.81525 23.6095ZM37.4941 22.1155L37.5198 23.1151L7.52963 23.8841L7.50399 22.8845L7.47836 21.8848L37.4685 21.1158L37.4941 22.1155Z"
                                                                                fill="#5B5B5B"
                                                                            />
                                                                        </svg>
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className="next-btn-etab"
                                                                    onClick={
                                                                        nextCategorySlide
                                                                    }
                                                                >
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                    >
                                                                        <svg
                                                                            width={
                                                                                45
                                                                            }
                                                                            height={
                                                                                45
                                                                            }
                                                                            viewBox="0 0 45 45"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <rect
                                                                                x={
                                                                                    1
                                                                                }
                                                                                y={
                                                                                    1
                                                                                }
                                                                                width={
                                                                                    43
                                                                                }
                                                                                height={
                                                                                    43
                                                                                }
                                                                                rx="21.5"
                                                                                stroke="#0DB02B"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                            />
                                                                            <path
                                                                                d="M7.53149 21.1158C6.97939 21.1017 6.52034 21.5377 6.50619 22.0898C6.49203 22.6419 6.92812 23.101 7.48023 23.1151L7.53149 21.1158ZM38.1848 23.6095C38.5852 23.2291 38.6014 22.5961 38.221 22.1957L32.0223 15.6707C31.6419 15.2703 31.0089 15.2541 30.6085 15.6345C30.2081 16.0148 30.1919 16.6478 30.5723 17.0482L36.0823 22.8482L30.2823 28.3582C29.8819 28.7386 29.8656 29.3715 30.246 29.772C30.6264 30.1724 31.2594 30.1886 31.6598 29.8082L38.1848 23.6095ZM7.50586 22.1155L7.48023 23.1151L37.4704 23.8841L37.496 22.8845L37.5216 21.8848L7.53149 21.1158L7.50586 22.1155Z"
                                                                                fill="#0DB02B"
                                                                            />
                                                                        </svg>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                // If only one item, render as a static tab (no Swiper)
                                                <div className="item__tablist etab__slider">
                                                    {slider_list.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                className={`list_item ${
                                                                    activeTab ===
                                                                    index
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <a
                                                                    href="#!"
                                                                    className={`item__tab ${
                                                                        activeTab ===
                                                                        index
                                                                            ? "active"
                                                                            : ""
                                                                    }`}
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        event.preventDefault();
                                                                        setActiveTab(
                                                                            index
                                                                        );
                                                                    }}
                                                                >
                                                                    <h4
                                                                        className="heading fs-36 fw-300"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item.title,
                                                                        }}
                                                                    />
                                                                    <div className="shape" />
                                                                </a>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-container">
                    <AnimatePresence>
                        {slider_list?.map((item, index) => {
                            const isActive = activeTab === index;

                            return (
                                !!isActive && (
                                    <RenderTabContent item={item} key={index} />
                                )
                            );
                        })}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
};

const RenderTabContent = ({ item = {}, index }) => {
    const {
        list_type,
        form_type,
        parent_class = "",
        wrapper_class = "",
        second_wrapper_class = "",
    } = item || {};

    const isFormType = !list_type?.length;
    const formData = form_type?.[0];

    const pathname = usePathname()?.split("/");

    const RenderListType = () => {
        return list_type?.map((listItem, listIndex) => (
            <div
                className="row align-items-center justify-content-center"
                key={listIndex}
            >
                {listItem?.image?.src && (
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="img__wrap">
                            <OptimizedImage
                                loading="lazy"
                                className="img-fluid"
                                src={listItem?.image?.src}
                                alt={listItem.image?.alt || ""}
                            />
                        </div>
                    </div>
                )}

                <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="single__item">
                        <h4
                            className="heading fs-36 fw-500"
                            dangerouslySetInnerHTML={{
                                __html: listItem.title,
                            }}
                        />
                        <div className="content__wrap fs-20">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: listItem.description,
                                }}
                            />
                        </div>
                        {listItem.cta && (
                            <Button
                                label={listItem.cta?.title}
                                href={
                                    listItem.cta?.external_url ||
                                    listItem.cta?.url
                                }
                                openNewTab={
                                    listItem?.cta?.open_new_tab === "yes"
                                }
                                rel={
                                    listItem?.cta?.open_new_tab === "yes"
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        ));
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const successRef = useRef(null);

    const methods = useForm(generateFormSchema(formData?.form));

    const onSubmit = methods["handleSubmit"](async (data) => {
        setIsSubmitting(true);
        try {
            let payload = {
                form_id: formData?.form?.id,
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
            setErrorMessage(
                "Something went wrong. Please try again later."
            );
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

    if (isFormType) {
        return (
            <Fade>
                <div
                    className={`item__tab_data tab-active ${
                        parent_class || ""
                    }`}
                >
                    <div className={wrapper_class || ""}>
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-5">
                                <div className="img__wrapper">
                                    <OptimizedImage
                                        loading="lazy"
                                        className="img-fluid"
                                        src={formData?.image?.src}
                                        alt={formData?.image?.alt || ""}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-sm-8 col-md-6 col-lg-6 offset-lg-1 col-xl-6 offset-xl-1">
                                <div className="general_enquiry_form">
                                    <div className="section_header text-center">
                                        <h4
                                            className="heading fs-36 fw-500"
                                            dangerouslySetInnerHTML={{
                                                __html: formData?.heading,
                                            }}
                                        />
                                    </div>
                                    {!isSubmitted ? (
                                        <div className="cta__form faq__form">
                                            <FormProvider
                                                methods={methods}
                                                onSubmit={onSubmit}
                                            >
                                                <RenderDynamicForm
                                                    formData={
                                                        formData?.form
                                                    }
                                                />
                                            </FormProvider>
                                        </div>
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
                </div>
            </Fade>
        );
    }

    return (
        <Fade>
            <div
                className={`item__tab_data tab-active ${
                    parent_class || ""
                }`}
                style={{
                    display: "block",
                }}
            >
                <div className={wrapper_class || ""}>
                    {second_wrapper_class ? (
                        <div className={second_wrapper_class}>
                            <RenderListType />
                        </div>
                    ) : (
                        <RenderListType />
                    )}
                </div>
            </div>
        </Fade>
    );
};
