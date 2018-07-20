<template>
	<div class="personal-page">
		<div class="top-box">
			<h3>个人资料</h3>
			<div class="editBtn">
				<el-button type="primary" plain @click="fnPasswordEdit()">修改密码</el-button>
			</div>
		</div>
		<el-form ref="userForm" :model="userForm" rules="rulesUser" label-width="75px" enabled>
		  	<el-form-item label="帐号：">
		    	{{userForm.username}}
		  	</el-form-item>
		  	<el-form-item label="岗位：">
		    	{{userForm.role_name}}
		  	</el-form-item>
		  	<el-form-item label="姓名：">
		    	<el-input v-model="userForm.name"></el-input>
		  	</el-form-item>
		  	<el-form-item label="手机：">
		    	<el-input v-model="userForm.phone"></el-input>
		  	</el-form-item>
	  		<div style="text-align:center;">
				<el-button type="primary" @click="fnSaveSubmitForm('userForm')">保 存</el-button>
			</div>
		</el-form>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" style="min-width:800px;">
		  <el-form :model="ruleFormEditPassword" :rules="rulesEditPassword" ref="ruleFormEditPassword" label-width="100px" class="demo-ruleFormEditPassword">
		    <el-form-item label="当前密码：" prop="passwordOld">
		      <el-input type="password" v-model="ruleFormEditPassword.passwordOld" ></el-input>
		    </el-form-item>
		    <el-form-item label="新的密码：" prop="passwordCurrent">
		      <el-input type="password" v-model="ruleFormEditPassword.passwordCurrent" ></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码：" prop="passwordRepeat">
		      <el-input type="password" v-model="ruleFormEditPassword.passwordRepeat" ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="fnCancel">取 消</el-button>
		    <el-button type="primary" @click="fnPasswordEditSubmitForm('ruleFormEditPassword')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>

	import globalRules from '../../config/global_rules'

	import globalFunctions from '../../config/global_functions'

	import userApi from '../../api/user'

	export default {

		name:'personal',

		data() {
		  return {

		    dialogFormVisible: false,

		    ruleFormEditPassword: {
		      passwordOld:'',
		      passwordCurrent:'',
		      passwordRepeat:''
		    },

		    rulesEditPassword: {
		      passwordOld: globalRules.rules.password('请输入当前密码：',6,20),
		      passwordCurrent: globalRules.rules.password('请输入新的密码：',6,20),
		      passwordRepeat: [
		        { required: true, message: '请再次输入密码', trigger: 'blur' },
		        {
		            validator: (rule, value, callback) => {
		                if (value !== this.$data.ruleFormEditPassword.passwordCurrent) {
		                    callback(new Error('两次输入密码不一致!'));
		                } else {
		                    callback();
		                }
		            },
		            trigger: 'blur'
		        }
		      ]
		    },

		    userForm: {
		      name:'',
		      phone:'',
		    },

		    rulesUser: {
		      //name: globalRules.rules.password('请输入当前密码：',6,20),
		      //phone: globalRules.rules.password('请输入新的密码：',6,20),
		    }
		    
		  }

		},

	    created:function(){
	    	this.getUserCurrentView();
	    },

	    methods: {

	      getUserCurrentView(){
			userApi.getUserCurrentView().then((res) => {
				if(res.data.errno === 0){
					console.log(res);
					this.$data.userForm.name = res.data.data.user.truename;
					this.$data.userForm.phone = res.data.data.user.phone;
					
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
	      	this.$data.ruleFormEditPassword.passwordOld = '';
	        this.$data.ruleFormEditPassword.passwordCurrent = '';
	        this.$data.ruleFormEditPassword.reNowPwd = '';
	      },

	      fnPasswordEditSubmitForm(formName){
			this.$refs[formName].validate((valid) => {
				console.log(valid)
		        if (valid) {
		        	let list = {
						'old_password': this.$data.ruleFormEditPassword.passwordOld,
						'new_password':this.$data.ruleFormEditPassword.passwordCurrent,
						'new_password2':this.$data.ruleFormEditPassword.passwordRepeat
					}
					let qs = require('querystring')
					userApi.password_edit(qs.stringify(list)).then((res) => {
						if(res.data.errno === 0){
							alert('操作成功')
							userApi.logout().then((res1) => {
								if(res1.data.errno === 0){
									localStorage.setItem('knock_knock', '')
	            					localStorage.setItem('username', '')
									this.$router.replace({
										name: 'UserLogin'
									});
								}else{
									this.$message.error(res1.data.msg);
								}
							})
							
						}else{
							this.$message.error(res.data.msg);
						}
					})
		        } 
	        });
	      },

	      fnSaveSubmitForm(formName){
	      	this.$refs[formName].validate((valid) => {
				console.log(valid)
		        if (valid) {
		        	let list = {
						'truename':this.$data.userForm.name,
						'phone':this.$data.userForm.phone
					}
					let qs = require('querystring')
					userApi.edit_current(qs.stringify(list)).then((res) => {
						if(res.data.errno === 0){
				          	globalFunctions.functions.success_message(this);
						}else{
							this.$message.error(res.data.msg);
						}
					})
		        } 
	        });
	      }

	    }
	}
</script>
<style lang="scss" scoped>
	.personal-page{
		margin:80px auto 0;
		padding:40px;
		width:500px;
		border:1px solid #d2d2d2;
		.top-box{
			position: relative;
			height: 100px;
			.editBtn{
				position:absolute;
				top:0;
				right:0;
			}
		}
	}

</style>