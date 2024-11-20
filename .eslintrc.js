module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  globals: {
    google: 'readonly'  // google 객체를 전역 변수로 정의
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
