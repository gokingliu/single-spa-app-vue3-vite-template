<template>
  <el-menu :default-active="activeRoute" mode="horizontal" @select="routeChange">
    <el-menu-item index="add">添加</el-menu-item>
    <el-menu-item index="search">查询</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

/**
 * VUE 全家桶
 */
const route = useRoute();
const router = useRouter();

/**
 * 默认激活菜单
 */
const activeRoute = (route.name as string).split('-no-permission').shift();

/**
 * 菜单切换
 */
const routeChange = (value: string) => {
  router.push({ name: value });
};
</script>

<script lang="ts">
export default { name: 'BaseMenu' };
</script>
