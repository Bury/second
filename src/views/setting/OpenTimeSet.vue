<template>
	<div class="open-time-set-page">
		<h3 class="top-box">营业时间设置</h3>
		<div class="time-box">
			<el-time-select placeholder="起始时间" v-model="startTime"
		    :picker-options="{
		      start: '08:30',
		      step: '00:15',
		      end: '18:30'}">
	  		</el-time-select>
	  		<span style="padding:0 10px;">至</span> 
			<el-time-select placeholder="结束时间" v-model="endTime"
			    :picker-options="{
			      start: '08:30',
			      step: '00:15',
			      end: '18:30',
			      minTime: startTime}">
			</el-time-select>
		</div>
		<div class="saveBtn">
			<el-button type="primary" class="save-btn">保存</el-button>
		</div>
	</div>
</template>

<script>
  export default {
  	name:'open-time-set',
    data() {
      return {
        startTime: '',
        endTime: ''
      };
    }
  }
</script>
<style lang="scss" scoped>
	.open-time-set-page{
		margin:80px auto 0;
		padding:40px;
		width: 500px;
		border:1px solid #d2d2d2;
		.top-box{
			height: 60px;
		}
		.time-box{
			margin:0 auto 100px;;
		}
		.saveBtn{
			position:relative;
			width: 100%;
			height: 40px;
			.save-btn{
				position: absolute;
				bottom:0;
				right:20px;
			}
		}
	}
</style>