import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',

  setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],

  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(ts|mjs|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },

  moduleFileExtensions: ['ts', 'html', 'js', 'json'],

  testMatch: ['**/+(*.)+(spec).+(ts)'],
};

export default config;