<template>
    <div ref='editor' class="editor"></div>
    <!-- <button @click='writeHTML'>同步内容</button> -->
    <!-- <div :innerHTML='content.html'></div> -->
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import WangEditor from 'wangeditor';
import  store  from '@/store/modules/persist';
import {uploadImg} from '@/utils/api/goods'
import $ from 'wangeditor/dist/utils/dom-core';
import { file } from '@babel/types';
const editor = ref();
const content = reactive({
    html: '',
    text: '',
});

let instance: WangEditor | null;
onMounted(() => {
    instance = new WangEditor(editor.value);

    instance.config.showLinkImg = false
    // instance.config.showLinkImgAlt = false
    // instance.config.showLinkImgHref = false
    instance.config.uploadImgMaxSize = 3 * 1024 * 1024 // 2M
    instance.config.uploadFileName = 'files'
    instance.config.uploadImgMaxLength = 6 // 限制一次最多上传 6张图片
    // instance.config.uploadImgServer = `${process.env.BASE_API}api/user/uploadImg`
    instance.config.uploadImgHeaders = {
        'authorization': store.state.token,
        'Content-Type': 'multipart/form-data'
    }

     instance.config.customUploadImg = async (files:any, insert:any) => {
        var formData = new FormData();
        for(var i = 0;i < files.length;i ++) {
            formData.append("file", files[i], files[i].name);      //  多张图片文件都放进一个form-data，有些小伙伴说这里应该这样写：formData.append("file[" + i + "]", files[i], files[i].name)，后端才能拿到完整的图片数组，其实不然，用这个formData.getAll("file")方法恰好拿到数组，或者也可以forEach获取，有很多种办法。
        }
        const res:any = await uploadImg(formData)
        if(res.status == 200){
            res.data.forEach((val: { url: string; })=>{
                insert(val.url)
            })
        }
        
    };
    // 图片返回格式不同，需要自定义返回格式
    // instance.config.uploadImgHooks = {
    //     // 图片上传并返回了结果，想要自己把图片插入到编辑器中
    //     // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
    //     customInsert: function(insertImgFn, result) {
    //         console.log('result', result)
    //         console.log('insertImgFn', insertImgFn)
    //         // result 即服务端返回的接口
    //         // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
    //         if (result.data && result.data.length) {
    //             result.data.forEach(item => insertImgFn(item))
    //         }
    //     }
    // }

    // console.log(instance)
    // Object.assign(instance.config, {
    //     onchange() {
    //         console.log(instance?.txt.html());
    //     },
    // });

    instance.create();
});

// 销毁
onBeforeUnmount(() => {
    instance?.destroy();
    instance = null;
});

const syncHTML = (val:string) => {
    if(val){
        instance?.txt.html(val)
    }else{
        return instance?.txt.html()
    }
};

const clearHTML = ()=>{
    instance?.txt.clear()
}

defineExpose({
    syncHTML,
    clearHTML
})
        
</script>

<style lang="scss" scoped>
.editor{
    z-index: 1 !important;
}
</style>