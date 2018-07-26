import VueHighcharts from 'vue2-highcharts'

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
            guestBoughtInfoCharts.addSeries({data: value});
            guestBoughtInfoCharts.hideLoading();
          }, 100)
      },
      
    }

}