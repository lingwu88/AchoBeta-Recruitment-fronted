import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from "@/router/index.ts"
import 'vfonts/Lato.css' // 通用字体
import 'vfonts/FiraCode.css' // 等宽字体
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import { getUserInfo } from '@/api/api'


const pinia = createPinia()
pinia.use(piniaPluginPersist)

createApp(App).use(pinia).use(router).mount('#app')

router.beforeEach(async(to,from)=>{
// console.log(to);
console.log(from);


  try{
    const isLogin:boolean = localStorage.store?true:false        //作token存储持久化：解决刷新页面时pinia也被重置
    if(isLogin){                        
      console.log('已登录了');
        
      const store=JSON.parse(localStorage.store)        //重新赋值store，取出在本地存储的store对象实例？？删掉也可以持久化pinia?????
      const res = await getUserInfo(store.token)        //使用await，保证在连续跳转时执行顺序是顺序执行，不会多次执行next，一个接一个,若想处理报错，则需要在响应拦截器里作处理
      // console.log(res);
      
      if(res.data.code === 200){

        return true
      }
      else if(res.data.code===2009){
        if(to.path!='/login'){
        // localStorage.removeItem('store')
        alert('凭证已失效，请重新登录!')
        // console.log('tologin');
        
        return '/login'                 //避免无限调用导致栈溢出
        }
      }
      else{
        // console.log('你好,我是分支else');
        
        return '/errPage'
      }
    }
    else{
      // console.log('没登陆');
      
      if(to.path=='/login'){           //如果去登录页面，无需鉴权
        return true
      }
      else{
      return isLogin?true:'/login'   //如果不是去login，那么需要判断是否有登录，有则放行，没有则去往登录页面
      }
    }
  }catch(error){
    console.log(error);
    if(to.path!=='/errPage'){
      router.push('/errPage')
    }
  }
})
