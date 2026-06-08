"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

export const usePagintation = ({ data = {} }) => {
    const [pagination, setPagintaion] = useState(data);

    const { current_page, filters, total_pages, total_items } =
        pagination || {};

    const { limit, template_id, url } = filters || {};

    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);

    const init = () => {
        setHasNext(
            parseInt(current_page) < parseInt(total_pages) ? true : false
        );

        setHasPrev(parseInt(current_page) > 1 ? true : false);
    };

    const onUpdatePagintaion = (updatedPagintaion) => {
        if (!isEmpty(updatedPagintaion)) {
            setPagintaion(updatedPagintaion);
        }
    };

    useEffect(() => {
        onUpdatePagintaion(data);
    }, [data]);

    useEffect(() => {
        init();
    }, [pagination]);

    const returnValues = {
        current_page: parseInt(current_page),
        total_pages: parseInt(total_pages),
        total_items: parseInt(total_items),
        limit: parseInt(limit),
        template_id: parseInt(template_id),
        url,
        hasNext,
        hasPrev,
        onUpdatePagintaion,
    };

    return returnValues;
};
