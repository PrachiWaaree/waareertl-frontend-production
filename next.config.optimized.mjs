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
    
    // Performance optimizations
    swcMinify: true,
    compiler: {
        // Remove console logs in production
        removeConsole: !isDev && {
            exclude: ['error', 'warn'],
        },
        // Emotion styled components optimization
        emotion: {
            sourceMap: isDev,
            autoLabel: 'dev-only',
            labelFormat: '[local]',
        },
    },
    
    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: IMAGE_HOSTNAME,
                pathname: "/**",
            },
        ],
        // Optimize image loading
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },
    
    // Code splitting and bundle optimization
    experimental: {
        // Optimize bundle splitting
        optimizeCss: true,
        // Server components optimization
        serverComponentsExternalPackages: [],
        // Turbopack optimizations
        turbo: {
            rules: {
                // Split large dependencies
                '*.css': {
                    raw: true,
                },
            },
        },
    },
    
    // Webpack optimizations
    webpack: (config, { dev, isServer }) => {
        // Optimize chunk splitting
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 20000,
                maxSize: 70000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    framework: {
                        chunks: 'all',
                        name: 'framework',
                        test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
                        priority: 40,
                        enforce: true,
                    },
                    lib: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            return `lib.${packageName.replace('@', '')}`;
                        },
                        priority: 30,
                        minChunks: 1,
                        reuseExistingChunk: true,
                    },
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        priority: 20,
                    },
                    shared: {
                        name: 'shared',
                        minChunks: 2,
                        priority: 10,
                        reuseExistingChunk: true,
                    },
                },
            };
        }
        
        // Optimize module resolution
        config.resolve.alias = {
            ...config.resolve.alias,
            // Add any custom aliases for better tree shaking
        };
        
        return config;
    },
    
    // Redirects
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
                source: "/invertor/on-grid-invertors",
                destination: "/blogs",
                permanent: true,
            },
        ];
    },
    
    // Security headers
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
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/:all*(png|jpg|jpeg|webp|avif|gif|ico|svg|txt)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/:all*(woff|woff2|ttf|otf)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/_next/image(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    
    // Compression
    compress: true,
    
    // Static optimization
    staticPageGenerationTimeout: 60,
    
    // ISR optimization
    experimental: {
        isrMemoryCacheSize: 50 * 1024 * 1024, // 50MB
    },
};

export default nextConfig;