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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

interface Spotlight {
  id: number,
  img: string,
  title: string,
  description: string
}

const spotlights = ref<Spotlight[]>([]);

onMounted(async () => {
  const apiUrl = process.env.VITE_API_URL;
  const url = `${apiUrl}/spotlights`;
  const response = await axios.get<Spotlight[]>(url);
  spotlights.value = response.data;
});
</script>

<style scoped></style>
