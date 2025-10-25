// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
};
export default nextConfig;
