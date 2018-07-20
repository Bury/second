<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdd()" >新增</el-button>
		</div>
		<el-table :data="tableData" border height="448" style="width:821px;text-align:center;">
	    	<el-table-column prop="store_name" label="账号名" width="220"></el-table-column>
	    	<el-table-column prop="username" label="姓名" width="140"></el-table-column>
	    	<el-table-column prop="phone" label="联系方式" width="120"></el-table-column>
			<el-table-column prop="created_at" label="创建时间" width="120"></el-table-column>
		    <el-table-column label="操作" width="220">
			    <template slot-scope="scope">
			    	<el-button type="warning" plain icon="el-icon-edit" circle size="small"
			    		@click="fnEdit(scope.row)"></el-button>
					<el-button type="primary" plain icon="el-icon-view" circle size="small"
			    		@click="editPass(scope.row)"></el-button>
			    	<el-button type="danger" plain icon="el-icon-delete" circle size="small"
			    		@click="fnRemove(scope.row)"></el-button>
			    </template>
		    </el-table-column>
	    </el-table>
	    <!-- 分页 -->
	    <div v-if="tableData.length > 0" style="margin:0 auto;width:701px;">
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

	    <!-- 添加 -->
	    <el-dialog title="新建" :visible.sync="dialogFormVisible">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="账号名称：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="person_in_charge">
			    <el-input v-model="ruleForm.person_in_charge"></el-input>
			  </el-form-item>
				<el-form-item label="手机号:" prop="phone">
					<el-input v-model="ruleForm.phone"></el-input>
				</el-form-item>
			  <el-form-item label="角色：" prop="role_id">
					<el-select v-model="ruleForm.role_id" placeholder="请选择" >
						<el-option v-for="(item,idx) in allRole" :key="idx" :label="allRole[idx].name" :value="allRole[idx].id"></el-option>
					</el-select>	
			  </el-form-item>
			  <!-- <el-form-item label="头像：" prop="userimg">
			    <el-upload
				class="avatar-uploader"
				action="https://jsonplaceholder.typicode.com/posts/"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			  </el-form-item> -->
				<el-form-item label="初始密码" prop='password'>
					<el-input type="password" maxlength='16' v-model="ruleForm.password" placeholder='6-16位数字或字母'></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop='repassword'>
					<el-input type="password" maxlength='16' v-model="ruleForm.repassword" placeholder='请再次输入密码'></el-input>
				</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="cancela('ruleForm')">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog title="编辑" :visible.sync="editFormVisible">
			<el-form :model="editForm" :rules='rules' ref="editForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="账号名称：" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="姓名：" prop="person_in_charge">
					<el-input v-model="editForm.person_in_charge"></el-input>
				</el-form-item>
				<el-form-item label="手机号：" prop="phone">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="角色：" prop="role_id">
					<el-select v-model="editForm.role_id" placeholder="请选择" >
						<el-option v-for="(item,idx) in allRole" :key="idx" :label="allRole[idx].name" :value="allRole[idx].id"></el-option>
					</el-select>	
			  </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancele('editForm')">取 消</el-button>
				<el-button type="primary" @click="editSubmit('editForm')">确 定</el-button>
			</div>			
		</el-dialog>
		 <!-- 修改密码 -->
		 <el-dialog title="修改密码" :visible.sync="passwordFormVisible">
		  <el-form :model="passWord" :rules='rules' ref="passWord" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="新密码" prop='password'>
			    <el-input v-model="passWord.password" type='password'></el-input>
			  </el-form-item>
			  <el-form-item label="确认新密码" prop='repassword'>
			    <el-input v-model="passWord.repassword" type='password'></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelp('passWord')">取 消</el-button>
		    <el-button type="primary" @click="editPassSubmit('passWord')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import settingApi from '../../../api/setting'
	import * as utils from '../../../utils/index'
	export default{
		name:'store-set',
		data(){
			return{	
				createdTimes:['',''],		
				imageUrl: '',
				tableData: [],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		    },
		    dialogTitle:"",
				dialogFormVisible: false,
				passwordFormVisible: false,
				editFormVisible: false,
				passWord: {
					id:'',
					password: '',
					repassword: ''
				},
				allRole:[],
				editForm:{
					name:'',
					person_in_charge:'',
					role_id:'',
					phone:''
				},
		    ruleForm: {
		      username: '',
		      person_in_charge:'',
					phone:'',
					role_id:'',
					avatar: '',
					password:'',
					repassword:'',
					store_id:''
		    },
		    currentId:'',
				rules: {
					name: [
						{ required: true, message: '请输入门店名称', trigger: 'blur' },
						{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
					],
					person_in_charge:[
						{ required: true, message: '请输入负责人姓名', trigger: 'blur' },
						{ min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
					],
					phone:[
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
						{
								validator: (rule, value, callback) => {
										if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)
) {
												callback();
										} else {
												callback("请输入正确的手机号码！");
										}
								},
								trigger: 'blur'
						}
					],
					role_id:[{required: true,message:'请选择角色',trigger:'blur'}],
					password:[
						{required:true, message:'请输入密码',trigger:'blur'},
						{
							validator:(rule, value, callback) =>{
								if(value.match(/^[a-zA-Z\d]{6,16}$/)){
									callback();
								}else{
									callback("请输入正确的密码格式");
								}
							},
							trigger: 'blur'
						}
					],
					repassword:[
						{required: true, message:'请再次输入密码', trigger:'blur'},
						{}
					]
		    },
				requestParameters: {
					page: 1,
					// page_size:10,
					// mid:'',
					pageSize:10,
					sid:''
	            }
			}
		},
		created:function(){
			this.storeList();
			this.accountList();
		},
		methods: {
			// 上传头像
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//列表
			storeList(){
				let qs = require('querystring')
	    		settingApi.storeList(qs.stringify(this.$data.requestParameters)).then((res) => {
	    			if(res.data.errno === 0){
						console.log(res);
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
	    			}else{
						this.$message.error(res.data.msg);
	    			}
	    		})
				},
				accountList(){
				let qs = require('querystring')
	    		settingApi.accountList(qs.stringify(this.$data.requestParameters)).then((res) => {
						console.log(res);
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
				// this.storeList();
	            this.accountList();
					},
					//角色
					roleList(){
					let qs = require('querystring');
						settingApi.roleList(qs.stringify(this.$data.requestParameters)).then((res) => {
							if(res.data.errno === 0){
							this.$data.allRole = res.data.data.list;
							}else{
							this.$message.error(res.data.msg);
							}
						})
					},
			//删除
			fnRemove(row){
				this.$confirm('确认删除该门店：'+row.name+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            let list = {
						'id': row.id
					}
					let qs = require('querystring')
	        		settingApi.deleStore(qs.stringify(list)).then((res) => {
	        			console.log(res,13131313)
	        			if(res.data.errno === 0){
							console.log(res)
							this.$message({
					            type: 'success',
					            message: '删除成功!'
							  });
							//   this.storeList();
							this.accountList();
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
			//编辑
			fnEdit(row){
				this.roleList();
				this.$data.currentId = row.id;
				this.$data.editForm = {
					username: '',
					person_in_charge:'',
					role_id:''				
				};
				this.$data.editFormVisible = true;			
			},
			//编辑提交
			editSubmit(m){
				if(this.$data.currentId !== ''){
					let list = {
						'id': this.$data.currentId,
						'name': this.$data.editForm.name,
						'person_in_charge':this.$data.editForm.person_in_charge,
						'role_id':this.$data.editForm.role_id,
						'phone':this.$data.editForm.phone
					}
					let qs = require('querystring')
							settingApi.editStore(qs.stringify(list)).then((res) => {
								if(res.data.errno === 0){
									this.$data.currentId = '';
									this.$data.editForm = {
													name: '',
													person_in_charge:'',
													role_id:'',
													phone:''
											};
									this.$data.editFormVisible = false;
									// this.storeList();
									this.accountList();
								}else{
											this.$message.error(res.data.msg);	
										}		        						        			
								})
				}
			},
			//新建
			fnAdd(){
				this.roleList();
				this.$data.currentId = "";
				this.$data.ruleForm = {
					name: '',
					person_in_charge:'',
					phone:'',	
					role_id:'',
					avatar: '',
					password:'',
					repassword:''
				};
				this.$data.dialogFormVisible = true;
			},			
			//新建提交
			submitForm(formName){
				if(this.$data.ruleForm.password == this.$data.ruleForm.repassword){
				let list = {
						'name': this.$data.ruleForm.name,
						'person_in_charge':this.$data.ruleForm.person_in_charge,
						'phone':this.$data.ruleForm.phone,
						'role_id':this.$data.ruleForm.role_id,
						'avatar': this.$data.ruleForm.avatar,
						'password':this.$data.ruleForm.password,
						'repassword':this.$data.ruleForm.repassword,
						'store_id':this.$data.ruleForm.store_id
					};
						    let qs = require('querystring');
			        		settingApi.addStore(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									// this.storeList();											
									this.accountList();
									this.$data.currentId = '';
									this.$data.ruleForm = {
													name: '',
													person_in_charge:'',
													phone:'',
													role_id:'',
													avatar: '',
													password:'',
													repassword:'',
													store_id:''
											};
									this.$data.dialogFormVisible = false;																			
			        			}else{
			        				this.$message.error(res.data.msg);

										}													        			
			        		})
				}else{
					alert('请确认两次输入的密码一致')
				}
			},
			//更改密码
			editPass(row){
				console.log(row.id)
				this.$data.currentId = row.id;
				this.$data.passWord = {
					id:'',
					password:'',
					repassword:''				
				};
				this.passwordFormVisible = true;
			},
			//更改密码提交
			editPassSubmit(passWord){
				if(this.$data.passWord.password == this.$data.passWord.repassword){
					let list = {
						'id': this.$data.passWord.id,
						'password':this.$data.passWord.password,
						'repassword':this.$data.passWord.repassword
					};
					let qs = require('querystring');
					settingApi.changPwdAccount(qs.stringify(list)).then((res) =>{
						if(res.data.errno === 0){	
							this.storeList();										
								//this.accountList();
								this.$data.currentId = '';
								this.$data.passWord = {
									id:'',
									password:'',
									repassword:''
								};
								this.$data.passwordFormVisible = false;																			
						}else{
							this.$message.error(res.data.msg);
						}			
					})
				}else{
					alert('请确定两次输入的密码一致')
				}
			},
			//清空form表单
			cancelp(formName){
				this.$data.passWord = {
						password:'',
						repassword:''
				};
				this.$data.passwordFormVisible = false;	
				this.$refs[formName].resetFields();
			},
			cancela(formName){
				this.$data.ruleForm = {
					name: '',
					person_in_charge:'',
					phone:'',
					role_id:'',
					avatar: '',
					password:'',
					repassword:''
				};
				this.$data.dialogFormVisible = false;	
				this.$refs[formName].resetFields();
			},
			cancele(formName){				
				this.$data.editForm = {
					username: '',
					person_in_charge:'',
					role_id:''				
				};
				this.$data.editFormVisible = false;	
				this.$refs[formName].resetFields();
			}
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
	.el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
    .el-upload:hover {
		border-color: #409EFF;
	}
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>