<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1" data-test="job-count">{{ jobsStore.filteredJobs.length }}</span> jobs matched</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { computed } from "vue";
// import { useRoute } from "vue-router";
import { useJobsStore } from "@/store/store";
import useConfirmRoute from "@/composables/useConfirmRoute.js";

const jobsStore = useJobsStore();

// const route = useRoute();
// const onJobResultPage = computed(() => {
//   return route.name === "JobSearchResults";
// });

// Import composable function, useConfirmRoute.
// Composable function gives, reusability, easiness to test
// And enable to move business logic from components.
const onJobResultPage = useConfirmRoute("JobSearchResults");

</script>

<style scoped></style>
