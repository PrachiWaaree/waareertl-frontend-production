"use client";

import { Controller, useFormContext } from "react-hook-form";

export const RHFSelect = ({
    name = "",
    options = [],
    note = false,
    label = "",
    optionsValueKey = "value",
    optionsLabelKey = "label",
    helperText,
    className = "",
    clearValue = false,
    ...other
}) => {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className="input-stack">
                    <label htmlFor={name} className="sr-only">
                        {label || name}
                    </label>

                    <select
                        id={name}
                        className={`form-field ${className} ${
                            error ? "error" : ""
                        }`}
                        {...field}
                        ref={field.ref}
                        {...other}
                    >
                        <option value="">{label}</option>
                        {options?.map((item, index) => (
                            <option key={index} value={item[optionsValueKey]}>
                                {item[optionsLabelKey]}
                            </option>
                        ))}
                    </select>

                    {note && (
                        <div
                            className="input-note"
                            title={typeof note === "string" ? note : ""}
                        >
                            {typeof note === "string" ? "ℹ" : note}
                        </div>
                    )}

                    {clearValue && field?.value && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={() => setValue(name, "")}
                        >
                            ×
                        </button>
                    )}

                    {(error?.message || helperText) && (
                        <div
                            className={`helper-text ${
                                error ? "error-message" : ""
                            }`}
                        >
                            {error?.message || helperText}
                        </div>
                    )}
                </div>
            )}
        />
    );
};
