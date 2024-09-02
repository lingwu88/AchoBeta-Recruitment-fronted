import request from "@/api/http.ts";
import { emailLoginType } from '@/utils/emailLoginType'
import { formType } from '@/utils/formType'

export const emailLogin =(data:emailLoginType)=>{
  return request.post('/api/v1/auth/login',data)
}

export const sendCaptcha =(email:string)=>{
  return request({
    url:'/api/v1/resource/email/code',
    method:'post',
    params:{email}
  })
}


export const getUserInfo =(isVaildToken:string)=>{
  return request({
    url:'/api/v1/user/info',
    method:'get',
    headers:{
      token:isVaildToken
    }
  })
}

export const getBatch =(isVaildToken:string)=>{
  return request({
    url:'/api/v1/recruit/batch/list/user',
    method:'get',
    headers:{
      token:isVaildToken
    }
  })
}

export const getActivities = (batchId:string,isVaildToken:string)=>{
  return request({
    url:`/api/v1/recruit/activity/list/user/${batchId}`,
    method:'get',
    headers:{
      token:isVaildToken
    }
  })
}

export const submitResume = (isVaildToken:string,form:formType)=>{
  return request({
    url:'/api/v1/resume/submit',
    method:'post',
    headers:{
      token:isVaildToken
    },
    data:form
  })
}

export const queryResume = (batchId:string,isVaildToken:string)=>{
  return request({
    url:`/api/v1/resume/query/${batchId}`,
    method:'get',
    headers:{
      token:isVaildToken
    }
  })
}