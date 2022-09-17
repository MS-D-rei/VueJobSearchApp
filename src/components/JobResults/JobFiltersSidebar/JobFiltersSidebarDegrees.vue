<template>
  <JobFiltersSidebarCheckboxGroup
    :group="jobsStore.uniqueDegrees"
    model-name="selectedDegrees"
    data-test="job-degrees-filter"
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useJobsStore } from '@/store/store';

const jobsStore = useJobsStore();
</script>

<style lang="scss" scoped></style>
