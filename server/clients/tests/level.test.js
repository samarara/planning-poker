const level = require("level");
const { createStore, writeToStore } = require("../level");
jest.createMockFromModule("level");
jest.mock("level");

describe("level client", () => {
  it("should create a repository", async () => {
    const db = await createStore("test");
    console.log(db);
    expect(db).not.toBe(undefined);
  });
});
