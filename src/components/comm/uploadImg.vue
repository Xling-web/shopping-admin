<template>
  <el-upload
    :action="actionUrl"
    list-type="picture-card"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-preview="lookImg"
    :file-list="fileList"
    multiple
    ref="uploadRef"
    :limit="5"
    accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PBG"
    :on-exceed="handleExceed"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img style="width: 100%;" :src="dialogImageUrl" alt="" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref,reactive,toRefs,watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {message} from '@/plugins/msgBox'

const state = reactive({
    actionUrl:`${process.env.BASE_API}api/user/uploadImg`
})
const {actionUrl} = toRefs(state)

let fileList = reactive([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const uploadRef = ref()

watch(fileList,()=>{
  if(fileList.length>0)
  fileList.forEach((v: { url: string; })=>{
    fileNode.push(v.url)
  })
})

let fileNode:Array<string> = reactive([])

const handleRemove = (file:any) => {
  var fileUrl = ''
  if(file.response){
    fileUrl = file.response.data[0].url
  }else{
    fileUrl = file.url
  }
  let index = fileNode.findIndex((v)=>v == fileUrl)
  fileNode.splice(index, 1)
}

const handleSuccess = (file: { data: { url: string; }[]; }) => {
  fileNode.push(file.data[0].url)
}

// 查看图片
const lookImg = (file:any)=>{
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

// 上传超出个数提示
const handleExceed = (files:any, fileList:any) => {
  message(`最大上传文件数5个, 你选择了 ${files.length} 个文件, 现总计为 ${
    files.length + fileList.length
  } totally`,'warning')
}

defineExpose({
  fileNode,
  fileList,
  uploadRef
})
</script>