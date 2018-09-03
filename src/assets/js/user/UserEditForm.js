import globalRules from '@/config/global_rules'

import globalFunctions from '@/config/global_functions'

import userApi from '@/api/user'

import roleApi from '@/api/role'

export default {

  name: 'user-edit-form',

  data () {

    return {

        allRoles:'',

        editFormVisible:false,

        editFormData:{
            id:'',
            truename:'',
            phone:'',
            username:'',
        },

        editRules:{
            name:globalRules.rules.user.minMax(1,15),
            phone:globalRules.rules.user.phone(),
            username: globalRules.rules.user.username('请输入帐号'),
        },

    }

  },

  methods: {

    getRoles(){
        roleApi.lists_results().then((res) => {
            if(res.data.errno === 0){
                this.$data.allRoles=res.data.data;
            }else{
                this.$message.error(res.data.msg);
            }
        })
    },


    //编辑取消
    editCancel(){
        this.$data.editFormVisible = false;
        this.$data.editFormData = {
            id:'',
            truename:'',
            phone:'',
            username:'',
            password:'',
        }
    },

    //编辑提交
    editSubmit(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let qs = require('querystring')
                userApi.edit(qs.stringify(this.$data.editFormData)).then((res) => {
                    if(res.data.errno === 0){
                        globalFunctions.functions.message(this,'success');
                        this.lists();
                        this.$data.editFormData = {
                            id:'',
                            role_id:'',
                            truename:'',
                            phone:'',
                            username:'',
                        }
                        this.$data.editFormVisible = false;

                    }else{
                        this.$message.error(res.data.msg);
                    }

                })
            }
        });
    },

  },

}
