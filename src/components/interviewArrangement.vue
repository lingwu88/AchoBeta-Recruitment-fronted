<script lang="ts" setup>
import { ref ,onMounted } from 'vue'
import titleBlock from '@/components/titleBlock.vue'
import { useStore } from '@/store/index'
import { useIdStore } from '@/store/idStore'
import { useMessage } from 'naive-ui'
import { getInterviewDetail } from '@/api/api'
import { interviewArrangement } from '@/utils/type/interviewArrangementType.ts'
import { splitTime } from '@/utils/splitTime'

defineOptions({
  name:'interviewArrangement'
})

const interviewId = ref<string>('')
const storage = useStore()
const idStore = useIdStore()
const message = useMessage()
const arrangement = ref<interviewArrangement>({
  time:'',
  address:'',
  description:''
})



onMounted(()=>{
  if(idStore.getInterviewId()===null){     //如果没有选择idStore，或者sessionStorage没有存储
    message.warning('请先选择您要查看的面试!!')
  }
  else{
    interviewId.value = (idStore.getInterviewId() as string)
  }
  getInterviewDetail(storage.token,interviewId.value).then(res=>{
    console.log(res);
    if(res.data.code===200){         //200,表明成功返回数据，其他则可能请求发送成功，但返回其余失败数据
      let sTime = splitTime(res.data.data.scheduleVO.startTime)
      let eTime = splitTime(res.data.data.scheduleVO.endTime)
      arrangement.value.time = sTime + ' - ' + eTime
      arrangement.value.address = res.data.data.address
      arrangement.value.description = res.data.data.description
    }
    else{
      message.warning(res.data.message)
    }
  }).catch(err=>{
    console.log(err);
    
  })
})
</script>

<template>
  <titleBlock title="面试安排" class="Itarrangement-title"></titleBlock>
  <div class="arrangement-card">
        <n-flex vertical>
          <div class="arrangement-content">
            <p class="arrangement-title">面试时间:</p>
            <p class="arrangement-description"><span>{{ arrangement.time }}</span></p>
          </div>
          <div class="arrangement-content">
            <p class="arrangement-title">面试地点:</p>
            <p class="arrangement-description">{{ arrangement.address }}</p>
          </div>
          <div class="arrangement-content">
            <p class="arrangement-title">面试说明</p>
            <p class="last-description">{{ arrangement.description }}</p>
          </div>
        </n-flex>
    </div>
</template>

<style scoped>
.Itarrangement-title{
  margin: 2vh 0 0 4vw;
  font-size: 1.5rem;
}
.arrangement-card{
  width: 90vw;
  min-height: 20vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(185, 193, 214) ;
  margin: 0 auto 0 5vw;
}
.arrangement-content{
  font-family: '楷体';
  font-size: 1.1rem;
}
.arrangement-title{
  padding: 2vh 0 0 3vw;
  font-size: 1.1rem;
}
.arrangement-description{
  width: 75vw;
  padding: 1vh 0 0 8vw;
}
.last-description{
  width: 75vw;
  padding: 1vh 0 2vh 8vw;
}
</style>
