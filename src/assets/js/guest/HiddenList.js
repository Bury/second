import global_functions from '@/config/global_functions'

    import guestApi from '@/api/guest'
    
    export default {

    name:'shield-list',

    data(){
        return{
            tableData: [],
            pagination:{
                currentPage:1,
                totalCount:0,
            },
            requestParameters: {
                page: 1,
                page_size:10,
            },
        }
    },
    
    props:{
    	updateHidden:{
    		type:Number
    	}
    },

    created:function(){
          this.lists();
    },
    
     watch: {
          updateHidden: function() {
            this.lists()
          },
    },

    methods: {

        //列表
        lists(){            
            let qs = require('querystring');
            guestApi.guestHiddenList(qs.stringify(this.$data.requestParameters)).then((res) => {
                let result = res.data;
                console.log(res)
                if(res.data.errno === 0){
                	this.tableData = res.data.data.list;
                    this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
                    this.$data.pagination.totalCount = res.data.data.pagination.totalCount;      
                }else{
                	this.$message(res.data.msg);
                }
            })
        },

        handleCurrentChange(currentPage) {
            this.$data.requestParameters.page = currentPage;
            this.lists();
        },

        //点击撤销屏蔽
        return_process(row){
            let qs = require('querystring');
             guestApi.guestHidden(qs.stringify({id:row.id,is_hidden:0 })).then((res) => {
             	if(res.data.errno === 0){
             		this.lists();
             	}else{
             		this.$message(res.data.msg);
             	}             	
             })
        }

    },

}
    
    