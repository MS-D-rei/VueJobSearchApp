module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    "plugin:@typescript-eslint/recommended",
    'prettier',
  ],
  // TypeScript ESLint Project
  //https://github.com/typescript-eslint/typescript-eslint
  // TypeScript ESLint Plugin
  // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // "@typescript-eslint/rule-name": "error"
  },
  overrides: [
    {
      files: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)",
        // "test/**",
      ],
      env: {
        "jest/globals": true,
      },
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"]
    }
  ],
}
