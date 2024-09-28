<script lang="ts" setup>
// import {  useRoute } from 'vue-router'
import { onMounted , ref } from 'vue'
// import { Activity } from '@/utils/type/activity'
import scroollTo from '@/utils/scroollTo'
import { Activity } from '@/utils/type/activity'
import  titleBlock from '@/components/titleBlock.vue'
// import { deCode } from '@/utils/URIProtect'
import { useStore } from '@/store/index'
import { useIdStore } from '@/store/idStore'
import { useMessage } from 'naive-ui'
import { getTemplate } from '@/api/api'

const message = useMessage()
const storage = useStore()
const idStore = useIdStore()
const actId = ref<string>('')
// const params = useRoute().query
const activities = ref<Activity>({
  id:null,
  paperId:null,
  target:{
    anyMatch:{
      grade:null,
      useId:null
    },
    allMatch:{
      status:null
    }
  },
  title:null,
  description:null,
  isRun:null,
  deadline:null,
  createTime:null
})

onMounted(()=>{
  scroollTo()
  if(idStore.getActId()!=null){         //如果为空，可能性1：路由跳转的原因，2：直接访问
    actId.value = (idStore.getActId() as string) 
  }
  else
    message.warning('请先选择你的招新活动!!')
  getTemplate(actId.value,storage.token).then(res=>{
    console.log(res);
    if(res.data.code===200){
      activities.value.id = res.data.data.recruitmentActivityVO.id,
      activities.value.paperId = res.data.data.recruitmentActivityVO.paperId,
      // activities.value. = res.data.data.id,            //复杂数据该如何处理？
      activities.value.title = res.data.data.recruitmentActivityVO.title,
      activities.value.description = res.data.data.recruitmentActivityVO.description,
      activities.value.isRun = res.data.data.recruitmentActivityVO.isRun,
      activities.value.deadline = res.data.data.recruitmentActivityVO.deadline,
      activities.value.createTime = res.data.data.recruitmentActivityVO.createTime
    }
  }).catch(err=>{
    console.log(err);
  })
})
</script>

<template>
    <div class="acApplication-layout">   
      <titleBlock :title="activities.title !=null?activities.title:'活动获取出错'" class="title"></titleBlock>
      <div class="activity-card">
        <div class="activities-content">
            <p class="activities-title">活动时间:</p>
            <p class="activities-description time"><span>{{ activities.createTime }} — </span><span>{{ activities.deadline }}</span></p>
        </div>
        <div class="activities-content">
            <p class="activities-title">活动详情:</p>
            <p class="last-activities-description detailed" >{{ activities.description }}</p>
        </div>
      </div>
    </div>
</template>

<style scoped>
.acApplication-layout{
  min-height: 75vh;
  padding: 6vh 0 0 0;
  box-sizing: border-box;
}
.layout{
  width: 100vw;
  font-family: '楷体';
  background-color: inherit
}
.title{
  margin: 0 0 4vh 4vw;
  font-size: 1.2rem;
}
.time{
  font-size: 0.8rem;
}
.title-border{
  height: 1rem;
  width: 1vw;
  background-color: green;
  position: relative;
  left: -2vw;
  top: -4vh;
}
.activity-card{
  width: 90vw;
  min-height: 20vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(185, 193, 214) ;
  margin: 0 auto 0 5vw;
}
.activities-content{
  font-family: '楷体';
  font-size: 1.1rem;
}
.activities-title{
  padding: 2vh 0 0 3vw;
  font-size: 1.2rem;
}
.activities-description{
  width: 75vw;
  padding: 1vh 0 0 8vw;
}
.last-activities-description{
  width:75vw;
  padding: 1vh 0 2vh 8vw;
}
.detailed{
  line-height: 1.5rem;
  font-size: 1.2rem;
}
/* .activities-content{
  width:80vw;
  line-height: 1.4rem;
  font-size: 1.1rem;
  margin: 0 0 0 7%;
} */
</style>