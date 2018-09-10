import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
HighchartsNoData(Highcharts)

export default {

	name: 'guest-visited-info-chart',

	components: {
		VueHighcharts
	},

	props: {
		guestVisitedInfoData: {
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
					text: '新客/熟客占比'
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
		guestVisitedInfoData: function() {
			this.getData(this.$props.guestVisitedInfoData);
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
			let newOldCharts = this.$refs.newOldCharts;
			newOldCharts.delegateMethod('showLoading', 'Loading...');
			newOldCharts.removeSeries();
			setTimeout(() => {
				newOldCharts.hideLoading();
				newOldCharts.addSeries({
          innerSize: '80%',
					name: '人数',
					data: value
				});
			}, 100)
		},
	}

}
