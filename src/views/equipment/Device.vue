<template>
	<div class="device-box">
		<div class="top-box">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="设备编号：">
			    	<el-input v-model="formInline.Id"></el-input>
			  	</el-form-item>
			  	<el-form-item label="版本：">
				    <el-select v-model="formInline.version" placeholder="请选择">
				      <el-option label="区域一" value="shanghai"></el-option>
				      <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
			  	</el-form-item>
				<el-form-item label="所属门店">
				    <el-input v-model="formInline.storeName"></el-input>
				</el-form-item>
				<el-form-item label="添加时间：">
			    	<el-input v-model="formInline.addTimeStart"></el-input>
			  	</el-form-item>
			  	<el-form-item label=" 至 ">
			    	<el-input v-model="formInline.addTimeEnd"></el-input>
			  	</el-form-item>
			  	<el-form-item label="启用时间：">
			    	<el-input v-model="formInline.openTimeStart"></el-input>
			  	</el-form-item>
			  	<el-form-item label=" 至 ">
			    	<el-input v-model="formInline.openTimeEnd"></el-input>
			  	</el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<el-table :data="tableData" border style="width:1101px;text-align:center;">
	    	<el-table-column fixed prop="Id" label="设备编号" width="120"></el-table-column>
		    <el-table-column prop="version" label="版本" width="100"></el-table-column>
		    <el-table-column prop="addTime" label="添加时间" width="100"></el-table-column>
		    <el-table-column prop="openTime" label="启用时间" width="100"></el-table-column>
		    <el-table-column prop="isOpen" label="是否启用" width="80"></el-table-column>
		    <el-table-column prop="storeName" label="所属门店" width="160"></el-table-column>
		    <el-table-column prop="seat" label="安装位置" width="160"></el-table-column>
		    <el-table-column prop="allocatedStatus" label="分配状态" width="90"></el-table-column>
		    <el-table-column prop="equipemntStatus" label="设备状态" width="90"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="100">
			    <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">分配</el-button>
			    </template>
		    </el-table-column>
	    </el-table>
	</div>
</template>
<script>
	export default{
		name:'device',
		data(){
			return{
				formInline: {
		          Id:'',
		          version:'',
		          storeName:'',
		          addTimeStart:'',
		          addTimeEnd:'',
		          openTimeStart:'',
		          openTimeEnd:''
		        },
				tableData: [{
		          Id: 'A-XSDAS111',
		          version:'v1.0.0',
		          addTime:'2018/06/05',
		          openTime:'2018/06/08',
		          isOpen:false,
		          storeName:'浙北米兰店',
		          seat:'东门1',
		          allocatedStatus:false,
		          equipemntStatus:false
		        },{
		          Id: 'A-XSDAS2222',
		          version:'v1.0.0',
		          addTime:'2018/06/05',
		          openTime:'2018/06/08',
		          isOpen:false,
		          storeName:'浙北米兰店',
		          seat:'东门1',
		          allocatedStatus:false,
		          equipemntStatus:false
		        }],
			}
		},
	}
</script>