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
		<div style="text-align:right;border-top:1px solid #dcdfe6;padding:20px 0;">

			<el-button type="primary" @click="realTime">实时录单</el-button>
			<el-button type="primary" @click="addNewList()">创建订单</el-button>
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

			<!--新建/编辑-->
			<el-dialog :title="dialogTitle" :visible.sync="FormVisible">
				<el-form :model='formName' ref="formName" label-width="100px" class="demo-ruleForm">
					<el-form-item label="收银时间：">
						<el-date-picker
							v-model="formName.cash_t"
							type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="人脸ID：" :model="searchFace">
						<el-row>
						<el-col :span='20'><el-input v-model="searchFace.id"></el-input></el-col>
						<el-col :span='2'><el-button @click="findFaceId()">查询</el-button></el-col>
						</el-row>
						<el-form-item :data="faceSearch">
							<div style="width:200px;height:200px;border:1px solid #eee;margin-top:60px;">
								<template>
									<img :src="faceSearch.avatar" style="display:block;margin:0 auto;width:100%;">
								</template>
							</div>
						</el-form-item>						
					</el-form-item>
					
					
						<div v-for="(item,index) in addProList" :key="index" v-if="addProList">
								<el-row>
										<el-col :span='7'>
										<el-form-item label="材质：">
										<el-select	v-model='item.material'>
												<el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
										</el-select>
										</el-form-item>
										</el-col>
										<el-col :span='7'>
										<el-form-item label="款式：" >
												<el-select v-model="item.style">
														<el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
												</el-select>
										</el-form-item>	
										</el-col>
										<el-col :span='6'>
										<el-form-item label='成交金额：'>
												<el-input v-model='item.price'  v-on:input='inputFun()' ></el-input>
										</el-form-item>
										</el-col>
										<el-col :span='1'>
										<div  class='deleprodect'>
											<div>
												<el-button @click='deleprodect(index)'>删除</el-button>
											</div>
										</div>
										</el-col>
								</el-row>
						</div>
					<div class="addproduct">
						<div>
						<el-form-item label=''>
							<el-button @click='addProduct()'>新增商品</el-button>
						</el-form-item>	
						</div>	
					</div>
					<div class="totalAll">
						<p>共计
						<input v-model='allNum' id='totalNumber' :disabled='true'/>件,总价
						<input v-model="totalMoney" id='totalPrice' :disabled='true'/>元</p>
					</div>
					<el-form-item></el-form-item>
					<el-form-item></el-form-item>
					<el-form-item></el-form-item>
					<el-form-item label="小票" v-model="formName.files">
						<el-upload
							action="https://jsonplaceholder.typicode.com/posts/"
							list-type="picture-card"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel(formName)">取 消</el-button>
					<el-button type="primary" @click="submitForm(formName)">确 定</el-button>
				</div>
			</el-dialog>
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
				allNum:'1',
				totalMoney:0,	
				faceSearch:{
					avatar:''
				},			
				searchFace:{
					id:''
				},
				addProList:[{
					material : null,
					style : null,
					price:''
				}],
				item:{
					material : '',
					style : '',
					price:''
				},
				dialogImageUrl: '',
        		dialogVisible: false,
				tableData: [],
				materials:[],
				styles:[],
				pagination:{
					currentPage:1,
					totalCount:0,
				},
				cashTimes:['',''],
				cashTime: '',
				createdTimes:['',''],
				dialogTitle: '',				
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
				formName:{
						cash_t:'',
						goods_info:[],
						files:[],
						customer_id:'',
						remark:''
				},
				FormVisible: false
			}
		},
		created: function () {
		 this.orderList();
		 this.getAll()
		},
    methods: {
		handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			getAll(){
					let list = {
							'all': '1',
							'customer_id': ''
					}
					let qs = require('querystring')
					remindApi.getAll(qs.stringify(list)).then((res) => {
							if(res.data.errno === 0){
									let labels = res.data.data;
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
			handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
			addNewList(){
				this.$data.FormVisible = true;
				this.$data.dialogTitle = '新增订单';
			},
			// 编辑
			fnEdit (row) {
				this.$data.dialogTitle = '订单编辑';
				this.$data.FormVisible = true;
				this.$data.cashTime = this.$data.cashTime;				
			},
			//查询人脸ID
			findFaceId(){
				let list = {
					'id':this.$data.searchFace.id,			
				}
				let qs = require('querystring');
				OrderApi.findFaceId(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0){
					this.$data.faceSearch.avatar = res.data.data.avatar;
	        	}else{
					this.$message.error(res.data.msg);
	        	}
				})
			},
			//添加商品
			addProduct(){
				let obj = {
					material : null,
					style : null,
					price:''
				}			
				this.$data.addProList.push(obj);
				this.$data.allNum =  this.$data.addProList.length;				
			},
			//计算总价
			inputFun(){	
				let n = 0;
				for(let i=0;i<this.$data.addProList.length;i++){
					if(this.$data.addProList[i].price.replace(/[^\.\d]/g,'')){
						n += parseInt(this.$data.addProList[i].price);
					}else{
						this.$data.addProList[i].price=0;
					}										
				}
				this.$data.totalMoney = n;				
			},
			//删除商品
			deleprodect(index){
				this.$data.addProList.splice(index,1);
			},
			//创建新订单
			submitForm(formName){
				console.log(formName);
				console.log(this.$data.addProList);
				console.log(this.$data.formName.cash_t);
				console.log(this.$data.dialogImageUrl);
				console.log(this.$data.searchFace.id);
				let material = this.$data.formName.material;
				let style = this.$data.formName.style;
				let list = {
					'goods_info':this.$data.addProList,
					'cash_t':this.$data.formName.cash_t,
					'remark':'',
					'files':this.$data.dialogImageUrl,
					'customer_id':this.$data.searchFace.id
				}
				let qs = require('querystring');
				OrderApi.addOrder(qs.stringify(list)).then((res) => {
					console.log(list);
					console.log(res);
				if(res.data.errno === 0){
					// this.$data.formName = {
					// 	goods_info: [],
					// 	cash_t:'',
					// 	files:[],
					// 	customer_id:'',
					// 	remark:''
					// };
					this.$message({
					    type: 'success',
						message: '创建成功!'								
					});
				this.$data.FormVisible = false;
	        	}else{
					this.$message.error(res.data.msg);
	        	}
				})
			},
			//删除
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
			  },

			  //取消
			  cancel(name){
				  console.log(name);
				this.$data.formName = {
						cash_t:'',
						goods_info:[],
						files:[],
						customer_id:'',
						remark:''
				};
				  this.$data.dialogVisible = false;
				//   this.$nextTick(
				// 	  function(){
				// 		  this.$refs.name.validate();
				// 	  }
				//   )
				  
			  },

        //实时录单
      realTime(){
        console.log(0);
        this.$router.push({path:'/realFound'})
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

	.totalAll{
		overflow:hidden;
		P{
			float:right;
			font-weight:700;
			#totalNumber, #totalPrice{
				padding:0;
				margin:0 3px;
				width:50px;
				height:24px;
				border:0;
				background: #eee;
				border: 1px solid #999;
				text-align:center;
			}
		}
	}
	
	.addproduct{
		overflow:hidden;
		div{
			float:right;
		}
	}
	.deleprodect{
		margin-left:20px;		
	}
</style>


