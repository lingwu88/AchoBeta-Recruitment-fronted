import request from "@/api/http.ts";
import { emailLoginType } from '@/utils/type/emailLoginType'
import { formType } from '@/utils/type/formType'
import { questionForm } from '@/utils/type/questionFormType'

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

export const getActivitiesList = (batchId:string,isVaildToken:string)=>{
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

export const getTemplate = (actId:string,isVaildToken:string)=>{
  return request({
    url:`/api/v1/recruit/activity/template/${actId}`,
    method:'get',
    headers:{
      token:isVaildToken
    }
  })
}

export const getQuestion = (actId:string,isVaildToken:string)=>{
  return request({
    url:`/api/v1/participate/get/${actId}`,
    method:'get',
    headers:{
      token:isVaildToken
    }
  })
}

export const submitQuestion = (isVaildTolen:string,form:questionForm) =>{
  return request({
    url:'/api/v1/participate/submit',
    method:'post',
    data:form,
    headers:{
      token:isVaildTolen
    }
  })
}

export const getInterview = (isVaildToken:string,
  id:{
    batchId:number,
    actId:number
  })=>{
    return request({
      url:'/api/v1/interview/list/user',
      method:'post',
      data:id,
      headers:{
        token:isVaildToken
      }
    })
  }

export const getInterviewDetail = ((isvaildToken:string,interviewId:string)=>{
  return request({
    url:`/api/v1/interview/detail/${interviewId}`,
    method:'get',
    headers:{
      token:isvaildToken
    }
  })
})

export const getInterviewComment = ((isvaildToken:string,interviewId:string)=>{
 return request({
  url:`/api/v1/evaluate/summary/query/${interviewId}`,
  method:'get',
  headers:{
    token:isvaildToken
  }
 }) 
})