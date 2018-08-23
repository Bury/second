<template>
	<div class="store-set-page">
		<div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="fnAdds()">新增</el-button>
		</div>
    <table width="99%" class="table">
      <thead>
      <tr height="40">
        <th class="col-md-1 text-center">序号</th>
        <th class="col-md-1 text-center">账号</th>
        <th class="col-md-1 text-center">岗位</th>
        <th class="col-md-1 text-center">姓名</th>
        <th class="col-md-1 text-center">手机</th>
        <th class="col-md-1 text-center">状态</th>
        <th class="col-md-2 text-center">创建时间</th>
        <th class="col-md-2 text-center">操作</th>
      </tr>
      </thead>
      <tbody style="text-align: center">
      <tr v-for="(item,index) in tableData" :key="index" height="40">
        <td>{{item.id}}</td>
        <td>{{item.username}}</td>
        <td>{{item.storeRole.name == null ? '--' :item.storeRole.name }}</td>
        <td>{{item.truename}}</td>
        <td>{{item.phone}}</td>
        <td>
          <span @click=fnStatusUpdate(item.id,item.status)>{{item.status == 1 ? '启用' : '禁用'}}</span>
        </td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button type="primary" plain icon="el-icon-view" circle size="small"
                     @click="fnResetPassword(item)" v-bind:disabled="item.status==0"></el-button>
          <el-button type="warning" plain icon="el-icon-edit" circle size="small"
                     @click="fnEdit(item)"></el-button>
          <el-button type="danger" plain icon="el-icon-delete" circle size="small"
                     @click="fnRemove(item)"></el-button>
        </td>
      </tr>
      </tbody>
    </table>

	    <!-- 分页 -->
	    <div v-if="tableData.length > 0" style="margin:0 auto;width:961px;">
	    	<el-pagination
				background
	            class="pagination"
	            layout="prev, pager, next"
	            small
	            @current-change="handleCurrentChange"
	            :current-page="pagination.currentPage"
	            :page-size="requestParameters.page_size"
	            :total="pagination.totalCount">
	        </el-pagination>
	    </div>

	    <!-- 编辑 -->
	    <el-dialog title="编辑账号" center :visible.sync="editFormVisible" :before-close="dialogClose">
		  <el-form :model="editFormData" :rules="editRules" ref="editFormData" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="岗位：" prop="role_id">
			 	<el-select v-model="editFormData.role_id" placeholder="岗位">
			      <el-option v-for="(item, idx) in allRoles" :key="idx" :label="item.name" :value="item.id"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="truename">
			    <el-input v-model="editFormData.truename"></el-input>
			  </el-form-item>
			  <el-form-item label="手机：" prop="phone">
			    <el-input v-model="editFormData.phone"></el-input>
			  </el-form-item>
				<el-form-item label="状态">
			    <el-switch v-model="editFormData.status" on-color="#00A854" off-color="#F04134"></el-switch>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editCancel">取 消</el-button>
		    <el-button type="primary" @click="editSubmit('editFormData')">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 重置密码 -->
		<el-dialog title="重置密码" center :visible.sync="resetPasswordFormVisible" :before-close="resetClose">
		  <el-form :model="resetPasswordFormData" :rules="resetPasswordRules" ref="resetPasswordFormData" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="新的密码：" prop="password">
			    <el-input type="password" v-model="resetPasswordFormData.password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码：" prop="repassword">
			    <el-input type="password" v-model="resetPasswordFormData.repassword"></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetPasswordCancel">取 消</el-button>
		    <el-button type="primary" @click="fnResetPasswordSubmit('resetPasswordFormData')" v-bind:disabled="isClick==1">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 添加 -->
		<el-dialog title="新建账号" center :visible.sync="addFormVisible" :fullscreen="avatarFormVisible" :before-close="closeChange" >
		  <el-form :model="addFormData" :rules="addRules" ref="addFormData" label-width="100px" class="demo-ruleForm" v-if="!avatarFormVisible" >
			  <el-form-item label="岗位：" prop="role_id">
			 	<el-select v-model="addFormData.role_id" placeholder="岗位">
			      <el-option v-for="(item, idx) in allRoles" :key="idx" :label="item.name" :value="item.id"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="姓名：" prop="truename">
			    <el-input v-model="addFormData.truename"></el-input>
			  </el-form-item>
			  <el-form-item label="手机：" prop="phone">
			    <el-input v-model="addFormData.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="帐号：" prop="username">
			    <el-input v-model="addFormData.username"></el-input>
			  </el-form-item>
			  <el-form-item label="密码：" prop="password">
			    <el-input v-model="addFormData.password" type='password'></el-input>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" v-if="!avatarFormVisible">
		    <el-button @click="addCancel">取 消</el-button>
		    <el-button type="primary" @click="fnAddsSubmit('addFormData')">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>

<script src="@/assets/js/user/User.js"></script>

<style lang="scss" scoped src="@/assets/css/user/User.scss">
