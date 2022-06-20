<template>
    <div class="user">
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <p>管理员</p>
    <div class="login">
        <div class="back" @click="$router.push('/')">
        <i class="iconfont icon-guanbi"></i>
        <span>修改密码</span>
        </div>
        <div class="back" @click="sign_out">
        <i class="iconfont icon-guanbi"></i>
        <span>退出登录</span>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">

const sign_out = ()=>{
    console.log('login')
}
</script>

<style lang="scss" scoped>
.user {
  display: inline-block;
  float: right;
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.user:hover {
  cursor: pointer;
  background: #f9f9f9;
}
.user:hover .login {
  visibility: visible;
  opacity: 1;
}
.user span {
  vertical-align: middle;
  display: inline-block;
  width: 25px;
  height: 25px;
}
.user span img {
  width: 100%;
  height: 100%;
}
.user p {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  padding-left: 7px;
}
.login {
  position: absolute;
  width: 160px;
  height: 40px;
  top: 60px;
  right: 10px;
  background: white;
  visibility: hidden;
  opacity: 0;
  transition: all 1s;
  z-index: 999;
}
.login .back {
  padding: 5px 0;
}
.login .back:hover {
  background: #f6fcff;
  cursor: pointer;
}
.login i {
  vertical-align: middle;
  transform: rotate(90deg);
  line-height: 30px;
  vertical-align: middle;
  padding-left: 10px;
}
.login span {
  width: auto;
  height: auto;
  display: inline-block;
  color: #333;
  font-size: 14px;
  padding-left: 10px;
  vertical-align: middle;
  line-height: 30px;
}

</style>