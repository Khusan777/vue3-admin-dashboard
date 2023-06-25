module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['./dist', 'git', 'README.md'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: false
      }
    ],
    'no-restricted-syntax': [
      'error',
      'FunctionExpression',
      'WithStatement',
      "BinaryExpression[operator='in']"
    ],
    'vue/no-restricted-block': ['error', 'style', 'foo', 'bar', 'input'],
    'vue/no-restricted-html-elements': ['error', 'button', 'marquee', 'input'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'linebreak-style': 0
  }
}
