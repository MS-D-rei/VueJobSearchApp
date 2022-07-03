<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link
          :to="{ name: 'Home' }"
          :href="url"
          class="flex items-center h-full text-xl"
          >Anonymous Careers</router-link
        >
        <nav class="flex ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <router-link
                :to="menuItem.url"
                class="flex items-center h-full py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <ProfileImage v-if="isLoggedIn" data-test="profile-image" />
          <ActionButton
            v-else
            text="Sign in"
            type="sign-in"
            data-test="login-button"
            @click="loginUser"
          />
        </div>
      </div>
      <SubNav v-if="isLoggedIn" data-test="subnav" />
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";
const url = "https://careers.google.com/";
const menuItems = [
  { text: "Teams", url: "/" },
  { text: "Locations", url: "/" },
  { text: "Life at Anonymous Careers", url: "/" },
  { text: "How we hire", url: "/" },
  { text: "Students", url: "/" },
  { text: "Jobs", url: "/jobs/results" },
];
const isLoggedIn = ref(false);
function loginUser() {
  isLoggedIn.value = true;
}
const headerHeightClass = computed(() => {
  return {
    "h-16": !isLoggedIn.value,
    "h-32": isLoggedIn.value,
  };
});
</script>
