<script lang="ts" setup>
import navigation from '@/components/navigation.vue'
</script>

<template>
  <div class="activitiesLayout">
    <routerView></routerView>
    <navigation class="navigation"></navigation>
  </div>
</template>

<style scoped>
.activitiesLayout{
  width: 100vw;
  min-height: 100vh;
  background-color: #A1C4FD;
}
.navigation{
  position: fixed;
  bottom: 3vh;
  left: 5vw;
}
</style>
