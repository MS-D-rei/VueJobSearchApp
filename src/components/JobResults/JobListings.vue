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
  </main>
</template>

<script setup>
import axios from "axios";
import JobListing from "@/components/JobResults/JobListing.vue";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const jobs = ref([]);
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
  try {
    const response = await axios.get("http://localhost:3000/jobs");
    jobs.value = response.data;
  } catch (error) {
    console.log(error);
  }
});

const displayedJobs = computed(() => {
  const pageString = route.query.page || "1";
  const pageNumber = Number.parseInt(pageString);
  const firstJobIndex = (pageNumber - 1) * 10; // page1 => (1 -1) * 10 == 0
  const lastJobIndex = pageNumber * 10; // page1 => 1 * 10 == 10
  return jobs.value.slice(firstJobIndex, lastJobIndex);
})
</script>

<style scoped></style>
