<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdd()" >新增</el-button>
		</div>
		<el-table :data="tableData" border height="448" style="width:821px;text-align:center;">
	    	<el-table-column prop="name" label="账号名" width="220"></el-table-column>
	    	<el-table-column prop="person_in_charge" label="姓名" width="140"></el-table-column>
	    	<el-table-column prop="phone" label="联系方式" width="120"></el-table-column>
			<el-table-column prop="phone" label="创建时间" width="120"></el-table-column>
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

	    <!-- 添加、修改 -->
	    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="账号名称：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="person_in_charge">
			    <el-input v-model="ruleForm.person_in_charge"></el-input>
			  </el-form-item>
			  <el-form-item label="联系方式：" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="角色：" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="头像：" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>
		 <!-- 修改密码 -->
		 <el-dialog title="修改密码" :visible.sync="paddwordFormVisible">
		  <el-form :model="passWord" ref="passWord" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="新密码">
			    <el-input v-model="passWord.password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认新密码">
			    <el-input v-model="passWord.repassword"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="paddwordFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="paddwordFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import settingApi from '../../../api/setting'
	export default{
		name:'store-set',
		data(){
			return{
				tableData: [],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        dialogTitle:"",
				dialogFormVisible: false,
				paddwordFormVisible: false,
				passWord: {
					password: '',
					repassword: ''
				},
		        ruleForm: {
		          	username: '',
		          	person_in_charge:'',
		          	phone:'',
					avatar: ''
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
		          ]
		        },
				requestParameters: {
	                page: 1,
	                page_size:10
	            }
			}
		},
		created:function(){
			this.storeList();
		},
		methods: {
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

	    	handleCurrentChange(currentPage) {
	            console.log(currentPage)
	            this.$data.requestParameters.page = currentPage;
	            this.storeList();
	        },

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
	        			console.log(res)
	        			if(res.data.errno === 0){
							console.log(res)
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
							this.storeList();
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
				console.log(row);
				this.$data.dialogTitle = '账号编辑'; 
				this.$data.currentId = row.id;
				this.$data.ruleForm = row;
				this.$data.dialogFormVisible = true;
				
			},
			fnAdd(){
				this.$data.dialogTitle = '账号添加';
				this.$data.currentId = "";
				this.$data.ruleForm = {
		          	name: '',
		          	person_in_charge:'',
		          	phone:''
		        };
				this.$data.dialogFormVisible = true;
			},
			cancel(){
				this.$data.dialogFormVisible = false;
				this.$data.currentId = '';
				this.$data.ruleForm = {
		          	name: '',
		          	person_in_charge:'',
		          	phone:''
		        };
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
					console.log(valid)
			        if (valid) {
						if(this.$data.currentId !== ''){
							let list = {
								'id': this.$data.currentId,
								'name': this.$data.ruleForm.name,
					          	'person_in_charge':this.$data.ruleForm.person_in_charge,
					          	'phone':this.$data.ruleForm.phone
							}
							let qs = require('querystring')
			        		settingApi.editStore(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.roleList();
									this.$data.currentId = '';
									this.$data.ruleForm = {
							          	name: '',
							          	person_in_charge:'',
							          	phone:''
							        };
									this.$data.dialogFormVisible = false;

			        			}else{
									this.$message.error(res.data.msg);	
								}		        			
			        			
			        		})
						}else{
							let list = {
						        'name': this.$data.ruleForm.name,
					          	'person_in_charge':this.$data.ruleForm.person_in_charge,
					          	'phone':this.$data.ruleForm.phone
						    }
						    let qs = require('querystring')
			        		settingApi.addStore(qs.stringify(list)).then((res) => {
			        			if(res.data.errno === 0){
									console.log(res)
									this.storeList();
									this.$data.currentId = '';
									this.$data.ruleForm = {
							          	name: '',
							          	person_in_charge:'',
							          	phone:''
							        };
									this.$data.dialogFormVisible = false;

			        			}else{
			        				this.$message.error(res.data.msg);

			        			}
			        			
			        		})
						}
			        } 
		        });
			},
			editPass(row){
				this.paddwordFormVisible = true
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
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
</style>