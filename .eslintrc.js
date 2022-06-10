module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
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
  rules: {
    // "indent": ["error", 2]
  }
}
