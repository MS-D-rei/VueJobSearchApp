import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
});
