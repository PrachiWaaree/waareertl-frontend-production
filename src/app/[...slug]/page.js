import { renderHTMLPage, getMetaData } from "@/lib";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const metadata = await getMetaData(slug);

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        "https://www.waareertl.com";

    const canonicalUrl =
        slug?.length === 1 && slug[0] === "root"
            ? `${baseUrl}/`
            : `${baseUrl}/${slug.join("/")}`;

    if (metadata.alternates) {
        metadata.alternates.canonical = canonicalUrl;
    } else {
        metadata.alternates = { canonical: canonicalUrl };
    }

    return metadata;
}

export default async function Page({ params, searchParams }) {
    const { slug } = await params;
    const resolvedSearchParams = await searchParams;
    const language =
        resolvedSearchParams?.lang === "ar" ? "ar" : "en";

    return renderHTMLPage(slug, language);
}

export const dynamic = "force-dynamic";
