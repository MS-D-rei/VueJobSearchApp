<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <ActionButton
        text="Clear Filters"
        type="search"
        data-test="clear-filters-button"
        @click="jobsStore.clearFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue';
import { useJobsStore } from '@/store/store';

const jobsStore = useJobsStore();
</script>

<style lang="scss" scoped></style>
