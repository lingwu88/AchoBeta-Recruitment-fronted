<script lang="ts" setup>
import { ref } from 'vue'
import {commentType} from '@/utils/commentType'
import titleBlock from '@/components/titleBlock.vue'
import Hourglass from '@vicons/ionicons5/Hourglass'
defineOptions({
  name:'interviewResult'
})
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
</script>

<template>
  <div class="interviwe-result">
    <titleBlock title="面试评价" class="title"></titleBlock>
    <n-collapse arrow-placement="right" class="interview-collapse">
      <n-collapse-item title="面评总结" name="1">
          <div>
            <n-flex vertical>
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
  margin: 2vh 0 0 4vw;
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
</style>
