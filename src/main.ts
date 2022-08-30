import { createApp, h, App as Application } from 'vue';
import { createRouter, createWebHashHistory, Router, RouterOptions } from 'vue-router';
import { ResponseUserAuth, SingleSpaProps } from '@/types';
import App from './App.vue';
import singleSpaVue, { SingleSpaVueLifecycles } from 'single-spa-vue';
import api from '@/api';
import routes from '@/router';
import routerGuards from '@/router/routerGuards';
import store from '@/store';
import 'element-plus/theme-chalk/src/message.scss';

// 路由配置
const routerOptions: RouterOptions = {
  history: createWebHashHistory('single-spa-app-vue3-vite-template'),
  routes,
};
// 创建路由
const router: Router = createRouter(routerOptions);

// 单独启动
const standaloneMode = async () => {
  // 实例化 app
  const app = createApp(App);
  // 储存用户权限、设置路由守卫
  const setUserAuth = (userAuth: ResponseUserAuth | null | undefined) => {
    // 储存权限信息到 vuex
    store.commit('userStore/SET_USER_AUTH', userAuth);
    // 路由守卫
    router.beforeEach((to, from, next) => {
      routerGuards.beforeEach(to, from, next, userAuth);
    });
  };
  // 获取权限信息
  try {
    const response = await api.queryUserAuth();
    setUserAuth(response.result);
  } catch (e) {
    // TODO 应返回 null，这里因为是假接口，所以返回了一个 demo 数据
    // setUserAuth(null);
    setUserAuth({ addAuth: true, searchAuth: false });
  }
  // 全局插件注册
  [store, router].map((item) => app.use(item));
  // 挂载 app
  app.mount('#app');
};

// 微前端启动
export const bootstrap: ((() => Promise<unknown>) | any)[] = [];
export const mount: ((() => Promise<unknown>) | any)[] = [];
export const unmount: ((() => Promise<unknown>) | any)[] = [];
const singleSpaMode = () => {
  const vueLifecycles: SingleSpaVueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
      render: () => h(App, {}),
    },
    handleInstance: (app: Application, props: SingleSpaProps) => {
      // 储存权限信息到 vuex
      store.commit('userStore/SET_USER_AUTH', props.parcelProps.userAuth);
      // 路由守卫
      router.beforeEach((to, from, next) => {
        routerGuards.beforeEach(to, from, next, props.parcelProps.userAuth);
      });
      // 全局插件注册
      [store, router].map((item) => app.use(item));
    },
  });
  bootstrap.push(
    () =>
      new Promise((resolve) => {
        resolve(null);
      }),
    vueLifecycles.bootstrap,
  );
  mount.push(
    () =>
      new Promise((resolve) => {
        resolve(null);
      }),
    vueLifecycles.mount,
  );
  unmount.push(
    () =>
      new Promise((resolve) => {
        resolve(null);
      }),
    vueLifecycles.unmount,
  );
};

// webpack 运行或 vite 运行
(async () => {
  try {
    process.env.VUE_APP_ENV === 'standalone' ? await standaloneMode() : singleSpaMode();
  } catch (e) {
    import.meta.env.VITE_APP_ENV === 'standalone' ? await standaloneMode() : singleSpaMode();
  }
})();

// 导出 router 对象，自定义 hooks 可引用进行路由操作
export { router };
