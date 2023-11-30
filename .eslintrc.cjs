module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'linebreak-style': 0,
    'no-unused-vars': ['warn'],
    'import/prefer-default-export': 'off',
    'react/function-component-definition': [2, {
      'namedComponents': 'arrow-function',
      'unnamedComponents': 'arrow-function',
    }],
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off'
  },
  parserOptions: {
    'project': ['./tsconfig.json', 'tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect'
    },
  },
}
