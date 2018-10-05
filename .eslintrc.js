module.exports = {
  env: {
    es6: true,
    node: true
  },
  plugins: ['node'],
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'log']
      }
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral > ConditionalExpression']
      }
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
