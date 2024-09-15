<script lang="ts" setup>
import { ref } from 'vue'
import navigationTop from '@/components/navigationTop.vue'
import { useRouter } from 'vue-router'
import { emailLogin,sendCaptcha } from '@/api/api'
import { emailLoginType } from '@/utils/type/emailLoginType'
import { useStore } from '@/store/index'
import { useMessage } from 'naive-ui'

const message=useMessage()


const router = useRouter()
const storage=useStore()
const emailForm=ref<emailLoginType>({
  login_type:'email',
  email_params:{
    email:'',
    emailCode:''
  }
})
const isDisabled=ref<boolean>(false)

const sendCodeText=ref('获取验证码')
const timer=ref(60)

// const options=computed(()=>{
//   return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
//     const prefix = email.value.split('@')[0]
//     return {
//       label: prefix + suffix,
//       value: prefix + suffix
//     }
//   })
// })

function isValidEmail(email:string) {
  const emailRegex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return emailRegex.test(email)
}

//发送验证码
const sendCode=()=>{
  console.log(storage.token);
  
  //先验证手机号是否合规，然后再发送接口api，返回时才进行此处判断
  const email=emailForm.value.email_params.email
  if(email!=null && email!=''){
    if(isValidEmail(email)){
      sendCaptcha(email).then(res=>{
        console.log(res.data.code);
        if(res.data.code==200){
          message.success('成功发送验证码！')
          countDown()
          isDisabled.value=true
          }
          else if(res.data.code==1005){
            message.error('邮箱格式不是符合规范格式');
          }
          else{
            message.warning(res.data.message)
          }
      }).catch(err=>{
        console.log(err)   
        message.error(err.message)
      })
    }
    else{
      message.error('您输入的邮箱格式不对');
    }
  }
  else{
    message.error('请填写邮箱!!')
  }
}

const countDown=()=>{
  const time=setInterval(()=>{
    if(timer.value>0){
      sendCodeText.value=`${timer.value}秒后重新发送`
      timer.value--
    }
    else{
      clearInterval(time)
      resetTimer()
      isDisabled.value=false
    }
  },1000)
}

const resetTimer=()=>{
  sendCodeText.value='获取验证码'
  timer.value=60
}

const login=()=>{
  if(emailForm.value.email_params.email==null && emailForm.value.email_params.email===''){
    message.error('请填写邮箱')
  }
  if(emailForm.value.email_params.emailCode==null || emailForm.value.email_params.emailCode===''){
    message.error('请输入验证码')
  }
  emailLogin(emailForm.value).then(res=>{
    storage.setToken(res.data.data.access_token)        //Client存储Token
    router.push('/')
  }).catch(err=>{
    console.log(err);
    message.error(err.message)
  })
}

</script>

<template>
  <navigationTop class="top"></navigationTop>
  <div class="login-layout">

      <n-flex vertical class="flex-layout">
        <p class="login-tag">邮箱登录</p>
        <div>
          <p class="form-title">邮箱</p>
          <input placeholder="请输入您的邮箱" class="email-input" v-model="emailForm.email_params.email"></input>
        </div>
        <div>
          <p class="form-title">验证码</p>
          <n-flex justify="space-around" class="captcha-flex">
            <input class="captcha" v-model="emailForm.email_params.emailCode" placeholder="请输入验证码"></input>
            <p :class="['captcha-tip',{'disabled':isDisabled}]" @click="sendCode">{{ sendCodeText }}</p>
          </n-flex>
        </div> 
      <n-button type="primary" @click="login" class="button">登录</n-button>
      <!-- <p class="tip">暂时只有网易、QQ的邮箱能使用哦😥</p> -->
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
/* .flex-layout :deep .n-input-wrapper{
  border:none!important;
  outline: none;
}
.flex-layout :deep .n-input__input{
  border:none!important;
  outline: none;
}
.flex-layout :deep .n-input__input-el{
  border:none!important;
  outline: none;
}
.flex-layout :deep .n-input{
  border:none!important;
  outline: none;
  background-color: inherit;
}
.flex-layout :deep .n-stateful{
  border-width: 0!important;
  outline: none;
  background-color: inherit;
}
.flex-layout :deep .n-auto-complete{
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
.flex-layout :deep .n-input--focus{
  outline: none!important;
} */
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
.disabled{
  color:gray;
  pointer-events: none;
}
</style>
