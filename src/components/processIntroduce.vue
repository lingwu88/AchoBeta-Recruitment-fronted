<script lang="ts" setup>
import ArrowAutofitUp20Filled from '@vicons/fluent/ArrowAutofitUp20Filled'
import Number1 from '@vicons/carbon/Number1'
import Number2 from '@vicons/carbon/Number2'
import Number3 from '@vicons/carbon/Number3'
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
        title="投递简历"
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
        type="success"
        title="初试"
        time="2018-04-03 20:46"
        class="icon"
      >
        <template #icon>
          <n-icon>
            <Number1 />
          </n-icon>
        </template>
      </n-timeline-item>
      <n-timeline-item 
      type="success" 
      title="复试"
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
        type="warning"
        title="终试"
        time="2018-04-03 20:46"
        class="icon"
      >
        <template #icon>
          <n-icon>
            <Number3 />
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
