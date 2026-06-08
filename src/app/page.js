import { renderHTMLPage, getMetaData } from "@/lib";

export async function generateMetadata() {
    const metadata = await getMetaData(["root"]);

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        "https://www.waareertl.com";

    if (metadata.alternates) {
        metadata.alternates.canonical = `${baseUrl}/`;
    } else {
        metadata.alternates = {
            canonical: `${baseUrl}/`,
        };
    }

    return metadata;
}

export default async function Home() {
    return await renderHTMLPage(["root"]);
}

export const dynamic = "force-dynamic";
