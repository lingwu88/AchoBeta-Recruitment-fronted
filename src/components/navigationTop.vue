<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name:'navigationTop'
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
    case 2:router.push('/');break;
    case 3:router.push('/person');break;
    case 4:router.push('/login');break;
  }
})
</script>

<template>
  <div class="navigationTop">
    <n-flex 
      class="flex-layout"
      justify="space-between"
    >
      <n-avatar
      src="../src/assets/achoBeta.png"
      class="avatar-left"
      />
      <n-avatar
      round
      src="../src/assets/avatar.jpg"
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
  height: 7vh;
  width: 100vw;
  background-color: rgb(243, 243, 243);
}
.flex-layout{
  width: 100%;
}
.avatar-left{
  width: auto;
  margin: 0 0 0 5vw;
  height: 7vh;
}
.avatar-right{
  margin:0.5vh 10vw 0 0;
  height: 6vh;
  width: auto;
  background-color: inherit
}
.dropDown-content{
  width: 100vw;
  background-color: rgb(255, 255, 255);
  font-size: 1.1rem;
  font-weight: normal;
  text-align: center;
  letter-spacing: 0.7rem;
  border-bottom: 1px solid rgb(187, 185, 185);
  box-shadow: 0 2px 10px rgb(215, 192, 192);
  font-family: '宋体';
  animation:dropdown-animation 0.3s forwards
}
.dropDown{
  height: 0px;
  overflow: hidden;
  transition:height 0.5s;
}

</style>
