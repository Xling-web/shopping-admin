<template>
    <el-container>
        <el-aside width="250px">
            <xl-navs/>
        </el-aside>
        <el-container>
            <el-header>
                <xl-header/>
            </el-header>
            <el-main>
                <div class="main_cn">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import xlNavs from './components/navs.vue'
import xlHeader from './components/header.vue'
</script>

<style lang="scss" scoped>
.el-aside{
    height: 100vh;
    box-sizing: border-box;
    background-color: #001529;
}
.el-menu{
    background-color: #001529;
    border: 0;
}
.el-main{
    background-color: #e9eef3;
    .main_cn{
        width: 100%;
        height: 100%;
        padding: 15px;
        background-color: white;
        box-sizing: border-box;
    }
}
</style>