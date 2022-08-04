import { useRoute } from "vue-router";
import useConfirmRoute from "@/composables/useConfirmRoute"

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
}));

describe("useConfirmRoute", () => {
  it("return true if the specific route name matches with current route name", () => {
    useRoute.mockImplementationOnce(() => ({
      name: "Home",
    }))
    const specificRouteName = "Home";
    const result = useConfirmRoute(specificRouteName);
    expect(result.value).toBe(true);
  })
})