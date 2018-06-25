<template>
	<div class="role-set-page">
		<div class="top-box">
			<el-button type="primary" class="add-btn" @click="fnAdd()">新增</el-button>
		</div>
		<el-table :data="tableData" border style="width:621px;text-align:center;">
	    	<el-table-column prop="roleName" label="角色名" width="320"></el-table-column>
		    <el-table-column label="操作" width="300">
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
		name:'role-set',
		data(){
			return {
				tableData: [{
				  id:1,
		          roleName: '主管',
		        },{
				  id:2,
		          roleName: '技术员1',
		        },{
				  id:3,
		          roleName: '技术员2',
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
				this.$prompt('标签类名', '编辑提示', {
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
			fnAdd(){
				console.log(row);
				this.$prompt('标签类名', '编辑提示', {
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
			fnGoPage(row){
				this.$router.push({
					name: 'LabelDetail',
					query: {
	                    LabelId: row.id
	                }
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.role-set-page{
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