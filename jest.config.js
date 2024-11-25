module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: '<rootDir>/src/tests/jest.setup.ts',
  globalTeardown: '<rootDir>/src/tests/jest.teardown.ts',
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
