<script lang="ts" setup>
import {PropTypes} from '@/utils/propTypes'
import titleBlock from '@/components/titleBlock.vue'
defineOptions({
  name:'interviewArrangement'
})

const prop=defineProps({
  startTime:PropTypes.string.def('2022-12-12'),
  endTime:PropTypes.string.def('1314--05-20'),
  address:PropTypes.string.def('松山湖校区:9A206-3'),
  description:PropTypes.string.def('进入面试请检查相关设备是否正常的撒合法空间的开了房间啊打开')
})
</script>

<template>
  <titleBlock title="面试安排" class="Itarrangement-title"></titleBlock>
  <div class="arrangement-card">
        <n-flex vertical>
          <div class="arrangement-content">
            <p class="arrangement-title">面试时间:</p>
            <p class="arrangement-description"><span>{{ prop.startTime }} — </span><span>{{ prop.endTime }}</span></p>
          </div>
          <div class="arrangement-content">
            <p class="arrangement-title">面试地点:</p>
            <p class="arrangement-description">{{ prop.address }}</p>
          </div>
          <div class="arrangement-content">
            <p class="arrangement-title">面试说明</p>
            <p class="last-description">{{ prop.description }}</p>
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
  box-shadow: 0 0 10px rgb(137, 148, 173) ;
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
