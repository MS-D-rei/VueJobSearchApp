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
// import { onMounted } from 'vue';
// import { useRoute } from 'vue-router';

const jobsStore = useJobsStore();
const { skillsSearchTerm } = storeToRefs(jobsStore);
// const route = useRoute();

/* This function reflect JobSearchForm result on JobListings */
/* But if this is deployed here, the search result will not be 
affected on JobListings after pushing search button of JobSearchForm */
// onMounted(() => {
//   const roleSearchTerm = route.query.role as string || '';
//   jobsStore.skillsSearchTerm = roleSearchTerm;
// })
</script>

<style lang="scss" scoped></style>
