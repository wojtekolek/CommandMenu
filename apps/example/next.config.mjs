/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  compiler: {
    reactRemoveProperties: true,
  },
  experimental: {
    legacyBrowsers: false,
    appDir: true,
  },
};

// eslint-disable-next-line import/no-default-export
export default nextConfig;
