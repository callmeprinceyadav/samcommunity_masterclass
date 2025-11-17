/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Image optimization for Netlify
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
}

export default nextConfig


