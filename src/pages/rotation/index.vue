<template>
    <el-button type="success" plain @click="dialogRef.isDialog = true,dialogRef.title='新增轮播'">新增轮播</el-button>
    <xl-search :orders="orders" ref="searchRef">
        <template #default>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="编号" width="70" />
                <el-table-column prop="advert_name" label="名称" />
                <el-table-column prop="img" label="图片" width="125" >
                    <template #default="{row}">
                        <img :src="row.img" alt="" width="100" @click="lookImg(row.img)" class="lookImg">
                    </template>
                </el-table-column>
                <el-table-column prop="aUrl" label="URL链接" width="250">
                    <template #default="{row}">
                        <a :href="row.aUrl" target="_bank" style="color:#333;">{{row.aUrl}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="220" />
                <el-table-column prop="status" label="状态" width="70">
                    <template #default="scope">
                        <el-tooltip :content="scope.row.status ? '启用':'禁用'">
                            <el-switch
                                v-model="scope.row.status"
                                inline-prompt
                                :width="45"
                                ref="switchRef"
                                active-color="#67c23a"
                                inactive-color="red"
                                :active-value="1"
                                :inactive-value="0"
                                :active-icon="Check"
                                :inactive-icon="Close"
                                @change="handleDisable(scope.row.id,scope.row.status)"
                            />
                        </el-tooltip>
                    </template>
                </el-table-column> 
                <el-table-column prop="address" label="操作" width="110">
                    <template #default="{row}">
                        <el-button type="text" size="small" @click="handleEdit(row.id)">修改</el-button>
                        <el-popconfirm title="你确定要删除这个吗?" @confirm="handleDelete(row.id)">
                            <template #reference>
                                <el-button type="text" size="small" style="color:red;">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </xl-search>

    <el-dialog v-model="bigImg.isLook">
        <img style="width: 100%;" :src="bigImg.imgUrl" alt="" />
    </el-dialog>

    <xl-dialog ref="dialogRef" :orders="orders"/>
</template>

<script setup lang="ts">
import { reactive,toRefs,ref,onMounted } from 'vue';
import {gainList,gainById,delById,disableById} from '@/utils/api/banner'
import {getById,Interface} from '@/plugins/msgBox'
// 组件
import xlSearch from './components/search.vue'
import xlDialog from './components/addDialog.vue'
import { Check, Close } from '@element-plus/icons-vue'


const state = reactive({
    tableData:[],
    listData:{
        page:1,
    },
    bigImg:{
        isLook:false,
        imgUrl:''
    }
})
const {tableData,bigImg} = toRefs(state)

const dialogRef = ref()
const searchRef = ref()

onMounted(()=>{
    orders(1)
})

// 获取列表数据
const orders = async(val?:number)=>{
    if(val)state.listData.page = val
    const res:any = await gainList({...state.listData,...searchRef.value.form})
    state.tableData = res.data
}

// 修改
const handleEdit = async(id:number)=>{
    dialogRef.value.title="修改轮播信息";
    dialogRef.value.isDialog = true
    dialogRef.value.isAdd = false
    const res:any = await gainById(id)
    getById(res.data,dialogRef.value.ruleForm)
}

// 放大图片
const lookImg = (url:string)=>{
    bigImg.value.isLook = true
    bigImg.value.imgUrl = url
}

// 删除
const handleDelete = async(id:number)=>{
    const res:any = await delById(id)
    Interface(res)
    orders()
}

// 修改状态
const handleDisable = async(id:number,status:number)=>{
    const data = {id,status}
    const res:any = await disableById(data)
    Interface(res)
    orders()
} 

</script>

<style lang="scss" scoped>
.lookImg:hover{
    cursor: pointer;
}
</style>