module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true
  }
}
