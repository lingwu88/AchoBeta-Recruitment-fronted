<script setup>
import { PropTypes } from '@/utils/propTypes';
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import scroollTo from '@/utils/scroollTo'
import  titleBlock from '@/components/titleBlock.vue'
import  navigationTop from '@/components/navigationTop.vue'

const router = useRouter()

const activities = defineProps({
  title:PropTypes.string.def('招新活动标题'),
  content:PropTypes.string.def('招新活动详情附件是打卡练腹肌绿卡的是捷克洛夫就爱看快放假啊拉开圣诞节分厘卡机了积分卡大家发了几十块的垃圾扣十分艰苦拉萨')
})

const toResume = ()=>{
  router.push('/activitiesLayout')
}

onMounted(()=>{
  scroollTo()
})
</script>

<template>
  <navigationTop class="top"></navigationTop>
  <n-card 
  :title="activities.title" 
  class="activities-layout"
  header-style="font-size:1.7rem;padding:0;margin:0 0 15px 3%;"
  content-style="padding:0;"
  >
  <template #default>
    <div>    
      <titleBlock title="招新活动详情" class="title"></titleBlock>
      <!-- <div class="activities-title">
        招新活动详情
        <div class="title-border"></div>
      </div> -->
      <div class="activities-content">{{ activities.content }}</div>
    </div>
  </template>
    <template #footer class="action">
      <n-button type="success" class="application-button" @click="toResume">
       投递简历
      </n-button>
    </template>
  </n-card>
</template>

<style scoped>
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.activities-layout :deep .n-card__footer{
  padding: 0;
}
.application-button{
  padding: 0;
  width: 90vw;
  height: 50px;
  margin: 0 auto 0 4.5vw;
}
.activities-layout{
  width: 100vw;
  height: 100vh;
  font-family: '楷体';
  background-color: rgb(239, 238, 238);
}
.title{
  margin: 0 0 0 4vw;
  font-size: 1.2rem;
}
.activities-title{
  font-size: 1.4rem;
  margin-bottom: 10px;
  margin: 0 0 0 5%;
}
.title-border{
  height: 1rem;
  width: 1vw;
  background-color: green;
  position: relative;
  left: -2vw;
  top: -4vh;
}
.activities-content{
  line-height: 1.4rem;
  font-size: 1.1rem;
  margin: 0 0 0 7%;
}
</style>
