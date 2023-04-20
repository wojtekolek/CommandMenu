/** @type {import("prettier").Config} */
module.exports = {
  ...require("@wojtekolek/eslint-config/prettier.config"),
  plugins: [
    ...require("@wojtekolek/eslint-config/prettier.config").plugins,
    require("prettier-plugin-tailwindcss"),
  ],
};
