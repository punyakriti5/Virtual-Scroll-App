module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Transpile JS and JSX files using babel-jest
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios)/)"  // Transpile axios with Babel
    ],
    moduleFileExtensions: ["js", "jsx"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  };