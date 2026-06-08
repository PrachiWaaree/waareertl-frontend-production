"use client";

import { Controller, useFormContext } from "react-hook-form";
import { cleanSEOTags } from "@/utilities/common";

function removePTags(html) {
    return html.replace(/<\/?p[^>]*>/gi, "");
}

export const RHFCheckbox = ({
    name,
    label = "",
    parentClassName = "",
    inputClassName = "",
    ...other
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={parentClassName}>
                    <input
                        id={field.name}
                        className={`${inputClassName} ${error ? "error" : ""}`}
                        {...field}
                        checked={field?.value}
                        ref={field.ref}
                        type="checkbox"
                        {...other}
                    />

                    {!!label && (
                        <label
                            className="form-check-label"
                            htmlFor={field.name}
                            dangerouslySetInnerHTML={{
                                __html: cleanSEOTags(removePTags(label)),
                            }}
                        />
                    )}

                    {error?.message && (
                        <div className="error-message">{error.message}</div>
                    )}
                </div>
            )}
        />
    );
};
