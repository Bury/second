<template>
	<div class="user-info-box">
        <div class="user-info-detail" v-if="!infoEdit">
            <ul class="detail-left">
                <li class="user-name">姓名： {{guestInfo.name}}</li>
                <li class="user-phone">手机： {{guestInfo.phone}}</li>
                <li class="user-sex">性别： {{guestInfo.gender == 1 ? '男' : '女'}}</li>
                <li class="user-age">年龄： {{guestInfo.age}}</li>
                <li class="user-type">新客/熟客：{{guestInfo.is_new == 1 ? '新客' : '熟客'}}</li>
                <li class="user-type">未购/已购：{{guestInfo.is_bought_to_text}}</li>
            </ul>
            <div class="img-box">
                <div class="img-wrap">
                    <img :src="guestInfo.avatar" alt="人脸图像">
                </div>
                <div class="img-id">人脸编号：{{guestInfo.customer_id}}</div>
            </div>
            <div class="user-tags">
                标签：
                <el-tag v-for="(item,key) in guestInfo.tag" :key="key" style="margin-right:10px;">{{guestInfo.tag[key].name}}</el-tag>
            </div>
            <p class="user-remarks">备注： {{guestInfo.remark === '' ? '暂无' : guestInfo.remark}}</p>
            <el-button type="primary" plain size="small" class="edit-btn" @click="editGuestInfo()">编辑</el-button>
        </div>
      <!--编辑-->
        <div class="user-info-edit" v-if="infoEdit">
            <el-form :model="editGuestInfoData" :rules="GuestInfoRules" ref="editGuestInfoData" label-width="100px" class="demo-editGuestInfoData" size="mini" style="float:left;margin-right:50px;width:400px;">
                <el-form-item label="姓名：">
                    <el-input v-model="editGuestInfoData.name"></el-input>
                </el-form-item>
                <el-form-item label="手机："  prop="phone">
                    <el-input v-model="editGuestInfoData.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="gender">
                    <el-radio-group v-model="editGuestInfoData.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄：" prop="age">
                    <el-input v-model="editGuestInfoData.age"></el-input>
                </el-form-item>
                <el-form-item label="新客/熟客：">
                    {{editGuestInfoData.is_new_to_text}}
                </el-form-item>
                <el-form-item label="未购/已购：">
                 {{editGuestInfoData.vip_level == 0 ? '未购' : '已购'}}
                    <!--<el-radio-group v-model="editGuestInfoData.vip_level" >-->
                      <!--&lt;!&ndash;<el-radio :label="0">已购</el-radio>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-radio :label="1">已购</el-radio>&ndash;&gt;-->
                <!--</el-radio-group>-->
                </el-form-item>
                <el-form-item label="标签：">
                    <div v-for="label in labels" :key="label.id" class="labels">
                        <div>—— {{label.name}} ——</div>
                        <el-checkbox-group v-model="ids" size="small">
                            <el-checkbox v-for="children in label.children" :key="children.id" :label="children.id" border>{{children.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input type="textarea" v-model="editGuestInfoData.remark" prop="remark"
                              v-on:input="remark(editGuestInfoData.remark)"></el-input>
                </el-form-item>
            </el-form>
            <div class="img-box">
            <div class="img-wrap">
                <img :src="editGuestInfoData.avatar" alt="人脸图像">
            </div>
            <div class="img-id">人脸ID：{{editGuestInfoData.id}}</div>
            </div>
            <el-row class="guestInfoEdit-wrap">
                <el-button plain size="small" @click="guestInfoCancel">取消</el-button>
                <el-button type="primary" plain size="small" @click="guestInfoEditSubmit('editGuestInfoData')">确定</el-button>
            </el-row>
        </div>
	</div>
</template>

<script src="@/assets/js/guest/GuestInfo.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/GuestInfo.scss">
