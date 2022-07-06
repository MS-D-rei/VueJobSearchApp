<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing
        v-for="job in jobs"
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
import { onMounted, ref } from "vue";

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
</script>

<style scoped></style>
