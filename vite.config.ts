import { defineConfig } from 'vite'
import  AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
        imports:[
          'vue',
          {
            'naive-ui':[
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
    }),
    Components({
      resolvers:[NaiveUiResolver()]
    })
  ],
  server: {
    proxy: {
      '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: 'http://139.159.210.77:9001', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
		// 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: path => path.replace(/'^\/api'/, '') // 去掉请求路径中的 /api 前缀
      }
     },
  }
})
