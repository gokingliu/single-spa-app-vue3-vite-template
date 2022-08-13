<template>
  <el-menu
    :default-active="activeRoute"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    mode="horizontal"
    router
  >
    <el-menu-item index="add">添加</el-menu-item>
    <el-menu-item index="search">查询</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

/**
 * VUE 全家桶
 */
const router = useRoute();

/**
 * 默认激活菜单
 */
const activeRoute = router.name;
</script>

<script lang="ts">
export default { name: 'BaseMenu' };
</script>
