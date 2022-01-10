<template>
  <div class="login" :style="`height: ${availHeight}px;`">
      <div class="title">广东省华荣公寓出租管理系统</div>
      <div class="userName">
        <span>用户名：</span> 
        <el-input
        placeholder="请输入用户名"
        v-model="userName"
        clearable>
      </el-input></div>
      <div class="password">
        <span>密码：</span> 
        <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
      </div>
      <el-button type="primary" class="button" @click="confim">登录</el-button>
  </div>
</template>

<script>
export default {
   data() {
    return {
      availHeight: 600, //可视高度
      userName:'',
      password:'',
    };
  },
  created() {
    this.getAvailHeight();
    window.addEventListener("resize", () => {
      this.getAvailHeight();
    });
    localStorage.removeItem('token')
  },
  methods: {
    getAvailHeight() {
      //获取可视高度，进行动态绑定
      this.availHeight = document.documentElement.clientHeight;
    },
    confim(){
      localStorage.setItem('token','esasdjiaisdjnxojks123n')
      this.$router.push({name: 'ApprLawItems'})
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  background-color: rgba(80, 119, 170, 0.062);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    line-height: 66px;
    text-align: center;
    font-size: 28px;
    color: #5077aa;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: -30px;
  }
  .userName,.password{
    span{
      width: 100px;
    }
    color: #5077aa;
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-top: 24px;
  }
  .button{
    width: 318px;
    margin-top: 30px;
  }
}
</style>