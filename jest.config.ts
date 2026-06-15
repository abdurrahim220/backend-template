const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },

  // Enable coverage collection
  collectCoverage: true,

  // Which files to include in coverage
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/index.ts"],

  // Where to save the coverage report
  coverageDirectory: "coverage",

  // Coverage report formats
  coverageReporters: ["text", "lcov", "html"],
};
