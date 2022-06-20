<template>
    <el-dialog
        v-model="isDialog"
        :title="title"
        width="35%"
        :before-close="handleClose"
    >
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            class="dialogFrom"
            :inline="true"
        >
            <el-form-item label="名称:" prop="advert_name" label-width="50">
                <el-input v-model="ruleForm.advert_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="URL链接:" prop="aUrl" label-width="80px">
                <el-input v-model="ruleForm.aUrl" autocomplete="off" />
            </el-form-item> 
            <el-form-item label="状态:" prop="status" label-width="50">
                <el-select v-model="ruleForm.status" placeholder="请选择分类状态">   
                    <el-option
                    v-for="(i,index) in status"
                    :key="index"
                    :label="i.name"
                    :value="i.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传图片" prop="img" label-width="80px">
                <el-upload
                    class="uploadImg"
                    drag
                    :action="actionUrl"
                    :on-success="handleSuccess"
                    :show-file-list="false"
                    accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PBG"
                >
                    <el-icon class="el-icon--upload" v-if="!ruleForm.img"><upload-filled /></el-icon>
                    <div class="el-upload__text" v-if="!ruleForm.img">
                    上传图片放在此处或<em>单击上载</em>
                    </div>
                    <img style="height: 100%;text-align: center;" :src="ruleForm.img" alt="" v-else />
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef,'add')" v-if="isAdd">保存</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef,'edit')" v-else>保存修改</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive,toRefs,ref } from 'vue';
import type { ElForm } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue'
import {addBanner,uploadById} from '@/utils/api/banner'
import { Interface } from '@/plugins/msgBox';

const state = reactive({
    isDialog:false,
    title:'新增轮播',
    ruleForm:{
        id:undefined,
        advert_name:'',
        aUrl:'',
        img:'',
        status:1
    },
    status:[{id:1,name:'启用'},{id:0,name:'禁用'}],
    actionUrl:`${process.env.BASE_API}api/user/uploadImg`,
    isAdd:true,
})
const {isDialog,title,ruleForm,status,actionUrl,isAdd} = toRefs(state)

const props = defineProps({
    orders:{
        type:Function,
        required:true,
        default:()=>{}
    }
})

type FormInstance = InstanceType<typeof ElForm>;
const ruleFormRef = ref<FormInstance>();
const rules = reactive({
  advert_name: { required: true, message: '请输入名称', trigger: 'blur' },
  aUrl: { required: true, message: '请选择跳转链接', trigger: 'blur' },
  img: { required: true, message: '请选择图片', trigger: 'blur' },
  status: { required: true, message: '请选择状态', trigger: 'blur' },
})

// 上传成功
const handleSuccess = (file: { data: { url: string; }[]; }) => {
  ruleForm.value.img = file.data[0].url
}

// 保存
const submitForm = (formEl: FormInstance | undefined,val:string) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
        if(val == 'add'){
            delete ruleForm.value.id
            var res:any = await addBanner(ruleForm.value)
        }else{
            var res:any = await uploadById(ruleForm.value)
        }
        Interface(res)
        isDialog.value = false
        props.orders()
    } else {
      return false
    }
  })
}

// 弹框关闭触发
const handleClose = ()=>{
    isDialog.value = false
    ruleFormRef.value?.resetFields()
}

defineExpose({
    isDialog,
    title,
    ruleForm,
    isAdd
})

</script>

<style lang="scss" scoped>
@import '@/assets/css/comm.scss';

.dialogFrom{
    :deep(.el-form-item){
        &:nth-last-child(2){
            display: block;
            width: 100%;
            text-align: center;
            .uploadImg{
                margin: auto;
            }
            .el-form-item__error{
                right: 0;
            }
        }
    }
}
</style>