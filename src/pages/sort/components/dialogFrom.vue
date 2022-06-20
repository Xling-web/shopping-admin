<template>
    <!-- 弹框(新增/编辑) -->
    <el-dialog v-model="isDialog" :title="diaTitle" :draggable="true" width="30%" @closed="dialogClose">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="right"
        class="dialogFrom"
        :inline="true"
      >
        <el-form-item label="分类名称:" label-width="75px" prop="sortName">
            <el-input v-model="ruleForm.sortName" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="分类状态:" label-width="75px" prop="state">
          <el-select v-model="ruleForm.state" placeholder="请选择分类状态">   
            <el-option
              v-for="(i,index) in status"
              :key="index"
              :label="i.name"
              :value="i.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm(ruleFormRef,'add')" v-if="isAdd">新增保存</el-button>
          <el-button type="success" @click="submitForm(ruleFormRef,'edit')" v-else>修改保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive,toRefs,ref } from 'vue';
import {addcates,updateCateById} from '@/utils/api/sort'
import {Interface} from '@/plugins/msgBox'
// 表单
import type { ElForm } from 'element-plus'
const state = reactive({
    isDialog:false,//弹框开关
    diaTitle:'新增分类',
    // 弹框数据
    ruleForm:{
      id:undefined,
      sortName:'',
      state:0
    },
    status:[{id:1,name:'启用'},{id:0,name:'禁用'}],
    isAdd:true,
})

const {ruleForm,status,isDialog,diaTitle,isAdd} = toRefs(state)

// emit
let emit = defineEmits<{(e: 'emitOrders'): void}>()

// 暴露属性
defineExpose({
  isDialog,
  diaTitle,
  ruleForm,
  isAdd
})

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
  sortName: [{ required: true, message: '请输入分类名称',trigger: 'blur',}],
  state: [{ required: true, message: '请输入分类状态',trigger: 'change',}],
})

// 提交
const submitForm = (formEl: FormInstance | undefined,sort:string) => {
  if (!formEl) return
  formEl.validate(async (valid: any) => {
    if (valid) {
      if(sort === 'edit'){
        var res:any = await updateCateById(ruleForm.value)
      }else{
        delete ruleForm.value.id
        var res:any = await addcates(ruleForm.value)
      }
      Interface(res)
      emit('emitOrders')
      state.isDialog = false
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 关闭回调
const dialogClose = () => {
  ruleFormRef.value?.resetFields()
  isAdd.value = true
}

</script>

<style lang="scss" scoped>
@import '@/assets/css/comm.scss';

</style>