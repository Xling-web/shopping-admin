import {ElMessage} from 'element-plus'

/**
 * 如何调用，如下面调用案例
 * import {succesMsg,warnMsg,infoMsg,
     errorMsg,alertBox,confirmBox} from '@/utils/msgBox.ts'
  confirmBox('确认删除该标签吗？','确定',null).then(res => {
    alert("确定："+res)
  }).catch(res => {
    alert("取消关闭："+res)
  })
 * */

/**
 * 消息提示
 * @param msg 提示信息
 * @param type 消息类型
 */
 export function message(msg:string,type:any){
    ElMessage.closeAll()
    ElMessage({
      type: type,
      showClose: true,
      dangerouslyUseHTMLString: true,
      message: msg,
    })
}

/**
 * 接口请求反馈
*/
interface Person {
  msg:string;
  status:number;
}
export function Interface(res:Person){
  if(res.status === 200){
    message(res.msg,'success')
  }else{
    return message(res.msg,'warning')
  }
}

/**
 * id查询详情
*/
export function getById(res:any,ruleFrom: any){
  const form = Object.keys(ruleFrom)
  for(let key in res){
    if(form.indexOf(key) > -1){
      ruleFrom[key] = res[key]
    }
  }
}