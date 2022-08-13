<template>
  <h1 class="header">
    <span>{{ header }}</span>
  </h1>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

/**
 * VUE 全家桶
 */
const { currentRoute } = useRouter();

/**
 * 计算属性
 */
const header = computed(() => currentRoute.value.meta.pageName);
</script>

<script lang="ts">
export default { name: 'BaseHeader' };
</script>

<style lang="scss" scoped>
.header {
  color: #30353b;
  font-weight: 600;
  line-height: 28px;
}
</style>
