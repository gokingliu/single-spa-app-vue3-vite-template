import { RouteRecordRaw } from 'vue-router';
import ManageRouters from './modules/manage';

const DefaultRouters: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "chunk-index" */ '@/views/index.vue'),
    redirect: () => ({ path: '/add' }),
    children: [...ManageRouters],
  },
  {
    path: '/403/:authType',
    name: 'no-permission',
    component: () => import(/* webpackChunkName: "403" */ '@/views/403.vue'),
  },
];

export default DefaultRouters;
