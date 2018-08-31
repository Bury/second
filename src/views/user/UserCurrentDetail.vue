<template>
	<div class="personal-page">
		<div class="top-box">
			<h3>个人资料</h3>
			<div class="editBtn">
				<el-button type="primary" plain @click="fnSetting()">个人设置</el-button>
				<el-button type="primary" plain @click="fnChangeTel()">修改手机</el-button>
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
					{{userEditForm.name}}
		  	</el-form-item>
		  	<el-form-item label="手机：">
					{{userEditForm.phone || "暂无手机号"}}
		  	</el-form-item>
	  		<div style="text-align:center;">
				<!-- <el-button type="primary" @click="fnSaveSubmitForm('userEditForm')">保 存</el-button> -->
			</div>
		</el-form>

		<!-- 修改密码 -->
		<el-dialog title="修改密码" center :visible.sync="dialogFormVisible" style="min-width:800px;" :before-close="dialogClose">
		  <el-form :model="passwordEditForm" :rules="rulesPasswordEdit" ref="passwordEditForm" label-width="100px" class="demo-passwordEditForm">
		    <el-form-item label="旧密码：" prop="passwordOld">
		      <el-input type="password" v-model="passwordEditForm.passwordOld" :class="{'postError': errors ===1}"></el-input>
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
		<!--修改手机号 -->
		 <el-dialog title="修改手机号" center :visible.sync="dialogFormVisibleTel" :before-close="dialogCloseTel" style="min-width:800px;">
      <el-form :model="telForm" :rules="rules" ref="telForm" label-width="100px" class="demo-ruleForm">
        <el-row>
        <el-form-item label="新手机号：" prop="phone">
         <el-col :span="16"> <el-input type="tel" v-model="telForm.phone"></el-input></el-col>
          <el-button type="primary" plain @click="code"  :class="{disabled: !this.canClick}">{{getClickName}}</el-button>
        </el-form-item>
        </el-row>
        <el-form-item label="验证码：" prop="code">
         <el-col :span="16"> <el-input type="text" v-model="telForm.code" ></el-input></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTel">取 消</el-button>
        <el-button type="primary" @click="submitFromTel('telForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 个人设置 -->
    <el-dialog title="个人设置" center :visible.sync="settingVisible" style="min-width:800px;" :before-close="dialogCloseSetting">
      <el-form class="demo-passwordEditForm">
        <el-form-item label="报表默认时间：">
          <el-select v-model="unit" placeholder="请选择">
            <el-option label="按天" value="d"></el-option>
            <el-option label="按周" value="w"></el-option>
            <el-option label="按月" value="m"></el-option>
            <el-option label="按年" value="y"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fnSettingCancel">取 消</el-button>
        <el-button type="primary" @click="fnSettingSubmit()">确 定</el-button>
      </div>
    </el-dialog>

	</div>
</template>

<script src="@/assets/js/user/UserCurrentDetail.js"></script>

<style lang="scss" scoped src="@/assets/css/user/UserCurrentDetail.scss">
