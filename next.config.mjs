/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.0.108"],
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig
