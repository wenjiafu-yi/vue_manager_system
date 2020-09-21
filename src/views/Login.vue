<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form">
      <h2>管理员登录</h2>
      <el-form-item>
        <el-input v-model="loginForm.username" placeholder="请输入管理员账号">
          <el-button slot="prepend" icon="el-icon-user" disabled></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
        >
          <el-button slot="prepend" icon="el-icon-key" disabled></el-button>
        </el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-user-solid" @click="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if ((this.loginForm.username == "") | (this.loginForm.password == "")) {
        this.$message.error("请输入正确的账号或密码");
        return;
      }
      console.log("这是一条消息提示");
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url(../assets/bg_login.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed;
  background-position: 0px 0px;
}
.login-form {
  width: 360px;
  position: absolute;
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

h2 {
  color: cyan;
  margin-bottom: 20px;
}
</style>
