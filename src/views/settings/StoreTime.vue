<template>
  <div style="background: #fff;padding-bottom: 6rem;">
    <div class="left"></div>
	  <div class="open-time-set-page">
		<h3 class="top-box">营业时间设置</h3>
		<div class="time-box">
			<el-time-select placeholder="开始时间" v-model="startTime"
		    :picker-options="{
		      start: '00:00',
		      step: '00:05',
		      end: '23:59',
		      maxTime: endTime}">
	  		</el-time-select>
	  		<span style="padding:0 10px;">至</span>
			<el-time-select placeholder="结束时间" v-model="endTime"
			    :picker-options="{
			      start: '00:00',
			      step: '00:15',
			      end: '23:59',
			      minTime: startTime}">
			</el-time-select>
		</div>
		<div class="saveBtn">
			<el-button type="primary" class="save-btn" @click="fnSetTime">保存</el-button>
		</div>
	</div>
    <div class="right"></div>
  </div>
</template>

<script src="@/assets/js/settings/StoreTime.js"></script>

<style lang="scss" scoped src="@/assets/css/settings/StoreTime.scss">
