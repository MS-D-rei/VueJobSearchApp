import usePreviousAndNextPage from "@/composables/usePreviousAndNextPage";
import { ComputedRef } from "vue";
// import { ref } from 'vue';

describe("usePreviousAndNextPage", () => {
  describe("previousPage", () => {
    it("when greater than or equal to firstPageNumber, returns ref of the page number", () => {
      const currentPageNumber = 2 as unknown as ComputedRef;
      const maxPageNumber = 10 as unknown as ComputedRef;
      const { previousPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);
      expect(previousPage.value).toBe(1);
    })
    it("when less than firstPageNumber, returns undefined", () => {
      const currentPageNumber = 1 as unknown as ComputedRef;
      const maxPageNumber = 10 as unknown as ComputedRef;
      const { previousPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);
      expect(previousPage.value).toBe(undefined);
    })
  })
  describe("nextPage", () => {
    it("when less than or equal to maxPageNumber, returns ref of the page number", () => {
      const currentPageNumber = 9 as unknown as ComputedRef;
      const maxPageNumber = 10 as unknown as ComputedRef;
      const { nextPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);
      expect(nextPage.value).toBe(10);
    })
    it("when greater than maxPageNumber, returns undefined", () => {
      const currentPageNumber = 10 as unknown as ComputedRef;
      const maxPageNumber = 10 as unknown as ComputedRef;
      const { nextPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);
      expect(nextPage.value).toBe(undefined);
    })
  })
})