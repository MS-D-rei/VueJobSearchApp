<template>
  <section class="mb-16">
    <h1 class="font-bold tracking-tighter text-8xl mb-14" data-test="action-phrase">
      <span :class="actionClasses">{{ action }} </span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-normal">Find your next job at Anonymous Careers</h2>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, computed } from "vue";
import nextElementInList from "@/utils/nextElementInList";

const action = ref("Build");
// const interval: Ref<NodeJS.Timer> | Ref<undefined> = ref(undefined);
const interval = ref<NodeJS.Timer | undefined>(undefined);

changeTitle();

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

function changeTitle() {
  const actions = ["Build", "Create", "Design", "Code"];
  interval.value = setInterval(() => {
    // const currentActionIndex = actions.indexOf(action.value);
    // // use Modulo to cycle
    // const nextActionIndex = (currentActionIndex + 1) % 4; // 4 -> 0 so 1, 2, 3, 4->0, 1, 2, 3...
    // const nextAction = actions[nextActionIndex];
    // action.value = nextAction;
    action.value = nextElementInList(actions, action.value);
  }, 3000);
}

const actionClasses = computed(() => {
  // const className = action.value[0].toLowerCase() + action.value.slice(1) => no need
  return {
    [action.value.toLowerCase()]: true,
  };
});
</script>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
