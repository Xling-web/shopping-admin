<template>
    <div class="paging">
        <el-pagination
        :currentPage="currentPage"
        :page-size="pageSize"
        :small="small"
        :background="background"
        layout="total, prev, pager, next"
        :total="totals"
        @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// props
defineProps<{
  totals:number
}>()

// emit
let emit = defineEmits<{(e: 'pageChange', val: number): void}>()

const pageSize = ref(10)
const small = ref(false)
const currentPage = ref(1)
const background = ref(false)

const handleCurrentChange = (val: number) => {
  emit('pageChange',val)
  currentPage.value = val
}
</script>

<style lang="scss" scoped>
.paging{
    display: block;
    &::after{
        content: "";
        display: block;
        clear: both;
    }
    .el-pagination{
        float: right;
    }
}
</style>