import globalRules from '@/config/global_rules'

import globalFunctions from '@/config/global_functions'

import userApi from '@/api/user'

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
                name: globalRules.rules.user.username(4,20,'请输入帐号'),
                phone: globalRules.rules.user.password(6,20,'请输入密码')
            },
            passwordEditForm: {
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

    }

}
