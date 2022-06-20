// 导入封装好的网络请求类工具
import request from "@/utils/request";
import store from '@/store'
const state:any = store.state

// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);

// 列表查询
export const shopList = (data:any) => request.get("/api/user/shopList",data,{
    'authorization': state.persist.token
});

// 新增商品
export const addShop = (data:any) => request.post("/api/user/addShop", data,{headers: {
    'authorization': state.persist.token
}});

// id查询
export const shopById = (data:number) => request.get(`/api/user/shopById/${data}`,'',{
    'authorization': state.persist.token
});

// 编辑商品
export const updateShop = (data:any) => request.post("/api/user/updateShop", data,{headers: {
    'authorization': state.persist.token
}});

// 删除商品
export const deleteShopId = (data:number) => request.get(`/api/user/deleteShopId/${data}`,'',{
    'authorization': state.persist.token
});

// 修改商品状态
export const uploadStatus = (data:any) => request.post("/api/user/uploadStatus", data,{headers: {
    'authorization': state.persist.token
}});

// 查询分类 select
export const cateByList = () => request.get(`/api/user/cateByList`,'',{
    'authorization': state.persist.token
});

// 上传图片
export const uploadImg = (data:any) => request.post("/api/user/uploadImg", data,{headers: {
    'authorization': state.persist.token
}});