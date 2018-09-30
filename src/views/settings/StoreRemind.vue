<template>
  <div style="background: #fff;padding-bottom: 6rem;min-height: 600px;">
    <div class="left"></div>
	  <div class="remind-set-page">
        <h3 class="top-box">来客提醒配置</h3>
        <div class="all-box">
            <el-checkbox style="margin-left: 60px;"
              :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange">全选</el-checkbox>
        </div>
		<div class="type-list">
            <el-checkbox-group  style="margin-left: 92px;" v-model="checkedType" @change="fnChangeType">
                <el-checkbox v-for="(type,key) in types" :label="type" :key="key">{{typeVal[key]}}</el-checkbox>
            </el-checkbox-group>
        </div>
		<div class="saveBtn">
            <el-button plain class="save-btn" @click="fnSetRemind">保存</el-button>
        </div>
	</div>
    <div class="right"></div>
  </div>
</template>

<script src="@/assets/js/settings/StoreRemind.js"></script>

<style lang="scss" scoped src="@/assets/css/settings/StoreRemind.scss">
