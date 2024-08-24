<script setup>
import { PropTypes } from '@/utils/propTypes';
import AngleDoubleRight from '@vicons/fa/AngleDoubleRight'
defineOptions({
  name:"activitiesCard"
})

const emit = defineEmits(['toApplication'])

const prop = defineProps({
  title:PropTypes.string.def('暂无招新批次'),
  batchId:PropTypes.number.def(1),
  endTime:PropTypes.string.def('2100-1-1 5:20:99')
})

const toActivities=()=>{
  emit('toApplication')
}
</script>

<template>
  <div class="card" @click="toActivities">
    <n-flex justify="start">
    <n-flex vertical class="card-layout">
      <div class="title">{{ prop.title }}</div>
      <div class="description"><span>招新批次:</span>{{ prop.batchId }}</div>
      <div class="time"><p>截止时间：<span>{{ prop.endTime }}</span></p></div>
    </n-flex>
    <n-icon :size="26" color="#db7b00">
      <AngleDoubleRight class="card-icon"/>
    </n-icon>
    </n-flex>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
.card{
  background-color: rgb(255, 255, 255);
  height: auto;
  width: 90vw;
  margin: 0 5vw 0 auto;
  font-family: "宋体";
  border-radius: 10px;
  box-shadow:  2px 9px 20px #d5d5d5;
  margin-bottom: 10px;
}
.card-layout{
  padding: 5%;
}
.title{
  font-size: 1rem;
  font-weight: bold;
}
.description{
  font-size: 0.8rem;
  font-weight: 400;
}
.time{
  font-size: 0.8rem;
  font-weight: 400;
}
.card-icon{
  flex-grow: 1;
  padding: 6.5vh 0 0 12vw;
}
</style>
