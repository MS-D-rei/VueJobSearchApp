<template>
  <AccordionContainer :header="props.header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="item of props.group"
            :key="item"
            class="w-1/2 h-8"
          >
            <input
              :id="item"
              v-model="selectedItems"
              :value="item"
              type="checkbox"
              class="mr-3"
              :data-test="item"
              @change="backToFirstPage"
            />
            <label :for="item" data-test="labelName">{{ item }}</label>
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
const { selectedJobTypes, selectedOrganizations } = storeToRefs(jobsStore);

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  group: {
    type: Set,
    requied: true,
    default() {
      return new Set();
    }
  },
  modelName: {
    type: String,
    required: true,
  }
})

const groupList = { selectedJobTypes, selectedOrganizations };
const selectedItems = groupList[props.modelName]

function backToFirstPage() {
  router.push({ name: "JobSearchResults" });
}
</script>

<style scoped></style>
