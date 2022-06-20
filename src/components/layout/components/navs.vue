<template>
    <el-menu
        active-text-color="#4dbcff"
        background-color="#001529"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
    >
        <div class="logo">
            <!-- <h3>vue3.x+vite+Ts</h3> -->
            <h3>调度</h3>
        </div>
        <el-sub-menu index="1">
            <template #title>
                <el-icon><monitor /></el-icon>
                <span>首页</span>
            </template>
                <el-menu-item index="/">首页</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon><monitor /></el-icon>
                <span>首页配置</span>
            </template>
                <el-menu-item index="/rotation">轮播图配置</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon><monitor /></el-icon>
                <span>模块管理</span>
            </template>
                <el-menu-item index="/sort">分类管理</el-menu-item>
                <el-menu-item index="/good">商品管理</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import {Monitor} from '@element-plus/icons-vue'
import {useRoute} from 'vue-router'
import {reactive,toRefs} from 'vue'

const route = useRoute()

const state = reactive({
    defaultActive:route.path
})
const {defaultActive} = toRefs(state)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
.logo{
    padding:17px 0;
    h3{
        display: block;
        font-size: 25px;
        color: #e7e7e7;
        font-family: "SimHei";
        text-align: center;
    }
}
</style>