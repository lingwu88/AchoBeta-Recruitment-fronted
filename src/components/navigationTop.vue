<script lang="ts" setup>
defineOptions({
  name:'navigationTop'
})
</script>

<template>
  <div class="navigationTop">
    <n-flex 
      class="flex-layout"
      justify="space-between"
    >
      <n-avatar
      :size="45"
      src="../src/assets/achobeta.jpg"
      class="avatar-left"
      />
      <n-avatar
      round
      size="medium"
      src="../src/assets/avatar.jpg"
      class="avatar-right"
      />
      </n-flex>
  </div>
</template>

<style scoped>
.navigationTop{
  height: 7vh;
  width: 100vw;
  background-color: rgb(243, 243, 243);
}
.flex-layout{
  width: 100%;
}
.avatar-left{
  margin: 0 0 0 5vw;
}
.avatar-right{
  margin:0.5vh 10vw 0 0;
}
</style>
