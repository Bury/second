<template>
  <div class="chartWrap">
    <div class="chartW">
      <vue-highcharts :highcharts="Highcharts" :options="options" ref="guestCharts"></vue-highcharts>
    </div>

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
    z-index: 1;
    margin: 0;
	}
	.chartW{
		margin-left: 0;
		width: calc(100% - 120px);
	}

	.el-radio-select {
		position: absolute;
		top: 70px;
		right: 30px;
		z-index: 2;
		div {
			margin-bottom: 15px;
		}
	}

</style>
