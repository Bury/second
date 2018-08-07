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
            orderRecords:{}
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
                    'page_size': 10
                }
            let qs = require('querystring')
            orderApi.listsUserResults(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    this.$data.orderRecords = res.data.data;
                }else{

                }
            })
        },

    }

}
