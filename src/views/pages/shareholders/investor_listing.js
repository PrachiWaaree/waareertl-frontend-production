"use client";
/* eslint-disable no-unused-vars */

import { ShareHolderRelationDataPage } from "./investor_data";

export const InvestorPageListing = ({ data = {}, slug = "investor_data" }) => {
    const shareholderList = data["shareholder-list"] || [];

    return (
        <>
            {shareholderList?.map((item, idx) => (
                <ShareHolderRelationDataPage key={idx} data={item} />
            ))}
        </>
    );
};
