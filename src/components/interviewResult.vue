<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { commentType } from '@/utils/type/commentType'
import titleBlock from '@/components/titleBlock.vue'
import Hourglass from '@vicons/ionicons5/Hourglass'
import { useStore } from '@/store/index'
import { useIdStore } from '@/store/idStore'
import { useMessage } from 'naive-ui'
import { getInterviewComment } from '@/api/api'
import nullPage from '@/components/nullPage.vue'

defineOptions({
  name:'interviewResult'
})

const is =ref()
const isDescription = ref<string>()
const interviewId = ref<string>('')
const storage = useStore()
const idStore = useIdStore()
const message = useMessage()
const comments=ref<commentType>(
  {
    id:1,
    interviewId:1,
    basis:1,
    coding:3,
    thinking:5,
    express:2,
    evalute:'fdsafd反对凯撒JFK但是JFK理解昂的考虑时间刻录机考虑的是解放开绿灯撒加风口浪尖的离开结案方式考虑到就',
    suggest:'吃屁',
    playback:'https://meeting.tencent.com/v2/cloud-record/share?id=23cbfbc6-723e-42ff-85aa-78f675dc3af8&from=3'
  }
)

onMounted(()=>{
  if(idStore.getInterviewId()===null){     //如果没有选择idStore，或者sessionStorage没有存储
    message.warning('请先选择您要查看的面试!!')
  }
  else{
    interviewId.value = (idStore.getInterviewId() as string)
  }
  getInterviewComment(storage.token,interviewId.value).then(res=>{
    console.log(res);
    if(res.data.code===200){
      console.log('成功接收到数据');
      comments.value.id = res.data.data.id
      comments.value.interviewId = res.data.data.interviewId
      comments.value.basis = res.data.data.basis
      comments.value.coding = res.data.data.coding
      comments.value.thinking = res.data.data.thinking
      comments.value.express = res.data.data.express
      comments.value.evalute = res.data.data.evaluate
      comments.value.suggest = res.data.data.suggest
      comments.value.playback = res.data.data.playback
      is.value = true
    }
    else{
      is.value = false
      isDescription.value = res.data.message
    }
  }).catch(err=>{
    console.log(err);
    
  })
})
</script>

<template>
  <div class="interviwe-result">
    <titleBlock title="面试评价" class="title"></titleBlock>
    <n-collapse arrow-placement="right" class="interview-collapse"  :default-expanded-names="['1']">
      <n-collapse-item title="面评总结" name="1">
          <div>
            <nullPage v-if=!is :desctiption="isDescription" class="null-comments"></nullPage>
            <n-flex vertical v-if="is">
              <div>
                <p class="comment-title">基础能力</p>
                <n-rate class="comment-icon" color=#dfdsas readonly :value="comments.basis">
                  <n-icon size="24">
                    <Hourglass />
                  </n-icon>
                </n-rate>
              </div>
              <div>
                <p class="comment-title">编程能力</p>
                <n-rate class="comment-icon" color=#dfdsas readonly :value="comments.coding">
                  <n-icon size="24">
                    <Hourglass />
                  </n-icon>
                </n-rate>
              </div>
              <div>
                <p class="comment-title">思维能力</p>
                <n-rate class="comment-icon" color=#dfdsas readonly :value="comments.thinking">
                  <n-icon size="24">
                    <Hourglass />
                  </n-icon>
                </n-rate>
              </div>
              <div>
                <p class="comment-title">表达能力</p>
                <n-rate class="comment-icon" color=#dfdsas readonly :value="comments.express">
                  <n-icon size="24">
                    <Hourglass />
                  </n-icon>
                </n-rate>
              </div>
              <div>
                <p class="comment-title">总评</p>
                <p class="comment-content">{{ comments.evalute }}</p>
              </div>
              <div>
                <p class="comment-title">建议</p>
                <p class="comment-content">{{ comments.suggest }}</p>
              </div>
              <div class="last-comment">
                <p class="comment-title">面试视频</p>
                <a :href="comments.playback" class="comment-content">点我跳转😫👩‍👧‍👦</a>
              </div>
            </n-flex>
          </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style scoped>
.title{
  margin: 3vh 0 3vh 4vw;
  font-size: 1.5rem;
}
.video{
  width: 90vw;
  margin: 0 5vw 0 05vw;
  border-radius: 10px;
}
.interview-collapse{
  width: 90vw;
  margin: 0 auto 0 5vw;
  background-color: white;
  border-radius: 10px;
  border: 0;
  box-shadow: 0 0 10px rgb(185, 193, 214) ;
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
.comment-title{
  padding: 1vh 0 0 4vw;
  font-size: 1rem;
}
.comment-content{
  padding: 0 2vw 0 8vw ;
  font-size: 0.9rem;
}
.comment-icon{
  padding: 1vh 0 0 8vw;
}
.last-comment{
  padding: 0 0 2vh 0;
}
.null-comments{
  text-align: center;
  width: 100%;
  height: 10vh;
  font-size: 1.6rem;
  font-family: '宋体'
}
</style>
