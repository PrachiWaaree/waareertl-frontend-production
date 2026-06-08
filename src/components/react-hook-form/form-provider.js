"use client";

import { FormProvider as Form } from "react-hook-form";

export const FormProvider = ({
    key,
    methods,
    onSubmit,
    children,
    ...other
}) => {
    return (
        <Form {...methods} {...(key ? { key: key } : {})}>
            <form style={{ width: "100%" }} onSubmit={onSubmit} {...other}>
                {children}
            </form>
        </Form>
    );
};
