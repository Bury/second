import globalData from '@/config/global_data'

import globalFunctions from '@/config/global_functions'

import guestApi from '@/api/guest'

import guestInfo from '@/components/GuestInfo'

import HiddenList from '@/views/guest/HiddenList'

import GuestVisitedRecord from '@/components/GuestVisitedRecord'

import GuestOrderRecord from '@/components/GuestOrderRecord'

export default {

    name:'guest-list',

    components: {
        guestInfo,
        HiddenList,
        GuestVisitedRecord,
        GuestOrderRecord
    },

    props:{

    },

    data(){
        return{
            tableData: [],
            allGuestVisitClass:globalData.data.guest_visit_class,
            allGuestBoughtClass:globalData.data.guest_bought_class,
            allAgeScope:globalData.data.age_scope,
            allGenderScope:globalData.data.gender_scope,
            pagination:{
                currentPage:1,
                totalCount:0,
            },
            activeName1: 'first',
            activeName2: 'first',
            dialogVisible:false,//弹窗是否显示
            value4: ['',''],
            topBoxSow:true,
            updateCount:0,
            requestParameters: {
                page: 1,
                page_size:20,
                visit_time_start:'',
                visit_time_end:'',
                //level:'',
                visited:'',
                bought:'',
                age:'',
                gender:'',
            },
            currentCustomerId:'',
            trafficId:'',
            showInfoEdit:false,
            pickerOptionsSet: {
              disabledDate(time) {
                return time.getTime() > Date.now() - 8.64e6
              }
            },
          noData:false,
          top:false,
          bottom: true,
          visibled:false,
          imageShow:true,
        }
    },

    created:function(){
        this.lists();
    },

    methods: {

        //列表
        lists(){
          if(this.$data.value4 != null){
            this.$data.requestParameters.store_time_start = Date.parse(this.$data.value4[0])/1000 ;
            this.$data.requestParameters.store_time_end = Date.parse(this.$data.value4[1])/1000;
          }else{
            this.$data.value4 = ['',''];
            this.lists();
          }
          // this.$data.requestParameters.page = 1;
          let qs = require('querystring');
          guestApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
            let result = res.data;
            if(result.errno === 0){
              this.tableData = result.data.list;
              if(result.data.list.length == 0){
                this.$data.noData = true;
              }else{
                this.$data.noData = false;
              }
              this.$data.pagination.currentPage = result.data.pagination.currentPage;
              this.$data.pagination.totalCount = result.data.pagination.totalCount;
            }
          })
        },

        handleCurrentChange(currentPage) {
            this.$data.requestParameters.page = currentPage;
            this.lists();
        },

        onSubmit() {
          this.$data.requestParameters.page = 1;
          this.lists();
        },
      fnReset(){
          this.$data.value4 = ['',''];
          this.$data.requestParameters.visited = '';
          this.$data.requestParameters.bought = '';
          this.$data.requestParameters.age = '';
          this.$data.requestParameters.gender = '';
          // this.lists();
      },

        showDialog(row) {
            this.$data.showInfoEdit = false;
            this.$data.currentCustomerId = row.customer_id;
            this.$data.trafficId = row.id;
            this.$data.activeName1 = 'first';
            this.$data.dialogVisible = true;
        },

        //点击屏蔽此人
        filter_process(row){
        	 let qs = require('querystring');

        	 this.$confirm('是否屏蔽此人？','提示',{
        	 	confirmButtonText:'确认',
        	 	cancelButtonText:'取消',
        	 	type:'warning'
        	 }).then(() => {
        	 	guestApi.hidden(qs.stringify({id:row.customer_id,is_hidden:1 })).then((res) => {
             	   if(res.data.errno === 0){
             		    this.lists();
                        globalFunctions.functions.message(this,'success');
             	   }else{
             		    this.$message(res.data.msg);
             	   }
                })
        	 })

        },

        checkout(tab, event) {
            this.$data.showInfoEdit = false;
        },

        //删除
        dele(row) {
            this.$confirm('确认删除该来客信息：'+row.id+' ？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            let list = {
                'id': row.id
            }
            let qs = require('querystring');
            guestApi.del(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    globalFunctions.functions.message(this,'success');
                    this.lists();
                }else{
                    this.$message.error(res.data.msg);
                }
            })
            }).catch(action => {})
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
          	 this.$data.topBoxSow = false;
            this.$data.imageShow = false;
          }else{
          	 this.$data.topBoxSow = true
          	 this.$data.imageShow = true
          	 this.lists();
          }
        },
      movementBottom(){
        this.$refs.topBox.style.overflow = 'visible';
        this.$data.visibled = true;
        this.$data.top = true;
        this.$data.bottom = false;
      },
      movementTop(){
        this.$refs.topBox.style.overflow = 'hidden';
        this.$data.visibled = false;
        this.$data.top = false;
        this.$data.bottom = true;
      },

    },

}