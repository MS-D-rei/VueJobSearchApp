module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  // TypeScript ESLint Project
  //https://github.com/typescript-eslint/typescript-eslint
  // TypeScript ESLint Plugin
  // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
  rules: {
    // "@typescript-eslint/rule-name": "error"
  },
  overrides: [
    // For Jest
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
    },
    // For TypeScript to avoid annoying notification on JavaScript
    {
      files: [
        '*.ts', '*.tsx'
      ],
      extends: [
        'eslint:recommended', "plugin:@typescript-eslint/recommended", 'prettier'
      ],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
    }
  ],
}
