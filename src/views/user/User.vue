<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>

		<el-table :data="tableData" border height="448" style="width:1342px;text-align:center;">
			<el-table-column prop="id" label="ID" width="160"></el-table-column>
	    	<el-table-column prop="username" label="帐号" width="160"></el-table-column>
	    	<el-table-column prop="role_name" label="岗位" width="160"></el-table-column>
	    	<el-table-column prop="username_desc" label="姓名" width="160"></el-table-column>
	    	<el-table-column prop="phone" label="手机" width="160"></el-table-column>
	    	<el-table-column prop="status" label="状态" width="160"></el-table-column>
	    	<el-table-column label="创建时间" width="160">
	    		<template slot-scope="scope">
	    			{{scope.row.created_at | date(4)}}
	    		</template>
	    	</el-table-column>
		    <el-table-column label="操作" width="220">
			    <template slot-scope="scope">
			    	<el-button type="primary" plain icon="el-icon-setting" circle size="small"
			    		@click="fnResetPassword(scope.row)"></el-button>
			    	<el-button type="warning" plain icon="el-icon-edit" circle size="small"
			    		@click="fnEdit(scope.row)"></el-button>
			    	<el-button type="danger" plain icon="el-icon-delete" circle size="small"
			    		@click="fnRemove(scope.row)"></el-button>
			    </template>
		    </el-table-column>
	    </el-table>
	    <!-- 分页 -->
	    <div v-if="tableData.length > 0" style="margin:0 auto;width:961px;">
	    	<el-pagination 
				background
	            class="pagination" 
	            layout="prev, pager, next" 
	            small 
	            @current-change="handleCurrentChange" 
	            :current-page="pagination.currentPage" 
	            :page-size="requestParameters.page_size"
	            :total="pagination.totalCount">
	        </el-pagination>
	    </div>

	    <!-- 编辑 -->
	    <el-dialog title="编辑" :visible.sync="editFormVisible">
		  <el-form :model="editFormData" :rules="editRules" ref="editFormData" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="岗位：" prop="name">
			    <el-radio-group v-model="editFormData.role_name">
				    <el-radio :label="0">店长</el-radio>
				    <el-radio :label="1">店员</el-radio>
			 	</el-radio-group>
			  </el-form-item>
			  <el-form-item label="使用人：" prop="desc">
			    <el-input v-model="editFormData.desc"></el-input>
			  </el-form-item>
			  <el-form-item label="手机：" prop="phone">
			    <el-input v-model="addFormData.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="帐号：" prop="username">
			    <el-input v-model="editFormData.username"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editCancel">取 消</el-button>
		    <el-button type="primary" @click="editSubmit('editFormData')">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="resetPasswordFormVisible">
		  <el-form :model="resetPasswordFormData" :rules="resetPasswordRules" ref="resetPasswordFormData" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="新的密码：" prop="password">
			    <el-input type="password" v-model="resetPasswordFormData.password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码：" prop="repassword">
			    <el-input type="password" v-model="resetPasswordFormData.repassword"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetPasswordCancel">取 消</el-button>
		    <el-button type="primary" @click="fnResetPasswordSubmit('resetPasswordFormData')">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 添加 -->
		<el-dialog title="添加" :visible.sync="addFormVisible" :fullscreen="avatarFormVisible" :before-close="closeChange" >
		  <el-form :model="addFormData" :rules="addRules" ref="addFormData" label-width="100px" class="demo-ruleForm" v-if="!avatarFormVisible" >
			  <el-form-item label="岗位：" prop="role_name">
			    <el-radio-group v-model="addFormData.role_name">
				    <el-radio :label="0">店长</el-radio>
				    <el-radio :label="1">店员</el-radio>
			 	</el-radio-group>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="name">
			    <el-input v-model="addFormData.name"></el-input>
			  </el-form-item>
			  <el-form-item label="手机：" prop="phone">
			    <el-input v-model="addFormData.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="帐号：" prop="username">
			    <el-input v-model="addFormData.username"></el-input>
			  </el-form-item>
			  <el-form-item label="密码：" prop="password">
			    <el-input v-model="addFormData.password" type='password'></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" v-if="!avatarFormVisible">
		    <el-button @click="addCancel">取 消</el-button>
		    <el-button type="primary" @click="addSubmit('addFormData')">确 定</el-button>
		  </div>
		</el-dialog>
		
	</div>
