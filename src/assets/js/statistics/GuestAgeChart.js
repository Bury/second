import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
HighchartsNoData(Highcharts)

export default {

	name: 'guest-age-chart',

	components: {
		VueHighcharts
	},

	props: {
		ageData: {
			type: Array,
		}
	},

	data() {
		return {
			Highcharts: Highcharts,
			options: {
				chart: {
					type: 'pie',
          height:260,
				},
				title: {
					text: '',
          float:true,
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
		ageData: function() {
			this.getData(this.$props.ageData);
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
			let guestAgeCharts = this.$refs.guestAgeCharts;
			guestAgeCharts.delegateMethod('showLoading', 'Loading...');
			guestAgeCharts.removeSeries();
			setTimeout(() => {
				guestAgeCharts.hideLoading();
				guestAgeCharts.addSeries({
					name: '人数',
					data: value
				});
			}, 100)
		},

	}

}
