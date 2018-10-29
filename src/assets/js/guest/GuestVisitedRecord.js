import guestVisitedRecordApi from '@/api/guest_visited_record'

export default{

    name:'guest-visited-record',

    props:{
        customerId:{
            type:Number
        }
    },

    data(){
        return{
          totalNum:'',
            storeRecords:[],
            userInfoPagination:{
                currentPage:1,
                totalCount:0,
            },
            requestParas: {
                customer_id:'',
                page: 1,
                page_size:6
            },
          label:[
            [{id:1,name:"材质"},{id:2,name:"材质"},{id:3,name:"材质"}],
            [{id:2,name:"款式"}],
            [{id:3,name:"风格"}],
          ],
        }
    },

    watch:{
      customerId: function() {
        this.$data.requestParas.page = 1;
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
          guestVisitedRecordApi.list(qs.stringify(this.$data.requestParas)).then((res) => {
            if(res.data.errno === 0){
              this.$data.totalNum = res.data.data.pagination.totalCount;
              this.$data.storeRecords = res.data.data.list;
              this.$data.userInfoPagination.currentPage = res.data.data.pagination.currentPage;
              this.$data.userInfoPagination.totalCount = res.data.data.pagination.totalCount;
            }
          })
        },

        changePage(currentPage){
            this.$data.requestParas.page = currentPage;
            this.lists(this.$props.customerId)
        }

    }

}
