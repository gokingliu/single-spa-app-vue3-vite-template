import { RouteRecordRaw } from 'vue-router';
import MANAGE_ROUTERS from './modules/manage';

const DEFAULT_ROUTERS: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "chunk-index" */ '@/pages/index.vue'),
    redirect: () => ({ path: '/add' }),
    children: [...MANAGE_ROUTERS],
  },
  {
    path: '/403/:authType',
    name: 'page-not-found',
    component: () => import(/* webpackChunkName: "403" */ '@/pages/403.vue'),
  },
];

export default DEFAULT_ROUTERS;
