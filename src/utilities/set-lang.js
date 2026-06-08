"use server";

import { cookies } from "next/headers";

export const setCookie = async (key = "", lang = "en") => {
    (await cookies()).set(key, lang);
};

export const getCookie = async (key = "") => {
    return (await cookies()).get(key);
};
