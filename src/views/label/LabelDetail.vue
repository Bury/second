<template>
	<div class="label-detail-page">
		<div class="top-box">
			<el-button type="primary" class="add-btn" @click="fnAdd()">新增</el-button>
			
		</div>
		<el-table :data="tableData" border style="width:623px;text-align:center;">
	    	<el-table-column prop="name" label="标签名" width="220"></el-table-column>
		    <el-table-column label="操作" width="400">
			    <template slot-scope="scope">
			    	<el-button type="primary" icon="el-icon-edit" circle
			    		@click="fnEdit(scope.row)"></el-button>
			    	<el-button type="danger" icon="el-icon-delete" circle
			    		@click="fnRemove(scope.row)"></el-button>
			    </template>
		    </el-table-column>
	    </el-table>

	</div>
</template>
<script>
	export default{
		name:'label-detail',
		data(){
			return {
				tableData: [{
				  id:1,
		          name: '翡翠',
		        }],
		       
			}
		},
		methods: {
			fnRemove(row){
				this.$confirm('确认删除标签：'+row.name+' ？', '删除提示', {
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
				console.log(row);
				this.$prompt('标签名', '编辑提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputValue:row.name,
		          inputPattern: /^\s*$/,
		          inputErrorMessage: '标签类名不能为空'
		        }).then(({ value }) => {
		        	//接口调试
		          this.$message({
		            type: 'success',
		            message: '修改成功'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消输入'
		          });       
		        });
			},
			fnAdd(row){
				console.log(row);
				this.$prompt('标签名', '编辑提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputPattern: /^\s*$/,
		          inputErrorMessage: '标签类名不能为空'
		        }).then(({ value }) => {
		        	//接口调试
		          this.$message({
		            type: 'success',
		            message: '修改成功'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消输入'
		          });       
		        });
			},
			
		}
	}
</script>
<style lang="scss" scoped>
	.label-detail-page{
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