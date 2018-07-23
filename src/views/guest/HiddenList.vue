<template>
	<div>
		<!-- 屏蔽列表 -->
		<el-table :data="tableData" border height="680" style="margin:0 auto;width: 1231px;text-align:center;">
			<el-table-column fixed type="index" label="ID" width="80">
			</el-table-column>
			<el-table-column label="人脸" width="60">
				<template slot-scope="scope">
					<img :src="scope.row.avatar" style="display:block;margin:0 auto;width:100%;">
				</template>
			</el-table-column>
			<el-table-column prop="customerMerchant.name" label="姓名" width="100">
			</el-table-column>
			<el-table-column label="性别" width="50">
				<template slot-scope="scope">
					<span>{{scope.row.gender == 1 ?'男':'女'}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100">
			</el-table-column>
			<el-table-column prop="customerMerchant.phone" label="手机" width="110">
			</el-table-column>
			<el-table-column prop="customerMerchant.consume_num" label="新客/熟客" width="110">
			</el-table-column>
			<el-table-column prop="customerMerchant.consume_num" label="未购买/已购买" width="110">
			</el-table-column>
			<el-table-column prop="created_at" label="进店时间" width="200">
				<template slot-scope="scope">
					{{scope.row.created_at | date(4)}}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="return_process(scope.row)">撤销屏蔽</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;text-align: right;">
			<el-pagination 
				background 
				layout="prev, pager, next" 
				small 
				@current-change="handleCurrentChange" 
				:current-page="pagination.currentPage" 
				:page-size="requestParameters.page_size" 
				:total="pagination.totalCount">
			</el-pagination>
		</div>
	</div>
</template>
<script src="@/assets/js/guest/HiddenList.js"></script>