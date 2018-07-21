<template>
	<div class="personal-page">
		<div class="top-box">
			<h3>个人资料</h3>
			<div class="editBtn">
				<el-button type="primary" plain @click="fnPasswordEdit()">修改密码</el-button>
			</div>
		</div>
		<el-form :model="userEditForm" :rules="rulesUserEdit" ref="userEditForm" label-width="75px" enabled>
		  	<el-form-item label="帐号：">
		    	{{username}}
		  	</el-form-item>
		  	<el-form-item label="岗位：">
		    	{{role_name}}
		  	</el-form-item>
		  	<el-form-item label="姓名：">
		    	<el-input v-model="userEditForm.name"></el-input>
		  	</el-form-item>
		  	<el-form-item label="手机：">
		    	<el-input v-model="userEditForm.phone"></el-input>
		  	</el-form-item>
	  		<div style="text-align:center;">
				<el-button type="primary" @click="fnSaveSubmitForm('userEditForm')">保 存</el-button>
			</div>
		</el-form>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" style="min-width:800px;">
		  <el-form :model="passwordEditForm" :rules="rulesPasswordEdit" ref="passwordEditForm" label-width="100px" class="demo-passwordEditForm">
		    <el-form-item label="当前密码：" prop="passwordOld">
		      <el-input type="password" v-model="passwordEditForm.passwordOld" ></el-input>
		    </el-form-item>
		    <el-form-item label="新的密码：" prop="passwordCurrent">
		      <el-input type="password" v-model="passwordEditForm.passwordCurrent" ></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码：" prop="passwordRepeat">
		      <el-input type="password" v-model="passwordEditForm.passwordRepeat" ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="fnCancel">取 消</el-button>
		    <el-button type="primary" @click="fnPasswordEditSubmitForm('passwordEditForm')">确 定</el-button>
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

		    username:'',

		    role_name:'',

		    userEditForm: {
		      name:'',
		      phone:'',
		    },

		    rulesUserEdit: {
		      	name: globalRules.rules.user.username(4,20,'请输入帐号'),
		      	phone: globalRules.rules.user.password(6,20,'请输入密码：')
		    },

		    passwordEditForm: {
		      passwordOld:'',
		      passwordCurrent:'',
		      passwordRepeat:''
		    },

		    rulesPasswordEdit: {
		      	passwordOld: globalRules.rules.user.password(6,20,'请输入当前密码：'),
		      	passwordCurrent: globalRules.rules.user.password(6,20,'请输入新的密码：'),
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
			},

			fnPasswordEditSubmitForm(formName){
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
								alert('操作成功')
								globalFunctions.functions.user.logout(userApi,this.$router,this.$message);
							}else{
								this.$message.error(res.data.msg);
							}
						})
				    } 
				});
      		},

			fnSaveSubmitForm(formName){

				this.$refs.userEditForm.validate((valid) => {
					alert(valid)
				})

				this.$refs['userEditForm'].validate((valid) => {
					alert(this.$data.userEditForm.name)
					alert(valid)
				    /*
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
				    */
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