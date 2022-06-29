<template>
  <form
    class="flex items-center w-full h-12 mt-14 border border-solid border-brand-gray-3 rounded-3xl"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex flex-nowrap flex-1 h-full text-base font-light">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label for="role" class="absolute left-0 -top-10"
          >Role: {{ role }}</label
        >
        <!-- v-model has modelValue property and update:modelValue event by default -->
        <TextInput
          v-model:inputValue="role"
          placeholder="Software engineer"
          input-value="Vue Developer"
        />
      </div>
      <span
        class="flex items-center h-full px-3 border-l border-r border-brand-gray-3 bg-brand-gray-2"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full pl-3">
        <label for="location" class="absolute left-0 -top-10"
          >Where: {{ location }}</label
        >
        <TextInput v-model:inputValue="location" placeholder="Los Angeles" />
      </div>
    </div>

    <ActionButton text="Search" type="search" class="rounded-r-3xl" />
  </form>
</template>

<script setup>
import { ref } from "vue";
import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";

const role = ref("");
const location = ref("");

// function updateRole($event) {
//   role.value = $event.target.value;
// }

// function updateLocation($event) {
//   location.value = $event.target.value;
// }
</script>

<style scoped></style>
