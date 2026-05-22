import { ref, computed, shallowRef } from 'vue'
import type { Component } from 'vue'
import type { ModalInstance, ModalButton } from '../types/modal'

export function useModalStack() {
  const stack = ref<ModalInstance[]>([])

  const activeModal = computed(() => stack.value[stack.value.length - 1] ?? null)
  const count = computed(() => stack.value.length)

  const open = <
    TProps extends Record<string, unknown> = Record<string, unknown>,
    TResult = unknown
  >(
    component: Component,
    props?: TProps,
    footer?: ModalButton[]
  ): Promise<TResult> => {
    return new Promise((resolve, reject) => {
      const id = crypto.randomUUID()
      stack.value.push({
        id,
        component: shallowRef(component),
        props: props as Record<string, unknown>,
        footer,
        resolve: resolve as (value: unknown) => void,
        reject
      } as ModalInstance)
    })
  }

  const close = (id?: string) => {
    if (id) {
      const index = stack.value.findIndex((m) => m.id === id)
      if (index !== -1) {
        stack.value[index].resolve(null)
        stack.value.splice(index, 1)
      }
    } else {
      const modal = stack.value.pop()
      modal?.resolve(null)
    }
  }

  const closeAll = () => {
    while (stack.value.length) {
      const modal = stack.value.pop()
      modal?.resolve(null)
    }
  }

  return {
    stack,
    activeModal,
    count,
    open,
    close,
    closeAll
  }
}
