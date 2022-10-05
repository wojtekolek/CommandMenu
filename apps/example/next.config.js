// eslint-disable-next-line import/no-extraneous-dependencies
const withTM = require('next-transpile-modules')(['cmdmenu'])

module.exports = withTM({
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
    browsersListForSwc: true,
    images: { allowFutureImage: true }
  }
})
