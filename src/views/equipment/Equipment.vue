<template>
	<div class="equipemnt-page">
		<el-table :data="tableData" border style="width:643px;text-align:center;">
	    	<el-table-column prop="storeName" label="所属门店" width="220"></el-table-column>
	    	<el-table-column prop="equipemnt" label="设备名" width="220"></el-table-column>
		    <el-table-column label="状态" width="200">
			    <template slot-scope="scope">
			    	<el-switch v-model="scope.row.status" inactive-color="#ff4949"></el-switch>
			    </template>
		    </el-table-column>
	    </el-table>
	</div>
</template>
<script>
	export default{
		name:'equipemnt',
		data(){
			return{
				tableData: [{
				  id:1,
		          storeName: '浙北店111',
		          equipemnt:'浙北店-门口',
		          status: true,
		        },{
				  id:2,
		          storeName: '浙北店222',
		          equipemnt:'浙北店-门口',
		          status: false,
		        },{
				  id:3,
		          storeName: '浙北店3333',
		          equipemnt:'浙北店-门口',
		          status: true,
		        }],
			}
		},
	}
</script>