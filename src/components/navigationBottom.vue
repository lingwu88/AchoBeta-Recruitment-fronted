<script setup lang="ts">
import Person32Filled from '@vicons/fluent/Person32Filled'
import NewspaperSharp from '@vicons/ionicons5/NewspaperSharp'
import Grunt from '@vicons/fa/Grunt'
import {useRouter} from 'vue-router'
import { ref } from 'vue'

defineOptions({
  name:'navigationBottom'
})

const isCheck=ref(0)     //为真则悬浮——被选中，为假——不被选中
const router=useRouter()

// const toResume=()=>{
//   isCheck.value=!isCheck.value
//   router.push('./activities')
// }

// const toQuestion=()=>{
//   isCheck.value=!isCheck.value
//   router.push('./question')
// }

const Block=[
  {
    value:1,
    label:'活动'
  },
  {
    value:2,
    label:'问卷'
  },
  {
    value:3,
    label:'面试'
  }
]

const getIcon=(index:number)=>{
  switch (index) {
    case 0:return Person32Filled;
    case 1:return NewspaperSharp;
    case 2:return Grunt;
  }
}

const getClassLayout=(index:number)=>{
  return isCheck.value===index?'icon-layout-after':'icon-layout'
}

const getClassIcon=(index:number)=>{
  return isCheck.value===index?'icon-after':'icon'
}

const isDesctiption=(index:number)=>{
  return isCheck.value===index
}

const toPage=(index:number)=>{
  isCheck.value=index
  switch(index){
    case 0:router.push('/activitiesLayout/activity');break;
    case 1:router.push('/activitiesLayout/question');break;
    case 2:router.push('/activitiesLayout/interview');break;
  }
}
</script>

<template>
  <div class="white-circle">
    <n-flex 
      class="layout"
      justify="space-around"
    >
      <!-- <div class="background-image">
        <div class="icon-layout-after">
          <n-icon color="white" @click="toResume">
            <Person32Filled  class="icon-after"/>
          </n-icon>
        </div>
        <p class="description">简历</p>
      </div>
      <div :class="{'background-image':isCheck}">
        <div :class="isCheck?'icon-layout-after':'icon-layout'">
          <n-icon color="#333c7f" @click="toQuestion">
            <NewspaperSharp  :class="isCheck?'icon-after':'icon'"/>
          </n-icon>
        </div>
        <p v-if="isCheck" class="description">问卷</p>
      </div> -->
      <div v-for="(item,index) in Block" class="background-image" >
        <div :class=getClassLayout(index)>
          <n-icon>
            <component :is="getIcon(index)"  :class=getClassIcon(index) @click="toPage(index)"/>
          </n-icon>
        </div>
        <p class="description" v-if="isDesctiption(index)">{{item.label}}</p>
      </div>
    </n-flex>
  </div>
</template>

<style scoped>
.white-circle{
  width: 90vw;
  min-height:10vh;
  background-color: white;
  border-radius: 40px;
}
.layout{
  width: 80vw;
  padding: 0vh 0 0 4vw;
}
.background-image{
  min-height: 9vh;
  padding:1vh 0 0 0;
}
.icon-layout-after{
  width: 10vmin;
  height: 10vmin;
  border-radius: 50%;
  background-color: rgb(146, 219, 123);
}
.icon-layout{
  width:10vmin;
  height: 10vmin;
}
.icon-after{
  padding: 0.5vh 0 0 0;
  width: 10vmin;
  height: 8vmin;
  color: white;
}
.icon{
  padding: 1vh 0 0 0;
  width:8vmin;
  height:10vmin;
}

.description{
  font-family: '楷体';
  font-weight: bold;
  font-size: 0.8rem;
  text-align: center;
  padding:0vh 0 0 0;
}
</style>
