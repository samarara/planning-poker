const level = jest.createMockFromModule("level");
// const levelMock = jest.fn()
// jest.mock("level")
// console.log(level('sd'))
jest.mock("level", () => {
  return jest.fn().mockImplementation(() => {})
})
console.log("in mock");
module.exports = level;
