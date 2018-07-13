<template>
	<div class="device-box">
		<!-- 列表 -->
		<el-table :data="tableData" border style="text-align:center;">
	    	<el-table-column prop="device_id" label="设备编号"></el-table-column>
		    <el-table-column prop="version" label="版本"></el-table-column>
		    <el-table-column label="安装位置" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.locate}} —— {{scope.row.locate_desc}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="status" label="设备状态">
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
	            @current-change="handleCurrentChange" 
	            :current-page="pagination.currentPage" 
	            :page-size="requestParameters.page_size"
	            :total="pagination.totalCount">
	        </el-pagination>
		</div>
		<!-- 编辑 -->
		<el-dialog title="编辑" :visible.sync="editFormVisible">
			<div style="margin-bottom:20px;"><span style="display:inline-block;width:100px;text-align:center;">设备编号：</span>{{editForm.device_id}}</div>
			<div style="margin-bottom:20px;"><span style="display:inline-block;width:100px;text-align:center;">所属门店：</span>{{editForm.store_name}}</div>
		 	<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
			    <el-form-item label="类型：">
			    	<el-select v-model="editForm.locate" placeholder="请选择">
				        <el-option label="收银" value="cashier"></el-option>
				        <el-option label="其他" value="other"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="安装位置：" prop="locate_desc">
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
<script>
	import deviceApi from '../../api/device'
	import remindApi from '../../api/remind'
	export default{
		name:'device',
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
	                device_id:'',
	                version:'',
	                belong_sid:'',
	                name:'',
	                created_at_begin:'',
	                cteated_at_end:'',
	                start_at_begin:'',
	                start_at_end:''
	            },
	            editFormVisible:false,
				noText: false,
	            editForm:{
	            	device_id:'',
	            	store_name:'',
	            	locate:'',
	            	locate_desc:''
	            },
	            editRules:{
	            	locate_desc:[
	            		{ required: true, message: '请输入安装位置', trigger: 'blur' },
		            	{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
	            	]
	            }
			}
		},
		created:function(){
			this.deviceList();
		},
		watch: {
			'editForm.locate': 'change'
		},
		methods:{
			change() {
				if(this.editForm.locate === 'cashier') {
					this.editForm.locate_desc = ''
					this.noText = true
				} else {
					this.noText = false
				}
			},
			deviceList(){
				this.$data.requestParameters.created_at_begin = this.$data.createdTimes[0];
	            this.$data.requestParameters.cteated_at_end = this.$data.createdTimes[1];
	            this.$data.requestParameters.start_at_begin = this.$data.startTimes[0];
	            this.$data.requestParameters.start_at_end = this.$data.startTimes[1];
			    let qs = require('querystring');
        		deviceApi.deviceList(qs.stringify(this.$data.requestParameters)).then((res) => {
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
	            this.deviceList();
	        },
			fnEdit(row){
				this.$data.editForm = {
	            	device_id: row.device_id,
	            	store_name: row.store.name,
	            	locate: row.locate == '' ? 'other' : row.locate,
	            	locate_desc: row.locate_desc
	            },
				this.$data.editFormVisible = true;
			},
			editCancel(){
				this.$data.editForm = {
	            	device_id: '',
	            	store_name: '',
	            	locate: '',
	            	locate_desc: ''
	            }
				this.$data.editFormVisible = false;
			},
			editSubmit(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
						let list = {
							'locate': this.$data.editForm.locate,
	            			'locate_desc': this.$data.editForm.locate_desc
						}
						let qs = require('querystring');
		        		deviceApi.editDevice(qs.stringify(list)).then((res) => {
		        			if(res.data.errno === 0){
								this.deviceList();
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