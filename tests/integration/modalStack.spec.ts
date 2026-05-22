import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useModalStore } from '../../src/stores/modalStore'
import ModalContainer from '../../src/components/modal/ModalContainer.vue'
import SimpleModal from '../../src/demos/SimpleModal.vue'

describe('Modal Stack Integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('отображает активную модалку', async () => {
    const store = useModalStore()
    store.openModal(SimpleModal, { title: 'Тестовое окно' })

    const wrapper = mount(ModalContainer, {
      global: {
        plugins: [createPinia()]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.modal-container').exists()).toBe(true)
    expect(wrapper.find('.modal-title').text()).toBe('Тестовое окно')
  })

  it('не отображает модалку когда стек пуст', () => {
    const wrapper = mount(ModalContainer, {
      global: {
        plugins: [createPinia()]
      }
    })
    expect(wrapper.find('.modal-container').exists()).toBe(false)
  })

  it('закрывает модалку по клику на крестик', async () => {
    const store = useModalStore()
    store.openModal(SimpleModal, { title: 'Тест' })

    const wrapper = mount(ModalContainer, {
      global: {
        plugins: [createPinia()]
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.find('.modal-close').trigger('click')
    await wrapper.vm.$nextTick()

    expect(store.count).toBe(0)
    expect(wrapper.find('.modal-container').exists()).toBe(false)
  })
})
