import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { baseEnv } from './config';
import { ElMessage } from 'element-plus';
import { AxiosSourceCancelConfig, AxiosResponseConfig } from '@/types';

class HttpClient {
  commonOption; // AxiosRequestConfig

  axios; // AxiosInstance

  sourceCancel: AxiosSourceCancelConfig = { token: undefined, cancel: null };

  redirecting = false;

  constructor(commonOption: Object, options: Object) {
    this.commonOption = commonOption;
    this.axios = axios.create({
      timeout: 150000,
      cancelToken: this.sourceCancel.token,
      ...options,
    });

    this.axios.interceptors.request.use(this.requestSuccessHandle, this.requestErrorHandle);
    this.axios.interceptors.response.use(this.responseSuccessHandle, this.responseErrorHandle);
  }

  requestSuccessHandle = (config: AxiosRequestConfig) => ({
    ...config,
    headers: {
      'x-requested-with': 'XMLHttpRequest',
    },
  });

  requestErrorHandle = (e: AxiosError) => {
    console.error(e);
    return Promise.reject(e);
  };

  responseSuccessHandle = (response: AxiosResponseConfig<any>) => {
    // 后台返回数据中有token,就应该将token放在header中；
    let msg = '未知错误';
    if (!response || !response.data) {
      msg = '网络错误';
    } else if (response.msg) {
      msg = response.msg;
    }

    ElMessage({
      type: 'error',
      message: response.data.msg || msg,
    });

    console.error(
      '------------------------------\n',
      '接口错误:',
      msg,
      '\n',
      '接口名:',
      response.config.baseURL + response.config.url,
      '\n',
      '参数:',
      response.config.data,
      '\n',
      '返回值:',
      response.data,
      '\n',
      '------------------------------\n',
    );

    return Promise.reject(response.data);
  };

  responseErrorHandle = (e: AxiosError) => {
    let msg = '未知错误';
    if (axios.isCancel(e)) {
      return Promise.reject(e);
    }
    if (!e?.response || !e.response.data) {
      msg = '网络错误';
    }

    ElMessage({
      type: 'error',
      message: msg,
    });

    console.error(
      '------------------------------\n',
      '接口错误:',
      e.message,
      '\n',
      '接口名:',
      (e.config.baseURL as string) + e.config?.url,
      '\n',
      '参数:',
      e.config.data,
      '\n',
      '------------------------------\n',
    );
    return Promise.reject(e);
  };

  /**
   * @param config AxiosRequestConfig
   */
  setCommonOption = (config: object) => {
    this.commonOption = Object.assign(this.commonOption, config);
  };

  changeSource = (e: AxiosSourceCancelConfig) => {
    this.sourceCancel = e;
    this.setRequestConfig({
      cancelToken: this.sourceCancel.token,
    });
  };

  getCommonOption() {
    return { ...this.commonOption };
  }

  /**
   * @param config AxiosRequestConfig
   */
  setRequestConfig = (config: AxiosRequestConfig) => {
    this.axios.defaults = Object.assign(this.axios.defaults, config);
  };

  /**
   * @param onFulfilled (config:AxiosRequestConfig) => AxiosRequestConfig
   * @param onRejected (error : any) => any
   */
  setRequestInterceptor = (onFulfilled: any, onRejected: any) => {
    this.axios.interceptors.request.use(onFulfilled, onRejected);
  };

  /**
   *
   * @param {*} url string
   * @param {*} option AxiosRequestConfig
   */
  get = (url: string, option: AxiosRequestConfig = {}) => this.axios.get(url, { ...this.commonOption, ...option });

  post = (url: string, data = {}, option: AxiosRequestConfig = {}) =>
    this.axios.post(url, data, { ...this.commonOption, ...option });

  put = (url: string, data = {}, option: AxiosRequestConfig = {}) =>
    this.axios.put(url, data, { ...this.commonOption, ...option });

  delete = (url: string, option: AxiosRequestConfig = {}) =>
    this.axios.delete(url, { ...this.commonOption, ...option });

  download = (url: string, option: AxiosRequestConfig) => {
    let resUrl = url;
    let params = '';
    if (option?.params) {
      Object.keys(option.params).forEach((key) => {
        if (option.params[key]) {
          params += `${key}=${option.params[key]}&`;
        }
      });
    }
    if (params) {
      resUrl = `${url}?${params.slice(0, params.length - 1)}`;
    }
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = resUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}

export default new HttpClient(
  {
    baseURL: baseEnv.defaultApi,
    withCredentials: true,
  },
  {},
);
