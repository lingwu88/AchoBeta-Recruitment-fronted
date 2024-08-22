<script lang="ts" setup>
import navigationBottom from '@/components/navigationBottom.vue'
import navigationTop from '@/components/navigationTop.vue'
</script>

<template>
  <div class="activitiesLayout">
    <navigationTop></navigationTop>
    <routerView ></routerView>
    <navigationBottom class="navigation" ></navigationBottom>
  </div>
</template>

<style scoped>
.activitiesLayout{
  width: 100vw;
  min-height: 100vh;
  background-color: #A1C4FD;
}
.navigation{
  margin: 2vh 0 0 0 ;
  position: sticky;
  bottom: 3vh;
  left: 5vw;
}
</style>
