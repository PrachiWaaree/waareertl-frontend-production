"use client";

import { useEffect, useMemo, useState } from "react";
import { commonContext } from "./context";

export const CommonContextProvider = ({ children, ...other }) => {
    const getMatch = (query) =>
        typeof window !== "undefined"
            ? window.matchMedia(query).matches
            : false;

    const initial = useMemo(
        () => ({
            is480: getMatch("only screen and (max-width: 480px)"),
            is768: getMatch("only screen and (max-width: 769px)"),
            is992: getMatch(
                "only screen and (min-width: 769px) and (max-width: 992px)"
            ),
            is1199: getMatch("only screen and (max-width: 1199px)"),
            is1200: getMatch("only screen and (max-width: 1200px)"),
            isDesktop: getMatch("only screen and (min-width: 1201px)"),
        }),
        []
    );

    const [state, setState] = useState(initial);

    useEffect(() => {
        const queries = {
            is480: "only screen and (max-width: 480px)",
            is768: "only screen and (max-width: 769px)",
            is992: "only screen and (min-width: 769px) and (max-width: 992px)",
            is1199: "only screen and (max-width: 1199px)",
            is1200: "only screen and (max-width: 1200px)",
            isDesktop: "only screen and (min-width: 1201px)",
        };

        const mqls = Object.fromEntries(
            Object.entries(queries).map(([key, q]) => [
                key,
                window.matchMedia(q),
            ])
        );

        const update = () =>
            setState({
                is480: mqls.is480.matches,
                is768: mqls.is768.matches,
                is992: mqls.is992.matches,
                is1199: mqls.is1199.matches,
                is1200: mqls.is1200.matches,
                isDesktop: mqls.isDesktop.matches,
            });

        const handlers = Object.values(mqls).map((mql) => {
            const handler = () => update();
            mql.addEventListener("change", handler);
            return { mql, handler };
        });

        update();

        return () => {
            handlers.forEach(({ mql, handler }) =>
                mql.removeEventListener("change", handler)
            );
        };
    }, []);

    const contextValues = {
        ...other,
        ...state,
    };

    return (
        <commonContext.Provider value={contextValues}>
            {children}
        </commonContext.Provider>
    );
};
