import { computed, unref } from "vue";

const usePreviousAndNextPage = (currentPageNumber: number, maxPageNumber: number) => {
  const previousPage = computed(() => {
    const previousPageNumber = unref(currentPageNumber) - 1;
    const firstPageNumber = 1;
    return previousPageNumber >= firstPageNumber
      ? previousPageNumber
      : undefined;
  });
  const nextPage = computed(() => {
    const nextPageNumber = unref(currentPageNumber) + 1;
    return nextPageNumber <= unref(maxPageNumber) ? nextPageNumber : undefined;
  });
  return { previousPage, nextPage };
};

export default usePreviousAndNextPage;
