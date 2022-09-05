module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    // For avoiding notification, "NodeJS is not undefined"
    NodeJS: true,
  },
  // eslint-plugin-vue Guide
  // https://eslint.vuejs.org/user-guide/#installation
  // => check the topic, "How to use a custom parser?"
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue'],
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
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
        // "test/**",
      ],
      env: {
        'jest/globals': true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
    // For TypeScript to avoid annoying notification on JavaScript
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint'],
    },
  ],
};
