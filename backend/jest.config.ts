import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/dist/'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/database/models/**/*.ts',
    '!src/config/**/*.ts',
    '!src/controllers/index.ts',
  ],
};

export default config;
