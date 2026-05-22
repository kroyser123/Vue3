import { defineStore } from 'pinia'
import { useModalStack } from '../composables/useModalStack'
import type { Component } from 'vue'
import type { ModalButton } from '../types/modal'

export const useModalStore = defineStore('modal', () => {
  const modalStack = useModalStack()

  const openModal = <
    TProps extends Record<string, unknown> = Record<string, unknown>,
    TResult = unknown
  >(
    component: Component,
    props?: TProps,
    footer?: ModalButton[]
  ): Promise<TResult> => {
    return modalStack.open(component, props, footer)
  }

  const closeModal = (id?: string) => {
    modalStack.close(id)
  }

  const closeAll = () => {
    modalStack.closeAll()
  }

  return {
    stack: modalStack.stack,
    activeModal: modalStack.activeModal,
    count: modalStack.count,
    openModal,
    closeModal,
    closeAll
  }
})
