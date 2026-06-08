"use client";
/* eslint-disable no-unused-vars */

import { Controller, useFormContext } from "react-hook-form";

export const RHFInput = ({
    name,
    component = "",
    note = false,
    type = "text",
    slotProps = {},
    className = "",
    onChange: customOnChange,
    ...other
}) => {
    const { control, setValue } = useFormContext();
    const isTextarea = component === "textarea" || component === "multiline";

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className="input-stack">
                    <label htmlFor={name} className="sr-only">
                        {name}
                    </label>
                    {isTextarea ? (
                        <textarea
                            id={name}
                            className={`form-field ${className} ${error ? "error" : ""}`}
                            {...field}
                            value={field.value ?? ""}
                            ref={field.ref}
                            {...other}
                            onChange={(event) => {
                                field.onChange(event);
                                if (customOnChange) {
                                    customOnChange(event);
                                }
                            }}
                            rows={5}
                        />
                    ) : (
                        <input
                            id={name}
                            className={`form-field ${className} ${error ? "error" : ""}`}
                            {...field}
                            onBlur={field.onBlur}
                            value={field.value ?? ""}
                            ref={field.ref}
                            {...other}
                            {...(type === "number"
                                ? {
                                      type: "number",
                                      value: field?.value?.toString(),
                                      onChange: (event) => {
                                          field.onChange({
                                              target: {
                                                  value: parseInt(
                                                      event.target.value || 0,
                                                  ),
                                              },
                                          });
                                          if (customOnChange) {
                                              customOnChange(event);
                                          }
                                      },
                                  }
                                : {
                                      type,
                                      onChange: (event) => {
                                          field.onChange(event);
                                          if (customOnChange) {
                                              customOnChange(event);
                                          }
                                      },
                                  })}
                            {...(component === "textarea" ||
                            component === "multiline"
                                ? { as: "textarea" }
                                : {})}
                        />
                    )}

                    {note && (
                        <div
                            className="input-note"
                            title={typeof note === "string" ? note : ""}
                        >
                            {typeof note === "string" ? "ℹ" : note}
                        </div>
                    )}
                    {error?.message && (
                        <div className="error-message">{error.message}</div>
                    )}
                </div>
            )}
        />
    );
};
