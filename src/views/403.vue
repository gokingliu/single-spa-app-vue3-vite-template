<template>
  <div class="no-permission">
    <span>您暂无{{ authName }}权限，请前往 <a :href="toAuthPage" target="_blank">权限管理系统</a> 申请</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

/**
 * VUE 全家桶
 */
const router = useRoute();

/**
 * 权限描述映射表
 */
const SERVICE_AUTH_DESC_MAP = {
  uiAllAuth: '所有',
  addAuth: '添加',
  searchAuth: '查询',
};

/**
 * 计算属性
 */
const authName = computed(() => SERVICE_AUTH_DESC_MAP[router.params.authType as string]);
const toAuthPage = computed(() => 'https://xxx.com/permission/apply');
</script>

<script lang="ts">
export default { name: 'NoPermission' };
</script>

<style lang="scss" scoped>
.no-permission {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 20px;
  text-align: center;

  a {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
