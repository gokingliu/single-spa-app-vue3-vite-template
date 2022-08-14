module.exports = {
  root: true,
  env: { node: true },
  parser: 'vue-eslint-parser',
  extends: [
    'prettier',
    'plugin:vue/vue3-essential',
    '@tencent/eslint-config-tencent',
    '@tencent/eslint-config-tencent/prettier',
    '@vue/typescript/recommended',
  ],
  plugins: ['vue'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    'chalk/chalk': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
