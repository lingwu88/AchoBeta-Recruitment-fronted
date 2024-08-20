import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"Index",
    component:()=>import("@/views/index.vue")
  },
  {
    path:'/ActivitiesApplication',
    name:'ActivitiesApplication',
    component:()=>import('@/views/activitiesApplication.vue')
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router