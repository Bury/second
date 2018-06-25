<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" class="add-btn" @click="fnAdd()">新增</el-button>
		</div>
		<el-table :data="tableData" border style="width:741px;text-align:center;">
	    	<el-table-column prop="accountName" label="账号名" width="160"></el-table-column>
	    	<el-table-column prop="roleName" label="角色" width="100"></el-table-column>
	    	<el-table-column prop="userName" label="使用人" width="100"></el-table-column>
	    	<el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
		    <el-table-column label="操作" width="220">
			    <template slot-scope="scope">
			    	<el-button type="primary" icon="el-icon-edit" circle
			    		@click="fnEdit(scope.row)"></el-button>
			    	<el-button type="info" icon="el-icon-setting" circle
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
		name:'accoun-set',
		data(){
			return{
				tableData: [{
				  id:1,
		          accountName: '账号1111',
		          roleName:'主管',
		          userName:'十五',
		          createTime:'2018/05/30',
		        }],
			}
		},
		methods: {
			fnRemove(row){
				this.$confirm('确认删除该账号：'+row.accountName+' ？', '删除提示', {
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