<script setup>
import { PropTypes } from '@/utils/propTypes';

defineOptions({
  name:"activitiesCard"
})

const emit = defineEmits(['toApplication'])

const prop = defineProps({
  title:PropTypes.string.def('暂无招新活动'),
  description:PropTypes.string.def('暂无招新活动内容'),
  startTime:PropTypes.string.def('1999-7-7 12:12:12'),
  endTime:PropTypes.string.def('2100-1-1 5:20:99')
})

const toActivities=()=>{
  emit('toApplication')
}
</script>

<template>
  <div class="card" @click="toActivities">
    <n-flex vertical class="card-layout">
      <div class="title">{{ prop.title }}</div>
      <div class="description">{{ prop.description }}</div>
      <div class="time"><p>时间： <span>{{ prop.startTime }}</span> — <span>{{ prop.endTime }}</span></p></div>
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
</style>
