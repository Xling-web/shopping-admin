<template>
<el-form
    ref="ruleFormRef"
    :model="tableDate"
    status-icon
    label-width="85px"
    label-position="left"
    class="dialogFrom tableFrom"
>
    <el-table :data="tableDate" style="width: 100%" border>
        <el-table-column label="编号" width="55" v-if="false">
            <template #default="scope">
                <p style="text-align: center;">1</p>
            </template>
        </el-table-column>
        <el-table-column label="名称" width="220">
            <template #default="scope">
                <el-form-item prop="norms_name">
                    <el-input v-model="scope.row.norms_name" placeholder="请输入规格名称"></el-input>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column label="价格">
            <template #default="scope">
                <el-form-item prop="norms_price">
                    <el-input-number v-model="scope.row.norms_price" :controls="false" placeholder="请输入规格价格" />
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column label="库存">
            <template #default="scope">
                <el-form-item prop="norms_stock">
                    <el-input-number v-model="scope.row.norms_stock" :controls="false" placeholder="请输入规格库存" />
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
            <template #default="scope">
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button class="addItem" @click="onAddItem">添加</el-button>
</el-form>
</template>

<script setup lang="ts">
import { reactive,toRefs,ref } from 'vue';
import type { ElForm } from 'element-plus'

const state = reactive({
    tableDate:[{
        norms_name:'',
        norms_price:undefined,
        norms_stock:undefined
    }]
})
const {tableDate} = toRefs(state)

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

interface User {
  date: string
  name: string
  address: string
}
// 删除
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
  state.tableDate.splice(index, 1)
}
// 添加
const onAddItem = ()=>{
    state.tableDate.push({
        norms_name:'',
        norms_price:undefined,
        norms_stock:undefined
    })
}

defineExpose({
    tableDate
})

</script>

<style lang="scss" scoped>
.tableFrom{
    width: 100%;
}
.addItem{
    width: 100%;
    margin-top: -3px;
    border-radius: 0;
    border-top: 0;
}
</style>