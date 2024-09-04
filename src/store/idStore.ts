import { defineStore } from "pinia";
import { ref } from 'vue'

export const useIdStore=defineStore('id',
  ()=>
    {
      const batchId=ref('')
      const actId=ref('')

      function setBatchId(id:string){
        batchId.value=id;
      }
      function setActId(id:string){
        actId.value=id;
      }
      function getBatchId(){
        return batchId.value
      }
      function getActId(){
        return actId.value
      }

      return{
        setBatchId,
        setActId,
        getBatchId,
        getActId
      }
    }
)