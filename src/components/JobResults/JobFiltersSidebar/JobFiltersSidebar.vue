<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton
            text="Clear Filters"
            type="search"
            @click="jobsStore.clearFilters"
          />
        </div>
      </div>

      <!-- <JobFiltersSidebarJobTypes /> -->
      <AccordionContainer header="Job Types">
        <JobFiltersSidebarJobTypes />
      </AccordionContainer>

      <AccordionContainer header="Organizations">
        <JobFiltersSidebarOrganizations />
      </AccordionContainer>

      <AccordionContainer header="Degrees">
        <JobFiltersSidebarDegrees />
      </AccordionContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue';
import AccordionContainer from '@/components/Shared/AccordionContainer.vue';
// import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarDegrees from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue';
import { useJobsStore } from '@/store/store';
import { onMounted } from 'vue';

const jobsStore = useJobsStore();
// const { fetchDegrees } = jobsStore;

onMounted(async () => {
  await jobsStore.fetchDegrees();
});
</script>

<style scoped></style>
