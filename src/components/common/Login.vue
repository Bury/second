<template>
    <div class="login">
      <div class="sub-title">杭州知己鹰眼管理系统</div>
      <div class="title">登录</div>
      <div class="form">
        <div class="name">
          <el-input placeholder="账号" auto-complete="off" name="account" ></el-input>
        </div>
        <div class="password">
          <el-input placeholder="密码" auto-complete="off"></el-input>
        </div>
        <div class="remember-forget">
          <div class="remember-me">
            <el-checkbox>记住我</el-checkbox>
          </div>
        </div>
        <div class="login-button enabled">
          <a @click="login">登录</a>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      iconLookPassword: 'glyphicon glyphicon-eye-close',
      password: 'password',
      isEnabled: false
    }
  },
  created: function () {

  },
  mounted: function () {
  },
  methods: {
    login () {
      this.$router.replace({name: 'Statistics'})
    }
  }
}
</script>

<style scoped>
*{
  text-align:center;
}
.login {
  position: relative;
  height: 350px;
  top: 30px;
}

.login .sub-title {
  font-size: 14px;
  color: #888888;
  height: 17px;
}

.login .title {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 24px;
  color: #000000;
  height: 24px;
}

/* 登录表单样式 start */
.login .form {
  width: 260px;
}

.login .form .name {
  margin-bottom: 10px;
  height: 40px;
}

.login .remember-forget {
  color: #898989;
  font-size: 12px;
  margin-top: 20px;
}

/* 记住我 */
.login .remember-me {
  float: left;
}

/* 忘记密码 */
.login .forget-password {
  float: right;
}

.login .forget-password a {
  color: #898989;
  font-size: 12px;
}
/* 登录表单样式 end */

.login .login-button{
  margin-top: 54px;
  width: 180px;
  height: 40px;
  border-radius: 100px;
  background-color: rgba(0, 159, 232, 0.3);
  margin-bottom: 20px;
  font-size: 14px;
  color: white;
  display:table;
}

.login .enabled {
  background-color: #00a0e9;
  box-shadow: 1px 3px 8px 0 rgba(0, 159, 233, 0.5);
}

.login .login-button a {
  display: table-cell; 
  vertical-align: middle;
}

.login .register-button {
  font-size: 12px;
  color: #898989;
}
</style>
