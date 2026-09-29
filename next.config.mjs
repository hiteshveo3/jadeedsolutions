/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/for/:path*",
        destination: "/industries/:path*",
        permanent: true,
      },
      // No case-study index yet; the portfolio lists them.
      {
        source: "/case-studies",
        destination: "/portfolio",
        permanent: false,
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
