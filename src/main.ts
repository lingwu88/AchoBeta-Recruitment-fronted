import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from "@/router/index.ts"
import {jwtDecode} from 'jwt-decode'
import 'vfonts/Lato.css' // 通用字体
import 'vfonts/FiraCode.css' // 等宽字体
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import { getUserInfo } from '@/api/api'



const pinia = createPinia()
pinia.use(piniaPluginPersist)

createApp(App).use(router).use(pinia).mount('#app')

// router.beforeEach(async(to,form,next)=>{
//   const isLogin:boolean = localStorage.store?true:false        //作token存储持久化：解决刷新页面时pinia也被重置
//   if(isLogin){                          
//     const store=JSON.parse(localStorage.store)        //重新赋值store，取出在本地存储的store对象实例？？删掉也可以持久化pinia?????
//     //  
//     // getUserInfo(store.token).then(res=>{            //判断是否有效token
//     //   console.log(res);
//     //   console.log('token有效');
      
//     //   if(res.data.code==200){
//     //     next()
//     //     return
//     //   }
//     //   else if(res.data.code==2009){        //无效token，则前往login，移除曾经token
//     //     localStorage.removeItem('store')
//     //     next("/login")
//     //     return
//     //   }
//     //   else{
//     //     next('/errPage')
//     //     return
//     //   }
//     // }).catch(err=>{
//     //   console.log(err);
//     //   next('/errPage')
//     //   console.log('你好，能看到我么');
//     //   return
//     // })
    
//     // if (date - (decode.iat as number) > (decode.exp as number) - (decode.iat as number)) {        //计算token过期时间，若过期，则清除本地存储的token
//     //   localStorage.removeItem("user");
//     //   next("/login");
//     // }
//     const res = await getUserInfo(store.token)
//     if(res.data.code === 200){
//       next()
//     }
//     else if(res.data.code===2009){
//       localStorage.removeItem('store')
//       next('/login')
//     }
//     else{
//       next('/errPage')
//     }
//   }
//   else{
//     if(to.path=='/login'){           //如果去登录页面，无需鉴权
//       next()
//       return
//     }
//     else{
//       isLogin?next():next('/login')   //如果不是去login，那么需要判断是否有登录，有则放行，没有则去往登录页面
//     }
//   }
// })
