import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],

  // Test matching patterns
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],

  // TypeScript transformation
  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  // Global setup files
  setupFilesAfterEnv: ["<rootDir>/src/tests/__setup__/globalMocks.ts"],

  // Module path mapping for easier imports
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/src/tests/$1",
  },

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/tests/**/*.ts",
    "!src/db/migrate.ts",
    "!src/db/seed.ts",
    "!src/index.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html", "clover"],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },

  // Test timeout and behavior
  testTimeout: 10000,
  clearMocks: true,
  restoreMocks: true,

  // Ignore patterns
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],

  // Parallel execution
  maxWorkers: "50%",
};

export default config;
