<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      data-test="clickable-area"
      @click="openAccordion"
    >
      <h3 class="text-base font-semibold">{{ props.header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="w-full mt-5">
      <!-- Custom Content here for reusability -->
      <slot>Fallback contents</slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isOpen = ref(false);

function openAccordion() {
  isOpen.value = !isOpen.value;
}

const caretIcon = computed(() => {
  return isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down'];
})

const props = defineProps({
  header: {
    type: String,
    required: true,
  }
})
</script>
<style scoped></style>
