import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
    },
    // Automatisk redirect fra www til ikke-www (eller vice versa)
    async redirects() {
        return [
            {
                source: "/:path*",
                has: [{ type: "host", value: "www.valori.no" }],
                destination: "https://valori.no/:path*",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
