<script setup lang="ts">
import Person32Filled from '@vicons/fluent/Person32Filled'
import NewspaperSharp from '@vicons/ionicons5/NewspaperSharp'
import Grunt from '@vicons/fa/Grunt'
import {useRouter} from 'vue-router'
defineOptions({
  name:'navigationBottom'
})

const router=useRouter()
const toResume=()=>{
  router.push('./resume')
}
const toQuestion=()=>{
  router.push('./question')
}
const toInterview=()=>{
  router.push('./interview')
}
</script>

<template>
  <div class="white-circle">
    <n-flex 
      class="layout"
      justify="space-around"
    >
      <div>
        <div class="icon-layout">
          <n-icon color="white" @click="toResume">
            <Person32Filled  class="icon"/>
          </n-icon>
        </div>
        <p class="description">简历</p>
      </div>
      <div>
        <div class="icon-layout">
          <n-icon color="white" @click="toQuestion">
            <NewspaperSharp  class="icon"/>
          </n-icon>
        </div>
        <p class="description">问卷</p>
      </div>
      <div>
        <div class="icon-layout">
          <n-icon color="black">
            <Grunt  class="icon" @click="toInterview"/>
          </n-icon>
        </div>
        <p class="description">面试</p>
      </div>
    </n-flex>
  </div>
</template>

<style scoped>
.white-circle{
  width: 90vw;
  height: 10vh;
  background-color: white;
  margin: 0 5vw 0 auto;
  border-radius: 40px;
}
.layout{
  width: 80vw;
  height: 10vh;
  padding: 1vh 0 0 4vw;
}
.icon-layout{
  width: 10vmin;
  height: 10vmin;
  border-radius: 50%;
  background-color: rgb(146, 219, 123);
}
.icon{
  padding: 0.5vh 0 0 0;
  width: 10vmin;
  height: 8vmin;
}
.description{
  font-family: '楷体';
  font-weight: bold;
  font-size: 0.8rem;
  margin: 0 0 1vh 0;
  padding: 0 0 0 1.5vw;
}
</style>
