<script setup lang="ts">
import { watch, nextTick } from 'vue'
import { useModalStore } from '../../stores/modalStore'
import Modal from './Modal.vue'
import Button from '../common/button.vue'

const modalStore = useModalStore()
let closing = false
let lastFocused: HTMLElement | null = null

const handleClose = () => {
  if (closing) return
  const active = modalStore.activeModal
  if (active) {
    closing = true
    modalStore.closeModal(active.id)
    nextTick(() => {
      closing = false
    })
  }
}

watch(
  () => modalStore.activeModal,
  (now, before) => {
    if (now && !before) {
      lastFocused = document.activeElement as HTMLElement
    }
    if (!now && before) {
      nextTick(() => {
        if (lastFocused) {
          lastFocused.focus()
          lastFocused = null
        }
      })
    }
  }
)

watch(
  () => modalStore.count,
  (newCount, oldCount) => {
    if (newCount > 0 && oldCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else if (newCount === 0) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }
)
</script>

<template>
  <Modal
    v-if="modalStore.activeModal"
    :model-value="true"
    :title="String(modalStore.activeModal.props?.title ?? '')"
    :show-close="true"
    :close-on-overlay="true"
    :close-on-esc="true"
    @update:modelValue="handleClose"
  >
    <component
      :is="modalStore.activeModal.component"
      v-bind="modalStore.activeModal.props"
      :resolve="modalStore.activeModal.resolve"
      :key="modalStore.activeModal.id"
    />
    <template #footer>
      <Button
        v-for="(btn, idx) in modalStore.activeModal.footer"
        :key="idx"
        :text="btn.text"
        :variant="btn.variant"
        @click="btn.action"
      />
    </template>
  </Modal>
</template>
