// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // Image optimization for Netlify
//   images: {
//     unoptimized: false,
//     remotePatterns: [],
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/uc",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/uc*",
      },
    ],
  },
};

export default nextConfig;
