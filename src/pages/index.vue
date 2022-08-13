<template>
  <el-container class="index">
    <!-- 顶栏 -->
    <el-header class="index__header">
      <el-menu>
        <el-menu-item>添加</el-menu-item>
        <el-menu-item>查询</el-menu-item>
      </el-menu>
    </el-header>

    <!-- 内容区域 -->
    <el-main class="index__main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default { name: 'ViewsIndex' };
</script>

<style lang="scss" scoped>
.index {
  height: 100vh;

  &__header {
    height: 50px;
  }

  &__main {
    height: 100%;
    padding: 0;
    overflow: auto;
  }
}
</style>
