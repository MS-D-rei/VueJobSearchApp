<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="search" />
        </div>
      </div>

      <AccordionContainer header="Fallback content"></AccordionContainer>

      <AccordionContainer header="Job types">
        <p>Placeholder for now</p>
      </AccordionContainer>

      <JobFiltersSidebarOrganizations />
    </section>
  </div>
</template>

<script setup>
import ActionButton from "@/components/Shared/ActionButton.vue";
import AccordionContainer from "@/components/Shared/AccordionContainer.vue"
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue"
</script>

<style scoped></style>
