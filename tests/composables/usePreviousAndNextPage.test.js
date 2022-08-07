import usePreviousAndNextPage from "@/composables/usePreviousAndNextPage";
// import { ref } from 'vue';

describe("usePreviousAndNextPage", () => {
  describe("previousPage", () => {
    it("when greater than or equal to firstPageNumber, returns ref of the page number", () => {
      const currentPageNumber = 2;
      const maxPageNumber = 10;
      const { previousPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);
      expect(previousPage.value).toBe(1);
    })
    it("when less than firstPageNumber, returns undefined", () => {
      const currentPageNumber = 1;
      const maxPageNumber = 10;
      const { previousPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);
      expect(previousPage.value).toBe(undefined);
    })
  })
  describe("nextPage", () => {
    it("when less than or equal to maxPageNumber, returns ref of the page number", () => {
      const currentPageNumber = 9;
      const maxPageNumber = 10;
      const { nextPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);
      expect(nextPage.value).toBe(10);
    })
    it("when greater than maxPageNumber, returns undefined", () => {
      const currentPageNumber = 10;
      const maxPageNumber = 10;
      const { nextPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);
      expect(nextPage.value).toBe(undefined);
    })
  })
})