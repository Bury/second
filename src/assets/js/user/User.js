import globalRules from '@/config/global_rules'

import globalFunctions from '@/config/global_functions'

import userApi from '@/api/user'

import roleApi from '@/api/role'

export default{

    name:'accoun-set',

    components: {

    },

    data(){

        return{
            allRoles:'',
            targetUserId:0,
            tableData: [],
            pagination:{
                currentPage:1,
                totalCount:0,
            },
            requestParameters: {
                page: 1,
                page_size:10,
                sid:''
            },
            addFormVisible:false,
            addFormData:{
                role_id:'',
                truename:'',
                phone:'',
                username:'',
                password:'',
            },
            addRules:{
                //role_id:globalRules.rules.common.id(),
                name:globalRules.rules.user.truename(),
                phone:globalRules.rules.user.phone(),
                username:globalRules.rules.user.username(4,20,'请输入帐号'),
                password:globalRules.rules.user.password(6,20,'请输入密码：'),
            },
            avatarFormVisible:false,
            editFormVisible:false,
            editFormData:{
                id:'',
                truename:'',
                phone:'',
                username:'',
            },
            editRules:{
                name:globalRules.rules.user.truename(),
                phone:globalRules.rules.user.phone(),
                username: globalRules.rules.user.username(4,20,'请输入帐号'),
            },
            resetPasswordFormVisible:false,
            resetPasswordFormData:{
                id:'',
                password:'',
                repassword:'',
            },
            resetPasswordRules:{
                password:globalRules.rules.user.password(6,20,'请输入当前密码：'),
                repassword:[
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.$data.resetPasswordFormData.password) {
                                callback(new Error('两次输入密码不一致'));
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
        this.lists();
    },

    methods: {

        getRoles(){
            roleApi.lists_results().then((res) => {
                if(res.data.errno === 0){
                    console.log(res.data.data)
                    this.$data.allRoles=res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },

        //列表
        lists(){
            this.$data.requestParameters.sid = localStorage.getItem('store_id');
            let qs = require('querystring')
            userApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
                if(res.data.errno === 0){
                    this.$data.tableData = res.data.data.list;
                    this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
                    this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },

        handleCurrentChange(currentPage) {
            console.log(currentPage)
            this.$data.requestParameters.page = currentPage;
        },

        fnRemove(row){
            this.$confirm('是否确认删除此帐号：'+row.username+' ？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let list = {
                    'id': row.id
                }
                let qs = require('querystring')
                userApi.dele(qs.stringify(list)).then((res) => {
                    if(res.data.errno === 0){
                        globalFunctions.functions.message(this,'success');
                        this.lists();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                })
            }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });          
            });
        },

        fnEdit(row){
            let qs = require('querystring')
            userApi.view(qs.stringify({
                id:row.id
            })).then((res) => {
                if(res.data.errno === 0){
                    console.log(res)
                    this.$data.editFormData = res.data.data;
                    this.getRoles();
                    this.$data.editFormVisible = true;
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
                console.log(valid)
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

        //重置密码
        fnResetPassword(row){
            this.$data.targetUserId=row.id;
            this.$data.resetPasswordFormVisible = true;
            this.fnResetPasswordClearData();
        },		

        resetPasswordCancel(){
            this.$data.resetPasswordFormVisible = false;
            this.fnResetPasswordClearData();
        },

        fnResetPasswordSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$data.resetPasswordFormData.id = this.$data.targetUserId;
                    let qs = require('querystring')
                    userApi.password_reset(qs.stringify(this.$data.resetPasswordFormData)).then((res) => {
                        if(res.data.errno === 0){
                            globalFunctions.functions.message(this,'success');
                            this.lists();
                            this.$data.resetPasswordFormVisible = false;
                        }else{
                            this.$message.error(res.data.msg);	
                        }		        			
                        
                    })
                    
                } 
            });
        },

        fnResetPasswordClearData(){
            this.$data.resetPasswordFormData = {
                id:'',
                password:'',
                repassword:'',
            }
        },

        fnAddsFormClearData(){
            this.$data.addFormData = {
                truename:'',
                phone:'',
                username:'',
                password:'',
            }
        },
        
        fnAdds(){
            this.fnAddsFormClearData();
            this.getRoles();
            this.$data.addFormVisible = true;
        },

        //添加
        addCancel(){
            this.$data.addFormVisible = false;
            this.fnAddsFormClearData();
        },

        fnAddsSubmit(formName){
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    let qs = require('querystring')
                    userApi.adds(qs.stringify(this.$data.addFormData)).then((res) => {
                        if(res.data.errno === 0){
                            console.log(res)
                            globalFunctions.functions.message(this,'success');
                            this.lists();
                            this.fnAddsFormClearData();
                            this.$data.addFormVisible = false;

                        }else{
                            this.$message.error(res.data.msg);	
                        }		        			
                        
                    })
                } 
            });
        },

        closeChange(done){
            // done();
            if(this.$data.avatarFormVisible){
                this.$data.avatarFormVisible = false;
            }else{
                done()
            }
            
        },
        
    }
    
}