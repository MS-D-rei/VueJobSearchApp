<template>
  <JobFiltersSidebarCheckboxGroup
    :group="jobsStore.uniqueOrganizations"
    model-name="selectedOrganizations"
    data-test="job-organizations-filter"
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useJobsStore } from '@/store/store';

const jobsStore = useJobsStore();
</script>
