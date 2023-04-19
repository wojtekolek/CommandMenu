/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["../../.eslintrc.cjs", "@wojtekolek/eslint-config/react"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
  },
};
