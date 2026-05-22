import type { Component, ShallowRef } from 'vue'

export interface ModalButton {
  text: string
  variant?: 'primary' | 'secondary' | 'danger'
  action: () => void
}

export interface ModalInstance<TProps = Record<string, unknown>, TResult = unknown> {
  id: string
  component: ShallowRef<Component>
  props?: TProps
  footer?: ModalButton[]
  resolve: (value: TResult) => void
  reject: (reason?: unknown) => void
}
