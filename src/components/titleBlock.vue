<script lang="ts" setup>
import { PropTypes } from '@/utils/propTypes';
defineOptions({
  name:'titleBlock'
})
const prop=defineProps({
  title:PropTypes.string.def('标题')
})
</script>

<template>
  <div>
    <p class="title">{{ prop.title }}</p>
    <div class="title-border"></div>
  </div>
</template>

<style scoped>
.title{
  font-size: 1.1rem;
}
.title-border{
  height: 1rem;
  width: 1vw;
  background-color: green;
  position: relative;
  left: -2vw;
  top: -3.5vh;
}
</style>
