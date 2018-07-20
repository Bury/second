<template>
	<div class="remind-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
			  <!--<el-form-item label="门店选择：" v-if="allStores">
			    <el-select v-model="requestParameters.store_id" placeholder="门店选择">
			      <el-option v-for="(item, idx) in allStores" :key="idx" :label="allStores[idx].name" :value="allStores[idx].id"></el-option>
			    </el-select>
			  </el-form-item>-->
			   <!--<el-form-item label="人脸ID：">
			    <el-input v-model="requestParameters.id"></el-input>
			  </el-form-item>-->
			  <el-form-item label="消费金额：">
			    <el-input v-model="requestParameters.consume_money_start"></el-input>
			  </el-form-item>
			  <el-form-item label="至">
			    <el-input v-model="requestParameters.consume_money_end"></el-input>
			  </el-form-item>
			  <el-form-item label="客户等级：" v-if="allLevels">
			     <el-select v-model="requestParameters.level" placeholder="客户等级">
			      <el-option label="全部" value="0" v-if="allLevels"></el-option>
			      <el-option v-for="(item, idx) in allLevels" :key="idx" :label="allLevels[idx].name" :value="allLevels[idx].level"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="年龄：">
			    <el-select v-model="requestParameters.age" placeholder="年龄">
			      <el-option label="全部" value="0"></el-option>
			      <el-option label="20岁以下" value="1"></el-option>
			      <el-option label="20-29岁" value="2"></el-option>
			      <el-option label="30-39岁" value="3"></el-option>
			      <el-option label="40-49岁" value="4"></el-option>
			      <el-option label="50-59岁" value="5"></el-option>
			      <el-option label="60岁以上" value="6"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="性别：">
			    <el-select v-model="requestParameters.gender" placeholder="性别">
			      <el-option label="全部" value="0"></el-option>
			      <el-option label="男" value="1"></el-option>
			      <el-option label="女" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border height="380" style="margin:0 auto;width: 1551px;text-align:center;">
	    	<el-table-column fixed type="index" label="序号" width="80"></el-table-column>
		    <el-table-column label="人脸" width="60">
		    	<template slot-scope="scope">
		           <img :src="scope.row.avatar" style="display:block;margin:0 auto;width:100%;">
		        </template>
		    </el-table-column>
		    <el-table-column prop="customerMerchant.name" label="姓名" width="100"></el-table-column>
		    <el-table-column label="性别" width="50">
		    	<template slot-scope="scope">
		           <span>{{scope.row.gender == 1 ?'男':'女'}}</span>
		        </template>
		    </el-table-column>
		    <el-table-column prop="age" label="年龄" width="100"></el-table-column>
		    <el-table-column prop="customerMerchant.phone" label="手机号" width="110"></el-table-column>
		    <el-table-column prop="customerMerchant.consume_num" label="消费次数" width="80"></el-table-column>
		    <el-table-column prop="customerMerchant.consume_money" label="消费金额" width="120"></el-table-column>
		    <el-table-column label="客户等级" width="120">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.is_new == 1 && scope.row.vip_level == 0">新客匿名</span>
			    	<span v-if="scope.row.is_new == 1 && scope.row.vip_level == 1">新客VIP</span>
			    	<span v-if="scope.row.is_new == 0 && scope.row.vip_level == 0">熟客匿名</span>
			    	<span v-if="scope.row.is_new == 0 && scope.row.vip_level == 1">熟客VIP</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="store_name" label="进店信息" width="220"></el-table-column>
		    <el-table-column prop="created_at" label="进店时间" width="200">
		    	<template slot-scope="scope">
		    		{{scope.row.created_at | date(4)}}
		    	</template>
		    </el-table-column>
		    <el-table-column prop="device_name" labedateformat('YYYY-MM-DD HH:mm:ss')l="设备信息" width="160"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="150">
			    <template slot-scope="scope">
			    	<!--<el-button v-if="scope.row.is_reception == 0" @click="isReception(scope.row)" type="text" size="small" style="color:#FF5940;">未接待</el-button>-->
			    	<el-button v-if="scope.row.is_reception == 0" type="text" size="small" style="color:#FF5940;">未接待</el-button>
			    	<el-button v-if="scope.row.is_reception == 1" type="text" size="small" style="color:#FF5940;">未备注</el-button>
			    	<el-button v-if="scope.row.is_reception == 2" type="text" size="small" style="color:#FF5940;">已接待</el-button>
			        <el-button @click="showDialog(scope.row)" type="text" size="small">详情备注</el-button>
			    </template>
		    </el-table-column>
	    </el-table>

		<!-- 分页 -->
		<div v-if="tableData" style="margin:0 auto;max-width:1551px;">
			<el-pagination 
				background
	            class="pagination" 
	            layout="prev, pager, next" 
	            small 
	            @current-change="handleCurrentChange" 
	            :current-page="pagination.currentPage" 
	            :page-size="requestParameters.page_size"
	            :total="pagination.totalCount">
	        </el-pagination>
	    </div>

	  	<!-- 弹窗 -->
	  	<el-dialog :visible.sync="dialogVisible" style="min-width:1200px;" :before-close="closeChangeMachie">
			<el-tabs v-model="activeName" @tab-click="checkout">
			    <el-tab-pane label="个人信息" name="first">
			    	<user-info :customerId="currentCustomerId"  :showInfoEdit="showInfoEdit"></user-info>
			    </el-tab-pane>
			    <el-tab-pane label="到店记录" name="second" style="min-height:415px;">
			    	<store-record :customerId="currentCustomerId"></store-record>
			    </el-tab-pane>
			    <el-tab-pane label="订单记录" name="third">
			    	<order-record :customerId="currentCustomerId" style="min-height:415px;"></order-record>
			    </el-tab-pane>
			</el-tabs>
			
		</el-dialog>
	</div>
