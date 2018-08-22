import globalRules from '@/config/global_rules'

import globalFunctions from '@/config/global_functions'

import userApi from '@/api/user'

let clock;

export default {
    name:'personal',
    data() {
        return {
            dialogFormVisible: false,
            username:'',
            role_name:'',
            errors:0,
            userEditForm: {
                name:'',
                phone:'',
            },
            rulesUserEdit: {
                name: globalRules.rules.user.minMax(1,15,'请输入帐号'),
                phone: globalRules.rules.user.phone()
            },
            passwordEditForm: {
                passwordOld:'',
                passwordCurrent:'',
                passwordRepeat:''
            },
            rulesPasswordEdit: {
                passwordOld: globalRules.rules.user.password('请输入当前密码'),
                passwordCurrent: globalRules.rules.user.password('请输入新的密码'),
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
            dialogFormVisibleTel:false,
            telForm:{
                phone:'',
                code:'',
            },
            rules:{
                phone: globalRules.rules.user.phone(),
            },
            getClickName:'获取验证码',
            waitTime:60,
            canClick: true,

        }
    },

    created:function(){
        this.getUserCurrentInfo();
    },

    methods: {

        getUserCurrentInfo(){
            userApi.getUserCurrentInfo().then((res) => {
                if(res.data.errno === 0){
                    this.$data.username = res.data.data.user.username;
                    this.$data.role_name = res.data.data.user.role_name;
                    this.$data.userEditForm.name = res.data.data.user.truename;
                    this.$data.userEditForm.phone = res.data.data.user.phone;
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },

        fnPasswordEdit(){
            this.$data.dialogFormVisible = true;
        },

        fnCancel(){
            this.$data.dialogFormVisible = false;
            this.$data.passwordEditForm.passwordOld = '';
            this.$data.passwordEditForm.passwordCurrent = '';
            this.$data.passwordEditForm.passwordRepeat = '';
          setTimeout(() =>{
            this.$refs.passwordEditForm.resetFields();
          },0)
        },
        dialogClose(){
            setTimeout(() => {
                this.$refs.passwordEditForm.resetFields();
                this.$data.passwordEditForm.passwordOld = '';
                this.$data.passwordEditForm.passwordCurrent = '';
                this.$data.passwordEditForm.passwordRepeat = '';
                this.$data.dialogFormVisible = false;
            }, 0);
        },

        fnPasswordEditSubmitForm(formName){
          // console.log(this.$data.passwordEditForm.passwordOld);
            this.$refs[formName].validate((valid) => {
                if(this.$data.passwordEditForm.passwordOld==this.$data.passwordEditForm.passwordCurrent){
                    globalFunctions.functions.message(this,'error','新的密码与当前密码不能相同');
                    return false;
                }
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
                        }else{
                            this.$message.error('旧密码不正确');
                            this.$data.errors = 1;
                        }
                    })
                }
            });
          setTimeout(() =>{
            this.$refs.passwordEditForm.resetFields();
          },0)
        },

        fnSaveSubmitForm(formName){
            this.$refs['userEditForm'].validate((valid) => {
                if (valid) {
                    let list = {
                        'truename':this.$data.userEditForm.name,
                        'phone':this.$data.userEditForm.phone
                    }
                    let qs = require('querystring')
                    userApi.edit_current(qs.stringify(list)).then((res) => {
                        if(res.data.errno === 0){
                            globalFunctions.functions.message(this,'success');
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }
            });
        },
     //修改手机号
    fnChangeTel(){
        this.$data.dialogFormVisibleTel = true;
      },
      code(){
        if(this.$data.telForm.phone == ''){
          this.$message({
            type:'warning',
            message:'请先输入手机号'
          })
        }else{
          let list = {
            'new_phone': this.$data.telForm.phone,
          };
          let qs = require('querystring');
          userApi.phoneSms(qs.stringify(list)).then((res) => {
            console.log(res.data.msg)
            if(res.data.errno == -1){
              this.$message({
                type: 'warning',
                message: res.data.msg
              })
              this.$data.dialogFormVisibleTel = true;
              this.$data.telForm.phone = '';
            }else{
              this.getMsg();
            }
          })
        }

      },
      submitFromTel(){
        let list = {
          'new_phone': this.$data.telForm.phone,
          'sms_code': this.$data.telForm.code,
        };
        let qs = require('querystring');
        userApi.phoneCheck(qs.stringify(list)).then((res) => {
          if(res.data.errno == 1000002 || res.data.errno == -1){
            this.$message({
              type:'warning',
              message:'请先获取验证码'
            })
          }
          this.$data.telForm.code = res.data.data.sign_code;
          console.log(res.data.data);
          console.log(this.$data.telForm);
          userApi.savePhone(qs.stringify(this.$data.telForm)).then((res) => {
            this.$message({
              type:'success',
              message:'修改成功'
            });
            this.$data.dialogFormVisibleTel = false;
            this.$data.userForm.phone = this.$data.telForm.phone;
            this.$data.telForm.phone = '';
            this.$data.telForm.code = '';
            setTimeout(() => {
              this.$refs.telForm.resetFields();
            })
          })
        })
      },
      cancelTel(){
        window.clearInterval(clock)
        this.$data.getClickName = '发送验证码';
        this.$data.waitTime = 60;
        this.canClick = true  //这里重新开启
        setTimeout(() => {
          this.$refs.telForm.resetFields();
          this.$data.dialogFormVisibleTel = false;         
        })
      },
      dialogCloseTel(){
        window.clearInterval(clock)
        this.$data.getClickName = '发送验证码';
          this.$data.waitTime = 60;
          this.canClick = true  //这里重新开启
        setTimeout(() => {
          this.$refs.telForm.resetFields();
          this.$data.dialogFormVisibleTel = false;         
        })
      },
      getMsg(){
          let phone = this.$data.telForm.phone;
          if(phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
            if (!this.canClick) return  ;
                    this.canClick = false
                    this.$data.getClickName = this.$data.waitTime + 's后发送';
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
          }else{
            this.$message({
              type:"warning",
              message:'请输入正确的手机号'
            })
          }

      },

    }

}
