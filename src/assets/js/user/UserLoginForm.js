import globalRules from '@/config/global_rules'
import globalFunctions from '@/config/global_functions'

import userApi from '@/api/user.js'
let clock;
export default {
  name: 'login-form',
  data() {
    return {
      getClickName:'获取验证码',
      waitTime:60,
      canClick: true,
      status:1,
      loginInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: globalRules.rules.user.username(5, 16, '请输入帐号'),
        phone: globalRules.rules.user.phone(),
        code: globalRules.rules.user.code(),
        password: globalRules.rules.user.password(6, 16, '请输入密码'),
        repassword: globalRules.rules.user.password(6, 16, '请输入密码'),
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
      dialogFormVisible:false,
      passwordEditForm:{
        passwordOld:'',
        passwordCurrent:'',
        passwordRepeat:''
      },
      rulesPasswordEdit: {
        passwordOld: globalRules.rules.user.password(6,20,'请输入当前密码'),
        passwordCurrent: globalRules.rules.user.password(6,20,'请输入新的密码'),
        passwordRepeat: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.$data.passwordEditForm.passwordCurrent) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },

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
            console.log(res);
            if (res.data.errno === 0) {
              console.log(res.data.data);
              localStorage.setItem('knock_knock', res.data.data.access_token);
              localStorage.setItem('username', res.data.data.user.username);
              localStorage.setItem('store_id', res.data.data.user.store_id);
              localStorage.setItem('store_name', res.data.data.user.store_name);
              // console.log(res.data.data.user.is_change_pwd);
              if(res.data.data.user.is_change_pwd == 0){
                this.$data.dialogFormVisible = true;
              }else{
                this.$router.push('/Statistics');
              }
            }else if(res.data.msg === '此账号被禁用'){
              this.$message.error(res.data.msg);
              this.$data.status = 0
            }
            else {
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
    getMsg(){
      let list = {
        'phone': this.$data.passwordForm.phone,
        'username': this.$data.passwordForm.username,
      };
      let qs = require('querystring');
      userApi.sendSms(qs.stringify(list)).then((res) => {

      })
    },
    needsC(){
      window.clearInterval(clock)
      this.$data.getClickName = '发送验证码';
      this.$data.waitTime = 60;
      this.canClick = true  //这里重新开启
      this.$data.passwordForm.phone = '';
    },
    code(){
      if(this.$data.passwordForm.username == ''){
        this.$message({
          type: 'warning',
          message: '请输入用户名!'
        });
      }else{
        if(this.$data.passwordForm.phone == ''){
          this.$message({
            type: 'warning',
            message: '请输入手机号!'
          });
        }else{
          if (!this.canClick) return  ;
          this.canClick = false
          this.$data.getClickName = this.$data.waitTime + 's后发送';
          this.getMsg();
           clock = window.setInterval(() => {
            this.$data.waitTime--;
            this.$data.getClickName = this.$data.waitTime + 's后发送';
            if (this.$data.waitTime < 0) {
              window.clearInterval(clock)
              this.$data.getClickName = '发送验证码';
              this.$data.waitTime = 60;
              this.canClick = true  //这里重新开启

            }
          },1000);
        }
      }

    },
    blur(){
      let list = {
        'phone': this.$data.passwordForm.phone,
        'code': this.$data.passwordForm.code,
      };
      let qs = require('querystring');
      userApi.checkSms(qs.stringify(list)).then((res) => {
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
        if (res.data.errno === 0) {
         // this.passwordClear();
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          // this.$data.passwordVisible = false;
          this.dialogClose();
        } else {
          this.$message.error(res.data.msg);
        }

      });
    },
    //关闭表单清空数据
    dialogClose(){
      setTimeout(() =>{
        this.$refs.passwordForm.resetFields();
        this.passwordClear();
        this.$data.passwordVisible = false;
      },0)
    },
  //  修改密码
    fnCancel(){
      this.$data.dialogFormVisible = false;
      this.$data.passwordEditForm.passwordOld = '';
      this.$data.passwordEditForm.passwordCurrent = '';
      this.$data.passwordEditForm.passwordRepeat = '';
      setTimeout(() =>{
        this.$refs.passwordEditForm.resetFields();
      },0)
    },
    fnPasswordEditSubmitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(this.$data.passwordEditForm.passwordOld==this.$data.passwordEditForm.passwordCurrent){
          globalFunctions.functions.message(this,'error','新的密码与当前密码不能相同');
          return false;
        }else{
          if(this.$data.passwordEditForm.passwordCurrent==this.$data.passwordEditForm.passwordRepeat){
            if (valid) {
              let list = {
                'old_password':this.$data.passwordEditForm.passwordOld,
                'new_password':this.$data.passwordEditForm.passwordCurrent,
                'new_password2':this.$data.passwordEditForm.passwordRepeat
              }
              let qs = require('querystring')
              userApi.password_edit(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                  globalFunctions.functions.message(this,'success','修改成功');
                  this.$data.dialogFormVisible = false;
                  this.$data.passwordEditForm.passwordOld = '';
                  this.$data.passwordEditForm.passwordCurrent = '';
                  this.$data.passwordEditForm.passwordRepeat = '';
                  this.$router.push('/Statistics');
                }else{
                  this.$message.error(res.data.msg);
                }
              })
            }
          } else{
            this.$message.error('密码输入不正确，请再次输入');
          }

        }


      });
      setTimeout(() =>{
        this.$refs.passwordEditForm.resetFields();
      },0)
    },

    //数据清空
    passwordClear(){
      this.$data.passwordForm={
        username:'',
        new_password:'',
        new_password2:'',
        code:'',
        phone:'',
      }
    }
  },

}
