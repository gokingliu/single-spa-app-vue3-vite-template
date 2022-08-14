import { ResponseUserAuth } from './store';

export interface StoreState {
  userStore?: UserState;
}

export interface UserState {
  userAuth: ResponseUserAuth | null | undefined;
}
