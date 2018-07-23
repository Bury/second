<template>
	<div class="personal-page">
		<div class="top-box">
			<h3>个人资料</h3>
			<div class="editBtn">
				<el-button type="primary" plain @click="fnPasswordEdit()">修改密码</el-button>
			</div>
		</div>
		<el-form :model="userEditForm" :rules="rulesUserEdit" ref="userEditForm" label-width="75px" enabled>
		  	<el-form-item label="帐号：">
		    	{{username}}
		  	</el-form-item>
		  	<el-form-item label="岗位：">
		    	{{role_name}}
		  	</el-form-item>
		  	<el-form-item label="姓名：">
		    	<el-input v-model="userEditForm.name"></el-input>
		  	</el-form-item>
		  	<el-form-item label="手机：">
		    	<el-input v-model="userEditForm.phone"></el-input>
		  	</el-form-item>
	  		<div style="text-align:center;">
				<el-button type="primary" @click="fnSaveSubmitForm('userEditForm')">保 存</el-button>
			</div>
		</el-form>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" style="min-width:800px;">
		  <el-form :model="passwordEditForm" :rules="rulesPasswordEdit" ref="passwordEditForm" label-width="100px" class="demo-passwordEditForm">
		    <el-form-item label="当前密码：" prop="passwordOld">
		      <el-input type="password" v-model="passwordEditForm.passwordOld" ></el-input>
		    </el-form-item>
		    <el-form-item label="新的密码：" prop="passwordCurrent">
		      <el-input type="password" v-model="passwordEditForm.passwordCurrent" ></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码：" prop="passwordRepeat">
		      <el-input type="password" v-model="passwordEditForm.passwordRepeat" ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="fnCancel">取 消</el-button>
		    <el-button type="primary" @click="fnPasswordEditSubmitForm('passwordEditForm')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script src="@/assets/js/user/UserCurrentDetail.js"></script>

<style lang="scss" scoped src="@/assets/css/user/UserCurrentDetail.scss">