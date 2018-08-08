import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
HighchartsNoData(Highcharts)
export default{
    name:'guest-gender-chart',
    components: {
        VueHighcharts
    },
    props:{
      guestGenderData:{
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
                text: '性别占比'
            },
            credits: {
                text: '',
            },
            colors:[
                '#FFC200',
                '#57B4F7',
            ],
            series: []
          }
        }
    },
    watch: {
      guestGenderData: function() {
         this.getData(this.$props.guestGenderData);
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
        let guestGenderCharts = this.$refs.guestGenderCharts;
        guestGenderCharts.delegateMethod('showLoading', 'Loading...');
        guestGenderCharts.removeSeries();
        setTimeout(() => {
        	  guestGenderCharts.hideLoading();
              guestGenderCharts.addSeries({name:'人数',data: value});
             
          }, 100)
      },

    }
}
