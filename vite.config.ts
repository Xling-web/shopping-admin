import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// element
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
	  vue(),
	  AutoImport({
		resolvers: [ElementPlusResolver()],
	  }),
	  Components({
		resolvers: [ElementPlusResolver()],
	  }),
	],
  resolve:{
    alias:{
      // 如果报错__dirname找不到，需要安装node，执行npm install @types/node --save-dev
			'@': resolve(__dirname, 'src'),
    }
  },
  define: {
    'process.env': {
      'BASE_API':"http://localhost:81/"
    }
  },
  base: './',// 打包路径
		build: { // 生产环境打包配置
			outDir: 'dist',
		},
	server:{
		https: false,
			port: 4000,// 服务端口号
			open: false,// 服务启动时是否自动打开浏览器
		cors: true, // 允许跨域
		proxy: {
			'/api': {
				target: 'http:localhost:81',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
		}
	}
})
