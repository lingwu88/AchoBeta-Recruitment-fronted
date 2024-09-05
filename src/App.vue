<script setup lang="ts">
// import { createDiscreteApi } from 'naive-ui'
// const {message} = createDiscreteApi(['message'])
</script>

<template>
  <n-message-provider placement="top" :max='3'>
    <routerView></routerView>
  </n-message-provider>
</template>

<style scoped>
</style>
