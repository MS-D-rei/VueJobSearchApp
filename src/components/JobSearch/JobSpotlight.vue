<template>
  <ul>
    <li v-for="spotlight of spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const spotlights = ref([]);

onMounted(async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}/spotlights`;
  const response = await axios.get(url);
  spotlights.value = response.data;
});
</script>

<style scoped></style>
