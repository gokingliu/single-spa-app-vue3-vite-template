import { RouteRecordRaw } from 'vue-router';

const ManageRouters: RouteRecordRaw[] = [
  {
    path: '/add',
    component: () => import(/* webpackChunkName: "chunk-index" */ '@/views/keep-views.vue'),
    meta: {
      pageName: '添加',
    },
    children: [
      {
        path: '403/:authType',
        name: 'add-no-permission',
        component: () => import(/* webpackChunkName: "403" */ '@/views/403.vue'),
      },
      {
        path: '',
        name: 'add',
        component: () => import(/* webpackChunkName: "add" */ '@/views/add/index.vue'),
      },
    ],
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "chunk-index" */ '@/views/keep-views.vue'),
    meta: {
      pageName: '查询',
    },
    children: [
      {
        path: '403/:authType',
        name: 'search-no-permission',
        component: () => import(/* webpackChunkName: "403" */ '@/views/403.vue'),
      },
      {
        path: '',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '@/views/search/index.vue'),
      },
    ],
  },
];

export default ManageRouters;
