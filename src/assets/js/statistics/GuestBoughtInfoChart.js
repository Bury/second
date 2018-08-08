import Highcharts from 'highcharts';
import HighchartsNoData from 'highcharts-no-data-to-display';
import VueHighcharts from 'vue2-highcharts'
HighchartsNoData(Highcharts)

export default{

    name:'guest-bought-info-chart',

    components: {
        VueHighcharts
    },

    props:{
      guestBoughtInfoData:{
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
                text: '未购/已购客户占比'
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

    created:function(){		
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
      getData(value){
        let guestBoughtInfoCharts = this.$refs.guestBoughtInfoCharts;
        guestBoughtInfoCharts.delegateMethod('showLoading', 'Loading...');
        guestBoughtInfoCharts.removeSeries();
        setTimeout(() => {
        	guestBoughtInfoCharts.hideLoading();
            guestBoughtInfoCharts.addSeries({name:'人数',data: value});           
          }, 100)
      },
      
    }

}