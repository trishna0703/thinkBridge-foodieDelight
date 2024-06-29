/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/explore",
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
