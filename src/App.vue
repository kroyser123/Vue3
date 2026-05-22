<script setup lang="ts">
import ModalContainer from './components/modal/ModalContainer.vue'
import DemoPage from './demos/DemoPage.vue'

const showDemo = true
</script>

<template>
  <DemoPage v-if="showDemo" />
  <div v-else><h1>Основное приложение</h1></div>
  <ModalContainer />
</template>
