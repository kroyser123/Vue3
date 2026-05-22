<script setup lang="ts">
import { useModalStore } from '../stores/modalStore'
import Button from '../components/common/button.vue'
import SimpleModal from './SimpleModal.vue'
import ScrollModal from './ScrollModal.vue'
import TallModal from './TallModal.vue'
import NestedModal from './NestedModal.vue'
import ConfirmModal from './ConfirmModal.vue'
import PromiseModal from './PromiseModal.vue'

const modalStore = useModalStore()

const openConfirm = () => {
  modalStore.openModal(ConfirmModal, { title: 'Подтверждение' }, [
    { text: 'Отмена', variant: 'secondary', action: () => modalStore.closeModal() },
    {
      text: 'Удалить',
      variant: 'danger',
      action: () => {
        console.log('Удалено!')
        modalStore.closeModal()
      }
    }
  ])
}

const openPromiseModal = async () => {
  try {
    const result = await modalStore.openModal(PromiseModal, { title: 'Promise Demo' })
    console.log('Результат из модалки (raw):', result)
    console.log('Тип результата:', typeof result)
    console.log('Результат как boolean:', Boolean(result))

    if (result === true) {
      alert('Вы выбрали: ДА')
    } else if (result === false) {
      alert('Вы выбрали: НЕТ')
    } else {
      alert('Вы закрыли окно (результат не получен)')
    }
  } catch (error) {
    console.error('Ошибка:', error)
  }
}
</script>

<template>
  <div class="demo-page">
    <div class="demo-header">
      <h1>Система модальных окон</h1>
      <p class="demo-badge">Demo Mode (только для разработки)</p>
    </div>

    <div class="demo-stats">
      <div class="stat-card">
        <span class="stat-label">Активных окон:</span>
        <span class="stat-value">{{ modalStore.count }}</span>
      </div>
    </div>

    <div class="demo-buttons">
      <Button
        text="Простое окно"
        @click="modalStore.openModal(SimpleModal, { title: 'Простое окно' })"
      />
      <Button
        text="Окно со скроллом"
        variant="secondary"
        @click="modalStore.openModal(ScrollModal, { title: 'Скролл внутри' })"
      />
      <Button
        text="Высокое окно"
        variant="secondary"
        @click="modalStore.openModal(TallModal, { title: 'Страничный скролл' })"
      />
      <Button
        text="Стек окон"
        variant="danger"
        @click="modalStore.openModal(NestedModal, { title: 'Окно №1', counter: 1 })"
      />
      <Button text="Окно с подтверждением" variant="primary" @click="openConfirm" />
      <Button text="Promise Demo" variant="primary" @click="openPromiseModal" />
    </div>

    <div class="demo-info">
      <h3>Как это работает:</h3>
      <ul>
        <li>Модальные окна поддерживают стек (очередь)</li>
        <li>Закрытие по Escape, клику на оверлей или крестик</li>
        <li>Автоматический trap focus для accessibility</li>
        <li>Promise-based API для получения результатов</li>
        <li>Footer с кастомными кнопками действий</li>
      </ul>
    </div>
  </div>
</template>

<style scoped src="./demo.css"></style>
