<template>
    <div class="btns">
        <el-button type="success" plain @click="drawerRef.isDrawer = true,drawerRef.title='新增商品'">新增商品</el-button>
    </div>
    
    <xl-search ref="searchRef">
        <template v-slot:default="{tableData}">
            <el-table :data="tableData" style="width: 100%;margin-bottom:20px" :border="true">
                <el-table-column prop="id" label="商品编号" width="100" />
                <el-table-column prop="goodsName" label="商品名称" width="150" />
                <el-table-column prop="goodsCoverImg" label="商品主图" width="115">
                    <template #default="scope">
                        <img :src="scope.row.goodsCoverImg[0]" alt="" width="90">
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="商品售价" width="120" />
                <el-table-column prop="goodsIntro" label="商品简介"/>
                <el-table-column prop="tagsNum" label="库存" width="100" />
                <el-table-column label="状态" width="70">
                    <template #default="scope">
                        <el-tooltip :content="scope.row.goodsSellStatus ? '上架':'下架'">
                            <el-switch
                                v-model="scope.row.goodsSellStatus"
                                inline-prompt
                                :width="45"
                                ref="switchRef"
                                active-color="#67c23a"
                                inactive-color="red"
                                :active-value="1"
                                :inactive-value="0"
                                :active-icon="Check"
                                :inactive-icon="Close"
                                @change="seitchChange(scope.row.id,scope.row.goodsSellStatus)"
                            />
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="110">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="editForm(scope.row.id)">修改</el-button>
                        <el-popconfirm title="你确定要删除这个吗?" @confirm="deleteForm(scope.row.id)">
                            <template #reference>
                                <el-button type="text" size="small" style="color:red;">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table> 
        </template>
    </xl-search>

    <xl-drawer ref="drawerRef" @ordersFrom="ordersFrom"></xl-drawer>

</template>

<script setup lang="ts">
import { reactive,toRefs,ref } from 'vue';
import { Check, Close } from '@element-plus/icons-vue'
import {shopById,deleteShopId,uploadStatus} from '@/utils/api/goods'
import {getById,Interface} from '@/plugins/msgBox'
// 组件 
import xlSearch from './components/search.vue'
import xlDrawer from './components/dialogFrom.vue'
// 全局挂载

const drawerRef:any = ref();
const searchRef:any = ref();

// seitch改变
const seitchChange = async(id:number,status:number)=>{
    const data = {
        goodsSellStatus:status,
        id
    }
    const res:any = await uploadStatus(data)
    Interface(res)
}

// 打开修改商品
const editForm = async (id:number)=>{
    drawerRef.value.isDrawer = true;
    drawerRef.value.title = '修改商品'
    const res:any = await shopById(id)
    drawerRef.value.ruleForm.id = id
    // console.log(res,typeof(res.data.tag))
    getById(res.data,drawerRef.value.ruleForm)
    drawerRef.value.isAdd = true;
}

// 保存(编辑)后刷新数据
const ordersFrom = ()=>{
    searchRef.value.orders()
}

// 删除商品
const deleteForm = async (id:number)=>{
    const res:any = await deleteShopId(id)
    Interface(res)
    searchRef.value.orders()
}

</script>

<style lang="scss" scoped>

</style>