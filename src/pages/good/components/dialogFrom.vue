<template>
    <el-drawer
        v-model="isDrawer"
        :title="title"
        direction="rtl"
        size="45%"
        :close-on-click-modal="false"
        @close="handleClose"
    >
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="85px"
            label-position="left"
            class="dialogFrom"
        >
            <el-form-item label="商品名称:" prop="goodsName">
                <el-input v-model="ruleForm.goodsName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品分类:" prop="goodsCategoryId">
                <el-select v-model="ruleForm.goodsCategoryId" class="m-2" placeholder="请选择分类">
                    <el-option
                    v-for="(i,index) in cateList"
                    :key="index"
                    :label="i.sortName"
                    :value="i.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格:" prop="price">
                <el-input-number v-model="ruleForm.price" :controls="false" placeholder="请输入商品价格" />
            </el-form-item>
            <el-form-item label="简介:" prop="goodsIntro">
                <el-input v-model="ruleForm.goodsIntro" placeholder="请输入简介"></el-input>
            </el-form-item>
            <el-form-item label="商品规格:" prop="tag">
                <xl-norms ref="normsRef"></xl-norms>
            </el-form-item>
            <el-form-item label="商品状态:" prop="goodsSellStatus" >
                <el-select v-model="ruleForm.goodsSellStatus" class="m-2" placeholder="请输入商品状态">
                    <el-option
                    v-for="(i,index) in shopStatus"
                    :key="index"
                    :label="i.name"
                    :value="i.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品图片:" prop="goodsCoverImg">
                <xl-upload ref="uploadRef"></xl-upload>
            </el-form-item>
            <el-form-item label="详情:" prop="goodsDetailContent">
                <wangeditor-vue ref="ditorRef"></wangeditor-vue>
            </el-form-item>
            <el-form-item style="text-align: right;">
                <el-button type="primary" @click="submitForm(ruleFormRef,'add')" v-if="!isAdd">保存</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef,'edit')" v-else>保存修改</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>

    
</template>

<script setup lang="ts">
import { reactive,toRefs,ref,onMounted,watch,nextTick } from 'vue';
import type { ElForm } from 'element-plus'
import {cateByList,addShop,updateShop} from '@/utils/api/goods'
import xlUpload from '@/components/comm/uploadImg.vue'
import wangeditorVue from '@/components/comm/Wangeditor.vue';
import xlNorms from './norms.vue'
import {Interface,message} from '@/plugins/msgBox'

const state = reactive({
    isDrawer:false,
    ruleForm:{
        id:undefined,
        goodsName:'',
        goodsCategoryId:'',
        price:undefined,
        goodsIntro:'',
        tag:[],
        goodsSellStatus:'',
        goodsCoverImg:[],
        goodsDetailContent:'',
        norms:[]
    },
    cateList:[{id:'',sortName:""}],
    shopStatus:[{id:1,name:"上架"},{id:0,name:'下架'}],
    title:'新增商品',
    isAdd:false,
})

const {isDrawer,ruleForm,cateList,title,shopStatus,isAdd}  = toRefs(state)

// ref
const uploadRef = ref();
const ditorRef = ref();
const normsRef = ref();

defineExpose({
    isDrawer,
    title,
    ruleForm,
    isAdd
})



// watch监听
watch(isAdd,()=>{
    if(isAdd.value){
        // 规格信息
        normsRef.value.tableDate = []
        ruleForm.value.tag.map((v)=>{
            normsRef.value.tableDate.push(v)
        })
        // 富文本详情
        ditorRef.value?.syncHTML(ruleForm.value.goodsDetailContent)
        // 图片集
        console.log(ruleForm.value)
        if(typeof(ruleForm.value.goodsCoverImg) !== 'string')
        ruleForm.value.goodsCoverImg.map((v,i)=>{
            // uploadRef.value.fileNode.push(v)
            uploadRef.value.fileList.push({name:i,url:v})
        })
    }
})

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
  goodsName: [{ required: true, message: '请输入商品名称',trigger: 'blur',}],
  goodsCategoryId: [{ required: true, message: '请输入商品状态',trigger: 'change',}],
  price: [{ required: true, message: '请输入商品价格',trigger: 'blur',}],
  goodsIntro: [{ required: true, message: '请输入商品简介',trigger: 'blur',}],
  goodsSellStatus: [{ required: true, message: '请输入商品状态',trigger: 'change',}],
  goodsDetailContent: [{ required: true, message: '请输入商品内容',trigger: 'change',}],
  goodsCoverImg: [{ required: true, message: '请输入商品图片',trigger: 'change',}]
})

onMounted(()=>{
    cateByList().then((res:any)=>{
        state.cateList = res.data
    }) 
})

let emit = defineEmits<{(e: 'ordersFrom'): void}>()

// 关闭窗口清除缓存
const clearCon = ()=>{
    ruleFormRef.value?.resetFields()
    uploadRef.value.uploadRef.clearFiles()
    uploadRef.value.fileNode.length = 0
    uploadRef.value.fileList.length = 0
    normsRef.value.tableDate = [{}]
    ditorRef.value?.clearHTML()
}

// 保存
const submitForm = (formEl: FormInstance | undefined,val:string) => {
    if (!formEl) return
    try{
        normsRef.value.tableDate.forEach((v:any)=>{
            let keys = Object.keys(v)
            const isEmpty = keys.find((item:string)=>{if(!v[item])return item})
            if(isEmpty) throw new Error('规格信息填写有误，请检查后提交')
        })
    }catch{
        return message('规格信息填写有误，请检查后提交','warning')
    }
    state.ruleForm.goodsDetailContent = ditorRef.value?.syncHTML()
    state.ruleForm.goodsCoverImg = uploadRef.value.fileNode.join()
    state.ruleForm.norms = normsRef.value.tableDate
    formEl.validate(async (valid) => {
        if (valid) {
            if(val == 'add'){
                delete state.ruleForm.id
                var res:any = await addShop(state.ruleForm)
            }else{
                var res:any = await updateShop(state.ruleForm)
            }
            Interface(res)
            state.isDrawer = false
            emit('ordersFrom')
        } else {
        console.log('error submit!')
        return false
        }
    })
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const handleClose = ()=>{
    state.isAdd = false
    clearCon()
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/comm.scss';

.el-form-item{
    width:100% !important;
}
</style>