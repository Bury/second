import VueHighcharts from 'vue2-highcharts'

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
    
    methods: {
      getData(value){
        let guestAgeCharts = this.$refs.guestAgeCharts;
        guestAgeCharts.delegateMethod('showLoading', 'Loading...');
        guestAgeCharts.removeSeries();
        setTimeout(() => {
              guestAgeCharts.addSeries({name:'人数',data: value});
              guestAgeCharts.hideLoading();
          }, 100)
      },
      
    }
    
}