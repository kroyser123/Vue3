import { describe, it, expect } from 'vitest'
import { useModalStack } from '../../src/composables/useModalStack'
import SimpleModal from '../../src/demos/SimpleModal.vue'

describe('useModalStack', () => {
  it('добавляет окно в стек при open', () => {
    const { open, stack, count } = useModalStack()
    open(SimpleModal)
    expect(count.value).toBe(1)
    expect(stack.value.length).toBe(1)
  })

  it('увеличивает счётчик при нескольких окнах', () => {
    const { open, count } = useModalStack()
    open(SimpleModal)
    open(SimpleModal)
    open(SimpleModal)
    expect(count.value).toBe(3)
  })

  it('удаляет активное окно при close без id', () => {
    const { open, close, count } = useModalStack()
    open(SimpleModal)
    expect(count.value).toBe(1)
    close()
    expect(count.value).toBe(0)
  })

  it('закрывает все окна при closeAll', () => {
    const { open, closeAll, count } = useModalStack()
    open(SimpleModal)
    open(SimpleModal)
    open(SimpleModal)
    expect(count.value).toBe(3)
    closeAll()
    expect(count.value).toBe(0)
  })

  it('закрывает конкретное окно по id', () => {
    const { open, close, stack, count } = useModalStack()
    open(SimpleModal)
    open(SimpleModal)
    open(SimpleModal)

    expect(count.value).toBe(3)

    const ids = stack.value.map((m) => m.id)
    close(ids[1])

    expect(count.value).toBe(2)
    expect(stack.value.map((m) => m.id)).not.toContain(ids[1])
  })

  it('не закрывает окно если передан неверный id', () => {
    const { open, close, count } = useModalStack()
    open(SimpleModal)
    open(SimpleModal)
    expect(count.value).toBe(2)

    close('non-existent-id')
    expect(count.value).toBe(2)
  })

  it('открывает окно с props', () => {
    const { open, activeModal } = useModalStack()
    open(SimpleModal, { title: 'Тест', custom: 123 })
    expect(activeModal.value?.props?.title).toBe('Тест')
    expect(activeModal.value?.props?.custom).toBe(123)
  })

  it('открывает окно с footer', () => {
    const { open, activeModal } = useModalStack()
    const footer = [{ text: 'OK', variant: 'primary' as const, action: () => {} }]
    open(SimpleModal, {}, footer)
    expect(activeModal.value?.footer).toEqual(footer)
  })

  it('возвращает Promise при открытии', () => {
    const { open } = useModalStack()
    const promise = open(SimpleModal)
    expect(promise).toBeInstanceOf(Promise)
  })

  it('activeModal возвращает последнее открытое окно', () => {
    const { open, activeModal } = useModalStack()
    open(SimpleModal, { title: 'Первое' })
    open(SimpleModal, { title: 'Второе' })
    open(SimpleModal, { title: 'Третье' })

    expect(activeModal.value?.props?.title).toBe('Третье')
  })

  it('closeAll удаляет все окна из стека', () => {
    const { open, closeAll, stack } = useModalStack()
    open(SimpleModal)
    open(SimpleModal)
    open(SimpleModal)

    closeAll()

    expect(stack.value.length).toBe(0)
  })
})
