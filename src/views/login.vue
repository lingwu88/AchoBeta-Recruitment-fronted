<script lang="ts" setup>
import { ref ,onMounted ,onBeforeUnmount } from 'vue'
import navigationTop from '@/components/navigationTop.vue'
import { useRouter } from 'vue-router'
import { emailLogin,sendCaptcha } from '@/api/api'
import { emailLoginType } from '@/utils/type/emailLoginType'
import { useStore } from '@/store/index'
import { useMessage } from 'naive-ui'

const message=useMessage()
const pageHeight=ref(document.documentElement.scrollHeight)
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
  console.log(emailRegex.test(email));
  
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
  emailLogin(emailForm.value).then(res=>{
    if(res.data.code===200){
      router.push('/')
      storage.setToken(res.data.data.access_token)        //Client存储Token
    }
    else if(res.data.code==2500)
    {
      message.error('输入验证码错误')
      message.warning(res.data.message)
    }
    else{
      message.warning(res.data.message)
    }
  }).catch(err=>{
    console.log(err);
    message.error(err.message)
  })
}

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
    <navigationTop class="top" :pageHeight="pageHeight"></navigationTop>
    <div class="login-layout">
        <n-flex vertical class="flex-layout">
          <p class="login-tag">邮箱登录</p>
          <div>
            <p class="form-title">邮箱</p>
            <input placeholder="请输入您的邮箱" class="email-input" v-model="emailForm.email_params.email"></input>
          </div>
          <div>
            <p class="form-title">验证码</p>
            <n-flex justify="space-around" class="captcha-flex" :wrap=false>
              <input class="captcha" v-model="emailForm.email_params.emailCode" placeholder="请输入验证码"></input>
              <p :class="['captcha-tip',{'disabled':isDisabled}]" @click="sendCode">{{ sendCodeText }}</p>
            </n-flex>
          </div> 
        <n-button type="primary" @click="login" class="button">登录</n-button>
        <!-- <p class="tip">暂时只有网易、QQ的邮箱能使用哦😥</p> -->
        </n-flex>

    </div>
</template>

<style lang="scss" scoped>

.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.login-layout{
  width: 100vw;
  height: calc(var(--vh,1vh)*6);
  background-color: rgb(255, 255, 255);
}
.flex-layout{
  height: calc(var(--vh,1vh)*90);
  width: 90vw;
  margin: 0 auto 0 5vw;
  font-family: '宋体';
}
.login-tag{
  margin: calc(var(--vh,1vh)*10) 0 0 0;
  font-weight: bold;
  font-size: 1.4rem;
}
.form-title{
  font-size: 1.1rem;
  margin:0 0 0 3vw;
}
.email-input{
  border:none;
  outline: none;
  width: 80vw;
  margin: calc(var(--vh,1vh)*1) 5vw calc(var(--vh,1vh)*2) 5vw;
  padding: 0 0 calc(var(--vh,1vh)*1) 0;
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
  width: 80vw;
  margin: calc(var(--vh,1vh)*1) 5vw calc(var(--vh,1vh)*4) 5vw; 
  border-bottom-color: rgb(178, 165, 165);
  border-bottom-style: solid;
  border-bottom-width: 2px;
}
.captcha{
  width:50vw;
  border: none;
  outline: none;
  background-color: inherit;
  font-size: 1rem;
  padding: 0 0 calc(var(--vh,1vh)*1) 0;
  flex-grow: 1;
}
.captcha-tip{
  width:20vw;
  padding: 0 2vw 0 0;
}
.button{
  width: 90%;
  height: calc(var(--vh,1vh)*6);
  margin:0 5%;
}
.tip{
  margin: calc(var(--vh,1vh)*2) 0 0 1vw;
}
.disabled{
  width:30vw;
  color:gray;
  pointer-events: none;
}

/*测试用 */


</style>
