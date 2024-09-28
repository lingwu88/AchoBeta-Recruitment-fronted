<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'
import { ref,onMounted,onBeforeUnmount} from 'vue'
import { useIdStore } from '@/store/idStore'
import { useStore } from '@/store/index'
import { getTemplate,getQuestion,submitQuestion } from '@/api/api.ts'
import { useMessage } from 'naive-ui'
import { timePeriod } from '@/utils/type/timePeriod.ts'
import { questionReceive } from '@/utils/type/questionReceive.ts'   //问题、答案、问题id统合对象类型
import { questionForm } from '@/utils/type/questionFormType.ts'//提交活动表单类型
import { splitTime } from '@/utils/splitTime.ts'
import titleBlock from '@/components/titleBlock.vue'
import nullPage from '@/components/nullPage.vue'

const pageHeight=ref(document.documentElement.scrollHeight)
const is = ref<boolean>()
const isDescription = ref<string>('')
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
    if(res.data.code === 200){
      message.success('提交成功')
    }
    else{
      message.warning(res.data.message)
    }
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
      is.value = true       //控制组件显现与否
      console.log('true');
      
    }

      await getTemplate(actId.value,storage.token).then(res=>{    //多个异步函数时要用await，同步住异步函数接口调用，即时有草稿也要调用，保证拿到所有的时间列表
        console.log(res);
        
        console.log('获取问卷模板');
        
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
        if(questionsubmit.value.questionAnswerDTOS.length === 0 && (res.data.data.questionVOS.length != 0 || res.data.data.timePeriodVOS.length != 0)){
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
          if(is.value=== undefined)
            is.value = true
          
        }
        else{
          if(is.value===undefined){
            is.value = false      //若返回的问卷为空，那么就要切换成空组件
            isDescription.value = '暂无活动问卷'
          }
          
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

const watchHeight=()=>{
  // document.body.style.height = `${pageHeight.value}px`           //使文档恢复初试页面高度
    // (document.getElementById("app") as HTMLElement).style.height = pageHeight.value + "px";
    const vh = pageHeight.value * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

onMounted(()=>{
  window.addEventListener('resize',watchHeight)
})

onBeforeUnmount(()=>{
  window.removeEventListener('resize',watchHeight)
})

</script>

<template>
  <div>
    <nullPage v-if="!is" :desctiption="isDescription" class="null"></nullPage>
    <n-form
      :model="questionNaire"
      class="form-layout"
      v-if="is"
    >
    <titleBlock title="活动问卷" class="title"></titleBlock>
      <div class="questionItem-layout">
        <n-form-item :label="item.question"  class="label-width" v-for="item in questionNaire" :key="item.questionId">
          <n-input v-model:value="item.receive"  type="textarea"  class="width" @change="inputChange((item.receive as string),(item.questionId as number))"/>
        </n-form-item>
        <n-space vertical>
          <n-form-item label='时间段选择'  class="last-label-width" >
            <n-select v-model:value="questionsubmit.periodIds" :options="timeList" max-tag-count='responsive' :multiple="true" @update:value="selectChange" :clearable="true" class="select-width" placeholder="请选择时间段"/>
          </n-form-item>
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
.title{
  margin: calc(var(--vh,1vh)*3) 0 calc(var(--vh,1vh)*4) 4vw;
  font-size: 1.5rem;
}
.header-description{
  margin: calc(var(--vh,1vh)*2) 0 0 2vw;
}
.null{
  padding:calc(var(--vh,1vh)*10) 0 0 0;
  box-sizing: border-box;
  min-height: calc(var(--vh,1vh)*80);
  text-align: center;
  font-size: 5rem;
}
.form-layout{
  margin: calc(var(--vh,1vh)*2) 0 0 0;
  width: 100vw;
  min-height: calc(var(--vh,1vh)*70);
}
.questionItem-layout{
  min-height: calc(var(--vh,1vh)*55);
}
.label-width{
  width: 90vw;
  margin: 0 auto 0 5vw;
}
.last-label-width{
  width: 90vw;
  margin: 0 5vw 0 5vw;
}
.width{
  width: 85vw;
  min-height: calc(var(--vh,1vh)*7);
  border-radius: 3%;
  background-color: #ffffff;
}
.select-width{
  width: 85vw;
  border-radius: 3%;
  background-color: #ffffff;
}
.last-label-width :deep .n-form-item-feedback-wrapper{
  min-height: calc(var(--vh,1vh)*1);
}
.flex-button{
  width: 90vw;
  margin:0 6vw 0 auto;
  padding:0 0 calc(var(--vh,1vh)*2) 0;
}
</style>
