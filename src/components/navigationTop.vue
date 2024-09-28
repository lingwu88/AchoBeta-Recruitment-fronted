<script lang="ts" setup>
import { ref , onMounted , onBeforeUnmount} from 'vue'
import { PropTypes } from '@/utils/type/propTypes'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

defineOptions({
  name:'navigationTop'
})

const message = useMessage()
const props = defineProps({
  pageHeight:PropTypes.number.def(642)
})

const router=useRouter()
const dropDom=ref()

const openDropDown=()=>{
  const containerStyle=dropDom.value.style
  const childs=document.querySelectorAll('.dropDown-content')
  let totalHeight=0
  childs.forEach(child =>{
    const element=child as HTMLElement
    totalHeight+=parseInt(element.offsetHeight.toString())
  })
  if (containerStyle.height=='0px') {
    containerStyle.height=`${totalHeight}px`;
  }
  else{
    containerStyle.height='0px'
  }
}

const toAnother=((path:number)=>{
  switch (path) {
    case 1:router.push('/');break;
    case 2:message.warning('暂未完成，敬请期待~');break;
    case 3:message.warning('暂未完成，敬请期待~');break;
    case 4:router.push('/login');break;
  }
})

const watchHeight=()=>{
  // document.body.style.height = `${pageHeight.value}px`           //使文档恢复初试页面高度
    // (document.getElementById("app") as HTMLElement).style.height = pageHeight.value + "px";
    const vh = props.pageHeight * 0.01;
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
  <div class="navigationTop">
    <n-flex 
      class="flex-layout"
      justify="space-between"
      :wrap="false"
    >
      <div class="avatar-left">
        <img
        src="/src/assets/achoBeta.png"
        class="avatar-logo"
        />
        <p>AchoBeta</p>
      </div>
      <img
      src="/src/assets/avatar.jpg"
      class="avatar-right"
      @click="openDropDown"
      />
    </n-flex>
      <div class="dropDown" ref="dropDom">
        <p class="dropDown-content" @click="toAnother(1)">关于我们</p>
        <p class="dropDown-content" @click="toAnother(2)">我的面试</p>
        <p class="dropDown-content" @click="toAnother(3)">个人信息</p>
        <p class="dropDown-content" @click="toAnother(4)">登录</p>
      </div>
  </div>
</template>

<style scoped>
.navigationTop{
  height:  calc(var(--vh,1vh)*7);
  width: 100vw;
  background-color: rgb(251, 249, 249);
}
.flex-layout{
  width: 100%;
  height: calc(var(--vh,1vh)*7);
}
.avatar-left{
  width: 60vw;
  margin: 0 0 0 5vw;
  height:  calc(var(--vh,1vh)*7);
  display:flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  /* flex-direction: column; */

}
.avatar-logo{
  margin: calc(var(--vh,1vh)*0.5) 0 auto 0;
  height:  calc(var(--vh,1vh)*6);
}
.avatar-left p{
  height: calc(var(--vh,1vh)*5vh);
  padding:calc(var(--vh,1vh)*0.2) 0 calc(var(--vh,1vh)*1.5) 2vw;
  background: url('/src/assets/text_background.jpg') no-repeat;
  background-size: cover;
  background-clip: text;
  color:transparent;
  font-size:1.9rem;
  font-family:'微软雅黑';
  font-style:italic;
  font-weight:bolder;
}
.avatar-right{
  margin: calc(var(--vh,1vh)*0.5) 10vw 0 0;
  height:  calc(var(--vh,1vh)*6);
  width: auto;
  background-color: inherit;
  border-radius:50%;
}
.dropDown-content{
  width: 100vw;
  background-color: rgb(255, 253, 253);
  font-size: 1.1rem;
  font-weight: normal;
  text-align: center;
  letter-spacing: 0.7rem;
  padding: calc(var(--vh,1vh)*1) 0;
  border-bottom: 1px solid rgb(231, 231, 231);
  font-family: '宋体';
  animation:dropdown-animation 0.3s forwards;
  box-sizing: content-box;
}
.dropDown{
  height: 0;
  overflow: hidden;
  transition:height 0.5s;
}

</style>
