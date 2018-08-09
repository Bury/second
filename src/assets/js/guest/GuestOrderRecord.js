import orderApi from '@/api/order'

export default{

    name:'guest-order-record',

    props:{
        customerId:{
            type:Number
        }
    },

    data(){
        return{
            orderRecords:[],
          pagination:{
            currentPage:'',
            totalCount:'',
          },
          requestParameters:{
              page:1,
              page_size:6,
          }
        }
    },

    watch: {
        customerId: function() {
            this.lists(this.$props.customerId)
        }
    },

    created:function(){
        this.lists(this.$props.customerId)
    },

    methods:{

        lists(customerId){
            let list = {
                    'customer_id':customerId,
                    'page':1,
                    'page_size': 6
                }
            let qs = require('querystring')
            orderApi.listsUserResults(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    this.$data.orderRecords = res.data.data;
                    this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
                    this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
                    console.log(this.$data.orderRecords);
                }else{

                }
            })
        },

    }

}
