const path = require("path");

module.exports = {
  displayName: "@planning-poker/client",
  rootDir: path.resolve(__dirname, "../"),
  roots: ["<rootDir>/client/src/"],
  setupFilesAfterEnv: ["<rootDir>/client/src/setupTests.js"],
  transform: {
    ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "<rootDir>/node_modules/jest-transform-stub",
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  }
};
