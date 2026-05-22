import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../../src/components/modal/Modal.vue'

describe('Modal.vue', () => {
  let appContainer: HTMLElement

  beforeEach(() => {
    document.body.innerHTML = ''
    appContainer = document.createElement('div')
    appContainer.id = 'app'
    document.body.appendChild(appContainer)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('отображается когда modelValue = true', () => {
    mount(Modal, {
      props: { modelValue: true },
      attachTo: appContainer
    })
    const overlay = document.body.querySelector('.modal-overlay')
    expect(overlay).not.toBeNull()
  })

  it('не отображается когда modelValue = false', () => {
    mount(Modal, {
      props: { modelValue: false },
      attachTo: appContainer
    })
    const overlay = document.body.querySelector('.modal-overlay')
    expect(overlay).toBeNull()
  })

  it('отображает заголовок', () => {
    mount(Modal, {
      props: { modelValue: true, title: 'Тестовый заголовок' },
      attachTo: appContainer
    })
    const title = document.body.querySelector('.modal-title')
    expect(title?.textContent).toBe('Тестовый заголовок')
  })

  it('отображает крестик когда showClose=true', () => {
    mount(Modal, {
      props: { modelValue: true, showClose: true },
      attachTo: appContainer
    })
    const closeBtn = document.body.querySelector('.modal-close')
    expect(closeBtn).not.toBeNull()
  })

  it('не отображает крестик когда showClose=false', () => {
    mount(Modal, {
      props: { modelValue: true, showClose: false },
      attachTo: appContainer
    })
    const closeBtn = document.body.querySelector('.modal-close')
    expect(closeBtn).toBeNull()
  })

  it('эмитит update:modelValue и close при клике на крестик', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, showClose: true },
      attachTo: appContainer
    })

    const closeBtn = document.body.querySelector('.modal-close') as HTMLElement
    closeBtn.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('эмитит update:modelValue и close при клике на оверлей когда closeOnOverlay=true', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, closeOnOverlay: true },
      attachTo: appContainer
    })

    const overlay = document.body.querySelector('.modal-overlay') as HTMLElement
    overlay.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('не эмитит update:modelValue при клике на оверлей когда closeOnOverlay=false', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, closeOnOverlay: false },
      attachTo: appContainer
    })

    const overlay = document.body.querySelector('.modal-overlay') as HTMLElement
    overlay.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('эмитит update:modelValue и close при нажатии Escape когда closeOnEsc=true', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, closeOnEsc: true },
      attachTo: appContainer
    })

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    window.dispatchEvent(event)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('не эмитит update:modelValue при нажатии Escape когда closeOnEsc=false', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, closeOnEsc: false },
      attachTo: appContainer
    })

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    window.dispatchEvent(event)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
