<template>
  <div>
    <h1>Job View for Job ID: {{ currentJobId }}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentJobId = computed(() => {
  return route.params.id
})
</script>

<style scoped>

</style>