import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";
import { RouteMeta } from "vue-router";

interface MyRouteMeta extends RouteMeta{
  index?:number
}

const routes:Array<RouteRecordRaw> = [
  {
    path:"/",
    redirect:'/index'
  },
  {
    path:"/index",
    name:"Index",
    component:()=>import("@/views/index.vue")
  },
  {
    path:'/person',
    name:'person',
    component:()=>import('@/views/person.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login.vue')
  },
  {
    path:'/glanceActivities',
    name:'glanceActivities',
    component:()=>import('@/views/glanceActivities.vue')
  },
  {
    path:'/resume',
    name:'resume',
    component:()=>import('@/views/resume.vue')
  },
  {
    path:'/process',
    name:'process',
    component:()=>import('@/views/process.vue')
  },
  {
    path:'/activitiesLayout',
    name:'activitiesLayout',
    component:()=>import('@/views/activitiesLayout.vue'),
    redirect:'/activitiesLayout/activities',
    children:[
      {
        path:'/activitiesLayout/activity',
        name:'activity',
        component:()=>import('@/views/activitiesApplication.vue'),
        meta:{
          index:1
        } as MyRouteMeta
      },
      {
        path:'/activitiesLayout/question',
        name:'question',
        component:()=>import('@/views/questionNaire.vue'),
        meta:{
          index:2
        } as MyRouteMeta
      },
      {
        path:'/activitiesLayout/interview',
        name:'interview',
        component:()=>import('@/views/interview.vue'),
        meta:{
          index:3
        } as MyRouteMeta
      },
      {
        path:'/activitiesLayout/interviewDetailed',
        name:'interviewDetailed',
        component:()=>import('@/views/interviewDetailed.vue'),
        meta:{
          index:4
        } as MyRouteMeta
      }
    ]
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router