<script lang="ts" setup>
import { onMounted } from 'vue'
import navigationBottom from '@/components/navigationBottom.vue'
import navigationTop from '@/components/navigationTop.vue'
import scroollTo from '@/utils/scroollTo'

onMounted(()=>{
  scroollTo()
})
</script>

<template>
  <div class="activitiesLayout">
    <navigationTop class="top"></navigationTop>
    <routerView ></routerView>
    <navigationBottom class="navigation" ></navigationBottom>
  </div>
</template>

<style scoped>
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.activitiesLayout{
  width: 100vw;
  min-height: 100vh;
  background-color: #A1C4FD;
}
.navigation{
  position: sticky;
  bottom: 3vh;
  left: 5vw;
}
</style>
