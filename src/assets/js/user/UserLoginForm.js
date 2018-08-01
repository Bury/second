import globalRules from '@/config/global_rules'

import userApi from '@/api/user.js'

export default {
  name: 'login-form',
  data() {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: globalRules.rules.user.username(5, 16, '请输入帐号'),
        password: globalRules.rules.user.password(6, 16, '请输入密码：')
      },
      passwordVisible: false,
      passwordForm:{
        username:'',
        new_password:'',
        new_password2:'',
        code:'',
        phone:'',
      },
      sendCode:'',
    }

  },
  methods: {
    reset() {
      this.$refs.loginForm.resetFields();
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let qs = require('querystring');
          userApi.login(qs.stringify(this.$data.loginInfo)).then((res) => {
            if (res.data.errno === 0) {
              localStorage.setItem('knock_knock', res.data.data.access_token);
              localStorage.setItem('username', res.data.data.user.username);
              localStorage.setItem('store_id', res.data.data.user.store_id);
              localStorage.setItem('store_name', res.data.data.user.store_name);
              this.$router.replace({name: 'Statistics'})
            } else {
              this.$message.error(res.data.msg);
            }
          })
        } else {
          return false
        }
      })
    },
    forget() {
      this.$data.passwordVisible = true;
    },
    code(){
      let list = {
        'phone': this.$data.passwordForm.phone,
        'username': this.$data.passwordForm.username,
      };
      let qs = require('querystring');
      userApi.sendSms(qs.stringify(list)).then((res) => {
        if(this.$data.passwordForm.phone == ''){
          this.$message({
            type: 'warning',
            message: '请输入手机号!'
          });
        }
      })
    },
    blur(){
      console.log(1212);
      let list = {
        'phone': this.$data.passwordForm.phone,
        'code': this.$data.passwordForm.code,
      };
      let qs = require('querystring');
      userApi.checkSms(qs.stringify(list)).then((res) => {
        console.log(res);
        this.$data.sendCode = res.data.data.code;
      })
    },
    passwordSubmit(){
      let list = {
        'username': this.$data.passwordForm.username,
        'new_password':this.$data.passwordForm.new_password,
        'new_password2':this.$data.passwordForm.new_password2,
        'code':this.$data.sendCode,
      };
      let qs = require('querystring');
      userApi.passwordForget(qs.stringify(list)).then((res) => {
        console.log(res);
        if (res.data.errno === 0) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$data.passwordVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }

      });
    },

  },

}
