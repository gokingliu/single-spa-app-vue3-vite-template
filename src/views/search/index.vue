<template>
  <div class="search">
    <el-icon><i-ep-Search /></el-icon>
    <span>搜索页面</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewsSearch',
});
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 20px;
}
</style>
