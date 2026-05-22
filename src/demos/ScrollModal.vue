<template>
  <div style="max-height: 300px;">
    <p v-for="i in 20" :key="i">Строка {{ i }}: Это тестовая строка.</p>
  </div>
</template>