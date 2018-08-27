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
                page_size:20,
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
            guestApi.hiddenLists(qs.stringify(this.$data.requestParameters)).then((res) => {
                let result = res.data;
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
            this.$confirm('是否撤销屏蔽？','提示',{
        	 	confirmButtonText:'确认',
        	 	cancelButtonText:'取消',
        	 	type:'warning'
        	 }).then(()=>{
        	 	guestApi.hidden(qs.stringify({id:row.id,is_hidden:0 })).then((res) => {
                    if(res.data.errno === 0){
                        this.lists();
                        this.$message({message:'撤销成功',type:"success"});
                    }else{
                        this.$message(res.data.msg);
                    }
                })
        	 })

        }

    },

}

