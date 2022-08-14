<template>
  <div class="add">
    <el-icon><i-ep-DocumentAdd /></el-icon>
    <SpanText />
  </div>
</template>

<script lang="tsx" setup>
const SpanText = () => <span>添加页面</span>;
</script>

<script lang="tsx">
export default { name: 'ViewsAdd' };
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
