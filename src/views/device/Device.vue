<template>
	<div class="device-list-page">
		<template>
			<div class="device-box">
				<!-- 列表 -->
				<el-table :data="tableData" border style="text-align:center;">
					<el-table-column prop="id" label="序号"></el-table-column>
			    	<el-table-column prop="device_id" label="编号"></el-table-column>
				    <el-table-column prop="version" label="版本"></el-table-column>
				    <el-table-column prop="locate" label="类型">
						<template slot-scope="scope">
						<span>{{scope.row.locate == 'other' ?'其他':'收银'}}</span>
						</template>
					</el-table-column>
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

<script src="@/assets/js/device/Device.js"></script>

<style lang="scss" scoped src="@/assets/css/device/Device.scss">
