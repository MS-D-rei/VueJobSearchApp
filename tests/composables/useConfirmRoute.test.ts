import { useRoute } from "vue-router";
import useConfirmRoute from "@/composables/useConfirmRoute"

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
}));

const mockUseRoute = useRoute as jest.Mock;

describe("useConfirmRoute", () => {
  it("return true if the specific route name matches with current route name", () => {
    mockUseRoute.mockImplementationOnce(() => ({
      name: "Home",
    }))
    const specificRouteName = "Home";
    const result = useConfirmRoute(specificRouteName);
    expect(result.value).toBe(true);
  })
})