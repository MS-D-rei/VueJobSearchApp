<template>
  <AccordionContainer header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType of jobsStore.uniqueJobTypes"
            :key="jobType"
            class="w-1/2 h-8"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              :data-test="jobType"
              @change="backToFirstPage"
            />
            <label :for="jobType" data-test="job-type">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </AccordionContainer>
</template>

<script setup>
import AccordionContainer from "@/components/Shared/AccordionContainer.vue";
import { useJobsStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const jobsStore = useJobsStore();
const { selectedJobTypes } = storeToRefs(jobsStore);

function backToFirstPage() {
  router.push({ name: "JobSearchResults" });
}
</script>

<style scoped></style>
