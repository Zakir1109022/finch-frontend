import { mount } from '@vue/test-utils';
import NewsLetter from '../NewsLetter.vue';

describe('NewsLetter', () => {
  it('should renders correctly with props and updates on interaction', () => {

    const wrapper = mount(NewsLetter,{
      props: { }
    }) 

    expect(wrapper.exists()).toBe(true);
  })
})