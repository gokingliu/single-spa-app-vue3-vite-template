import { createApp, h, App as Application } from 'vue';
import { createRouter, createWebHashHistory, Router, RouterOptions } from 'vue-router';
import { ResponseUserAuth, SingleSpaProps } from '@/types';
import App from './App.vue';
import singleSpaVue from 'single-spa-vue';
import api from '@/api';
import routes from '@/router';
import routerGuards from '@/router/routerGuards';
import store from '@/store';
import 'element-plus/theme-chalk/src/message.scss';

console.log(process.env);

// 路由配置
const routerOptions: RouterOptions = {
  history: createWebHashHistory(''),
  routes,
};

// 创建路由
const router: Router = createRouter(routerOptions);

// 单独启动
const standaloneMode = async () => {
  // 实例化 app
  const app = createApp(App);

  // 全局插件注册
  [store, router].map((item) => app.use(item));

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
    setUserAuth({ addAuth: true, searchAuth: true });
  }

  // 挂载 app
  app.mount('#app');
};

// 微前端启动
const singleSpaMode = () => {
  singleSpaVue({
    createApp,
    appOptions: {
      render: () => h(App, {}),
    },
    handleInstance: (app: Application, props: SingleSpaProps) => {
      // 全局插件注册
      [store, router].map((item) => app.use(item));

      // 储存权限信息到 vuex
      store.commit('userStore/SET_USER_AUTH', props.parcelProps.userAuth);

      // 路由守卫
      router.beforeEach((to, from, next) => {
        routerGuards.beforeEach(to, from, next, props.parcelProps.userAuth);
      });
    },
  });
};

(async () => {
  try {
    process.env.STANDALONE_SINGLE_SPA === 'true' ? await standaloneMode() : singleSpaMode();
  } catch (e) {
    await standaloneMode();
  }
})();

// 导出 router 对象，自定义 hooks 可引用进行路由操作
export { router };
