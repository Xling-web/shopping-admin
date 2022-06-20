<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">


import { ElConfigProvider } from 'element-plus'
// 中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn' 
// 切换为中文

let locale = zhCn


</script>
<style>
*{
  padding: 0;
  margin: 0;
}
</style>
