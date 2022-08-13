import { RouteRecordRaw } from 'vue-router';

const MANAGE_ROUTERS: RouteRecordRaw[] = [
  {
    path: '/add',
    component: () => import(/* webpackChunkName: "chunk-view" */ '@/pages/views-router.vue'),
    meta: {
      pageName: '添加',
    },
    children: [
      {
        path: '403/:authType',
        name: 'add-page-not-found',
        component: () => import(/* webpackChunkName: "403" */ '@/pages/403.vue'),
      },
      {
        path: '',
        name: 'add',
        component: () => import(/* webpackChunkName: "add" */ '@/pages/add/index.vue'),
      },
    ],
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "chunk-view" */ '@/pages/views-router.vue'),
    meta: {
      pageName: '查询',
    },
    children: [
      {
        path: '403/:authType',
        name: 'search-page-not-found',
        component: () => import(/* webpackChunkName: "403" */ '@/pages/403.vue'),
      },
      {
        path: '',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '@/pages/search/index.vue'),
      },
    ],
  },
];

export default MANAGE_ROUTERS;
