import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useModalStore } from '../../src/stores/modalStore'
import SimpleModal from '../../src/demos/SimpleModal.vue'

describe('modalStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('открывает модальное окно', () => {
    const store = useModalStore()
    store.openModal(SimpleModal, { title: 'Тест' })
    expect(store.count).toBe(1)
    expect(store.activeModal?.props?.title).toBe('Тест')
  })

  it('открывает несколько окон в стек', () => {
    const store = useModalStore()
    store.openModal(SimpleModal, { title: 'Окно 1' })
    store.openModal(SimpleModal, { title: 'Окно 2' })
    expect(store.count).toBe(2)
    expect(store.activeModal?.props?.title).toBe('Окно 2')
  })

  it('закрывает активное окно', () => {
    const store = useModalStore()
    store.openModal(SimpleModal, { title: 'Окно 1' })
    store.openModal(SimpleModal, { title: 'Окно 2' })
    store.closeModal()
    expect(store.count).toBe(1)
    expect(store.activeModal?.props?.title).toBe('Окно 1')
  })

  it('закрывает все окна', () => {
    const store = useModalStore()
    store.openModal(SimpleModal)
    store.openModal(SimpleModal)
    store.openModal(SimpleModal)
    store.closeAll()
    expect(store.count).toBe(0)
    expect(store.activeModal).toBeNull()
  })

  it('открывает окно с footer кнопками', () => {
    const store = useModalStore()
    const footer = [{ text: 'OK', action: () => {} }]
    store.openModal(SimpleModal, { title: 'Тест' }, footer)
    expect(store.activeModal?.footer).toEqual(footer)
  })
})
