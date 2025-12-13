import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    trailingSlash: true,
    reactStrictMode: false,
    output: "standalone",

    images: {
        domains: ["funko.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "static-cdn.jtvnw.net",
                port: "",
                pathname: "/**",
            },
        ],
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: [
                {
                    loader: require.resolve("@svgr/webpack"),
                    options: { typescript: true },
                },
            ],
        });

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@": path.resolve(__dirname, "src"),
        };

        return config;
    },

    async rewrites() {
        return [
            {
                source: "/uploads/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_URL}/uploads/:path*`,
            },
        ];
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
