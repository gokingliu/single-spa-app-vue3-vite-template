import {
  createApp,
  // h,
  // App as Application
} from 'vue';
import { createRouter, createWebHashHistory, Router, RouterOptions } from 'vue-router';
// import { SingleSpaProps } from '@/types';
import App from './App.vue';
// import singleSpaVue from 'single-spa-vue';
import routes from '@/router';
// import routerGuards from '@/router/routerGuards';
import store from '@/store';
import 'element-plus/theme-chalk/src/message.scss';

const app = createApp(App);

// 路由配置
const routerOptions: RouterOptions = {
  history: createWebHashHistory(''),
  routes,
};

// 创建路由
const router: Router = createRouter(routerOptions);

// 全局插件注册
[store, router].map((item) => app.use(item));

app.mount('#app');

// // 微前端启动
// const vueLifecycles = singleSpaVue({
//   createApp,
//   appOptions: {
//     render() {
//       return h(App, {});
//     },
//   },
//   handleInstance: (app: Application, props: SingleSpaProps) => {
//     // 储存权限、配置信息、媒体类型、环境、服务 ID 到 vuex
//     store.commit('userStore/SET_USER_AUTH', props.parcelProps.userAuth);
//
//     // 路由守卫
//     router.beforeEach((to, from, next) => {
//       routerGuards.beforeEach(to, from, next, props.parcelProps.userAuth);
//     });
//
//     // 全局插件注册
//     [store, router].map((item) => app.use(item));
//   },
// });
//
// export const { bootstrap } = vueLifecycles;
//
// export const { mount } = vueLifecycles;
//
// export const { unmount } = vueLifecycles;

// 导出 router 对象，自定义 hooks 可引用进行路由操作
export { router };
