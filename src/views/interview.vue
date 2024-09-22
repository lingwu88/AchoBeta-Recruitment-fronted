<script lang="ts" setup>
import titleBlock from '@/components/titleBlock.vue'
import ShareArrivalTimeSharp from '@vicons/material/ShareArrivalTimeSharp'
import { useRouter } from 'vue-router'
import { ref , onMounted} from 'vue'
import { interviewType } from '@/utils/type/interviewType.ts'
import { useStore } from '@/store/index'
import { useIdStore } from '@/store/idStore'
import { getInterview } from '@/api/api'
import { useMessage } from 'naive-ui'

const storage = useStore()
const idStore = useIdStore()
const router = useRouter()
const batchId = ref<number>()
const actId = ref<number>()
const message = useMessage()
const interviewList = ref<interviewType[]>([])

const toInterviewDetailed=(id:number)=>{
  idStore.setInterviewId(id.toString())
  router.push('/activitiesLayout/interviewDetailed')
}

onMounted(()=>{
  if(idStore.getBatchId()!=null){
    batchId.value = parseInt((idStore.getBatchId() as string))
  }
  else{
    message.warning('请回到首页选择批次!')
  } 

  if(idStore.getActId()!=null){
    actId.value = parseInt((idStore.getActId() as string))
  }
  else{
    message.warning('请回到活动选择页面选择活动!')
  }
  //如果都有，则进行调用接口
  getInterview(storage.token,
  {
    batchId:(batchId.value as number),
    actId:(actId.value as number)
  }).then(res=>{
    console.log(res.data.data);
    res.data.data.forEach((item:{
      id:number,
      status:number,
      title:string,
    }) => {
      interviewList.value.push({
        interviewId:item.id,
        title:item.title,
        status:item.status
      })
    });
  }).catch(err=>{
    console.log(err);
  })
})

const switchStatus=(status:number)=>{
  switch (status) {
    case 0:
      return '未开始'
    case 1:
      return '进行中'
    case 2:
      return '已结束'
  }
}

const switchIcon=(status:number)=>{
  switch(status){
    case 0:
      return {
        'grayIcon':true
      }
    case 1:
      return {
        'yellowIcon':true
      }
    case 2:
      return {
        'greenIcon':true
      }
  }
}
</script>

<template>
  <div class="interview-layout">
    <titleBlock title="我的面试" class="interviewMine"></titleBlock>
    <n-collapse arrow-placement="right" class="interview-collapse">
      <n-collapse-item title="面试一览" name="1">
        <n-flex vertical class="flex-layout">
          <div v-for="item in interviewList">
            <n-flex class="interview-flex-layout" justify="space-between">
              <p class="interview-content-left">{{ item.title }}</p>
              <n-flex vertical :wrap=false class="interview-content-right">
                <ShareArrivalTimeSharp :class="switchIcon(item.status)" class="icon"/>
                <p>{{ switchStatus(item.status) }}</p>
              </n-flex>
              <n-button type="primary" class="interview-button" @click="toInterviewDetailed((item.interviewId as number))">查看</n-button>
            </n-flex>
          </div>
        </n-flex>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style scoped>
.interview-layout{
  min-height:80vh;
}
.interviewMine{
  padding:2vh 0 0 3vw
}
.interview-collapse{
  width: 90vw;
  margin: 0 auto 0 5vw;
  background-color: white;
  border-radius: 10px;
  border: 0;
  box-shadow: 0 0 10px rgb(185, 193, 214)  ;
  font-family: '楷体';
  padding: 0;
}
.interview-collapse :deep .n-collapse-item__header-main{
  font-size: 1.1rem;
  height: 8vh;
  padding: 0 0 0 3vw;
}
.interview-collapse :deep .n-collapse-item__content-inner{
  padding: 0 0 0 0!important;
}
.flex-layout{
  width: 80vw;
}
.interview-flex-layout{
 margin: 0 0 0 5vw;
 min-height: 5vh;
}
.interview-content-right{
  min-height: 4vh;
  gap:0 0!important;
}
.interview-content-left{
  width:50%;
  font-size:1.1rem;
  padding:2vh 0 0 0;
  flex-grow: 1;
}
.icon{
  transform: rotate(180deg);
}
.grayIcon{
  color: gray;
}
.yellowIcon{
  color: #d4d64f;
}
.greenIcon{
  color:rgb(18, 189, 69);
}
.interview-button{
  margin: 2vh 0 0 0;
}
</style>