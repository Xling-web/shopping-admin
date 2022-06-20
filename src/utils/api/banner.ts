// 导入封装好的网络请求类工具
import request from "@/utils/request";
import store from '@/store'
const state:any = store.state

// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);

// 新增
export const addBanner = (data:any) => request.post("/api/user/addBanner",data,{headers: {
    'authorization': state.persist.token
}});

// 列表查询 
export const gainList = (data:any) => request.get("/api/user/gainList",data,{
    'authorization': state.persist.token
});

// id查询
export const gainById = (data:any) => request.get("/api/user/gainById/"+data,'',{
    'authorization': state.persist.token
});

// 删除
export const delById = (data:any) => request.get("/api/user/delById/"+data,'',{
    'authorization': state.persist.token
});

// 编辑
export const uploadById = (data:any) => request.post("/api/user/uploadById",data,{headers: {
    'authorization': state.persist.token
}});

// 修改状态
export const disableById = (data:any) => request.post("/api/user/disableById",data,{headers: {
    'authorization': state.persist.token
}});