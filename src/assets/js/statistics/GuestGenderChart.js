import VueHighcharts from 'vue2-highcharts'
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
    methods: {
      getData(value){
        console.log(value)
        let guestGenderCharts = this.$refs.guestGenderCharts;
        guestGenderCharts.delegateMethod('showLoading', 'Loading...');
        guestGenderCharts.removeSeries();
        setTimeout(() => {
              guestGenderCharts.addSeries({data: value});
              guestGenderCharts.hideLoading();
          }, 100)
      },

    }
}
