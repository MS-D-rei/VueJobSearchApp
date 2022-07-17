<template>
  <AccordionContainer header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization of jobsStore.uniqueOrganizations"
            :key="organization"
            class="w-1/2 h-8"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
            />
            <label :for="organization" data-test="organization">{{
              organization
            }}</label>
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

const jobsStore = useJobsStore();
const { selectedOrganizations } = storeToRefs(jobsStore)

// function selectOrganization() {
//   console.log(selectedOrganizations.value);
// }

</script>
