module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts', '!**/*.e2e.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};