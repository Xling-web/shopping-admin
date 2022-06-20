export default {
    namespaced: true,
    state: {
        aa:'',
    },
    mutations: {
        changetem(state:any, active:string) {
            state.aa = active
        },
    },
}