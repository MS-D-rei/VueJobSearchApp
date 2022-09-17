<template>
  <JobFiltersSidebarCheckboxGroup
    :group="jobsStore.uniqueJobTypes"
    model-name="selectedJobTypes"
    data-test='job-types-filter'
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useJobsStore } from '@/store/store';

const jobsStore = useJobsStore();
</script>

<style scoped></style>
