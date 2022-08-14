import { RouteRecordRaw } from 'vue-router';
import MANAGE_ROUTERS from './modules/manage';

const DEFAULT_ROUTERS: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "chunk-index" */ '@/views/index.vue'),
    redirect: () => ({ path: '/add' }),
    children: [...MANAGE_ROUTERS],
  },
  {
    path: '/403/:authType',
    name: 'no-permission',
    component: () => import(/* webpackChunkName: "403" */ '@/views/403.vue'),
  },
];

export default DEFAULT_ROUTERS;
