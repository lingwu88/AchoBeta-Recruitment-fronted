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
  },
  {
    path:'/activitiesLayout',
    name:'activitiesLayout',
    component:()=>import('@/views/activitiesLayout.vue'),
    redirect:'/activitiesLayout/resume',
    children:[
      {
        path:'/activitiesLayout/resume',
        name:'resume',
        component:()=>import('@/views/resume.vue')
      }
    ]
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router