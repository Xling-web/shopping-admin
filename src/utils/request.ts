import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import store from '@/store'
import router from "@/router";

axios.defaults.baseURL = process.env.BASE_API; // 公共路由(网络请求地址)
axios.defaults.withCredentials = true


// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        if (!config?.headers) {
            throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        // if (useUserStoreHook().token) {
        //     config.headers.Authorization = `${Local.get('token')}`;
        // }
        return config
    }, (error) => {
        return Promise.reject(error);
    }
)

// 响应拦截器
axios.interceptors.response.use((response)=>{
  if(response.data.status == 401){
    router.push('/login')
    ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {})
        .then(() => {
        })
        .catch(() => {
    });
    store.commit('clearToken')
    ElMessage.closeAll()
  }
  return response.data;
}
);

// 封装自己的get/post方法
export default {
    get: function (path = "", data = {},header={}) {
      return new Promise(function (resolve, reject) {
        axios
          .get(path, {
            params: data,
            headers:header,
          })
          .then(function (response) {
            // 按需求来，这里我需要的是response.data，所以返回response.data，一般直接返回response
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    delete: function (path = "", data = {},header={}) {
      return new Promise(function (resolve, reject) {
        axios
          .delete(path, {
            params: data,
            headers:header,
          })
          .then(function (response) {
            // 按需求来，这里我需要的是response.data，所以返回response.data，一般直接返回response
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    post: function (path = "", data = {},header={}) {
      return new Promise(function (resolve, reject) {
        axios
          .post(path, data,header)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    put: function (path = "", data = {},header={}) {
      return new Promise(function (resolve, reject) {
        axios
          .put(path, data,header)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    }
};