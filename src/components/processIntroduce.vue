<script lang="ts" setup>
import ArrowAutofitUp20Filled from '@vicons/fluent/ArrowAutofitUp20Filled'
import Number1 from '@vicons/carbon/Number1'
import Number2 from '@vicons/carbon/Number2'
import Number3 from '@vicons/carbon/Number3'
import Number4 from '@vicons/carbon/Number4'
import Number5 from '@vicons/carbon/Number5'
import Number6 from '@vicons/carbon/Number6'
import Number7 from '@vicons/carbon/Number7'
import Number8 from '@vicons/carbon/Number8'
defineOptions({
  name:'processIntroduce'
})
</script>

<template>
  <n-card  
    content-style="padding:0;"
    class="box"
    >
      <n-timeline :icon-size="30">
      <n-timeline-item 
        color="green"
        title="点击对应批次"
        time="2018-04-03 20:46"
        line-type="dashed"
        class="icon"
      >
        <template #icon>
          <n-icon >
            <ArrowAutofitUp20Filled />
          </n-icon>
        </template>
      </n-timeline-item>
      <n-timeline-item
        line-type="dashed"
        title="填写简历(可查看招新进度)"
        time="2018-04-03 20:46"
        class="icon"
        color="#d777d5"
      >
        <template #icon>
          <n-icon>
            <Number1 />
          </n-icon>
        </template>
      </n-timeline-item>
      <n-timeline-item 
      title="等待招新活动"
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
        title="查看招新活动信息"
        time="2018-04-03 20:46"
        class="icon"
        color=#ff7514
      >
        <template #icon>
          <n-icon>
            <Number3 />
          </n-icon>
        </template>
      </n-timeline-item>
      <n-timeline-item
        type="warning"
        title="填写招新活动问卷"
        time="2018-04-03 20:46"
        class="icon"
        color=#dd6565
      >
        <template #icon>
          <n-icon>
            <Number4 />
          </n-icon>
        </template>
      </n-timeline-item>
      <n-timeline-item
        type="warning"
        title="等待面试安排"
        time="2018-04-03 20:46"
        class="icon"
        color="#2a9735"
      >
        <template #icon>
          <n-icon>
            <Number5 />
          </n-icon>
        </template>
      </n-timeline-item>
      <n-timeline-item
        type="warning"
        title="查看面试地点"
        time="2018-04-03 20:46"
        class="icon"
        color=""
      >
        <template #icon>
          <n-icon>
            <Number6 />
          </n-icon>
        </template>
      </n-timeline-item>
      <n-timeline-item
        type="warning"
        title="完成面试,查看面试总结"
        time="2018-04-03 20:46"
        class="icon"
        color="#bb290f"
      >
        <template #icon>
          <n-icon>
            <Number7 />
          </n-icon>
        </template>
      </n-timeline-item>
      <n-timeline-item
        type="warning"
        title="等待面试结果通知"
        time="2018-04-03 20:46"
        class="icon"
        color="#8800ff"
      >
        <template #icon>
          <n-icon>
            <Number8 />
          </n-icon>
        </template>
      </n-timeline-item>
    </n-timeline>
  </n-card>
</template>

<style scoped>
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
