export interface StoreState {
  userStore?: UserState;
}

export interface UserState {
  userAuth: UserAuthItem | null;
}
