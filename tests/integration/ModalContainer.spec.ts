import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useModalStore } from '../../src/stores/modalStore'
import ModalContainer from '../../src/components/modal/ModalContainer.vue'
import SimpleModal from '../../src/demos/SimpleModal.vue'
import ConfirmModal from '../../src/demos/ConfirmModal.vue'

describe('ModalContainer Integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.body.innerHTML = ''
  })

  it('отображает активную модалку', async () => {
    const store = useModalStore()
    store.openModal(SimpleModal, { title: 'Тест' })

    mount(ModalContainer, {
      global: { plugins: [createPinia()] }
    })

    await new Promise((resolve) => setTimeout(resolve, 50))

    const title = document.body.querySelector('.modal-title')
    expect(title?.textContent).toBe('Тест')
  })

  it('рендерит footer кнопки если они переданы', async () => {
    const store = useModalStore()
    store.openModal(ConfirmModal, { title: 'Подтверждение' }, [
      { text: 'Отмена', variant: 'secondary', action: () => {} },
      { text: 'Удалить', variant: 'danger', action: () => {} }
    ])

    mount(ModalContainer, {
      global: { plugins: [createPinia()] }
    })

    await new Promise((resolve) => setTimeout(resolve, 50))

    const buttons = document.body.querySelectorAll('.modal-footer button')
    expect(buttons.length).toBe(2)
    expect(buttons[0].textContent).toBe('Отмена')
    expect(buttons[1].textContent).toBe('Удалить')
  })

  it('закрывает модалку при клике на кнопку в footer', async () => {
    let closed = false
    const store = useModalStore()
    store.openModal(ConfirmModal, { title: 'Подтверждение' }, [
      {
        text: 'Закрыть',
        variant: 'secondary',
        action: () => {
          store.closeModal()
          closed = true
        }
      }
    ])

    mount(ModalContainer, {
      global: { plugins: [createPinia()] }
    })

    await new Promise((resolve) => setTimeout(resolve, 50))

    const closeBtn = document.body.querySelector('.modal-footer button') as HTMLElement
    closeBtn.click()

    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(closed).toBe(true)
    expect(store.count).toBe(0)
  })
})
