<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="item of props.group" :key="item" class="w-1/2 h-8">
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
</template>

<script setup lang="ts">
import { PropType, Ref } from 'vue';
import { useJobsStore } from '@/store/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const jobsStore = useJobsStore();
const { selectedJobTypes, selectedOrganizations, selectedDegrees } =
  storeToRefs(jobsStore);

const props = defineProps({
  group: {
    // https://vuejs.org/guide/typescript/composition-api.html
    type: [Array, Set] as PropType<string[] | Set<string>>,
    requied: true,
    default() {
      return new Set();
    },
  },
  modelName: {
    type: String,
    required: true,
  },
});

interface GroupList {
  selectedJobTypes: Ref<string[]>;
  selectedOrganizations: Ref<string[]>;
  selectedDegrees: Ref<string[]>;
}
const groupList: GroupList = {
  selectedJobTypes,
  selectedOrganizations,
  selectedDegrees,
};
const selectedItems = groupList[props.modelName as keyof GroupList];

function backToFirstPage() {
  router.push({ name: 'JobSearchResults' });
}
</script>

<style scoped></style>
