<script lang="ts" setup>
import navigationTop from '@/components/navigationTop.vue'
import activitiesCard from '@/components/activitiesCard.vue'
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/index'
import { useIdStore } from '@/store/idStore'
import { cardType } from '@/utils/type/cardType'
import { Activity } from '@/utils/type/activity.ts'
import { getActivitiesList } from '@/api/api'
import { useMessage } from 'naive-ui'

type activitycard = {
  id : number,
  cardDescription:cardType
}

const message=useMessage()
const storage = useStore()
const idStore = useIdStore()
const router = useRouter()
const batchId = ref<string>('')


const activityCard=ref<activitycard[]>([
  {
    id:1,
    cardDescription:{
      title:'暂无招新批次',
      content:'暂无招新批次',
      footer:'暂无招新批次'
    }
  }
])

const toResume=(Id:string)=>{
  idStore.setActId(Id)
  router.push({path:'/activitiesLayout/activity'})
}

onMounted(()=>{
  const token:string = storage.token
  if(idStore.getBatchId()!=null)         //检查地址栏是否为空
   batchId.value = (idStore.getBatchId() as string)
  else
    message.warning('请先选择你的批次')

  getActivitiesList(batchId.value,token).then(res=>{
    console.log(res);                 //如果面试年级
    if(res.data.code==200 && res.data.data.length!=0){       //如果成功，则注入进招新批次卡片的对象
      activityCard.value.shift()       //删除数组的默认初始值
      res.data.data.forEach((item:Activity) => {
        activityCard.value.push({
          id:item.id as number,
          cardDescription:{
            title:item.title,
            content:item.description,
            footer:'截止时间:'+item.deadline
          }
        })
      });
    }
  }).catch(err=>{
    console.log(err);
    
  })

  
})
</script>

<template>
  <navigationTop></navigationTop>
  <n-flex vertical class="flex-layout">
    <activitiesCard  v-for="item in activityCard" @toAnother="toResume(item.id.toString())" :cardMain="item.cardDescription" class="glance-card"></activitiesCard>
  </n-flex>
</template>

<style scoped>
.flex-layout{
  min-height: 90vh;
  width: 100vw;
  background-color: rgba(255, 226, 226, 0.612);
  padding:0 0 4vh 0;
}
.glance-card{
  margin: 2vh 0 0 5vw;
}
</style>
@/utils/type/activity