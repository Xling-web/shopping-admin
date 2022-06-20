<template>
  <div class="login_container loadingtext">
    <div class="login_box">
        <!-- 表单 -->
        <h1>AGV调度系统</h1>
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            class="login_form"
            :size="formSize"
        >
            <el-form-item  prop="username">
                <el-input v-model="ruleForm.username" :prefix-icon="Avatar" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" :prefix-icon="Lock" placeholder="请输入密码" @keyup.enter.native="login(ruleFormRef)"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input
                    v-model="ruleForm.code"
                    :prefix-icon="Key"
                    type="text"
                    @keyup.enter.native="login(ruleFormRef)"
                    placeholder="请输入验证码"
                ></el-input>
                <div class="code">
                    <p v-html="verificationCode" @click="obtainCode"></p>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template> 

<script setup lang="ts">
import {verifyCode,logind} from '@/utils/api/login'
import { reactive, ref,toRefs,onMounted } from 'vue'
import type { ElForm } from 'element-plus'
import { Avatar, Key , Lock } from '@element-plus/icons-vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
// 引入全局挂载
import { getCurrentInstance } from "vue";
const { appContext: { config: { globalProperties }} } = getCurrentInstance() as any;

const router = useRouter()
const store  = useStore()

type FormInstance = InstanceType<typeof ElForm>

const formSize = ref('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username:"",
  password:"",
  code:"",
})

// v-model
const state = reactive({
  verificationCode:""
})
const {verificationCode} = toRefs(state)

const rules = reactive({
    username: [
        {required: true,message: '请输入用户名',trigger: 'blur',}
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 4, max: 15, message: "长度在 4 到 15 个字符", trigger: "blur" }
    ],
    code: [
        { required: true,message: '请输入验证码',trigger: 'blur',}
    ],
})

// 验证码
onMounted(() => {
  obtainCode()
})

// 登录
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      logind(ruleForm).then((res:any)=>{
        if(res.status == 200){
          store.commit('persist/readToken',{token:res.token})
          router.push('/')
          globalProperties.$message(res.msg,'success');
        }else{
          obtainCode()
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 验证码获取
const obtainCode = async()=>{
  const res:any = await verifyCode()
  console.log(res)
  state.verificationCode = res.data;
}
     
</script>

<style lang="scss" scoped>
.login_container {
  height: 100vh;
  width: 100vw;
  background-image: url(@/assets/bg1.svg);
  background-color: #f8f8f8;
  background-position: 100% 100%;
  background-size: 100% 100%;
  h1 {
    display: block;
    position: relative;
    text-align: center;
    color: #474747;
    font-size: 25px;
    margin: 0 0 30px 0;
  }
}

.login_box {
  width: 320px;
  height: 300px;
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 4px rgba(0, 0, 0, .1);
  
  :deep(.login_form){
    .el-form-item__content{
        width: 100% !important;
    }
    .el-form-item {
        margin-bottom: 20px;
        &:nth-child(3){
            .el-input{
                display: inline-block;
                width: 60% !important;
                vertical-align: top;
            }
            .code{
                display: inline-block;
                width: 30%;
                height: 32px;
                vertical-align: middle;
                margin-left: 9%;
                p{
                  display: block;
                  width: 100%;
                  height: 100%;
                  svg{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 1px solid #d3d3d3;
                    box-sizing: border-box;
                  }
                }
                &:hover{
                    cursor: pointer;
                }
            }
        }
        }
    }
}
.el-button {
  width: 100%;
}



</style>
