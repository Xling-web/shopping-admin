<template>
    <el-form :inline="true" :model="search_form" class="form-inline">
        <el-form-item label="分类名称:">
            <el-input v-model="search_form.sortName" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
            <el-select v-model="search_form.state" placeholder="请输入状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="禁用" value="1"></el-option>
                <el-option label="启用" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
    </el-form>
    <slot v-bind:tableDate="tableDate"></slot>
    <!-- 分页 -->
    <xl-page :totals="totals" @pageChange="orders"/>
</template>

<script setup lang="ts">
import {reactive,toRefs,onMounted,ref} from 'vue';
import {cateList} from '@/utils/api/sort'
import xlPage from '@/components/paging/index.vue'

const state = reactive({
    // 搜索
    search_form:{
      sortName:null,
      state:null,
      page:1,
    },
    totals:0,
    tableDate:null
})

const {search_form,totals,tableDate} = toRefs(state)

onMounted(()=>{
  orders(1)
})

// 列表(搜索/分页)功能
const orders = (pages:number)=>{
  if(pages)search_form.value.page = pages
  
  cateList(search_form.value).then((res:any)=>{
    state.tableDate = res.data
    state.totals = res.totals
  })
}

// 搜索
const onSubmit = ()=>{
  orders(1)
}

// 暴露属性
defineExpose({
  orders
})

</script>

<style lang="scss" scoped>
.form-inline{
    margin-top: 20px;
}
</style>