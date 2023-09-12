/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://musicvillains.run.goorm.io/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

const path = require("path");
module.exports = nextConfig;

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
