import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BaseInput from './BaseInput.vue';

describe('BaseInput', () => {
  it('рендерит переданное значение modelValue', () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: 'hello' },
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('hello');
  });

  it('эмитит update:modelValue при вводе текста', async () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: '' },
    });
    const input = wrapper.find('input');

    await input.setValue('test');

    const emitted = wrapper.emitted()['update:modelValue'];
    expect(emitted).toBeTruthy();
    expect(emitted![0]).toEqual(['test']);
  });

  it('рендерит placeholder', () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: '', placeholder: 'Enter text' },
    });
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Enter text');
  });

  it('использует правильный type', () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: '', type: 'password' },
    });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('password');
  });

  it('показывает текст ошибки, если передан prop error', () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: '', error: 'Required field' },
    });
    const errorEl = wrapper.find('.base-input__error');
    expect(errorEl.exists()).toBe(true);
    expect(errorEl.text()).toBe('Required field');
  });

  it('не рендерит ошибку, если prop error пустой', () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: '', error: '' },
    });
    const errorEl = wrapper.find('.base-input__error');
    expect(errorEl.exists()).toBe(false);
  });
});
