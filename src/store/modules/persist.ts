
const store = {
    namespaced: true,
    state: {
        token:'',
    },
    mutations: {
        readToken(state:any,payload:any){
            state.token = payload.token
        },
        clearToken(state:any){
            state.token = null
        }
    },
}

//将store store 导出去
export const myStore = store

export default store;