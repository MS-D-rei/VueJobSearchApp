import useCurrentPage from "@/composables/useCurrentPage";
import { useRoute } from "vue-router";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}));
const mockUseRoute = useRoute as jest.Mock;

describe("useCurrentPage", () => {
  describe("when query params include page", () => {
    it("returns page number that route indicates", () => {
      mockUseRoute.mockImplementationOnce(() => ({
        query: {
          page: "2",
        },
      }));
      const result = useCurrentPage();
      expect(result.value).toBe(2);
    });
  }),
    describe("when query params exclude page", () => {
      it("returns page number 1", () => {
        mockUseRoute.mockImplementationOnce(() => ({
          query: {
            page: undefined,
          },
        }));
        const result = useCurrentPage();
        expect(result.value).toBe(1);
      });
    });
});
