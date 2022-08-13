import { ResponseUserAuth, UserState } from '@/types';

const state: UserState = {
  userAuth: null,
};

const mutations = {
  SET_USER_AUTH(state: UserState, userAuth: ResponseUserAuth) {
    state.userAuth = userAuth;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