</template>
<script>

	import globalRules from '../../config/global_rules'

	import globalFunctions from '../../config/global_functions'

	import userApi from '../../api/user'

	export default{
		name:'accoun-set',
		components: {

		},
		data(){
			return{
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
	            	name:'',
	            	phone:'',
	            	username:'',
	            	password:'',
	            },
	            addRules:{
	            	name:globalRules.rules.truename(),
	            	phone:globalRules.rules.phone(),
	            	username:globalRules.rules.username(4,20,'请输入帐号'),
	            	password:globalRules.rules.password(6,20,'请输入密码：'),
	            },
	            avatarFormVisible:false,
	            editFormVisible:false,
	            editFormData:{
	            	id:'',
	            	name:'',
	            	phone:'',
	            	username:'',
	            },
	            editRules:{
	            	name:globalRules.rules.truename(),
		          	phone:globalRules.rules.phone(),
	            	username: globalRules.rules.username(4,20,'请输入帐号'),
	            },
	            resetPasswordFormVisible:false,
	            resetPasswordFormData:{
	            	id:'',
	            	password:'',
	            	repassword:'',
	            },
	            resetPasswordRules:{
	            	password:globalRules.rules.password(6,20,'请输入当前密码：'),
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

			//列表
			lists(){
				this.$data.requestParameters.sid = localStorage.getItem('store_id');
				let qs = require('querystring')
	    		settingApi.accountList(qs.stringify(this.$data.requestParameters)).then((res) => {
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
				          	globalFunctions.functions.success_message(this);
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
					name:'',
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
			        	this.$data.editFormData.store_id = localStorage.getItem('store_id');
			        	this.$data.editFormData.role_id = -1;
						let qs = require('querystring')
		        		userApi.edit(qs.stringify(this.$data.editFormData)).then((res) => {
		        			if(res.data.errno === 0){
								console.log(res)
								this.accountList();
								this.$data.editFormData = {
									id:'',
									name:'',
									phone:'',
									username:'',
									password:'',
								}
								this.$data.editFormVisible = false;

		        			}else{
								this.$message.error(res.data.msg);	
							}		        			
		        			
		        		})
						
			        } 
		        });

			},

			//修改密码
			fnResetPassword(row){
				this.$data.resetPasswordFormVisible = true;
				this.fnResetPasswordClearData();
			},		

			resetPasswordCancel(){
				this.$data.resetPasswordFormVisible = false;
				this.fnResetPasswordClearData();
			},

			fnResetPasswordSubmit(formName){
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
						let qs = require('querystring')
		        		userApi.password_reset(qs.stringify(this.$data.resetPasswordFormData)).then((res) => {
		        			if(res.data.errno === 0){
								globalFunctions.functions.success_message(this);
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
	            	name:'',
	            	phone:'',
	            	username:'',
	            	password:'',
	            }
			},
			
			fnAdds(){
				this.fnAddsFormClearData();
				this.$data.addFormVisible = true;
			},

			//添加
			addCancel(){
				this.$data.addFormVisible = false;
				this.fnAddsFormClearData();
			},

			fnAddsSubmit(formName){
				console.log(this.$data.addFormData.role_name)
				console.log(this.$data.addFormData.name)
				console.log(this.$data.addFormData.phone)
				console.log(this.$data.addFormData.username)
				console.log(this.$data.addFormData.password)
				return ;
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
			        	this.$data.addFormData.store_id = localStorage.getItem('store_id');
			        	this.$data.addFormData.role_id = -1;
						let qs = require('querystring')
		        		userApi.adds(qs.stringify(this.$data.addFormData)).then((res) => {
		        			if(res.data.errno === 0){
								console.log(res)
					          	globalFunctions.functions.success_message(this);
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
</script>
<style lang="scss" scoped>
	.store-set-page{
		.top-box{
			position:relative;
			margin-bottom:20px;
			height: 36px;
			border-bottom:1px solid #d2d2d2;
			.add-btn{
				position: absolute;
				top:0;
				right:20px;

			}
		}
	}
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
</style>