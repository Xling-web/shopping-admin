<template>
    <div class="btns">
        <el-button type="success" plain @click="dialogRef.isDialog = true,dialogRef.diaTitle = '新增分类'" >新增商品分类</el-button>
    </div>

    <xl-search ref="searchRef">
      <template v-slot:default="{tableDate}">
          <el-table
            :data="tableDate"
            style="width: 100%; margin-bottom: 20px"
            border
          >
            <el-table-column prop="id" label="分类ID" width="100" />
            <el-table-column prop="sortName" label="分类名称" />
            <el-table-column prop="add_time" label="添加时间" width="230" />
            <el-table-column label="状态" width="70">
              <template #default="scope">
                <!-- <el-tag class="ml-2" :type="scope.row.state ? 'danger' : 'success'">{{globalProperties.$filters.type(scope.row.state)}}</el-tag> -->
                <el-tooltip :content="scope.row.state ? '启用':'禁用'">
                    <el-switch
                        v-model="scope.row.state"
                        inline-prompt
                        :width="45"
                        active-color="#67c23a"
                        inactive-color="red"
                        :active-value="1"
                        :inactive-value="0"
                        :active-icon="Check"
                        :inactive-icon="Close"
                        @change="seitchChange(scope.row.id,scope.row.state)"
                    />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button type="text" size="small" @click="isEdit(scope.row.id)">编辑</el-button>
                <el-popconfirm title="你确定要删除这个吗?" @confirm="deleteById(scope.row.id)">
                    <template #reference>
                      <el-button type="text" size="small" style="color:red;">删除</el-button>
                    </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
      </template>
    </xl-search> 

    <xl-dialog ref="dialogRef" @emitOrders="childOrder"></xl-dialog>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import {getCateId} from '@/utils/api/sort'
import {getById,Interface} from '@/plugins/msgBox'
import {deletecates,uploadStatus} from '@/utils/api/sort'
import { Check, Close } from '@element-plus/icons-vue'

// 组件
import xlSearch from './components/search_form.vue'
import xlDialog from './components/dialogFrom.vue'

// 引入挂载
import { getCurrentInstance } from "vue";
const { appContext: { config: { globalProperties }} } = getCurrentInstance() as any;

const dialogRef:any = ref(null)
const searchRef:any = ref(null)

// 打开编辑
const isEdit = async (id:number)=>{
  dialogRef.value.isDialog = true
  dialogRef.value.diaTitle = '修改分类'
  dialogRef.value.ruleForm.id = id
  dialogRef.value.isAdd = false
  const res:any = await getCateId(id)
  getById(res.data,dialogRef.value.ruleForm)
}

// 状态修改
const seitchChange = async (id:number,status:number)=>{
  const data = {
    state:status,
    id
  }
  const res:any = await uploadStatus(data)
  Interface(res)
}


// 新增(编辑后)刷新表格
const childOrder = async()=>{
  searchRef.value?.orders()
}

// 删除商品
const deleteById = async(id:number)=>{
  const res:any = await deletecates(id)
  Interface(res)
  searchRef.value?.orders()
}

</script>

<style lang="scss" scoped>

</style>