<template>
  <el-container class="index">
    <!-- 顶栏 -->
    <el-header class="index__header">
      <BaseMenu />
    </el-header>

    <!-- 内容区域 -->
    <el-main class="index__main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseMenu from '@/components/base-menu/index.vue';

export default defineComponent({
  name: 'ViewsIndex',
  components: { BaseMenu },
});
</script>

<style lang="scss" scoped>
.index {
  height: 100vh;

  &__header {
    height: 60px;
    padding: 0;
  }

  &__main {
    height: 100%;
    padding: 0;
    overflow: auto;
  }
}
</style>
