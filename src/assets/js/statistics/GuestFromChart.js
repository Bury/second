import VueHighcharts from 'vue2-highcharts'

export default{

    name:'vip-chart',
    components: {
        VueHighcharts
    },

    props:{
      guestFromData:{
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
                text: '客流量来源设备占比'
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
      guestFromData: function() {
         this.getData(this.$props.guestFromData);
      }
    },

    methods: {
      getData(value){
        let guestFromCharts = this.$refs.guestFromCharts;
        guestFromCharts.delegateMethod('showLoading', 'Loading...');
        guestFromCharts.removeSeries();
        setTimeout(() => {
              guestFromCharts.addSeries({data: value});
              guestFromCharts.hideLoading();
          }, 100)
      },
      
    }

}