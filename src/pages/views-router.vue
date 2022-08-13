<template>
  <el-container class="views-router">
    <!-- 页面标题和词库切换 -->
    <el-header v-if="!headerVisible" class="views-router__header">
      <BaseHeader />
    </el-header>

    <!-- 内容区域 -->
    <el-main class="views-router__main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import BaseHeader from '@/components/base-header/index.vue';

export default defineComponent({
  name: 'ViewsRouter',
  components: { BaseHeader },
  setup() {
    /**
     * VUE 全家桶
     */
    const { currentRoute } = useRouter();

    /**
     * 计算属性
     */
    const headerVisible = computed(() => (currentRoute.value.name as string).includes('page-not-found'));

    return {
      headerVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.views-router {
  height: 100%;
  padding: 24px;

  &header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 96px;
    padding: 0;
  }

  &main {
    height: 100%;
    padding: 20px 0 0 0;
    overflow: hidden;
  }
}
</style>
