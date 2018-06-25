<template>
	<div class="store-box">
		<div class="top-box">
			<el-button>按设备</el-button>
			<el-button type="primary">按门店</el-button>
		</div>
		<el-table :data="tableData" border style="width:521px;text-align:center;">
	    	<el-table-column prop="storeName" label="门店名" width="200"></el-table-column>
	    	<el-table-column prop="deviceNum" label="设备数" width="160"></el-table-column>
		    <el-table-column label="操作" width="160">
			    <template slot-scope="scope">
			    	<el-button @click="fnGoPage(scope.row)" type="text" size="small">详情</el-button>
			    </template>
		    </el-table-column>
	    </el-table>
	</div>
</template>
<script>
	export default{
		name:'store',
		data(){
			return{
				tableData:[{
					Id:111,
					storeName:'A门店',
					deviceNum:235
				},{
					Id:222,
					storeName:'B门店',
					deviceNum:205
				}]
			}
		},
		methods:{
			fnGoPage(row){
				this.$router.push({
					name: 'StoreDetail',
					query: {
	                    storeId: row.Id
	                }
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.store-box{
		.top-box{
			position:relative;
			margin-bottom:40px;
			height: 44px;
			border-bottom:1px solid #d2d2d2;
			
		}
	}
</style>