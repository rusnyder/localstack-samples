module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "es6",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-async-promise-executor": "off",
    // TODO[RWS]: Consider this or another import tool
    // "sort-imports": "warn",
  },
  ignorePatterns: [
    "**/.git",
    "**/.idea",
    "**/.next",
    "**/.turbo",
    "**/.vscode",
    "**/README.md",
    "**/bin",
    "**/build",
    "**/dist",
    "**/graphql.ts",
    "**/node_modules",
    "**/public/styles",
    "**/travis",
    "integration-testing/**",
    "package.json",
    "yarn.lock",
  ],
};
