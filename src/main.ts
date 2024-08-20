import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from "@/router/index.ts"
import 'vfonts/Lato.css' // 通用字体
import 'vfonts/FiraCode.css' // 等宽字体

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
