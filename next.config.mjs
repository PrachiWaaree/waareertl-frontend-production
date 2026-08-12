/** @type {import('next').NextConfig} */

const SITE_URL = process.env.SITE_URL || "";
const NEXT_PUBLIC_SITE_URL_CSP = process.env.NEXT_PUBLIC_SITE_URL_CSP || "";
const NEXT_PUBLIC_API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://devrtlapi.waaree.com";
const isDev = process.env.NODE_ENV !== "production";
const DEV_EVAL = isDev ? "'unsafe-eval'" : "";
const IMAGE_HOSTNAME =
    process.env.NEXT_PUBLIC_IMAGE_HOSTNAME_1 || "api.waaree.com";

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: `
            default-src 'self';

            script-src 'self'
              https://www.google-analytics.com
              https://www.clarity.ms
              https://scripts.clarity.ms
              https://*.youtube.com
              https://www.youtube.com
              https://s.ytimg.com
              https://www.google.com
              https://*.gstatic.com
              https://maps.googleapis.com
              https://maps.gstatic.com
              https://www.googletagmanager.com
              https://s3.tradingview.com
              https://www.tradingview.com
              https://*.tradingview.com
              https://www.tradingview-widget.com
              ${DEV_EVAL}
              ${NEXT_PUBLIC_SITE_URL_CSP};


            script-src-elem 'self' 'unsafe-inline' 'unsafe-eval'
                https://www.google-analytics.com
                https://www.clarity.ms
                https://scripts.clarity.ms
                https://*.youtube.com
                https://www.youtube.com
                https://s.ytimg.com
                https://www.google.com
                https://*.gstatic.com
                https://maps.googleapis.com
                https://maps.gstatic.com
                https://www.googletagmanager.com
                https://www.google-analytics.com
                https://s3.tradingview.com
                https://www.tradingview.com
                https://*.tradingview.com
                https://www.tradingview-widget.com
                ${NEXT_PUBLIC_SITE_URL_CSP};

            script-src-attr 'none';

            style-src 'self' 'unsafe-inline'
                https://*.youtube.com
                https://www.youtube.com
                https://fonts.googleapis.com
                https://*.tradingview.com
                ${NEXT_PUBLIC_SITE_URL_CSP};

            img-src 'self' data: https: http:
                https://maps.gstatic.com
                https://maps.googleapis.com
                ${NEXT_PUBLIC_SITE_URL_CSP};

            font-src 'self' data: https://fonts.gstatic.com ${NEXT_PUBLIC_SITE_URL_CSP};

            frame-src
                https://*.youtube.com
                https://youtu.be
                https://www.youtube.com
                https://www.youtube-nocookie.com
                https://player.vimeo.com
                https://www.google.com
                https://www.tradingview.com
                https://s3.tradingview.com
                https://*.tradingview.com
                https://www.tradingview-widget.com
                ${NEXT_PUBLIC_SITE_URL_CSP};

            connect-src 'self'
                https://*.youtube.com
                https://www.youtube.com
                https://*.googlevideo.com
                ${SITE_URL}
                ${NEXT_PUBLIC_API_URL}
                ${NEXT_PUBLIC_SITE_URL_CSP}
                https://maps.googleapis.com
                https://www.google-analytics.com
                https://www.googletagmanager.com
                https://analytics.google.com
                https://*.analytics.google.com
                https://stats.g.doubleclick.net
                https://*.doubleclick.net
                https://*.clarity.ms
                https://n.clarity.ms
                https://c.bing.com
                https://www.tradingview.com
                https://*.tradingview.com
                https://www.tradingview-widget.com
                ${NEXT_PUBLIC_SITE_URL_CSP};

            media-src 'self'
                https://*.youtube.com
                https://www.youtube.com
                https://*.googlevideo.com
                ${SITE_URL}
                ${NEXT_PUBLIC_SITE_URL_CSP}
                blob: data:
                ${NEXT_PUBLIC_SITE_URL_CSP};

            worker-src 'self' blob:;
            child-src 'self' blob:
                https://*.youtube.com
                https://www.youtube.com
                ${NEXT_PUBLIC_SITE_URL_CSP};

            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
        `.replace(/\s+/g, " "),
    },

    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    ...(!isDev
        ? [
              {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
              },
          ]
        : []),
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,

    images: {
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: "https",
                hostname: IMAGE_HOSTNAME,
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "api.waareertl.com",
                pathname: "/**",
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: "/upload/:path*",
                destination: "https://api.waareertl.com/upload/:path*",
            },
            {
                source: "/api/:path*",
                destination: "https://api.waareertl.com/api/:path*",
            },
        ];
    },

    async redirects() {
        return [
            {
                source: "/investor",
                destination: "/investors/corporate-announcements",
                permanent: true,
            },
            {
                source: "/investor/:path*",
                destination: "/investors/:path*",
                permanent: true,
            },
            {
                source: "/investor-relations",
                destination: "/investors/corporate-announcements",
                permanent: true,
            },
            {
                source: "/investor-relations/:path*",
                destination: "/investors/:path*",
                permanent: true,
            },
            {
                source: "/investors",
                destination: "/investors/corporate-announcements",
                permanent: true,
            },
            {
                source: "/blog",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/contact-us",
                destination: "/enquiry",
                permanent: true,
            },
            {
                source: "/root",
                destination: "/",
                permanent: true,
            },
            {
                source: "/epc",
                destination: "/",
                permanent: true,
            },
            {
                source: "/whitepapers",
                destination: "/whitepaper/heterojunction-technology-the-technological-way-ahead-for-solar-pv",
                permanent: true,
            },
            {
                source: "/waaree-ces-green-hydrogen",
                destination: "/net-zero-solutions/green-hydrogen",
                permanent: true,
            },
            {
                source: "/product/pv-modules",
                destination: "/",
                permanent: true,
            },
            {
                source: "/form_test",
                destination: "/",
                permanent: true,
            },
            {
                source: "/energy-storage",
                destination: "/net-zero-solutions/energy-storage",
                permanent: true,
            },
            {
                source: "/residential",
                destination: "/energy-generation/commercial-and-industrial-roof-top",
                permanent: true,
            },
            {
                source: "/rooftop-business",
                destination: "/energy-generation/commercial-and-industrial-roof-top",
                permanent: true,
            },
            {
                source: "/waaree-expert",
                destination: "/",
                permanent: true,
            },
            {
                source: "/test-about-us",
                destination: "/",
                permanent: true,
            },
            {
                source: "/test-enquiry-form",
                destination: "/",
                permanent: true,
            },
            {
                source: "/test-franchise-partner-form",
                destination: "/",
                permanent: true,
            },
            {
                source: "/test-general-enquiry-form",
                destination: "/",
                permanent: true,
            },
            {
                source: "/solution/energy-storage1",
                destination: "/net-zero-solutions/energy-storage",
                permanent: true,
            },
            {
                source: "/solution/green-hydrogen",
                destination: "/net-zero-solutions/green-hydrogen",
                permanent: true,
            },
            {
                source: "/solution/energy-storage",
                destination: "/net-zero-solutions/energy-storage",
                permanent: true,
            },
            {
                source: "/solution/housing-societies",
                destination: "/",
                permanent: true,
            },
            {
                source: "/solution/-independent-houses-bunglows",
                destination: "/",
                permanent: true,
            },
            {
                source: "/waaree-prime",
                destination: "/",
                permanent: true,
            },
            {
                source: "/search",
                destination: "/",
                permanent: true,
            },
            {
                source: "/investors/terms-and-conditions",
                destination: "/terms-and-conditions",
                permanent: true,
            },
            {
                source: "/investors/sub-demo",
                destination: "/",
                permanent: true,
            },
            {
                source: "/investors/disclosure-details-test",
                destination: "/investors/disclosure-under-regulation",
                permanent: true,
            },
            {
                source: "/three-phase-on-grid-inverter",
                destination: "/",
                permanent: true,
            },
            {
                source: "/three-phase-solar-on-grid-inverters",
                destination: "/",
                permanent: true,
            },
            {
                source: "/single-phase-on-grid-inverter",
                destination: "/",
                permanent: true,
            },
            {
                source: "/three-phase-on-grid-inverter-1",
                destination: "/",
                permanent: true,
            },
            {
                source: "/three-phase-on-grid-inverter-2",
                destination: "/",
                permanent: true,
            },
            {
                source: "/small-module",
                destination: "/energy-generation/utility",
                permanent: true,
            },
            {
                source: "/customised-modules",
                destination: "/energy-generation/utility",
                permanent: true,
            },
            {
                source: "/waaree-residential-ess",
                destination: "/energy-generation/utility",
                permanent: true,
            },
            {
                source: "/waarees-commercial-&-industrial-energy-storage-system",
                destination: "/net-zero-solutions/energy-storage",
                permanent: true,
            },
            {
                source: "/waaree-3_2-kw-on-grid-single-phase-bifacial-topcon-dcr-radiance-solar-system",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/pv-modules/flexible",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/residential/housing-societies",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/residential/independent-house-bunglow",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/pv-modules/n-type-topcon",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/pv-modules/special-modules",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/invertor/on-grid-inverters",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/invertor/on-grid-invertors",
                destination: "/blogs",
                permanent: true,
            },
            {
                source: "/ground-mounted-solar",
                destination: "/energy-generation/utility",
                permanent: true,
            },
            {
                source: "/rooftop-solar",
                destination: "/energy-generation/commercial-and-industrial-roof-top",
                permanent: true,
            },
            {
                source: "/operations-maintenance",
                destination: "/energy-generation/asset-management",
                permanent: true,
            },
            {
                source: "/our-projects",
                destination: "/our-project",
                permanent: true,
            },
            {
                source: "/floating-solar",
                destination: "/energy-generation/floating-solar",
                permanent: true,
            },
            {
                source: "/green-hydrogen-as-the-future-of-solar-powered-energy-storage",
                destination: "/blog/green-hydrogen-as-the-future-of-solar-powered-energy-storage",
                permanent: true,
            },
        ];
    },

    async headers() {
        return [
            {
                source: "/((?!_next|static|favicon.ico|waaree_logo.webp|llms-content.txt).*)",
                headers: securityHeaders,
            },
            {
                source: "/_next/static/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, stale-while-revalidate=86400, immutable",
                    },
                ],
            },
            {
                source: "/:all*(png|jpg|jpeg|webp|avif|gif|ico|svg|mp4|webm|txt)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, stale-while-revalidate=86400, immutable",
                    },
                ],
            },
            {
                source: "/:all*(woff|woff2|ttf|otf)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, stale-while-revalidate=86400, immutable",
                    },
                ],
            },
            {
                source: "/_next/image(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, stale-while-revalidate=86400, immutable",
                    },
                ],
            },
            {
                source: "/upload/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, stale-while-revalidate=86400, immutable",
                    },
                ],
            },
            {
                source: "/upload/media/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, stale-while-revalidate=86400, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
