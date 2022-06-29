<template>
  <div>
    <input
      type="text"
      :value="inputValue"
      :placeholder="props.placeholder"
      class="w-full text-lg font-normal focus:outline-none"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
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

function handleInput($event) {
  // emit(eventName, args(payload))
  emits("update:inputValue", $event.target.value);
}
</script>

<style scoped></style>
