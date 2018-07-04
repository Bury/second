<!-- 首页 -->
<template>
    <div class="dashboard-page">
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <el-form-item label="门店选择：" v-if="allStores.length > 0">
            <el-select v-model="requestParameters.store_id" placeholder="门店选择">
              <el-option v-for="(item, idx) in allStores" :label="allStores[idx].name" :value="allStores[idx].id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择：">
                <el-date-picker
                  type="date"
                  v-model="day"
                  placeholder="选择日期">
                </el-date-picker>
          </el-form-item>
          <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>


    </div>
</template>

<script>
import remindApi from '../../api/remind'
import statisticsApi from '../../api/statistics'
export default {
  name: 'dashboard',
  data () {
    return {
        allStores:[],
        day:'',

        requestParameters:{
            begin_time:'',
            end_time:'',
            store_id:''
        }

    }
  },
  created:function(){
    this.getStores();
  },
  methods: {
    //门店
    getStores(){
        remindApi.getStores().then((res) => {
            if(res.data.errno === 0){
                console.log(res)
                this.$data.allStores = res.data.data;
            }else{

            }
            
        })
    },

    getCustomer(){
        let list = {
            
        }
        let qs = require('querystring');
        statisticsApi.getCustomer(qs.stringify(this.$data.requestParameters)).then((res) => {
            if(res.data.errno === 0){
                console.log(res)
            }else{

            }
            
        })
    },


    //
    onSubmit(){

    }
    
  }
}
</script>

<style lang="scss" scoped>
    
</style>