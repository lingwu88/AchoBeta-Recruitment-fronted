// vite.config.ts
import { defineConfig } from "file:///C:/Users/11358/Desktop/project/AchoBeta/%E6%8B%9B%E6%96%B0%E7%B3%BB%E7%BB%9F%E5%89%8D%E5%8F%B0%E9%87%8D%E6%9E%84(New)/my-vue-app/node_modules/.pnpm/vite@5.4.1_@types+node@22.4.0_sass@1.77.8/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///C:/Users/11358/Desktop/project/AchoBeta/%E6%8B%9B%E6%96%B0%E7%B3%BB%E7%BB%9F%E5%89%8D%E5%8F%B0%E9%87%8D%E6%9E%84(New)/my-vue-app/node_modules/.pnpm/unplugin-auto-import@0.18.2_@nuxt+kit@3.13.0_rollup@4.20.0__rollup@4.20.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/11358/Desktop/project/AchoBeta/%E6%8B%9B%E6%96%B0%E7%B3%BB%E7%BB%9F%E5%89%8D%E5%8F%B0%E9%87%8D%E6%9E%84(New)/my-vue-app/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.4_@nuxt+kit@3.13.0_rollup@4.20.0__rollup@4._e7p36qzg6rhwztrgfzcheh4amq/node_modules/unplugin-vue-components/dist/vite.js";
import vue from "file:///C:/Users/11358/Desktop/project/AchoBeta/%E6%8B%9B%E6%96%B0%E7%B3%BB%E7%BB%9F%E5%89%8D%E5%8F%B0%E9%87%8D%E6%9E%84(New)/my-vue-app/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.4.1_@types+node@22.4.0_sass@1.77.8__vue@3.4.38_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { NaiveUiResolver } from "file:///C:/Users/11358/Desktop/project/AchoBeta/%E6%8B%9B%E6%96%B0%E7%B3%BB%E7%BB%9F%E5%89%8D%E5%8F%B0%E9%87%8D%E6%9E%84(New)/my-vue-app/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.4_@nuxt+kit@3.13.0_rollup@4.20.0__rollup@4._e7p36qzg6rhwztrgfzcheh4amq/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_dirname = "C:\\Users\\11358\\Desktop\\project\\AchoBeta\\\u62DB\u65B0\u7CFB\u7EDF\u524D\u53F0\u91CD\u6784(New)\\my-vue-app";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar"
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  server: {
    proxy: {
      "/api": {
        // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: "http://139.159.210.77:9001",
        // 目标地址 --> 服务器地址
        changeOrigin: true,
        // 允许跨域
        // 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: (path2) => path2.replace(/'^\/api'/, "")
        // 去掉请求路径中的 /api 前缀
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxMTM1OFxcXFxEZXNrdG9wXFxcXHByb2plY3RcXFxcQWNob0JldGFcXFxcXHU2MkRCXHU2NUIwXHU3Q0ZCXHU3RURGXHU1MjREXHU1M0YwXHU5MUNEXHU2Nzg0KE5ldylcXFxcbXktdnVlLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMTEzNThcXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXEFjaG9CZXRhXFxcXFx1NjJEQlx1NjVCMFx1N0NGQlx1N0VERlx1NTI0RFx1NTNGMFx1OTFDRFx1Njc4NChOZXcpXFxcXG15LXZ1ZS1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzExMzU4L0Rlc2t0b3AvcHJvamVjdC9BY2hvQmV0YS8lRTYlOEIlOUIlRTYlOTYlQjAlRTclQjMlQkIlRTclQkIlOUYlRTUlODklOEQlRTUlOEYlQjAlRTklODclOEQlRTYlOUUlODQoTmV3KS9teS12dWUtYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCAgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZTp7XG4gICAgYWxpYXM6e1xuICAgICAgXCJAXCI6cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwnc3JjJylcbiAgICB9XG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW1wb3J0czpbXG4gICAgICAgICAgJ3Z1ZScsXG4gICAgICAgICAge1xuICAgICAgICAgICAgJ25haXZlLXVpJzpbXG4gICAgICAgICAgICAgICd1c2VEaWFsb2cnLFxuICAgICAgICAgICAgICAndXNlTWVzc2FnZScsXG4gICAgICAgICAgICAgICd1c2VOb3RpZmljYXRpb24nLFxuICAgICAgICAgICAgICAndXNlTG9hZGluZ0JhcidcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczpbTmFpdmVVaVJlc29sdmVyKCldXG4gICAgfSlcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzogeyAvLyBcdTkxNERcdTdGNkVcdTk3MDBcdTg5ODFcdTRFRTNcdTc0MDZcdTc2ODRcdThERUZcdTVGODQgLS0+IFx1OEZEOVx1OTFDQ1x1NzY4NFx1NjEwRlx1NjAxRFx1NjYyRlx1NEVFM1x1NzQwNmh0dHA6Ly9sb2NhbGhvc3Q6ODAvYXBpL1x1NTQwRVx1NzY4NFx1NjI0MFx1NjcwOVx1OERFRlx1NzUzMVxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTM5LjE1OS4yMTAuNzc6OTAwMScsIC8vIFx1NzZFRVx1NjgwN1x1NTczMFx1NTc0MCAtLT4gXHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy8gXHU1MTQxXHU4QkI4XHU4REU4XHU1N0RGXG5cdFx0Ly8gXHU5MUNEXHU1MTk5XHU4REVGXHU1Rjg0IC0tPiBcdTRGNUNcdTc1MjhcdTRFMEV2dWVcdTkxNERcdTdGNkVwYXRoUmV3cml0ZVx1NEY1Q1x1NzUyOFx1NzZGOFx1NTQwQ1xuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvJ15cXC9hcGknLywgJycpIC8vIFx1NTNCQlx1NjM4OVx1OEJGN1x1NkM0Mlx1OERFRlx1NUY4NFx1NEUyRFx1NzY4NCAvYXBpIFx1NTI0RFx1N0YwMFxuICAgICAgfVxuICAgICB9LFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrYyxTQUFTLG9CQUFvQjtBQUMvZCxPQUFRLGdCQUFnQjtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBTGhDLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVE7QUFBQSxJQUNOLE9BQU07QUFBQSxNQUNKLEtBQUksS0FBSyxRQUFRLGtDQUFVLEtBQUs7QUFBQSxJQUNsQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNQLFNBQVE7QUFBQSxRQUNOO0FBQUEsUUFDQTtBQUFBLFVBQ0UsWUFBVztBQUFBLFlBQ1Q7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNKLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztBQUFBLElBQzlCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUE7QUFBQSxRQUNOLFFBQVE7QUFBQTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUE7QUFBQSxRQUVkLFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLFlBQVksRUFBRTtBQUFBO0FBQUEsTUFDOUM7QUFBQSxJQUNEO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
