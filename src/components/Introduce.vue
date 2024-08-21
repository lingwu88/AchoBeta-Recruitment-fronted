<script setup>
import {ref} from 'vue'
defineOptions({
  name:'Introduce'
})
</script>

<template>
   <n-card  
    content-style="padding:0;"
    class="introduce-box"
    >
    <n-flex vertical class="layout">
      <slot name="english-title"></slot>
      <slot name="chinese-title"></slot>
      <slot name="content"></slot>
    </n-flex>
  </n-card>
</template>

<style scoped>
.introduce-box{
  width: 100vw;
  height:auto;
  background-color: inherit;
}
</style>
