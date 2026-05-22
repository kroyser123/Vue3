<script setup lang="ts">
/**
 * Компонент кнопки
 * Поддерживает несколько вариантов стилей, состояния disabled и loading
 */

interface Props {
  /** Текст кнопки (можно не указывать, если используется слот) */
  text?: string
  /** Вариант стиля */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Отключена ли кнопка */
  disabled?: boolean
  /** Режим загрузки */
  loading?: boolean
  /** Тип кнопки */
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  variant: 'primary',
  disabled: false,
  loading: false,
  type: 'button'
})

const emit = defineEmits<{
  /** Событие клика по кнопке */
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="['btn', `btn--${variant}`, { 'btn--loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="btn__spinner" aria-label="Загрузка"></span>
    <slot>{{ text }}</slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--primary {
  background: #42b883;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: #3aa876;
  transform: translateY(-1px);
}

.btn--secondary {
  background: #64748b;
  color: white;
}

.btn--secondary:hover:not(:disabled) {
  background: #56647b;
  transform: translateY(-1px);
}

.btn--danger {
  background: #ef4444;
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-1px);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--loading {
  cursor: wait;
}

.btn__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
