<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick, ref } from 'vue'
import './Modal.css'

const props = defineProps<{
  modelValue: boolean
  title?: string
  showClose?: boolean
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const modalContainerRef = ref<HTMLElement | null>(null)

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleEsc = (e: KeyboardEvent) => {
  if (props.closeOnEsc && e.key === 'Escape' && props.modelValue) close()
}

let removeTabListener: (() => void) | null = null

const setFocusTrap = () => {
  if (!modalContainerRef.value) return

  const focusable = modalContainerRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>

  if (focusable.length === 0) {
    modalContainerRef.value.setAttribute('tabindex', '-1')
    modalContainerRef.value.focus()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  first.focus()

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }

  document.addEventListener('keydown', handleTab)
  removeTabListener = () => document.removeEventListener('keydown', handleTab)
}

watch(
  () => props.modelValue,
  async (visible) => {
    if (visible) {
      await nextTick()
      setFocusTrap()
    } else {
      if (removeTabListener) {
        removeTabListener()
        removeTabListener = null
      }
    }
  },
  { immediate: true }
)

onMounted(() => window.addEventListener('keydown', handleEsc))
onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
  if (removeTabListener) removeTabListener()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay" @click.self.stop="closeOnOverlay && close()">
        <div ref="modalContainerRef" class="modal-container">
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button v-if="showClose" class="modal-close" @click="close()">✕</button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
