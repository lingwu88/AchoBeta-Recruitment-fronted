<script lang="ts" setup>
import { ref } from 'vue'
import  navigationTop  from '@/components/navigationTop.vue'
const information = ref({
  username:'黑羽快斗',
  nickname:'你回到',
  email:'1135892407@qq.com',
  phoneNumber:'13929202243'
})
</script>

<template>
  <navigationTop class="top"></navigationTop>
  <n-flex vertical class="person-layout">
    <div class="avater-layout">
      <div class="avater-flex">
        <n-avatar
        src="../src/assets/avatar.jpg"
        class="avater"
        :bordered="true"
        round
        />
      </div>
      <p class="userName">{{ information.username }}</p>
    </div>
    <div class="information-layout">
      <n-flex vertical>
        <div class="information-item">
          <p class="information-label">昵称</p>
          <input class="information-input" v-model="information.nickname">
        </div>
        <div class="information-item">
          <p class="information-label">邮箱</p>
          <input class="information-input" v-model="information.email">
        </div>
        <div class="information-item">
          <p class="information-label">手机号</p>
          <input class="information-input" v-model="information.phoneNumber">
        </div>
      </n-flex>
    </div>
  </n-flex>
</template>

<style scoped>
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.person-layout{
  width:100vw;
  min-height: 100vh;
  background-color: rgba(253,247,247,1);
  font-family: '宋体';
}
.avater-layout{
  width: 90vw;
  min-height: 40vh;
  margin: 0 auto 0 5vw;
  background-image: linear-gradient(0deg, rgb(69, 98, 161) 0%, rgb(253,247,247) 100%);
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
}
.avater-flex{
  flex-grow:1;
}
.avater{
  top: 5vh;
  left: 27vw;
  height: 20vh;
  width: 20vh;
}
.userName{
  height: 10vh;
  text-align: center;
  font-size: 1.2rem;
}
.information-layout{
  width: 90vw;
  min-height: 60vh;
  background-color: rgb(123, 175, 234);
  margin:0 auto 2vh 5vw;
  border-radius:  20px;
  padding:5vh 0 0 0;
}
.information-item{
  display:flex;
}
.information-label{
  padding:2vh 0 0 4vw;
  font-size:1.1rem;
  width:18vw;
}
.information-input{
  border: none;
  outline:none;
  background-color: inherit;
  font-size:1.1rem;
  font-weight: bold;
  padding:1.5vh 0 0 3vw;
}
</style>
