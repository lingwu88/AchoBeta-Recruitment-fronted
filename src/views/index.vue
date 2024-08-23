<script lang="ts" setup>
import ActivitiesCard from '@/components/activitiesCard.vue';
import Introduce from '@/components/Introduce.vue';
import { useRouter } from 'vue-router';
import processIntroduce from '@/components/processIntroduce.vue'
import navigationTop from '@/components/navigationTop.vue'
import { onMounted } from 'vue'
import scroollTo from '@/utils/scroollTo'

const router = useRouter()

const carouselPhoto =[
  {
    class:'carousel-img',
    src:"src/assets/photo1.jpg",
    alt:'暂时无法接收图片'
  },
  {
    class:'carousel-img',
    src:"src/assets/photo2.jpg",
    alt:'暂时无法接收图片'
  },
  {
    class:'carousel-img',
    src:"src/assets/photo3.jpg",
    alt:'暂时无法接收图片'
  },
  {
    class:'carousel-img',
    src:"src/assets/photo4.jpg",
    alt:'暂时无法接收图片'
  }
]
const teamPhoto= [
  {
    class:'carousel-img',
    src:"src/assets/photo1.jpg",
    alt:'暂时无法接收图片'
  },
  {
    class:'carousel-img',
    src:"src/assets/photo2.jpg",
    alt:'暂时无法接收图片'
  },
  {
    class:'carousel-img',
    src:"src/assets/photo3.jpg",
    alt:'暂时无法接收图片'
  },
]

const toApplication=()=>{
  router.push({path:'/activitiesApplication'})
}

onMounted(()=>{
  scroollTo()
})
</script>

<template>
  <navigationTop class="top"></navigationTop>
  <n-back-top :right="10" />
  <n-flex vertical class="layout">
    <n-carousel draggable autoplay class="carousel-box">
      <img
        v-for="item in carouselPhoto"
        :class="item.class"
        :src="item.src"
        :alt="item.alt"
      />
    </n-carousel>
    <Introduce>
      <template #title>
        <div class="card-title">
          <p class="english-title">Recruitment activities</p>
          <p class="chinese-title"><b>招新活动</b></p>
        </div>
      </template>
      <template #content>
        <activitiesCard @toApplication="toApplication"></activitiesCard>
        <activitiesCard @toApplication="toApplication"></activitiesCard>
      </template>
    </Introduce>
    <Introduce>
      <template #title>
        <div  class="card-title">
          <p class="english-title">Recruitment process</p>
          <p class="chinese-title"><b>招新流程</b></p>
        </div>
      </template>
      <template #content>
        <processIntroduce></processIntroduce>
      </template>
    </Introduce>
    <Introduce>
      <template #title>
        <div  class="card-title">
          <p class="english-title">Team Introduction</p>
          <p class="chinese-title"><b>团队介绍</b></p>
        </div>
      </template>
      <template #content>
        <n-carousel
          effect="card"
          prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
          next-slide-style="transform: translateX(50%) translateZ(-800px);"
          style="height: 240px"
          :show-dots="false"
        >
          <n-carousel-item :style="{ width: '60%' }"  v-for="item in teamPhoto">
            <img
              :class="item.class"
              :src="item.src"
              :alt="item.alt"
            />
          </n-carousel-item>
        </n-carousel>
      </template>
    </Introduce>
  </n-flex>
</template>

<style scoped>
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.float-button{
  z-index: 999;
}
.english-title{
  font-family: '华文隶书';
  font-size: 1.4rem;
  padding-left: 3%;
}
.layout{
  width: 100vw;
  height:auto;
  background-color: rgba(255, 255, 255, 0.612);
}
.chinese-title{
  font-family: '楷体';
  font-size: 1.5rem;
  padding-left: 3%;
}
.carousel-box{
  height: 400px;
}
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-title{
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
