/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pics.avs.io",
      },
      {
        protocol: "https",
        hostname: "logoapi.travelpayouts.com",
      },
    ],
  },
};

export default nextConfig;
