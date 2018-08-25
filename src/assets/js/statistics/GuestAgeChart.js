import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
HighchartsNoData(Highcharts)

export default{

    name:'guest-age-chart',

    components: {
        VueHighcharts
    },

    props:{
      ageData:{
        type:Array,
      }
    },

    data(){
      return{
      	Highcharts:Highcharts,
        options: {
            chart: {
                type: 'pie'
            },
            title: {
                text: '年龄段占比'
            },
            credits: {
                text: '',
            },
            tooltip: {
				pointFormat:'{series.name}: <b>{point.y}</b><br/>占比:{point.percentage:.1f}%'
			},
            colors:[
                '#66E2B0',
                '#FFC200',
                '#57B4F7',
                '#F86B59',
                '#5FD9F0'
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
    created:function(){		
		Highcharts.setOptions({
				lang: {
					thousandsSep: ',',
					noData: '暂无数据'
				}
		});
	},
    
    methods: {
      getData(value){
        let guestAgeCharts = this.$refs.guestAgeCharts;
        guestAgeCharts.delegateMethod('showLoading', 'Loading...');
        guestAgeCharts.removeSeries();
        setTimeout(() => {
        	  guestAgeCharts.hideLoading();
              guestAgeCharts.addSeries({name:'人数',data: value});              
          }, 100)
      },
      
    }
    
}