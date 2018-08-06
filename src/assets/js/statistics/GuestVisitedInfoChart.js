import VueHighcharts from 'vue2-highcharts'

export default{

    name:'guest-visited-info-chart',

    components: {
        VueHighcharts
    },

    props:{
      guestVisitedInfoData:{
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
                    text: '新客/熟客占比'
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
        guestVisitedInfoData: function() {
            this.getData(this.$props.guestVisitedInfoData);
        }
    },

    methods: {
        getData(value){
            let newOldCharts = this.$refs.newOldCharts;
            newOldCharts.delegateMethod('showLoading', 'Loading...');
            newOldCharts.removeSeries();
             setTimeout(() => {
                newOldCharts.addSeries({data: value});
                newOldCharts.hideLoading();
            }, 100)
        },
    }
    
}