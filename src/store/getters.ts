import { StoreState } from '@/types';

const getters = {
  userAuth: (state: StoreState) => state.userStore?.userAuth,
};

export default getters;
