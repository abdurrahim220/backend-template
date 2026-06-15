import { add, subtract } from "../../src/app";

describe("add", () => {
  test("should add two numbers", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
});

describe("UserService", () => {
  test("it should add two numbers", () => {
    const result = add(1, 1);
    expect(result).toBe(2);
  });
  test("it should subtract two numbers", () => {
    const result = subtract(5, 3);
    expect(result).toBe(2);
  });
});
