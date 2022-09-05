<template>
  <input
    type="text"
    :value="inputValue"
    :placeholder="props.placeholder"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  inputValue: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:inputValue"]);

function handleInput($event: Event) {
  const target = $event.target as HTMLInputElement
  // emit(eventName, args(payload))
  emits("update:inputValue", target.value);
}
</script>

<style scoped></style>
