import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    trailingSlash: true,
    reactStrictMode: false,
    output: "standalone",

    images: {
        domains: ["funko.com"],
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
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
