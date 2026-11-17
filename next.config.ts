import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb"
        }
    },
    turbopack: {
        root: ".",
    },
};

export default nextConfig;
