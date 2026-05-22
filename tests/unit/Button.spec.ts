import { mount } from '@vue/test-utils'
import Button from '../../src/components/common/button.vue'
import { describe, it, expect } from 'vitest'
describe('Button.vue', () => {
  it('renders button with text', () => {
    const wrapper = mount(Button, {
      props: { text: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      props: { text: 'Click' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { text: 'Click', disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: { text: 'Click', loading: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('shows spinner when loading', () => {
    const wrapper = mount(Button, {
      props: { text: 'Click', loading: true }
    })
    expect(wrapper.find('.btn__spinner').exists()).toBe(true)
  })

  it('applies correct variant classes', () => {
    const wrapper = mount(Button, {
      props: { text: 'Click', variant: 'danger' }
    })
    expect(wrapper.classes()).toContain('btn--danger')
  })
})
