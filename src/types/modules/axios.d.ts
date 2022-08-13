import { AxiosResponse } from 'axios';

export interface AxiosResponseConfig<T> extends AxiosResponse {
  code?: number;
  msg?: string;
  result?: T;
  config: any;
}

export type UnwrapAxiosResponse<T> = T extends (...args: any) => Promise<AxiosResponseConfig<infer R>> ? R : never;

export interface AxiosListResponseConfig<T> {
  list: T[];
  total: number;
}

export interface AxiosSourceCancelConfig {
  token: undefined;
  cancel: null;
}
