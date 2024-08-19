import axios from "@/api/http.ts";

export const getReport =(data:any)=>{
  return axios.get('/reports/get',data)
}