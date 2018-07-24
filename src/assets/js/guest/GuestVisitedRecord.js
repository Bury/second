import guestVisitedRecordApi from '@/api/guest_visited_record'

export default{

    name:'store-record',

    props:{
        customerId:{
            type:Number
        }
    },

    data(){
        return{
            storeRecords:{},
            userInfoPagination:{
                currentPage:1,
                totalCount:0,
            },
            requestParas: {
                customer_id:'',
                page: 1,
                page_size:6
            }
        }
    },

    watch:{
      customerId: function() {
         this.lists(this.$props.customerId)
      }
    },

    created:function(){
        this.lists(this.$props.customerId)
    },

    methods:{

        lists(customerId){
            this.$data.requestParas.customer_id = customerId;
            let qs = require('querystring')
            guestVisitedRecordApi.lists(qs.stringify(this.$data.requestParas)).then((res) => {
                if(res.data.errno === 0){
                    this.$data.storeRecords = res.data.data;
                    this.$data.userInfoPagination.currentPage = res.data.data.pagination.currentPage;
                    this.$data.userInfoPagination.totalCount = res.data.data.pagination.totalCount;
                }else{

                }
            })
        },

        changePage(currentPage){
            this.$data.requestParas.page = currentPage;
            this.lists(this.$props.customerId)
        }
        
    }

}