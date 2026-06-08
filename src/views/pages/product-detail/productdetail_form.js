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

export const ProductDetailPageForm = ({ data = {} }) => {
    const { form, title, subtitle, image } = data;

    const pathname = usePathname()?.split("/");
    const methods = useForm(generateFormSchema(form));

    const onSubmit = methods["handleSubmit"](async (data) => {
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
        }
    });

    return (
        <section
            className="cta__section faq__form_section"
            style={{
                backgroundImage: `url(${getImageURL(image?.src)})`,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="section_overlay" />
            <div className="custom-container">
                <div className="row">
                    <div className="col-12 ">
                        <div className="section_header text-center">
                            <h4
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: title,
                                }}
                            />
                        </div>

                        <FormProvider
                            methods={methods}
                            onSubmit={onSubmit}
                            className="cta__form faq__form"
                        >
                            <RenderDynamicForm formData={form} />
                        </FormProvider>
                    </div>
                </div>
            </div>
        </section>
    );
};
