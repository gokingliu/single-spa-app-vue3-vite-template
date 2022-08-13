// @ts-nocheck

import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  it('renders App when passed', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.element).toMatchSnapshot();
  });
});
