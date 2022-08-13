<template>
  <div class="add">
    <el-icon><i-ep-DocumentAdd /></el-icon>
    <span>添加页面</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewsAdd',
});
</script>

<style lang="scss" scoped>
.add {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 20px;
}
</style>
