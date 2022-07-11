/**
 * @jest-environment jsdom
 */

import { setActivePinia, createPinia } from 'pinia';
import { useLoginStore } from "@/store/store";

describe("User login state", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("keeps track of whether user is logged in", () => {
    const initialLoginStore = useLoginStore();
    expect(initialLoginStore.isLoggedIn).toBe(false);
  }),
  it("loginUser changes user login state", () => {
    const initialLoginStore = useLoginStore();
    initialLoginStore.loginUser();
    expect(initialLoginStore.isLoggedIn).toBe(true);
  })
})