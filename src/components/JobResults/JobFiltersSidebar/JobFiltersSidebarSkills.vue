<template>
  <div class="mt-5">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      class="p-3 h-12 border border-solid border-brand-gray-1 shadow-gray rounded w-full text-base"
      placeholder="Vue, React, Python, Go, etc."
      type="text"
      data-test="skill-filter"
    />
  </div>
</template>

<script setup lang="ts">
import { useJobsStore } from '@/store/store';
import { storeToRefs } from 'pinia';

const jobsStore = useJobsStore();
const { skillsSearchTerm } = storeToRefs(jobsStore);
</script>

<style lang="scss" scoped></style>
