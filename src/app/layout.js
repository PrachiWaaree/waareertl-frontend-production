import "swiper/css";
import "swiper/css/grid";
import "swiper/css/bundle";
import "react-datepicker/dist/react-datepicker.css";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import "@/styles/common/custom-style.css";
import "@/styles/home-page.css";
import "@/styles/event-listing.css";
import "@/styles/leadership-page.css";
import "@/styles/about-page.css";
import "@/styles/awards-page.css";
import "@/styles/our-office.css";
import "@/styles/case-studies-page.css";
import "@/styles/waree-energy-page.css";
import "@/styles/product-listing-page.css";
import "@/styles/waree-foundation-page.css";
import "@/styles/epc-solution.css";
import "@/styles/blog-listing.css";
import "@/styles/blog-detail.css";
import "@/styles/media.css";
import "@/styles/download-centre.css";
import "@/styles/enquiry-page.css";
import "@/styles/solar-calculator.css";
import "@/styles/case-study-detail-page.css";
import "@/styles/investor-relations.css";
import "@/styles/esg.css";
import "@/styles/csr.css";
import "@/styles/life-waaree-page.css";
import "@/styles/partner-page.css";
import "@/styles/product-detail.css";
import "@/styles/career-page.css";
import "@/styles/slider.css";
import "@/styles/our-client.css";
import "@/styles/why-rtl.css";
import "@/styles/our-project.css";
import "@/styles/grievance.css";
import "@/styles/solution-details.css";
import "@/styles/hide-show.css";
import "@/styles/video-proceedings.css";
import { primaryFont } from "@/theme";
import { getMetaData, getMetaDetailsAPI } from "@/lib";
import { HTMLScriptInjector } from "@/components";

export async function generateMetadata() {
    const meta = await getMetaData(["root"]);
    return {
        ...meta,
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function RootLayout({ children }) {
    const response = await getMetaDetailsAPI(["root"]);

    const {
        global_header_script,
        page_header_script,
        global_body_script,
        global_footer_script,
        page_footer_script,
    } = response?.data || {};

    return (
        <html lang="en" suppressHydrationWarning>
            <head />

            <body
                suppressHydrationWarning
                className={`${primaryFont.className} antialiased`}
            >
                <HTMLScriptInjector
                    html={global_header_script}
                    strategy="afterInteractive"
                    idPrefix="root-ghs"
                />
                <HTMLScriptInjector
                    html={page_header_script}
                    strategy="afterInteractive"
                    idPrefix="root-phs"
                />
                <HTMLScriptInjector
                    html={global_body_script}
                    strategy="afterInteractive"
                    idPrefix="root-gbs"
                />
                {children}

                <HTMLScriptInjector
                    html={global_footer_script}
                    strategy="afterInteractive"
                    idPrefix="root-gfs"
                />
                <HTMLScriptInjector
                    html={page_footer_script}
                    strategy="afterInteractive"
                    idPrefix="root-pfs"
                />
            </body>
        </html>
    );
}

