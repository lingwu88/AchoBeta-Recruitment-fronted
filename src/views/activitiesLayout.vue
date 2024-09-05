<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import navigationBottom from '@/components/navigationBottom.vue'
import navigationTop from '@/components/navigationTop.vue'
import scroollTo from '@/utils/scroollTo'
import { useRouter } from 'vue-router'

const transitionName = ref()
const router = useRouter()

router.beforeEach((to,from)=>{
  console.log('组件下注册的全局守卫');
  
  if((to.meta.index as number) > (from.meta.index as number)){
    transitionName.value = 'slide-right'
  }
  else if((to.meta.index as number) < (from.meta.index as number)){
    transitionName.value = 'slide-left'
  }
  else{
    transitionName.value = ''
  }
})

onMounted(()=>{
  scroollTo()
})
</script>

<template>
  <div class="activitiesLayout">
    <navigationTop class="top"></navigationTop>
    <div class="animation">
      <router-view v-slot="{ Component }">
      <transition  :name=transitionName  >
        <component :is="Component" />
      </transition>
    </router-view>
    </div>
    <navigationBottom class="navigationBottom" ></navigationBottom>
  </div>
</template>

<style scoped>
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.activitiesLayout{
  overflow-x: hidden;
  width: 100vw;
  min-height: 100vh;
  background-color: #A1C4FD;
}
.animation{
  width: 200%;
  display: flex;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active{
  transition: transform 0.3s;
}

.slide-right-leave-from,
.slide-right-enter-from{
  transform: translateX(0);
}
.slide-right-leave-to,
.slide-right-enter-to{
  transform:translateX(-100%);    /*组件向左移动*/
}

.slide-left-enter-from{
  transform:translateX(-200%);
}
.slide-left-enter-to{
  transform: translateX(-100%);
}
.slide-left-leave-from{
  transform: translateX(0);
}
.slide-left-leave-to{
  transform: translateX(100%);
}
.navigationBottom{
  position: sticky;
  bottom: 3vh;
  left: 5vw;
}
</style>
