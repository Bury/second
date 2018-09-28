import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
HighchartsNoData(Highcharts)

export default {

	name: 'vip-chart',
	components: {
		VueHighcharts
	},

	props: {
		guestFromData: {
			type: Array,
		}
	},

	data() {
		return {
			Highcharts: Highcharts,
			options: {
				chart: {
					type: 'pie',
                    height:'320',
				},
				title: {
					text: '',
          float:true
				},
				credits: {
					text: '',
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.1f}%'
				},
				colors: [
					'#7CB5EC',
					'#FFC200',
					'#F15780',
					'#8085E9',
					'#90ED7D',
					'#909399'
				],
				series: []
			}
		}
	},

	watch: {
		guestFromData: function() {
			this.getData(this.$props.guestFromData);
		}
	},
	created: function() {
		Highcharts.setOptions({
			lang: {
				thousandsSep: ',',
				noData: '暂无数据'
			}
		});
	},
	methods: {
		getData(value) {
			let guestFromCharts = this.$refs.guestFromCharts;
			guestFromCharts.delegateMethod('showLoading', 'Loading...');
			guestFromCharts.removeSeries();
			setTimeout(() => {
				guestFromCharts.hideLoading();
				guestFromCharts.addSeries({
					name: '数量',
					data: value
				});

			}, 100)
		},

	}

}
