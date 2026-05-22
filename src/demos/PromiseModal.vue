<script setup lang="ts">
import { useModalStore } from '../stores/modalStore'

const props = defineProps<{
  resolve?: (value: boolean) => void
}>()

const modalStore = useModalStore()

const confirm = () => {
  props.resolve?.(true)
  modalStore.closeModal()
}

const cancel = () => {
  props.resolve?.(false)
  modalStore.closeModal()
}
</script>

<template>
  <div>
    <p>Это модальное окно с возвратом результата через Promise.</p>
    <p>Нажмите "Да" — получите true, "Нет" — false.</p>
    <div style="display: flex; gap: 10px; margin-top: 16px; justify-content: flex-end">
      <button @click="cancel">Нет</button>
      <button @click="confirm">Да</button>
    </div>
  </div>
</template>
