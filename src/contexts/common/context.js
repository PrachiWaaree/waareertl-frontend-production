"use client";

import { createContext, useContext } from "react";

export const commonContext = createContext();

export const useCommonContext = () => {
    const context = useContext(commonContext);

    if (!context) {
        throw new Error(
            "useCommonContext must be wrapped inside the CommonContextProvider"
        );
    }

    return context;
};
