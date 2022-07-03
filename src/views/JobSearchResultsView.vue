<template>
  <h1 class="text-6xl font-bold">About View</h1>
  <button @click="backToHome">back to home</button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function backToHome() {
  router.push({ name: "Home" });
}
</script>

<style scoped></style>
