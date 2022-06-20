<template>
    <!-- 搜索 -->
    <el-form :inline="true" :model="form" class="form-inline">
        <el-form-item label="名称:">
            <el-input v-model="form.advert_name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
            <el-select v-model="form.status" placeholder="请输入状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
    </el-form>
 
    <slot></slot>

    <!-- 分页 -->
    <xl-page :totals="totals"/>
</template>

<script setup lang="ts">
import { reactive,toRefs,onMounted } from 'vue';
// 组件
import xlPage from '@/components/paging/index.vue'

const props = defineProps({
    orders:{
        type:Function,
        required:true,
        default:()=>{}
    }
})

const state = reactive({
    form:{
        advert_name:'',
        status:undefined,
    },
    totals:0,
})

const {form,totals} = toRefs(state)

onMounted(() => {
    
})

// 搜索
const onSubmit = ()=>{
    props.orders(1)
}

defineExpose({
    form
})

</script>

<style lang="scss" scoped>
.form-inline{
    margin-top: 20px;
}
</style>