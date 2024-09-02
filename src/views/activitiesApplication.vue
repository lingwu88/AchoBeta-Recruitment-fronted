<script lang="ts" setup>
import { useRouter , useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { Activity } from '@/utils/activity'
import scroollTo from '@/utils/scroollTo'
import  titleBlock from '@/components/titleBlock.vue'
import  navigationTop from '@/components/navigationTop.vue'
import { getActivities } from '@/api/api'


const activities = ref({
  integer:1,
  title:'没有此活动',
  description:'此活动为空',
  deadline:'2099-2-2',
  createTime:'1999-12-12'
})
const router = useRouter()

onMounted(()=>{
  scroollTo()
  // getActivities(id).then(res=>{
  //   console.log(res);
  // }).catch(err=>{
  //   console.log(err);
  // })
})
</script>

<template>
    <div class="acApplication-layout">   
      <titleBlock :title="activities.title" class="title"></titleBlock>
      <!-- <div class="activities-title">
        招新活动详情
        <div class="title-border"></div>
      </div> -->
      <div class="activities-content">{{ activities.description }}</div>
    </div>
</template>

<style scoped>
.acApplication-layout{
  min-height: 80vh;
}
.application-button{
  padding: 0;
  width: 90vw;
  height: 50px;
  margin: 0 auto 0 4.5vw;
}
.layout{
  width: 100vw;
  font-family: '楷体';
  background-color: inherit
}
.title{
  margin: 0 0 0 4vw;
  padding: 2vh 0 0 0;
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
  width:80vw;
  line-height: 1.4rem;
  font-size: 1.1rem;
  margin: 0 0 0 7%;
}
</style>
