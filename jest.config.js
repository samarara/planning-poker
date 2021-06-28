module.exports = {
  projects: [
    "<rootDir>/client/jest.config.js",
    "<rootDir>/server/jest.config.js"
  ],
  // projects: [
  //   {
  //     displayName: "@planning-poker/server",
  //     testMatch: ["<rootDir>/server/**/*.test.js"]
  //   },
  //   {
  //     displayName: "@planning-poker/client",
  //     testMatch: ["<rootDir>/client/**/*.test.js"]
  //   }
  // ],
  coverageDirectory: "<rootDir>/coverage"
}