import axios from 'axios'
import { useStore } from '@/store/index'


const request = axios.create({
  baseURL:'/',
  timeout:5*1000
})

//请求拦截器
request.interceptors.request.use(
  //发送之前想要做些什么
  // config => {
  //     // token是否过期，是否重新登陆等等
  //     // 此处可修改一些基本数据
  //     // config[baseURL,[data,[headers,[method,[timeout,[url]   等
  //     //        基础地址,请求参数,头部, 请求方式, 超时,  请求地址  等

  //     // config.headers.Cookie = "110110110110110110";
  //     return config;
  // },
  // //方法返回一个带有拒绝原因的 Promise 对象。
  // error => Promise.reject(error)
);

//响应拦截器（对请求结束后进行一些操作，，例如:统一收集报错）
request.interceptors.response.use(
  res => {
    const storage = useStore()
    if(res.headers.hasOwnProperty('token') && res.headers.token!=null){                 //对即将失效（失效前20o分钟内的token，进行无感刷新，而对于已失效的token，则一定是要跳转到登录页面）
      storage.setToken(res.headers.token)                                               //重新覆盖为新的token
      console.log('你好，要无感刷新啊');
    }
    return Promise.resolve(res)
  },      //将promise变为操作成功状态，并将res传递作为then方法的参数
  //请求失败
  error => {
      // //可根据不同的状态去区分不同的错误，达到不同效果
      // if(error.response.status){
      //     error.response.status === 404 ? alert("请求不存在！！") : alert("其他");
      // }
      // return Promise.reject(error);
      return Promise.reject(error)
  }
);

export default request