<template>
	<div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
			  <el-form-item label="人脸ID：">
			    <el-input v-model="formInline.region"></el-input>
			  </el-form-item>
			  <el-form-item label="订单编号：">
			    <el-input v-model="formInline.region"></el-input>
			  </el-form-item>
			  <el-form-item label="商品名：">
			    <el-input v-model="formInline.region"></el-input>
			  </el-form-item>
			  <el-form-item label="收银时间：">
				<el-date-picker
			      v-model="value4"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="创建时间：">
				<el-date-picker
			      v-model="value4"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始时间"
			      end-placeholder="结束时间">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="成交总额：">
			    <el-input v-model="formInline.region"></el-input>
			  </el-form-item>
			  <el-form-item label="至">
			    <el-input v-model="formInline.region"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border style="width: 2298px;text-align:center;">
	    	<el-table-column fixed prop="Id" label="人脸ID" width="75"></el-table-column>
		    <el-table-column prop="orderNumber" label="订单编号" width="160"></el-table-column>
		    <el-table-column prop="tradeName" label="商品名" width="160"></el-table-column>
		    <el-table-column prop="totalMoney" label="成交总额" width="120"></el-table-column>
		    <el-table-column prop="buyTime" label="收银时间" width="160"></el-table-column>
		    <el-table-column prop="buyTime" label="人脸" width="160"></el-table-column>
		    <el-table-column prop="buyTime" label="姓名" width="160"></el-table-column>
		    <el-table-column prop="buyTime" label="客户等级" width="160"></el-table-column>
		    <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="150">
			    <template slot-scope="scope">
			        <el-button @click="fnEdit(scope.row)" type="text" size="small">编辑</el-button>
			        <el-button @click="fnRemove(scope.row)" type="text" size="small">删除</el-button>
			    </template>
		    </el-table-column>
	    </el-table>
	</div>
</template>
<script>
	import OrderApi from '../../api/order'
    export default {
        name:'guest-list',
        components: {
		   
		},
        data(){
            return{
            	formInline: {
		          
		        },
		        tableData: [{
		          Id: '0001',
		          orderNumber:'ZJ1233333',
		          tradeName:'手链111',
		          totalMoney: 2888,
		          buyTime:'2018/06/11  13:22',
		          createTime:'2018/06/11  20:00',
		          author:"店长A"
		        },{
		          Id: '0002',
		          orderNumber:'ZJ1233333',
		          tradeName:'手链111',
		          totalMoney: 2888,
		          buyTime:'2018/06/11  13:22',
		          createTime:'2018/06/11  20:00',
		          author:"店长A"
		        }]
            }
        },
        created: function () {
		    this.orderList();
		},
        methods: {
        	//列表
        	orderList(){
        		OrderApi.orderList().then((res) => {
			        console.log(res)
			       
			    })
        	},
        	
        	onSubmit() {
		        console.log('submit!');
		    },
		    
	    },
    }
</script>
<style lang="scss" scoped>
	.el-table thead{
		color:#333; 
	}
</style>