<template>
	<div style="background: #fff;">
		<div class="top">
			<div class="top-text">客流量</div>
			<div class="top-num">{{goStoreNum.passenger_flow}}</div>
		</div>
		<div class="bottom">
			<div style="width: 30%;">
				<div class="bottom-num">{{goStoreNum.sales_singular}}</div>
				<div class="bottom-text">订单人数</div>
			</div>
			<div style="border-left: 1px solid #ededed;border-right: 1px solid #ededed;width: 40%;">
				<div class="bottom-num">{{goStoreNum.sales_volume | numbersFilter}}</div>
				<div class="bottom-text">销售额</div>
			</div>
			<div style="width: 30%;">
				<div class="bottom-num">{{goStoreNum.turnover_rate}}</div>
				<div class="bottom-text">成交率</div>
			</div>
		</div>
	</div>
</template>

<script>
	import statisticsApi from '@/api/statistics'
	export default {
		name: "totalGuest",
		data() {
			return {
				goStoreNum: {
					passenger_flow:'0',
					sales_volume:'0',
					sales_singular:'0',
					turnover_rate:''
				}
			}
		},
		props: {
			changFlag: {
				type: Boolean
			},
			totalData: {
				type: Object,
			}
		},
		watch:{
			changFlag:function(){
			 this.storeStatistics();
			}
		},
		created: function() {
              this.storeStatistics();
		},
		methods: {
			storeStatistics() {
				let timeData = {
					time_start: this.$props.totalData.begin_time,
					time_end: this.$props.totalData.end_time,
				};
				let qs = require('querystring');
				statisticsApi.storeStatistics(qs.stringify(timeData)).then((res) => {
					if(res.data.errno === 0) {
						this.$data.goStoreNum = res.data.data
					}

				})
			},
		}
	}
</script>

<style scoped>
	.top {
		margin: 0 auto;
		text-align: center;
		overflow: hidden;
	}

	.top-text {
		margin: 40px auto 24px;
		font-size: 17px;
		color: #999999;
	}

	.top-num {
		padding-bottom: 18px;
		color: #ff6953;
		font-size: 48px;
		width: 90%;
		line-height: 100px;
		border-bottom: 1px solid #ededed;
    font-family: numFont;
	}

	.bottom {
		text-align: center;
		display: flex;
		overflow: hidden;
		margin-top: 50px;
    font-family: numFont;
	}

	/*.bottom>div {*/
		/*width: 33.33%;*/
	/*}*/

	.bottom-num {
		color: #2a2a2a;
		font-size:24px;
	}

	.bottom-text {
		color: #999;
		font-size: 14px;
	}
</style>
