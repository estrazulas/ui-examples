import baseConfig from '../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js', '**/*.cy.ts'],
    rules: {},
  },
];
