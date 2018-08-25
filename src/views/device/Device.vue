<template>
    <div class="device-list-page">
      <template>
        <table width="99%" class="table">
          <thead>
          <tr height="40">
            <th class="col-md-1 text-center">序号</th>
            <th class="col-md-2 text-center">编号</th>
            <th class="col-md-1 text-center">类型</th>
            <th class="col-md-2 text-center">位置</th>
            <th class="col-md-1 text-center">状态</th>
            <th class="col-md-2 text-center">操作</th>
          </tr>
          </thead>
          <tbody style="text-align: center">
          <tr v-for="(item,index) in tableData" :key="index" height="40">
            <td>{{item.id}}</td>
            <td>{{item.device_id}}</td>
            <td>
              <span v-if="item.locate == null">--</span>
              <span v-else-if="item.locate == 'other'">进店</span>
              <span v-else-if="item.locate == 'cashier'">收银台</span>
            </td>
            <td>
              {{item.locate_desc != null ? item.locate_desc : '--'}}
            </td>
            <td>{{item.status == 0 ? '断开' : '正常'}}</td>
            <td>
              <el-button @click="fnEdit(item)" type="text" size="small">编辑</el-button>
            </td>
          </tr>
          </tbody>
        </table>

				<!-- 编辑 -->
				<el-dialog title="编辑" center :visible.sync="editFormVisible" :before-close="dialogClose">
				 	<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm" style="margin-bottom:50px;">
					    <el-form-item label="类型：">
					    	<el-select v-model="editForm.locate" placeholder="请选择" ref="locate_select">
						        <el-option label="收银" value="cashier"></el-option>
						        <el-option label="进店" value="other"></el-option>
						    </el-select>
					    </el-form-item>
					    <el-form-item label="位置：" prop="locate_desc">
					    	<el-input v-model="editForm.locate_desc" :disabled="noText"></el-input>
					  	</el-form-item>
				    </el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="editCancel">取 消</el-button>
				    <el-button type="primary" @click="editSubmit('editForm')">确 定</el-button>
				  </div>
				</el-dialog>
		</template>
    </div>
</template>

<script src="@/assets/js/device/Device.js"></script>

<style lang="scss"  src="@/assets/css/device/Device.scss">
