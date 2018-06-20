<template>
	<div class="personal-page">
		<div class="top-box">
			<h3>用户中心</h3>
			<div class="editBtn">
				<el-button type="primary" plain @click="fnChangePWD()">修改密码</el-button>
			</div>
		</div>
		<el-form ref="form" :model="userForm" label-width="75px" disabled>
		  	<el-form-item label="用户名：">
		    	<el-input v-model="userForm.userName"></el-input>
		  	</el-form-item>
		  	<el-form-item label="联系人：">
		    	<el-input v-model="userForm.contacts"></el-input>
		  	</el-form-item>
		</el-form>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" style="min-width:800px;">
		  <el-form :model="form">
		    <el-form-item label="原密码：" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="新密码：" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码：" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
  export default {
  	name:'personal',
    data() {
      return {
        userForm: {
          userName: 'admin',
          contacts:'aaa'
        },
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '90px'
      }
    },
    methods: {
      fnChangePWD(){
      	this.$data.dialogFormVisible = true;
      }

    }
  }
</script>
<style lang="scss" scoped>
	.personal-page{
		margin:80px auto 0;
		padding:40px;
		width:500px;
		border:1px solid #d2d2d2;
		.top-box{
			position: relative;
			height: 100px;
			.editBtn{
				position:absolute;
				top:0;
				right:0;
			}
		}
	}

</style>