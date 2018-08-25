<template>
  <div class="chartWrap">
    <vue-highcharts :highcharts="Highcharts" :options="options" ref="guestCharts"></vue-highcharts>
    <el-radio-group v-model="chartOptionsType" @change="customerType" class="el-radio-select">
			<div>
				<el-radio :label="0">默认</el-radio>
			</div>
			<div>
				<el-radio :label="1">新熟客</el-radio>
			</div>
			<div>
				<el-radio :label="2">年龄段</el-radio>
			</div>
			<div>
				<el-radio :label="3">性别</el-radio>
			</div>
		</el-radio-group>
  </div>
</template>

<script src="@/assets/js/statistics/GuestChart.js"></script>

<style lang="scss" scoped>
	.chartWrap {
		position: relative;
	}

	.el-radio-select {
		position: absolute;
		top: 100px;
		right: -60px;
		z-index: 2;
		div {
			margin-bottom: 15px;
		}
	}
</style>
