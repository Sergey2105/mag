import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    trailingSlash: true,
    reactStrictMode: false,
    output: "standalone",

    images: {
        domains: ["funko.com", "github.com", "avatars.yandex.net"],
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
                source: "/auth/google",
                destination: "http://localhost:5000/auth/google",
            },
            {
                source: "/auth/github",
                destination: "http://localhost:5000/auth/github",
            },
            {
                source: "/uploads/:path*",
                destination: "http://localhost:5000/uploads/:path*",
            },
        ];
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
