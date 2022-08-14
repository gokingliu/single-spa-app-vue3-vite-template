<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="includeRouter">
      <component :is="Component" :key="route.name" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const includeRouter = ref([]);
</script>

<script lang="ts">
export default { name: 'KeepViews' };
</script>
