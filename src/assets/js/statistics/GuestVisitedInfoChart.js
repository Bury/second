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
			Highcharts:Highcharts,
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
				colors: [
					'#FFC200',
					'#57B4F7',
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
			let newOldCharts = this.$refs.newOldCharts;
			newOldCharts.delegateMethod('showLoading', 'Loading...');
			newOldCharts.removeSeries();
			setTimeout(() => {
				newOldCharts.hideLoading();
				newOldCharts.addSeries({
					name: '人数',
					data: value
				});								
			}, 100)
		},
	}

}