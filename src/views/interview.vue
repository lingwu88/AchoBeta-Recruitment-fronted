<script lang="ts" setup>
import titleBlock from '@/components/titleBlock.vue'
import Number3 from '@vicons/carbon/Number3'
import { useRouter } from 'vue-router'
const router = useRouter()

const toInterviewDetailed=()=>{
  router.push('/activitiesLayout/interviewDetailed')
}
</script>

<template>
  <div class="interview-layout">
    <titleBlock title="我的面试" class="interviewMine"></titleBlock>
    <n-collapse arrow-placement="right" class="interview-collapse">
      <n-collapse-item title="面试一览" name="1">
        <n-flex vertical class="flex-layout">
          <div>
            <n-flex class="interview-flex-layout" justify="space-between">
              <p class="interview-content-left">面试1</p>
              <n-flex vertical :wrap=false class="interview-content-right">
                <p>已结束</p>
                <Number3 />
              </n-flex>
              <n-button type="primary" class="interview-button" @click="toInterviewDetailed">查看</n-button>
            </n-flex>
          </div>
          <div>
            <n-flex class="interview-flex-layout" justify="space-between">
              <p class="interview-content-left">面试2</p>
              <n-flex vertical :wrap=false class="interview-content-right">
                <p>未开始</p>
                <Number3 />
              </n-flex>
              <n-button type="primary" class="interview-button" @click="toInterviewDetailed">查看</n-button>
            </n-flex>
          </div>
          <div>
            <n-flex class="interview-flex-layout" justify="space-between">
              <p class="interview-content-left">面试3</p>
              <n-flex  vertical :wrap=false class="interview-content-right">
                <p>进行中</p>
                <Number3 />
              </n-flex>
              <n-button type="primary" class="interview-button" @click="toInterviewDetailed">查看</n-button>
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
  box-shadow: 0 0 10px rgb(137, 148, 173) ;
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
  font-size:1.2rem;
  padding:2vh 0 0 0;
  flex-grow: 1;
}
.interview-button{
  margin: 2vh 0 0 0;
}
</style>
