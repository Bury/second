import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
HighchartsNoData(Highcharts)

export default {

	name: 'guest-chart',

	components: {
		VueHighcharts
	},

	props: {
		chartClass: String,
		guestData: {
			type: Object,
		}
	},

	data() {

		return {
			Highcharts:Highcharts,
			options: {
				chart: {
					type: 'line' //line/column
				},
				title: {
					text: '客流量占比'
				},
				xAxis: {
					categories: []
				},
				yAxis: {
					title: {
						text: '人数'
					}					

				},
				credits: {
					text: '',
				},
				plotOptions: {
					line: {
						dataLabels: {
							// 开启数据标签
							enabled: true
						},
						// 关闭鼠标跟踪，对应的提示框、点击事件会失效
						enableMouseTracking: true
					}
				},
				series: []
			}
		}
	},

	watch: {
		guestData: function() {			
			this.getData(this.$props.guestData);
		},
		chartClass: function() {
			this.getData(this.$props.guestData)
		}

	},
	created:function(){		
		Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
		});
	},

	methods: {
		getData(value) {
			let isdata = value.sum.every(function(val){return val == 0})
			
			let guestCharts = this.$refs.guestCharts;
			guestCharts.delegateMethod('showLoading', 'Loading...');
			if(guestCharts.getChart().series[0] != undefined) {
				guestCharts.getChart().series[0].remove(true); //删除单个
			}  
			setTimeout(() => {
				guestCharts.hideLoading();
				
				this.$data.options.chart.type = this.$props.chartClass;
				guestCharts.addSeries({
					name: ' 客流量统计',
					data: (isdata && [] ) ||  value.sum
				});
				guestCharts.getChart().xAxis[0].setCategories(value.time);
				
				guestCharts.getChart().series[0].update({
					type: this.$props.chartClass
				})
			}, 100)
		},
	}

}