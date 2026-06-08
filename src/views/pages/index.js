"use client";
/* eslint-disable no-unused-vars */

import { Fragment } from "react";
//
import { ALL_SECTIONS, PageNotFound } from "@/components";
//
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const PagesSectionsView = ({ sectionsData, slug }) => {
    if (sectionsData?.length === 0) {
        return <PageNotFound />;
    }

    return (
        <>
            {sectionsData?.map((item, index) => {
                const componentExists = !!ALL_SECTIONS[item?.component];

                if (componentExists) {
                    return (
                        <Fragment key={index}>
                            {ALL_SECTIONS[item?.component](
                                item?.data,
                                item?.component,
                            )}
                        </Fragment>
                    );
                }
            })}
        </>
    );
};

export * from "./home";
export * from "./clients";
export * from "./why_rtl";
export * from "./about";
export * from "./event";
export * from "./awards";
export * from "./products";
export * from "./product-detail";
export * from "./leadership";
export * from "./foundation";
export * from "./our-office";
export * from "./Solution_epc";
export * from "./blog-listing";
export * from "./case-studies";
export * from "./waaree-energies";
export * from "./download-center";
export * from "./whitepaper";
export * from "./media";
export * from "./csr";
export * from "./blog-detail";
export * from "./whitepaper-detail";
export * from "./enquiry";
export * from "./solar-calculator";
export * from "./partners";
export * from "./investor_relations";
export * from "./case-studies-detail";
export * from "./esg";
export * from "./life-at-waaree";
export * from "./careers";
export * from "./waaree_prime";
export * from "./our_project";
export * from "./grievance";
export * from "./solution-detail";
export * from "./search";
export * from "./privacy_policy";
export * from "./shareholders";
export * from "./investor_discloser";
