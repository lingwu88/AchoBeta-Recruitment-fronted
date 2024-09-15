//分割传入时间字符串，去掉末尾秒数
export const splitTime=(time:string)=>{
  time = time.slice(0,-3)
  return time
}
