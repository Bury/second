import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
HighchartsNoData(Highcharts)

export default {

	name: 'guest-bought-info-chart',

	components: {
		VueHighcharts
	},

	props: {
		guestBoughtInfoData: {
			type: Array,
		}
	},

	data() {
		return {
			Highcharts: Highcharts,
			options: {
				chart: {
					type: 'pie'
				},
				title: {
					text: '未购/已购客户占比'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.1f}%'
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
				series: []
			}
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

	watch: {
		guestBoughtInfoData: function() {
			this.getData(this.$props.guestBoughtInfoData);
		}
	},

	methods: {
		getData(value) {
			let guestBoughtInfoCharts = this.$refs.guestBoughtInfoCharts;
			guestBoughtInfoCharts.delegateMethod('showLoading', 'Loading...');
			guestBoughtInfoCharts.removeSeries();
			setTimeout(() => {
				guestBoughtInfoCharts.hideLoading();
				guestBoughtInfoCharts.addSeries({
          // innerSize: '80%',
					name: '人数',
					data: value
				});
			}, 100)
		},

	}

}
