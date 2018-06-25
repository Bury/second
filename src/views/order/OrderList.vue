<template>
	<div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item label="进店时间：">
			    <el-select v-model="formInline.region" placeholder="活动区域">
			      <el-option label="区域一" value="shanghai"></el-option>
			      <el-option label="区域二" value="beijing"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="客户等级：">
			    <el-select v-model="formInline.level" placeholder="客户等级">
			      <el-option label="全部" value="5"></el-option>
			      <el-option label="新客匿名" value="1"></el-option>
			      <el-option label="新客VIP" value="2"></el-option>
			      <el-option label="熟客匿名" value="3"></el-option>
			      <el-option label="熟客VIP" value="4"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="年龄：">
			    <el-select v-model="formInline.age" placeholder="年龄">
			      <el-option label="全部" value="7"></el-option>
			      <el-option label="20岁以下" value="1"></el-option>
			      <el-option label="20-29岁" value="2"></el-option>
			      <el-option label="30-39岁" value="3"></el-option>
			      <el-option label="40-49岁" value="4"></el-option>
			      <el-option label="50-59岁" value="5"></el-option>
			      <el-option label="60岁以上" value="6"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="性别：">
			    <el-select v-model="formInline.sex" placeholder="性别">
			      <el-option label="全部" value="3"></el-option>
			      <el-option label="男" value="1"></el-option>
			      <el-option label="女" value="0"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border style="width: 2298px;text-align:center;">
	    	<el-table-column fixed prop="Id" label="ID" width="75"></el-table-column>
		    <el-table-column prop="orderNumber" label="订单编号" width="160"></el-table-column>
		    <el-table-column prop="tradeName" label="商品名" width="160"></el-table-column>
		    <el-table-column prop="totalMoney" label="成交金额" width="120"></el-table-column>
		    <el-table-column prop="buyTime" label="收银时间" width="160"></el-table-column>
		    <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
		    <el-table-column prop="author" label="创建人员" width="160"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="150">
			    <template slot-scope="scope">
			        <el-button @click="fnEdit(scope.row)" type="text" size="small">编辑</el-button>
			        <el-button @click="fnRelation(scope.row)" type="text" size="small">关联</el-button>
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