<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'
import { ref,onMounted } from 'vue'
import { useIdStore } from '@/store/idStore'
import { useStore } from '@/store/index'
import { getTemplate,getQuestion,submitQuestion } from '@/api/api.ts'
import { useMessage } from 'naive-ui'
import { timePeriod } from '@/utils/type/timePeriod.ts'
import { questionReceive } from '@/utils/type/questionReceive.ts'   //问题、答案、问题id统合对象类型
import { questionForm } from '@/utils/type/questionFormType.ts'//提交活动表单类型
import { splitTime } from '@/utils/splitTime.ts'

const idStore = useIdStore()
const storage = useStore()
const message = useMessage()
const actId = ref<string>('')
const timeList = ref<timePeriod[]>([])

const questionNaire=ref<questionReceive[]>([])

const questionsubmit = ref<questionForm>({
  participationId:1,
  questionAnswerDTOS:[],
  periodIds:[]
})

const selectChange=(value:Array<number>,option:SelectOption)=>{
  console.log('多选值更新了!!!');
  console.log(value);
  console.log(option)
}

//value:为传入的问题答案，id为传入的问题id
const inputChange=(value:string,id:number)=>{
  //判断数组中是否有已添加的问题id及其答案
  const index = questionsubmit.value.questionAnswerDTOS.findIndex(item=> item.questionId === id)    
  if(index === -1)          //如果找不到，表明没有，则push新的
    questionsubmit.value.questionAnswerDTOS.push({
      questionId:id,
      answer:value
    })
  else{              //否则，说明已有，则覆盖成新的对象
    questionsubmit.value.questionAnswerDTOS[index]={questionId:id,answer:value}   
  }
}

const submit=()=>{
  submitQuestion(storage.token,questionsubmit.value).then(res=>{
    console.log(res);
    
  }).catch(err=>{
    console.log(err);
    
  })
}


onMounted(()=>{
  if(idStore.getActId()!=null){
    actId.value = (idStore.getActId() as string)
  }
  else{
    message.warning('请先选择活动!!')
  }
  //先调用获取草稿函数
   getQuestion(actId.value,storage.token).then(async(res)=>{
    console.log('草稿的响应');
    console.log(res);
    questionsubmit.value.participationId = res.data.data.id     //得到活动id，并赋值给表单对象
    
    if(res.data.data.questionAnswerVOS.length!=0){    //若不为空，则说明有交草稿
      //将草稿的问题，及其回答赋值给问卷对象，及问卷提交对象
      res.data.data.questionAnswerVOS.forEach((item:{
            id:number, 
            title:string,
            answer:string
          }) => {
            questionNaire.value.push({
              questionId:item.id,
              question:item.title,
              receive:item.answer
            })
            //问卷提交对象的答案数组
            questionsubmit.value.questionAnswerDTOS.push({
              questionId:item.id,
              answer:item.answer
            })
          });
          //拿到已选择的时间列表的id，赋值给多选框的value
      res.data.data.timePeriodVOS.forEach((item:{
        id:number,
        startTime:string,
        endTime:string
      }) => {
        questionsubmit.value.periodIds.push(item.id)
      });
    }

      await getTemplate(actId.value,storage.token).then(res=>{    //多个异步函数时要用await，同步住异步函数接口调用，即时有草稿也要调用，保证拿到所有的时间列表


        res.data.data.timePeriodVOS.forEach((item:{
          id:number,
          startTime:string,
          endTime:string
        }) => {
          timeList.value.push({
            value:item.id,
            label:splitTime(item.startTime)+' - '+splitTime(item.endTime)
          })
        });

        //如果前面获取草稿时没有给问卷对象赋值，说明没有提交过草稿，导致问卷的answer为空数组
        if(questionsubmit.value.questionAnswerDTOS.length === 0){
          res.data.data.questionVOS.forEach((item:{
            id:number, 
            title:string,
            standard:string
          }) => {
            questionNaire.value.push({
              questionId:item.id,
              question:item.title,
              receive:''
            })
          });
        }
      }).catch(err=>{         //调用模板函数报错
        console.log(err);
      })

      //此处为调用模板函数结束，草稿调用的延续
      if(questionNaire.value.length===0){}      //说明模板
    }
  ).catch(err=>{
    console.log(err);
    
  })
})
</script>

<template>
  <div>
    <n-h1 class="header-description">
      <n-text type="primary">
        活动问卷
      </n-text>
    </n-h1>
    <n-form
      :model="questionNaire"
      class="form-layout"
    >
      <div class="questionItem-layout">
        <n-form-item :label="item.question"  class="label-width" v-for="item in questionNaire" :key="item.questionId">
          <n-input v-model:value="item.receive" placeholder="输入姓名" type="textarea"  class="width" @change="inputChange((item.receive as string),(item.questionId as number))"/>
        </n-form-item>
        <n-space vertical>
          <n-select v-model:value="questionsubmit.periodIds" :options="timeList" max-tag-count='responsive' :multiple="true" @update:value="selectChange" :clearable="true" class="label-width width" placeholder="请选择时间段"/>
        </n-space>
      </div>
      <n-form-item >
        <n-flex justify="space-around" class="flex-button">
          <n-button type="success" @click="submit">提交问卷</n-button>
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
.questionItem-layout{
  min-height: 55vh;
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
  padding:0 0 2vh 0;
}
</style>
