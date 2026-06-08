//
import { getMetaData, getMetaDetailsAPI } from "@/lib";
import { parseCmsScriptsSafely } from "@/lib/script-sanitizer";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    return getMetaData(slug);
}

export default async function Layout({ children, params }) {
    const { slug } = await params;

    const response = await getMetaDetailsAPI(slug);

    const {
        global_header_script,
        page_header_script,
        global_body_script,
        global_footer_script,
        page_footer_script,
    } = response?.data || {};

    return (
        <>
            {!!global_header_script &&
                parseCmsScriptsSafely(global_header_script)}
            {!!page_header_script && parseCmsScriptsSafely(page_header_script)}
            {!!global_body_script && parseCmsScriptsSafely(global_body_script)}
            {children}
            {!!global_footer_script &&
                parseCmsScriptsSafely(global_footer_script)}
            {!!page_footer_script && parseCmsScriptsSafely(page_footer_script)}
        </>
    );
}
