import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:"/",
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
    path:'/errPage',
    name:'errPage',
    component:()=>import('@/views/errPage.vue')
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
        component:()=>import('@/views/activitiesApplication.vue')
      },
      {
        path:'/activitiesLayout/question',
        name:'question',
        component:()=>import('@/views/questionNaire.vue')
      },
      {
        path:'/activitiesLayout/interview',
        name:'interview',
        component:()=>import('@/views/interview.vue')
      },
      {
        path:'/activitiesLayout/interviewDetailed',
        name:'interviewDetailed',
        component:()=>import('@/views/interviewDetailed.vue')
      }
    ]
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router