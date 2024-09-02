<script lang="ts" setup>
import navigationTop from '@/components/navigationTop.vue'
import activitiesCard from '@/components/activitiesCard.vue'
import { ref,onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { useStore } from '@/store/index'
import { cardType } from '@/utils/cardType'
import { Activity } from '@/utils/activity.ts'
import { getActivities } from '@/api/api'

const storage = useStore()
const router = useRouter()
const id = ( useRoute().query.batchId as string )
const cardDescription=ref<cardType[]>([{
  title:'暂无招新批次',
  content:'暂无招新批次',
  footer:'暂无招新批次'
}])

const toResume=()=>{
  router.push({path:'/activitiesLayout/activity',query:{batchId:id}})
}

onMounted(()=>{
  const token:string = storage.token
  getActivities(id,token).then(res=>{
    console.log(res);                 //如果面试年级
    if(res.data.code==200 && res.data.data.length!=0){       //如果成功，则注入进招新批次卡片的对象
      cardDescription.value.shift()       //删除数组的默认初始值
      res.data.data.forEach((item:Activity) => {
        cardDescription.value.push({
          title:item.title,
          content:item.description,
          footer:'截止时间:'+item.deadline
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
    <activitiesCard  v-for="item in cardDescription" @toAnother="toResume" :cardMain="item" class="glance-card"></activitiesCard>
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
