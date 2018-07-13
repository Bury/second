<template>
	<div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
			  <el-form-item label="订单编号：">
			    <el-input v-model="requestParameters.sn"></el-input>
			  </el-form-item>
			  <el-form-item label="材质：">
			    <el-select v-model="requestParameters.material" placeholder="请选择材质">
						<el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
					</el-select>
			  </el-form-item>
				<el-form-item label="款式：">
			    <el-select v-model="requestParameters.style" placeholder="请选择款式">
						<el-option  v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
					</el-select>
			  </el-form-item>
				<el-form-item label="成交总额：">
					<el-col :span="11">
						<el-input v-model="requestParameters.price_start"></el-input>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-input v-model="requestParameters.price_end"></el-input>
					</el-col>
			  </el-form-item>
			  <el-form-item label="收银时间：">
				<el-date-picker
			      v-model="cashTimes"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="创建时间：">
				<el-date-picker
			      v-model="createdTimes"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="orderList">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border style="width: 2298px;text-align:center;">
		    <el-table-column prop="sn" label="订单编号" width="160"></el-table-column>
		    <el-table-column label="材质" width="160">
					<template slot-scope="scope">
					<span v-for="good in scope.row.orderGoods" class="margin">{{good.material_name}}</span> 
		    	</template>
				</el-table-column>
				<el-table-column prop="goods_names" label="款式" width="160">
				<template slot-scope="scope">
					<span v-for="good in scope.row.orderGoods" class="margin">{{good.style_name}}</span> 
		    	</template>
				</el-table-column>
		    <el-table-column prop="price" label="成交金额" width="120"></el-table-column>
		    <el-table-column label="收银时间" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.cash_t | date(4)}}
		    	</template>
		    </el-table-column>
		    <el-table-column label="人脸" width="80">
		    	<template slot-scope="scope">
		           <img :src="scope.row.traffic. avatar" style="display:block;margin:0 auto;width:100%;">
		        </template>
		    </el-table-column>
				<el-table-column fixed prop="id" label="人脸ID" width="75"></el-table-column>
		    <el-table-column prop="customer_name" label="客户姓名" width="160"></el-table-column>
		    <el-table-column label="客户等级" width="160">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.traffic.is_new == 1 && scope.row.traffic.vip_level == 0">新客匿名</span>
			    	<span v-if="scope.row.traffic.is_new == 1 && scope.row.traffic.vip_level == 1">新客VIP</span>
			    	<span v-if="scope.row.traffic.is_new == 0 && scope.row.traffic.vip_level == 0">熟客匿名</span>
			    	<span v-if="scope.row.traffic.is_new == 0 && scope.row.traffic.vip_level == 1">熟客VIP</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="创建时间" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.created_at | date(4)}}
		    	</template>
		    </el-table-column>
		    <el-table-column fixed="right" label="操作" width="150">
			    <template slot-scope="scope">
			        <el-button @click="fnEdit(scope.row)" type="text" size="small">编辑</el-button>
			        <el-button @click="fnRemove(scope.row)" type="text" size="small">删除</el-button>
			    </template>
		    </el-table-column>
	    </el-table>

	    <!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;">
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
	</div>
</template>
<script>
	import OrderApi from '../../api/order'
	import remindApi from '../../api/remind'
	import * as utils from '../../utils/index'
  export default {
		name:'guest-list',
		components: {
		},
		data(){
			return{
				tableData: [],
				materials:[],
				styles:[],
				pagination:{
					currentPage:1,
					totalCount:0,
				},
				cashTimes:['',''],
				createdTimes:['',''],
				requestParameters: {
						page: 1,
						page_size:10,
						sn:'',
						goods_name:'',
						price_start:'',
						price_end:'',
						cash_t_start:'',
						cash_t_end:'',
						created_at_start:'',
						created_at_end:'',
						material: '',
						style: ''
					},
				}
		},
		created: function () {
		 this.orderList();
		 this.getAll()
		},
    methods: {
			getAll(){
					let list = {
							'all': '1',
							'customer_id': ''
					}
					let qs = require('querystring')
					remindApi.getAll(qs.stringify(list)).then((res) => {
							if(res.data.errno === 0){
									let labels = res.data.data
									console.log(labels)
									for (let i = 0; i < labels.length; i++) {
										if(labels[i].name === '材质'){
											this.materials = labels[i].children
										} else if(labels[i].name === '款式'){
											this.styles = labels[i].children
										} else {
											return false
										}
									}
							}else{

							}
					})
			},
			//列表
			orderList(){
				this.$data.requestParameters.cash_t_start = utils.getDateTime(this.$data.cashTimes[0]);
				this.$data.requestParameters.cash_t_end = utils.getDateTime(this.$data.cashTimes[1]);
				this.$data.requestParameters.created_at_start = utils.getDateTime(this.$data.createdTimes[0]);
				this.$data.requestParameters.created_at_end = utils.getDateTime(this.$data.createdTimes[1]);
				console.log(this.$data.createdTimes[0])
				let qs = require('querystring'); 
				OrderApi.orderList(qs.stringify(this.$data.requestParameters)).then((res) => {
					if(res.data.errno === 0){
						this.$data.tableData = res.data.data.list;
						this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
						this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
					}else{

					}
				})
      },
			handleCurrentChange(currentPage) {
				this.$data.requestParameters.page = currentPage;
				this.orderList();
			},
			fnRemove(row) {
				this.$confirm('确认删除该订单：'+row.sn+' ？', '删除提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
							let list = {
						   'id': row.id
				    	}
					    let qs = require('querystring');
							OrderApi.deleOrder(qs.stringify(list)).then((res) => {
								if(res.data.errno === 0){
										this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
										this.orderList();
	        			}else{
										this.$message.error(res.data.msg);
	        			}
						 })
					}).catch(action => {})
			  }
	    }
    }
</script>
<style lang="scss" scoped>
	.el-table thead{
		color:#333; 
	}
	.margin{
		display:inline-block;
		margin:0 5px;
	}
	.line{
		text-align:center;
	}
</style>