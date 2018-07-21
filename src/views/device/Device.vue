<template>
	<div class="device-list-page">
		<template>
			<div class="device-box">
				<!-- 列表 -->
				<el-table :data="tableData" border style="text-align:center;">
					<el-table-column prop="id" label="ID"></el-table-column>
			    	<el-table-column prop="device_id" label="编号"></el-table-column>
				    <el-table-column prop="version" label="版本"></el-table-column>
				    <el-table-column prop="locate" label="类型"></el-table-column>
				    <el-table-column label="位置" width="160">
				    	<template slot-scope="scope">
				    		{{scope.row.locate_desc}}
				    	</template>
				    </el-table-column>
				    <el-table-column prop="status" label="状态">
				    	<template slot-scope="scope">
				    		{{scope.row.status == 0 ? '断开' : '正常'}}
				    	</template>
				    </el-table-column>
				    <el-table-column label="操作" width="200">
					    <template slot-scope="scope">
					        <el-button @click="fnEdit(scope.row)" type="text" size="small">编辑</el-button>
					    </template>
				    </el-table-column>
			    </el-table>

			    <!-- 分页 -->
				<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1332px;">
					<el-pagination 
						background
			            class="pagination" 
			            layout="prev, pager, next" 
			            small 
			            @current-locate_changed="handleCurrentChange" 
			            :current-page="pagination.currentPage" 
			            :page-size="requestParameters.page_size"
			            :total="pagination.totalCount">
			        </el-pagination>
				</div>

				<!-- 编辑 -->
				<el-dialog title="编辑" :visible.sync="editFormVisible">
				 	<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
					    <el-form-item label="类型：">
					    	<el-select v-model="editForm.locate" placeholder="请选择">
						        <el-option label="收银" value="cashier"></el-option>
						        <el-option label="其他" value="other"></el-option>
						    </el-select>
					    </el-form-item>
					    <el-form-item label="位置：" prop="locate_desc">
					    	<el-input v-model="editForm.locate_desc" :disabled="noText"></el-input>
					  	</el-form-item>
				    </el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="editCancel">取 消</el-button>
				    <el-button type="primary" @click="editSubmit('editForm')">确 定</el-button>
				  </div>
				</el-dialog>

			</div>
		</template>
	</div>
</template>

<script>

	import deviceApi from '../../api/device'

	export default{

		name:'device',

		data(){
			return{
				isShow:true,
				tableData: [],
				pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        editId:0,
		        editLocationDesc:'',
		        requestParameters: {
	                page: 1,
	                page_size:10,
	            },
	            editFormVisible:false,
				noText: false,
	            editForm:{
	            	locate:'',
	            	locate_desc:''
	            },
	            editRules:{
	            	locate_desc:[
	            		{ required: true, message: '请输入位置', trigger: 'blur' },
		            	{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
	            	]
	            }
			}
		},

		created:function(){
			this.lists();
		},

		watch: {
			'editForm.locate': 'locate_changed'
		},

		methods:{

			locate_changed() {
				if(this.editForm.locate === 'cashier') {
					this.editForm.locate_desc = '收银台'
					this.noText = true
				} else {
					this.editForm.locate_desc = this.$data.editLocationDesc
					this.noText = false
				}
			},

			lists(){
			    let qs = require('querystring');
        		deviceApi.lists().then((res) => {
        			if(res.data.errno === 0){
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        			}else{

        			}
        		})
			},

			handleCurrentChange(currentPage) {
	            this.$data.requestParameters.page = currentPage;
	            this.lists();
	        },

			fnEdit(row){
				this.$data.editId=row.id;
				this.$data.editLocationDesc=row.locate_desc,
				this.$data.editForm = {
	            	locate: row.locate == '' ? 'other' : row.locate,
	            	locate_desc: row.locate_desc
	            },
	            this.locate_changed();
				this.$data.editFormVisible = true;
			},

			editCancel(){
				this.$data.editId=0;
				this.$data.editForm = {
	            	locate: '',
	            	locate_desc: ''
	            }
				this.$data.editFormVisible = false;
			},

			editSubmit(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
						let list = {
							'id': this.$data.editId,
							'locate': this.$data.editForm.locate,
	            			'locate_desc': this.$data.editForm.locate_desc
						}
						let qs = require('querystring');
		        		deviceApi.edit(qs.stringify(list)).then((res) => {
		        			if(res.data.errno === 0){
								this.lists();
								this.editCancel();
		        			}else{

		        			}
		        			
		        		})
			        } 
		        });
			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-pagination{
		margin:20px 0;
	  	float: right;
	}
</style>

<style lang="scss" scoped>
	.device-list-page{
		.top-box{
			position:relative;
			margin-bottom:20px;
			height: 36px;
			border-bottom:1px solid #d2d2d2;
			.btn-wrap{
				position: absolute;
				bottom:-1px;
				right:20px;
			}
			
		}
	}
</style>