</template>
<script>
	import remindApi from '../../api/remind'
	import UserInfo from '../../components/UserInfo'
	import StoreRecord from '../../components/StoreRecord'
	import OrderRecord from '../../components/OrderRecord'
    export default {
        name:'remind-list',
        components: {
		    UserInfo,
		    StoreRecord,
		    OrderRecord
		},
        data(){
            return{
		        tableData: [],
		        allLevels:[],
		        allStores:[],
		        pagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
		        dialogVisible:false,//弹窗是否显示
		        activeName: 'first',
		        requestParameters: {
	                page: 1,
	                page_size:10,
	                store_id:'',
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
        	this.remindList();
        	this.getLevels();
        	this.getStores();
        },
        methods: {
        	//列表
        	remindList(){
			    let qs = require('querystring')
        		remindApi.remindList(qs.stringify(this.$data.requestParameters)).then((res) => {
        			if(res.data.errno === 0){  
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
        			}else{

        			}
        			
        		})
        	},

        	//用户等级
        	getLevels(){
				remindApi.getLevels().then((res) => {
        			if(res.data.errno === 0){
						this.$data.allLevels = res.data.data;
        			}else{

        			}
        			
        		})
        	},

        	//门店
        	getStores(){
        		remindApi.getStores().then((res) => {
        			if(res.data.errno === 0){
						this.$data.allStores = res.data.data;
        			}else{

        			}
        			
        		})
        	},

        	handleCurrentChange(currentPage) {
	            this.$data.requestParameters.page = currentPage;
	            this.remindList();
	        },
        	onSubmit() {
		        this.remindList();
		    },
		    showDialog(row) {
		        this.$data.showInfoEdit = false;
		        this.$data.currentCustomerId = row.customer_id;
		        this.$data.activeName = 'first';
		        this.$data.dialogVisible = true;	        
		    },

		    checkout(tab, event) {
		        this.$data.showInfoEdit = false;
		    },
		    isReception(row){
		    	let qs = require('querystring')
		    	remindApi.isReception(qs.stringify({
		    		id:row.id
		    	})).then((res) => {
                    if(res.data.errno === 0){
                        this.remindList();
                    }else{

                    }
                })
		    },
		    closeChangeMachie(done){
	            done();
	            // window.location.reload();
	            this.$data.showInfoEdit = false;
	            this.remindList();
	            
	        }
	    },
    }
</script>
<style lang="scss" scoped>

	.el-table thead{
		color:#333; 
	}
	.el-pagination{
		margin:10px;
	  	float: right;
	}

	
</style>