<script setup lang="ts">
defineOptions({
  name:'navigationBottom'
})
</script>

<template>
  <div class="white-circle">
    <n-flex class="layout"
      justify="space-around"
    >
      <div class="icon">你好</div>
      <div class="icon">你好</div>
      <div class="icon">你好</div>
    </n-flex>
  </div>
</template>

<style scoped>
.white-circle{
  width: 90vw;
  height: 10vh;
  background-color: white;
  margin: 0 5vw 0 auto;
  border-radius: 40px;
}
.layout{
  width: 80vw;
  height: 6vh;
  padding: 2vh;
}
.icon{
  width: 17vw;
  height: 6vh;
  background-color: purple;
}
</style>
