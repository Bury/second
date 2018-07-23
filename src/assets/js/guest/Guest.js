import global_data from '@/config/global_data'

import global_functions from '@/config/global_functions'

import guestApi from '@/api/guest'

import guestInfo from '@/components/GuestInfo'

import HiddenList from '@/views/guest/HiddenList'

// import GuestVisitedRecord from '@/components/GuestVisitedRecord'

// import GuestOrderRecord from '@/components/GuestOrderRecord'

export default {

    name:'guest-list',

    components: {
        guestInfo,
        HiddenList,
        // GuestVisitedRecord,
        // GuestOrderRecord
    },

    props:{

    },

    data(){
        return{
            tableData: [],
            allGuestVisitClass:global_data.data.guest_visit_class,
            allGuestBoughtClass:global_data.data.guest_bought_class,
            allAgeScope:global_data.data.age_scope,
            allGenderScope:global_data.data.gender_scope,
            pagination:{
                currentPage:1,
                totalCount:0,
            },

            activeName2: 'first',
            dialogVisible:false,//弹窗是否显示
            activeName: 'first',
            value4: ['',''],
            topBoxSow:true,
            updateCount:0,
            requestParameters: {
                page: 1,
                page_size:10,
                id:'',
                store_id:'',
                store_time_start:'',
                store_time_end:'',
                level:'',
                age:'',
                gender:'',
                consume_money_start:'',
                consume_money_end:''
            },
            currentCustomerId:'',
            showInfoEdit:false
        }
    },

    created:function(){
        this.lists();
    },

    methods: {

        //列表
        lists(){
            this.$data.requestParameters.store_time_start = Date.parse(this.$data.value4[0])/1000 || '';
            this.$data.requestParameters.store_time_end = Date.parse(this.$data.value4[1])/1000 || '';
            
            let qs = require('querystring');
            guestApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
                let result = res.data;
                if(result.errno === 0){
                    var i='';
                    this.tableData = result.data.list;
                    this.$data.pagination.currentPage = result.data.pagination.currentPage;
                    this.$data.pagination.totalCount = result.data.pagination.totalCount;
                }else{

                }
            })
        },

        handleCurrentChange(currentPage) {
            this.$data.requestParameters.page = currentPage;
            this.lists();
        },

        onSubmit() {
            this.lists();
        },

        showDialog(row) {
            this.$data.showInfoEdit = false;
            this.$data.currentCustomerId = row.customer_id;
            this.$data.activeName = 'first';
            this.$data.dialogVisible = true;
        },

        //点击屏蔽此人
        filter_process(row){
        	 let qs = require('querystring');
             guestApi.guestHidden(qs.stringify({id:row.customer_id,is_hidden:1 })).then((res) => {
             	if(res.data.errno === 0){
             		this.lists();
             	}else{
             		this.$message(res.data.msg);
             	}             	
             })
        },

        checkout(tab, event) {
            this.$data.showInfoEdit = false;
        },

        closeChangeMachie(done){
            done();
            // window.location.reload();
            this.lists();
            this.$data.showInfoEdit = false;
        },

        getAvatar(row){
            this.$emit('getChildData',row);
        },

        handleClick(tab, event) {
          this.$data.updateCount++;
          if(tab.index ===  "1"){
          	 this.$data.topBoxSow = false
          }else{
          	 this.$data.topBoxSow = true
          	 this.lists();
          }
        }

    },

}