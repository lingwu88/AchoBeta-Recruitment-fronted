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
})
