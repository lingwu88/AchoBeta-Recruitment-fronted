import Interview from '@/views/interview.vue'
import {defineStore} from 'pinia'
import { ref } from 'vue'
import { func } from 'vue-types'

export const useIdStore =defineStore(
  'id',
  ()=>{
    let batchId = sessionStorage.getItem('batchid')       //如果没有，则为空
    let actId = sessionStorage.getItem('actid')
    let interviewId = sessionStorage.getItem('interviewid')

    function setBatchId(id:string){
      batchId = id
      sessionStorage.setItem('batchid',batchId)
    }

    function clearBatchId(){
      batchId = null
      sessionStorage.removeItem('batchid')
    }

    function getBatchId(){
      return sessionStorage.getItem('batchid')
    }

    function isBatchId(id:string){
      return id===batchId       //是的话，则返回true,不是则返回false
    }

    function setActId(id:string){
      actId = id
      sessionStorage.setItem('actid',actId) 
    }

    function clearActId(){
      actId = null
      sessionStorage.removeItem('actid')
    }

    function getActId(){
      return sessionStorage.getItem('actid')
    }

    function isActId(id:string){
      return id===actId
    }

    function setInterviewId(id:string){
      interviewId = id 
      sessionStorage.setItem('interviewid',interviewId)
    }

    function clearInterviewId(){
      interviewId = null
      sessionStorage.removeItem('interviewid')
    }

    function getInterviewId(){
      return sessionStorage.getItem('interviewid')
    }

    function isInterviewId(id:string){
      return interviewId === id
    }
    
    return{
      setBatchId,
      setActId,
      setInterviewId,
      clearBatchId,
      clearActId,
      clearInterviewId,
      getBatchId,
      getActId,
      getInterviewId,
      isBatchId,
      isActId,
      isInterviewId
    }
  }
)