import { evenOrOdd } from "@/playground";

describe("basic math", () => {
  it("adds two numbers", () => {
    expect(1 + 1).toBe(2);
  });
  it("subtract 2 numbers", () => {
    expect(5 - 3).toBe(2);
  });
  describe("even or odd", () => {
    describe("when the number is even", () => {
      it("indicates the number is even", () => {
        expect(evenOrOdd(4)).toBe("Even");
      });
    });
    describe("when the number is odd", () => {
      it("indicates the number is odd", () => {
        expect(evenOrOdd(5)).toBe("Odd");
      });
    });
  });
});
