import {defineStore} from 'pinia'

export const useUserStore =defineStore('store',{
  state:()=>{
    return {
      count:0
    }
  },
  getters:{},
  actions:{}
})