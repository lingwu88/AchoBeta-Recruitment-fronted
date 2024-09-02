import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useStore =defineStore(
  'store',
  ()=>{
    const token = ref<string>('')

    function setToken(newToken:string){
      token.value=newToken
    }

    function clearToken(){
      token.value=''
      localStorage.removeItem('store')
    }

    return{
      token,
      setToken,
      clearToken
    }
  },
  {
    persist:true
  }
)