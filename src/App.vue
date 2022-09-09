<template>
  <div>
    <MainNav />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import MainNav from "@/components/Navigation/MainNav.vue";
</script>
