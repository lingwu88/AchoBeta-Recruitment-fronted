<script lang="ts" setup>
// import { PropTypes } from '@/utils/propTypes';
// import { cardType } from '@/utils/cardType'
import AngleDoubleRight from '@vicons/fa/AngleDoubleRight'
defineOptions({
  name:"activitiesCard"
})

const emit = defineEmits(['toAnother'])

const prop = defineProps({
  cardMain:{
    type:Object,
    default: () => ({
      title: '暂无招新批次',
      content: '卡片内容',
      footer: '卡片底部内容'
    })
  }
})

const toAnother=()=>{
  emit('toAnother')
}
</script>

<template>
  <div class="card" @click="toAnother">
    <n-flex justify="start">
    <n-flex vertical class="card-layout">
      <div class="title">{{ prop.cardMain.title }}</div>
      <div class="description">{{ prop.cardMain.content }}</div>
      <div class="time"><p>{{ prop.cardMain.footer }}</p></div>
    </n-flex>
      <AngleDoubleRight class="card-icon"/>
    </n-flex>
  </div>
</template>

<style scoped>
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
  width:30vw;
  flex-grow: 1;
  padding: 5%;
  min-height: 10vh;
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
  flex-grow: 0.5;
  height: 10vmin;
  width: 10vmin;
  color: #e17a3a;
  padding: 5vh 0 0 0;
}

</style>
