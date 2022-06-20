// 导入封装好的网络请求类工具
import request from "@/utils/request";
// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);

// 获取验证码
export const verifyCode = () => request.get("/api/user/verifyCode",'');

// // 验证验证码
// export const verify = (data) => request.post("/api/VerifyCode/Verify", data,{headers: {
//     'X-VGuid': store.state.temporary.vGuid,
//     'X-VCode': store.state.temporary.vCode
// }});

// // 登录
export const logind = (data:any) => request.post("/api/user/login", data);

// // 退出登录
// export const loginOut = (data) => request.post("/api/Logout", data,{headers: {
//     'X-Token': store.state.persist.token,
// }});


// // 公共配置(查询所有下拉选项枚举)
// export const GetDLLData = (data) => request.get("/api/config/GetDLLData",data);

// // 验证码
// export const VerifyCode = (data) => request.get("/api/VerifyCode/Generate/"+data,'');