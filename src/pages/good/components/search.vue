<template>
    <!-- 搜索 -->
    <el-form :inline="true" :model="form" class="form-inline">
        <el-form-item label="商品编号:">
            <el-input v-model="form.id" placeholder="请输入商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
            <el-input v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
            <el-select v-model="form.goodsSellStatus" placeholder="请输入状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
    </el-form>

    <slot v-bind:tableData="tableData"></slot>

    <!-- 分页 -->
    <xl-page :totals="totals"/>
</template>

<script setup lang="ts">
import { reactive,toRefs,onMounted } from 'vue';
import {shopList} from '@/utils/api/goods'
// 组件
import xlPage from '@/components/paging/index.vue'

const state = reactive({
    form:{
        id:null,
        goodsName:'',
        goodsSellStatus:null,
        page:1
    },
    totals:0,
    tableData:[]
})

const {form,totals,tableData} = toRefs(state)

onMounted(() => {
    orders(1)
})

const orders = async(pages:number)=>{
    if(pages) form.value.page = pages
    let res:any = await shopList(form.value)
    state.tableData = res.data
    state.totals = res.totals
}

// 搜索
const onSubmit = ()=>{
    orders(1)
}

defineExpose({
    orders
})

</script>

<style lang="scss" scoped>
.form-inline{
    margin-top: 20px;
}
</style>