<template>
  <button :class="buttonClass">
    {{ props.text }}
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "",
    validator(value) {
      return ["sign-in", "search"].includes(value);
    },
  },
});
const buttonClass = computed(() => {
  return {
    [props.type]: true,
  };
});
</script>

<style scoped>
button {
  @apply px-5 py-3 font-medium rounded;
}
.sign-in {
  @apply text-white border-0 bg-brand-blue-1 hover:shadow-blue;
}

.search {
  @apply text-brand-blue-1 bg-transparent hover:bg-brand-blue-2 hover:text-white;
}
</style>
