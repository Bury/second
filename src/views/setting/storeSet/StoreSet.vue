<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" class="add-btn" @click="fnAdd()">新增</el-button>
		</div>
		<el-table :data="tableData" border style="width:701px;text-align:center;">
	    	<el-table-column prop="storeName" label="门店名" width="220"></el-table-column>
	    	<el-table-column prop="shopowner" label="门店负责人" width="140"></el-table-column>
	    	<el-table-column prop="phone" label="联系方式" width="120"></el-table-column>
		    <el-table-column label="操作" width="220">
			    <template slot-scope="scope">
			    	<el-button type="primary" icon="el-icon-edit" circle
			    		@click="fnEdit(scope.row)"></el-button>
			    	<el-button type="info" icon="el-icon-message" circle
			    		@click="fnGoPage(scope.row)"></el-button>
			    	<el-button type="danger" icon="el-icon-delete" circle
			    		@click="fnRemove(scope.row)"></el-button>
			    </template>
		    </el-table-column>
	    </el-table>
	</div>
</template>
<script>
	export default{
		name:'store-set',
		data(){
			return{
				tableData: [{
				  id:1,
		          storeName: '浙北店111',
		          shopowner:'aaa',
		          phone:'15822221111'
		        }],
			}
		},
		methods: {
			fnRemove(row){
				this.$confirm('确认删除该门店：'+row.storeName+' ？', '删除提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			fnEdit(row){
				
			},
			fnAdd(){
				
			},
			fnGoPage(row){
				this.$router.push({
					name: 'AccountSet',
					query: {
	                    StoreId: row.id
	                }
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.store-set-page{
		.top-box{
			position:relative;
			margin-bottom:40px;
			height: 44px;
			border-bottom:1px solid #d2d2d2;
			.add-btn{
				position: absolute;
				top:0;
				right:20px;

			}
		}
	}
</style>