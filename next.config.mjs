/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/for/:path*",
        destination: "/industries/:path*",
        permanent: true,
      },
      // Industry pages merged into the page they duplicated.
      {
        source: "/industries/seo-for-cleaning-companies",
        destination: "/industries/seo-for-cleaners",
        permanent: true,
      },
      {
        source: "/industries/google-ads-for-local-services",
        destination: "/services/digital-advertising",
        permanent: true,
      },
      {
        source: "/industries/websites-for-local-service-businesses",
        destination: "/services/web-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
