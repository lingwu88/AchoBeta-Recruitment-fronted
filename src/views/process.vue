<script lang="ts" setup>
// import ArrowAutofitUp20Filled from '@vicons/fluent/ArrowAutofitUp20Filled'
// import Number1 from '@vicons/carbon/Number1'
// import Number2 from '@vicons/carbon/Number2'
// import Number3 from '@vicons/carbon/Number3'
import Bulb from '@vicons/tabler/Bulb'
import { ref,onMounted } from 'vue'
import { statusList, eventList, resumeProcess } from '@/utils/type/processType.ts' 
import { getStatusList, getEventList, getResumeStatus } from '@/api/api' 
import { useStore } from '@/store/index'
import { useIdStore } from '@/store/idStore.ts'
import { useMessage } from 'naive-ui'
// defineOptions({
//   name:'processIntroduce'
// })
const statuslist = ref<statusList[]>([])              //对应码号，说明简历的状态（待筛之类？其实我认为两者概念似乎倒转了）
const eventlist = ref<eventList[]>([])                //对应码号，说明简历所处事件状态
const resumeprocess = ref<resumeProcess[]>([])
const storage = useStore()
const idStore = useIdStore()
const message = useMessage()

onMounted(async()=>{
  let batchId:string = ''
  if(idStore.getBatchId()!=null){     //如果地址栏不为空
    batchId = (idStore.getBatchId() as string)
  }
  else{
    message.error('请先选择你的招新批次!!!')
  }

  await  getStatusList(storage.token).then(res=>{
    if(res.data.code===200){
      console.log(res);
      res.data.data.forEach((item:statusList)=>{
        statuslist.value.push({
          code:item.code,
          message:item.message
        })
      })
    }
    else{
      message.warning(res.data.message)
    }
  })

  await  getEventList(storage.token).then(res=>{
    if(res.data.code===200){
      console.log(res);
      
      res.data.data.forEach((item:eventList)=>{
        eventlist.value.push({
          event:item.event,
          description:item.description
        })
      })
    }
    else{
      message.warning(res.data.message)
    }
  })

  getResumeStatus(storage.token,batchId).then(res=>{
    if(res.data.code===200){
      console.log(res);
      
      res.data.data.forEach((item:resumeProcess)=>{
        resumeprocess.value.push({
          resumeStatus:item.resumeStatus,
          resumeEvent:item.resumeEvent,
          createTime:item.createTime
        })
      })
    }
    else{
      message.warning(res.data.message)
    }
  })
})

const swtichStatus = (id:number)=>{
  return 'green'
}
</script>

<template>
  <div class="process-layout">
      <n-card  
      content-style="padding:0 0 0 2vw;"
      class="box"
      >
        <n-timeline :icon-size="30">
        <n-timeline-item 
          v-for="item in resumeprocess"
          :color="swtichStatus((item.resumeEvent as number))"
          :title="statuslist[(item.resumeStatus as number)].message"
          :time="item.createTime"
          line-type="dashed"
          class="icon"
        >
          <template #icon>
            <n-icon >
              <Bulb />
            </n-icon>
          </template>
        </n-timeline-item>

        <!-- <n-timeline-item
          line-type="dashed"
          type="success"
          title="初试"
          time="2018-04-03 20:46"
          class="icon"
        >
          <template #icon>
            <n-icon>
              <Number1 />
            </n-icon>
          </template>
        </n-timeline-item>
        <n-timeline-item 
        type="success" 
        title="复试"
        time="2018-04-03 20:46"
        line-type="dashed"
        color="blue"
        class="icon"
        >
          <template #icon>
            <n-icon>
              <Number2 />
            </n-icon>
          </template>
        </n-timeline-item>
        <n-timeline-item
          type="warning"
          title="终试"
          time="2018-04-03 20:46"
          class="icon"
        >
          <template #icon>
            <n-icon>
              <Number3 />
            </n-icon>
          </template>
        </n-timeline-item> -->
      </n-timeline>
    </n-card>
  </div>
</template>

<style scoped>
.process-layout{
  padding:2vh 0 0 0;
  min-height:80vh;
  box-sizing: border-box;
}
.box{
  width: 90vw;
  border-width: none;
  border-color: white;
  box-shadow:0 0 20px #b5b2b2;
  margin:0 5vw 0 auto;
  padding: 4vh 0 4vh 0;
  border-radius: 20px;
}
.icon{
  margin: 0 0 0 2vw;
}
</style>
