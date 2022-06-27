import nextElementInList from "@/utils/nextElementInList.js";

describe("nextElementInList", () => {
  it("locates element in list and return the next element", () => {
    const list = ["A", "B", "C", "D", "E"];
    const item = "C";
    const result = nextElementInList(list, item);
    expect(result).toBe("D");
  });
  describe("when element is at the end of the list", () => {
    it("locates next element at the first of the list", () => {
      const list = ["A", "B", "C", "D", "E"];
      const item = "E";
      const result = nextElementInList(list, item);
      expect(result).toBe("A");
    });
  });
});
