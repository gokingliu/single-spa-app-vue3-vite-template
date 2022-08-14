import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { ResponseUserAuth } from '@/types';

class RouterGuards {
  /**
   * @description 路由鉴权
   */
  routerNameAuthMap = {
    add: 'addAuth',
    search: 'searchAuth',
  };

  constructor(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
    userAuth: ResponseUserAuth | null | undefined,
  ) {
    this.nextRouter(this.getNoAuthRouterName(userAuth), userAuth, to, next);
  }

  /**
   * @description 获取无权限路由名称
   */
  getNoAuthRouterName = (userAuth: ResponseUserAuth | null | undefined) => {
    if (!userAuth) {
      document.writeln('后端权限接口异常，请联系开发人员');
      return Object.keys(this.routerNameAuthMap);
    }

    // 无权限路由名称
    const noAuthRouterName: string[] = [];

    // 没有 addAuth 权限
    if (!userAuth.addAuth) {
      noAuthRouterName.push(
        ...Object.keys(this.routerNameAuthMap).filter((item: string) => this.routerNameAuthMap[item] === 'addAuth'),
      );
    }
    // 没有 searchAuth 权限
    if (!userAuth.searchAuth) {
      noAuthRouterName.push(
        ...Object.keys(this.routerNameAuthMap).filter((item: string) => this.routerNameAuthMap[item] === 'searchAuth'),
      );
    }

    return noAuthRouterName;
  };

  /**
   * @description 判断跳转路径
   */
  nextRouter = (
    noAuthRouterName: string[],
    userAuth: ResponseUserAuth | null | undefined,
    to: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const nextRouterWithAuth = (user = true) => {
      const toName = String(to.name).split('-no-permission').shift();
      if (String(to.name) === 'no-permission') {
        next('/');
      } else if (
        String(to.name).includes('-no-permission') &&
        (user ? !noAuthRouterName.includes(toName as string) : true)
      ) {
        const pathName = `/${toName}`;
        next(pathName);
      } else {
        // 正常刷新
        next();
      }
    };

    if (noAuthRouterName.length === Object.keys(this.routerNameAuthMap).length) {
      to.path === '/403/uiAllAuth' ? next() : next('/403/uiAllAuth');
    } else if (noAuthRouterName.includes(to.name as string)) {
      const pathName = to.path
        .split('/')
        .filter((x) => x)
        .shift();
      const parentPath = pathName ? `/${pathName}` : '';
      const fullPath = `${parentPath}/403/${this.routerNameAuthMap[to.name as string]}`;
      to.path.includes(`${parentPath}/403`) ? next() : next(fullPath);
    } else {
      nextRouterWithAuth();
    }
  };
}

export default {
  beforeEach: (
    to: RouteLocationNormalized,
    form: RouteLocationNormalized,
    next: NavigationGuardNext,
    userAuth: ResponseUserAuth | null | undefined,
  ) => new RouterGuards(to, form, next, userAuth),
};
