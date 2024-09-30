<script lang="ts" setup>
import Bulb from '@vicons/tabler/Bulb'
import { ref,onMounted } from 'vue'
import { statusList, eventList, resumeProcess } from '@/utils/type/processType.ts' 
import { getStatusList, getEventList, getResumeStatus } from '@/api/api' 
import { useStore } from '@/store/index'
import { useIdStore } from '@/store/idStore.ts'
import { useMessage } from 'naive-ui'
import navigationTop from '@/components/navigationTop.vue'

const statuslist = ref<statusList[]>([])              //对应码号，说明简历的状态（待筛之类？其实我认为两者概念似乎倒转了）
const eventlist = ref<eventList[]>([])                //对应码号，说明简历所处事件状态
const resumeprocess = ref<resumeProcess[]>([])
const eventColor = ['green','green','red','gray','yellow','yellow','green']    //为事件状态创建对应颜色表，每个下标的事件代表的不同的颜色（目前有4大类颜色）
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
  // return eventColor[id]
  return {
    [eventColor[id]]:true
  }
}
</script>

<template>
  <navigationTop class="top"></navigationTop>
  <div class="process-layout">
      <n-card  
      content-style="padding:0 0 0 2vw;"
      class="box"
      >
        <n-timeline :icon-size="30">
        <n-timeline-item 
          v-for="item in resumeprocess"
          :title="statuslist[(item.resumeStatus as number)].message + ' ( ' + eventlist[(item.resumeEvent as number -1)].description + ' ) '"
          :time="item.createTime"
          line-type="dashed"
          class="icon"
        >
          <template #icon>
            <n-icon >
              <Bulb  :class='[swtichStatus((item.resumeEvent as number -1))]'/>
            </n-icon>
          </template>
        </n-timeline-item>
      </n-timeline>
    </n-card>
  </div>
</template>

<style scoped>
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.process-layout{
  width:100vw;
  padding:2vh 0 2vh 0;
  min-height:80vh;
  box-sizing: border-box;
}
.box{
  width: 90vw;
  margin: 0 5vw 0 auto;
  border-width: none;
  border-color: white;
  box-shadow:0 0 20px #b5b2b2;
  padding: 4vh 0 4vh 0;
  border-radius: 20px;
}
.icon{
  margin: 0 0 0 2vw;
}
.green{
  color:green;
}
.red{
  color: red;
}
.gray{
  color: #b5b2b2;
}
.yellow{
  color: #f5cd4a;
}
</style>
