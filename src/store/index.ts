import { createStore } from "vuex"
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['persist']
})

// 创建一个新的 store 实例
const initModule = () => {
    // 获取modules文件夹内所有的模块
    const requireModules = import.meta.globEager("./modules/*.ts")

    const modules = {}
    for (let i in requireModules) {
        // 将模块路径切割出模块名
        interface keyd {
          [key:string]:any
        }
        const moduleName:string = i.split("/")[i.split("/").length - 1].replace(".ts", "");
        // 将模块放入modules
        (<keyd>modules)[moduleName] = requireModules[i].default
    }
    return modules
}

const store = createStore({
    state() {
        
    },
    mutations: {
        
    },
    modules: { ...initModule() },
    plugins: [vuexLocal.plugin]
})

export default store