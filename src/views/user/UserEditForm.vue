<template>

    <el-dialog title="编辑" :visible.sync="editFormVisible">
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
            <el-form-item label="帐号：" prop="username">
            <el-input v-model="editFormData.username"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="editCancel">取 消</el-button>
        <el-button type="primary" @click="editSubmit('editFormData')">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script src="@/assets/js/user/UserEditForm.js"></script>