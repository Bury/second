import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
import statisticsApi from '@/api/statistics'
HighchartsNoData(Highcharts)

export default {

	name: 'guest-chart',

	components: {
		VueHighcharts
	},

	props: {
		changFlag: {
			type: Boolean
		},
		guestData: {
			type: Object,
		}
	},

	data() {

		return {
			Highcharts: Highcharts,
			chartOptionsType: 0,
			options: {
				chart: {
					type: 'line',
          width:600,
          height:260,
				},
				title: {
					text: '客流趋势图'
				},
				xAxis: {
					categories: []
				},
				yAxis: {
					allowDecimals: false,
					title: {
						text: '人数'
					}
				},
				credits: {
					text: '',
				},
				colors: [
					'#7CB5EC',
					'#FFC200',
					'#F15780',
					'#8085E9',
					'#90ED7D',
					'#909399'
				],
				plotOptions: {
          series:{
            dataLabels:{
              border: 1,
              align: 'center',
              enabled: true,
              rotation: -30,
              x: 2,
              y: -10
            }
          },
					line: {
						// 关闭鼠标跟踪，对应的提示框、点击事件会失效
						enableMouseTracking: true
					}
				},
				series: []
			}
		}
	},

	watch: {
		changFlag: function() {
			this.postType();
		},
	},
	created: function() {
		Highcharts.setOptions({
			lang: {
				thousandsSep: ',',
				noData: '暂无数据'
			}
		});
		this.getCustomer();
	},

	methods: {

		postType() {
			if(this.$data.chartOptionsType === 0) {
				this.getCustomer();
			} else if(this.$data.chartOptionsType === 1) {
				this.statisticsType("face")
			} else if(this.$data.chartOptionsType === 2) {
				this.statisticsType("age")
			} else if(this.$data.chartOptionsType === 3) {
				this.statisticsType("gender")
			}
		},
		//统计类型切换
		customerType() {
			this.postType();
		},

		//客流量分类
		statisticsType(val) {
			let qs = require('querystring');
			let list = {
				feature: val,
				begin_time: this.$props.guestData.begin_time,
				end_time: this.$props.guestData.end_time
			};
			statisticsApi.getGraphFeature(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					if(res.data.data.length > 0) {
						let listData = res.data.data,
							newData = [];
						for(let i = 0; i < listData.length; i++) {
							newData.push({
								name: listData[i].value,
								data: listData[i].sum,
								time: listData[i].time,
							})
						};
						this.getData(newData);
					} else {
						this.getData([]);
					}

				}

			})
		},

		//客流量默认
		getCustomer() {
			let qs = require('querystring');
			statisticsApi.getCustomer(qs.stringify(this.$props.guestData)).then((res) => {
				if(res.data.errno === 0) {
					let listData = res.data.data,
						newData = [];
					newData.push({
						name: '总客流',
						data: listData.sum,
						time: listData.time,
					})
					this.getData(newData);
				} else {
					this.getData([])
				}
			})
		},

		getData(value) {
			let dataSum = {
					yAxis: {
						tickPositioner: function() {
							let positions = [],
								increment;
							increment = this.dataMax > 10 ? Math.ceil(this.dataMax / 4) : 2;
							for(let i = 0; i < 6; i++) {
								positions.push(increment * i)
							}
							return positions;
						}
					}
				};
			let guestCharts = this.$refs.guestCharts;
			guestCharts.delegateMethod('showLoading', 'Loading...');
			guestCharts.removeSeries();
			setTimeout(() => {
				guestCharts.hideLoading();
				guestCharts.getChart().xAxis[0].setCategories(value[0].time);
				for(let j = 0; j < value.length; j++) {
					guestCharts.addSeries(value[j]);
				};
				guestCharts.getChart().update(dataSum);

			}, 0)
		},
	}

}
