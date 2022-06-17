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
    default: "",
  },
  isPrimary: {
    type: Boolean,
    default: true,
  }
});
const buttonClass = computed(() => {
  return {
    primary: props.isPrimary,
    secondary: !props.isPrimary,
  };
});
</script>

<style scoped>
button {
  @apply px-5 py-3 font-medium rounded;
}
.primary {
  @apply text-white border-0 bg-brand-blue-1 hover:shadow-blue;
}

.secondary {
  @apply text-brand-blue-1 bg-transparent hover:bg-brand-blue-2 hover:text-white;
}
</style>
