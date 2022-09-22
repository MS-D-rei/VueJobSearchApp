<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <JobFiltersSidebarPrompt />

      <AccordionContainer header="Skills and Qualifications">
        <JobFiltersSidebarSkills />
      </AccordionContainer>

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
import AccordionContainer from '@/components/Shared/AccordionContainer.vue';
import JobFiltersSidebarPrompt from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue';
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue';
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarDegrees from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue';
import { useJobsStore } from '@/store/store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const jobsStore = useJobsStore();
const route = useRoute();

onMounted(async () => {
  await jobsStore.fetchDegrees();
  
  try {
    const roleSearchTerm = route.query.role as string || '';
    jobsStore.skillsSearchTerm = roleSearchTerm;
  } catch (err) {
    console.log(err);
  }
});
</script>

<style scoped></style>
