<script lang="ts" setup>
import { ref } from 'vue'
const questionNaire=ref([
  {
    number:'1',
    question:'你为什么想来AB',
    answer:''
  },
  {
    number:'2',
    question:'你为什么想做游戏',
    answer:''
  },
  {
    number:'3',
    question:'你有什么想问AB的问题吗?',
    answer:''
  },
  {
    number:'1',
    question:'你为什么想来AB',
    answer:''
  },
  {
    number:'2',
    question:'你为什么想做游戏',
    answer:''
  },
  {
    number:'3',
    question:'你有什么想问AB的问题吗?',
    answer:''
  }
])

const submit=()=>{
  console.log(questionNaire.value);
  
}
</script>

<template>
  <div>
    <n-h1 class="header-description">
      <n-text type="primary">
        XXXX活动问卷
      </n-text>
    </n-h1>
    <n-form
      :model="questionNaire"
      class="form-layout"
    >
      <n-form-item :label="item.question"  class="label-width" v-for="item in questionNaire" :key="item.number">
        <n-input v-model:value="item.answer" placeholder="输入姓名" type="textarea"  class="width"/>
      </n-form-item>
      <n-form-item >
        <n-flex justify="space-around" class="flex-button">
          <n-button type="success" @click="submit">提交简历</n-button>
          <n-button type="info" @click="submit">存为草稿</n-button>
        </n-flex>
      </n-form-item>
    </n-form>
  </div>
</template>

<style scoped>
.header-description{
  margin: 2vh 0 0 2vw;
}
.form-layout{
  margin: 2vh 0 0 0;
  width: 100vw;
  min-height: 70vh;
}
.label-width{
  margin: 0 0 0 3vw;
}
.width{
  width: 94vw;
  border-radius: 5px;
}
.flex-button{
  width: 90vw;
  margin:0 6vw 0 auto;
}
</style>
