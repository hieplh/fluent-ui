module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@emotion',
    'react',
    '@typescript-eslint',
    'graphql',
    'react-hooks',
    'no-only-tests',
  ],
  'settings': {
    'react': {
      'version': 'latest',
    },
  },
  'ignorePatterns': ['@types'],
  'rules': {
    'no-only-tests/no-only-tests': 'error',
    'indent': ['error', 2, {
      'SwitchCase': 1,
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true, 'avoidEscape': true }],
    'semi': ['error', 'always'],
    'key-spacing': 'error',
    'arrow-spacing': 'error',
    'comma-spacing': 'error',
    'func-call-spacing': 'error',
    'keyword-spacing': 'error',
    'no-fallthrough': 'error',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        'extendDefaults': true,
        'types': {
          '{}': false,
        },
      },
    ],
  },
};
