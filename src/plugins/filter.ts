// 封装过滤器
let type = (value:number) => {
    let dataId = '';
    switch (value) {
        case 0:
        dataId = "启用"
        break
        case 1:
        dataId = "禁用"
        break
    }
    return dataId
}
export default {
    type
};