// 导入封装好的网络请求类工具
import request from "@/utils/request";
import store from '@/store'
const state:any = store.state

// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);

// 列表查询
export const cateList = (data:any) => request.get("/api/user/cateList",data,{
    'authorization': state.persist.token
});

// 新增分类
export const addcates = (data:any) => request.post("/api/user/addcates", data,{headers: {
    'authorization': state.persist.token
}});

// id查询
export const getCateId = (data:number) => request.get(`/api/user/getCateId/${data}`,'',{
    'authorization': state.persist.token
});

// 编辑分类
export const updateCateById = (data:any) => request.post("/api/user/updateCateById", data,{headers: {
    'authorization': state.persist.token
}});

// 更新分类状态
export const uploadStatus = (data:any) => request.post("/api/user/uploadStatus", data,{headers: {
    'authorization': state.persist.token
}});

// 删除分类
export const deletecates = (data:number) => request.get(`/api/user/deletecates/${data}`,'',{
    'authorization': state.persist.token
});