<template>
	<div class="remind-list">
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
			  <el-form-item label="消费金额：">
			    <el-input v-model="formInline.minM"></el-input>
			  </el-form-item>
			  <el-form-item label="至">
			    <el-input v-model="formInline.maxM"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border style="width: 2913px;text-align:center;">
	    	<el-table-column fixed prop="Id" label="ID" width="60"></el-table-column>
		    <el-table-column prop="img" label="人脸" width="80"></el-table-column>
		    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
		    <el-table-column prop="sex" label="性别" width="50"></el-table-column>
		    <el-table-column prop="age" label="年龄" width="50"></el-table-column>
		    <el-table-column prop="adress" label="地址" width="300"></el-table-column>
		    <el-table-column prop="phone" label="手机号" width="110"></el-table-column>
		    <el-table-column prop="cont" label="消费次数" width="80"></el-table-column>
		    <el-table-column prop="totalMoney" label="消费金额" width="120"></el-table-column>
		    <el-table-column prop="level" label="客户等级" width="120"></el-table-column>
		    <el-table-column prop="preStore" label="上次进店信息" width="120"></el-table-column>
		    <el-table-column prop="preTime" label="上次进店时间" width="160"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="100">
			    <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">详情备注</el-button>
			    </template>
		    </el-table-column>
	    </el-table>

	  	<!-- 弹窗 -->
	  	<el-dialog title="提示" :visible.sync="dialogVisible" style="min-width:1200px;">
			<el-tabs v-model="activeName" @tab-click="checkout()">
			    <el-tab-pane label="个人信息" name="first">
			    	<user-info></user-info>
			    </el-tab-pane>
			    <el-tab-pane label="到店记录" name="second">
			    	<store-record></store-record>
			    </el-tab-pane>
			    <el-tab-pane label="订单记录" name="third">
			    	<order-record></order-record>
			    </el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>
<script>
	import userInfo from './userInfo'
	import StoreRecord from './StoreRecord'
	import OrderRecord from './OrderRecord'
    export default {
        name:'remind-list',
        components: {
		    userInfo,
		    StoreRecord,
		    OrderRecord
		},
        data(){
            return{
            	formInline: {
		          start:'',
		          end:'',
		          level:'',
		          age:'',
		          sex:'',
		          minM:'',
		          maxM:''
		        },
		        tableData: [{
		          Id: '0001',
		          img: '',
		          name: '呆呆',
		          sex: 1,
		          age: 22,
		          adress:'地址地址地址',
		          phone: 15855443130,
		          cont: 1,
		          totalMoney: 2888,
		          level: 1,
		          preStore: '浙北店',
		          preTime: '2018/6/12 12:00'
		        },{
		          Id: '0001',
		          img: '',
		          name: '呆呆',
		          sex: 1,
		          age: 22,
		          adress:'地址地址地址',
		          phone: 15855443130,
		          cont: 1,
		          totalMoney: 2888,
		          level: 1,
		          preStore: '浙北店',
		          preTime: '2018/6/12 12:00'
		        }],
		        dialogVisible:false,//弹窗是否显示
		        activeName: 'first'

            }
        },
        
        methods: {
        	onSubmit() {
		        console.log('submit!');
		    },
		    handleClick(row) {
		        console.log(row);
		        this.$data.dialogVisible = true;
		    },
		    checkout(tab, event) {
		        console.log(tab, event);
		      }
	    },
    }
</script>
<style lang="scss" scoped>
	.el-table thead{
		color:#333; 
	}
</style>