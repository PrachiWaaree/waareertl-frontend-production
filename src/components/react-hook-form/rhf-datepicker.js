"use client";

import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

export const RHFDatePicker = ({
    name = "date",
    methods: parentMethods,
    placeholder,
    className,
    disabled = false,
    onChange,
    ...other
}) => {
    const methods = useFormContext();
    const formMethods = methods || parentMethods;

    if (!formMethods) {
        throw new Error("RHFDatePicker needs RHF methods");
    }

    return (
        <Controller
            name={name}
            control={formMethods.control}
            render={({ field, fieldState: { error } }) => (
                <div className="date-picker-wrapper">
                    <label htmlFor={name} className="sr-only">
                        {name}
                    </label>
                    <DatePicker
                        id={name}
                        {...field}
                        selected={field.value}
                        onChange={(date) => {
                            field.onChange(date);

                            if (onChange) {
                                const syntheticEvent = {
                                    target: { value: date },
                                };
                                onChange(syntheticEvent);
                            }
                        }}
                        placeholderText={placeholder}
                        className={`${className || ""} ${error ? "error" : ""}`}
                        disabled={disabled}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        {...other}
                    />
                    {error && (
                        <span
                            className="error-message"
                            style={{ color: "red", fontSize: "12px" }}
                        >
                            {error.message}
                        </span>
                    )}
                </div>
            )}
        />
    );
};
