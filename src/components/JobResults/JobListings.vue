<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page: {{ currentPageNumber }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobSearchResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobSearchResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// import axios from "axios";
import JobListing from "@/components/JobResults/JobListing.vue";
import { onMounted, computed, unref } from "vue";
// import { useRoute } from "vue-router";
// import { storeToRefs } from "pinia";
import { useJobsStore } from "@/store/store";
import useCurrentPage from "@/composables/useCurrentPage";
import usePreviousAndNextPage from "@/composables/usePreviousAndNextPage"

// const route = useRoute();
const jobsStore = useJobsStore();

// const openingJobs = ref([]);
// const { openingJobs } = storeToRefs(jobsStore);
const { fetchJobs } = jobsStore;

onMounted(async () => {
  // axios
  //   .get("http://localhost:3000/jobs")
  //   .then((response) => {
  //     jobs.value = response.data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  //   .then(() => {});
  // try {
  //   const apiUrl = import.meta.env.VITE_API_URL;
  //   const response = await axios.get(`${apiUrl}/jobs`);
  //   openingJobs.value = response.data;
  // } catch (error) {
  //   console.log(error);
  // }
  await fetchJobs();
});

// const currentPageNumber = computed(() => {
//   const pageString = route.query.page || "1";
//   return Number.parseInt(pageString);
// });
const currentPageNumber = useCurrentPage();

// const previousPage = computed(() => {
//   const previousPageNumber = currentPageNumber.value - 1;
//   const firstPageNumber = 1;
//   return previousPageNumber >= firstPageNumber ? previousPageNumber : undefined;
// });

// const nextPage = computed(() => {
//   const nextPageNumber = currentPageNumber.value + 1;
//   const maxPageNumber = Math.ceil(jobsStore.filteredJobs.length / 10);
//   return nextPageNumber <= maxPageNumber ? nextPageNumber : undefined;
// });

const maxPageNumber = computed(() => jobsStore.filteredJobs.length / 10);
const { previousPage, nextPage } = usePreviousAndNextPage(currentPageNumber, maxPageNumber);

const displayedJobs = computed(() => {
  const pageNumber = unref(currentPageNumber);
  const firstJobIndex = (pageNumber - 1) * 10; // page1 => (1 -1) * 10 == 0
  const lastJobIndex = pageNumber * 10; // page1 => 1 * 10 == 10
  return jobsStore.filteredJobs.slice(firstJobIndex, lastJobIndex);
});
</script>

<style scoped></style>
