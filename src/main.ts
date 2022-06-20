import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'
import 'element-plus/es/components/message/style/css'
import { components, plugins } from '@/plugins/element'
import {message} from '@/plugins/msgBox'
const app = createApp(App)

// 全局挂载消息提示
app.config.globalProperties.$message = message

// 按需导入Element Plus组件和插件
components.forEach(component => {
    app.component(component.name, component)
})
plugins.forEach(plugin => {
    app.use(plugin)
})

import filter from "@/plugins/filter";
// 全局导入过滤器
app.config.globalProperties.$filters = filter

app.use(router).use(store).mount('#app')
