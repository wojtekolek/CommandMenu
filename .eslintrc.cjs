/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@wojtekolek/eslint-config"],
  settings: {
    "import/resolver": {
      typescript: {
        project: ["apps/*/tsconfig.json", "packages/*/tsconfig.json"],
      },
      node: {
        project: ["apps/*/tsconfig.json", "packages/*/tsconfig.json"],
      },
    },
  },
};
