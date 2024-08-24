<script lang="ts" setup>
import { ref } from 'vue'
import navigationTop from '@/components/navigationTop.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email=ref()
const password=ref()
const sendCodeText=ref('获取验证码')
const idSend=ref<boolean>(false)

// const options=computed(()=>{
//   return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
//     const prefix = email.value.split('@')[0]
//     return {
//       label: prefix + suffix,
//       value: prefix + suffix
//     }
//   })
// })

const sendCode=()=>{
  console.log(idSend.value);
  
}

const login=()=>{
  router.push('/')
}
</script>

<template>
  <navigationTop class="top"></navigationTop>
  <div class="login-layout">
    <n-flex vertical class="flex-layout">
      <p class="login-tag">邮箱登录</p>
      <div>
        <p class="form-title">邮箱</p>
        <input class="email-input" v-model="email" placeholder="请输入您的邮箱"></input>
      </div>
      <div>
        <p class="form-title">验证码</p>
        <n-flex justify="space-around" class="captcha-flex">
          <input class="captcha" v-model="password" placeholder="请输入验证码"></input>
          <p class="captcha-tip" @click="sendCode">{{ sendCodeText }}</p>
        </n-flex>
      </div> 
    <n-button type="primary" @click="login" class="button">登录</n-button>
    <p class="tip">暂时只有网易、QQ的邮箱能使用哦😥</p>
    </n-flex>
  </div>
</template>

<style scoped>
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.login-layout{
  width: 100vw;
  min-height: 90vh;
  background-color: aliceblue;
}
.flex-layout{
  height: 90vh;
  width: 90vw;
  margin: 0 auto 0 5vw;
  font-family: '宋体';
}
.login-tag{
  margin: 10vh 0 0 0;
  font-weight: bold;
  font-size: 1.4rem;
}
.form-title{
  font-size: 1.1rem;
}
.email-input{
  border:none;
  outline: none;
  width: 90%;
  margin: 1vh 0 2vh 2vw;
  padding: 0 0 1vh 0;
  background-color: inherit;
  border-bottom-width:2px;
  border-bottom-color: rgb(134, 128, 128);
  border-bottom-style: solid;
  font-size: 1rem;
}
.captcha-flex{
  width: 90%;
  margin: 1vh 0 4vh 2vw;
  border-bottom-color: rgb(178, 165, 165);
  border-bottom-style: solid;
  border-bottom-width: 2px;
}
.captcha{
  border: none;
  outline: none;
  background-color: inherit;
  font-size: 1rem;
  flex-grow: 1;
  padding: 0 0 1vh 0;
}
.captcha-tip{
  padding: 0 2vw 0 0;
}
.button{
  width: 100%;
}
.tip{
  margin: 2vh 0 0 1vw;
}
</style>
