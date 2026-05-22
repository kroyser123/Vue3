<script setup lang="ts">
import { useModalStore } from '../stores/modalStore'
import NestedModal from './NestedModal.vue'

const props = defineProps<{ counter?: number }>()
const modalStore = useModalStore()
const currentCounter = props.counter ?? 1

const openNext = () => {
  modalStore.openModal(NestedModal, {
    title: `Окно №${currentCounter + 1}`,
    counter: currentCounter + 1
  })
}
</script>

<template>
  <div>
    <p>
      <strong>Номер окна: {{ currentCounter }}</strong>
    </p>
    <div style="display: flex; gap: 10px; margin-top: 16px">
      <button @click="openNext">Открыть ещё</button>
      <button @click="modalStore.closeModal()">Закрыть это окно</button>
      <button @click="modalStore.closeAll()">Закрыть все окна</button>
    </div>
  </div>
</template>
