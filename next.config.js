/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "insider.chenyifaer.com",
      "visitor-badge.laobi.icu",
      "vercel.com",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@tremor/react"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/kjxbyz/cyf-insider",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
