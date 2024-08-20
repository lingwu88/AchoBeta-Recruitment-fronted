<script setup>
import { PropTypes } from '@/utils/propTypes';
const activities = defineProps({
  title:PropTypes.string.def('招新活动标题'),
  content:PropTypes.string.def('招新活动详情附件是打卡练腹肌绿卡的是捷克洛夫就爱看快放假啊拉开圣诞节分厘卡机了积分卡大家发了几十块的垃圾扣十分艰苦拉萨')
})
</script>

<template>
  <n-card 
  :title="activities.title" 
  class="activities-layout"
  header-style="font-size:1.7rem;padding:0;margin:0 0 15px 3%;"
  content-style="padding:0;"
  >
  <template #default>
    <div class="activities-title">招新活动详情</div>
    <div class="activities-content">{{ activities.content }}</div>
  </template>
    <template #action>
      <n-button type="success" class="application-button">
       投递简历
      </n-button>
    </template>
  </n-card>
</template>

<style scoped>
.activities-layout ::v-deep .n-card__action{
  padding: 0;
}
.application-button{
  padding: 0;
  width: 90vw;
  height: 50px;
  margin: 0 3vw 0 4vw;
}
.activities-layout{
  width: 100vw;
  height: 100vh;
  font-family: '楷体';
}
.activities-title{
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin: 0 0 10px 3%;
}
.activities-content{
  line-height: 1.4rem;
  font-size: 1.2rem;
  margin: 0 0 0 5%;
}
</style>
