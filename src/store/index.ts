import { createStore } from 'vuex';
import userStore from './modules/user.store';
import getters from './getters';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters,
  modules: {
    userStore,
  },
});
