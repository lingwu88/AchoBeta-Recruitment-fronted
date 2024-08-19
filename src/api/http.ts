import axios from 'axios'

const request = axios.create({
  baseURL:'http://localhost:8080',
  timeout:3*1000
})

//请求拦截器
request.interceptors.request.use(
  //发送之前想要做些什么
  config => {
      // token是否过期，是否重新登陆等等
      // 此处可修改一些基本数据
      // config[baseURL,[data,[headers,[method,[timeout,[url]   等
      //        基础地址,请求参数,头部, 请求方式, 超时,  请求地址  等

      // config.headers.Cookie = "110110110110110110";
      return config;
  },
  //方法返回一个带有拒绝原因的 Promise 对象。
  error => Promise.reject(error)
);
/**************移除拦截器****************/
  // 动态移除
  // const me = axios.interceptors.request.use(function () {/*...*/});
  // axios.interceptors.request.eject(me);
/***************************************/

//响应拦截器（对请求结束后进行一些操作，，例如:统一收集报错）
request.interceptors.response.use(
  //请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  //请求失败
  error => {
      //可根据不同的状态去区分不同的错误，达到不同效果
      if(error.response.status){
          error.response.status === 404 ? alert("请求不存在！！") : alert("其他");
      }
      return Promise.reject(error);
  }
);

export default request
————————————————

                          版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                      
原文链接：https://blog.csdn.net/weixin_46612230/article/details/125983510