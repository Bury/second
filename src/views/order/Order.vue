<template>
	  <div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
			  <el-form-item label="订单编号：">
			    <el-input v-model="requestParameters.sn"></el-input>
			  </el-form-item>
			  <el-form-item label="材质：">
			    <el-select v-model="requestParameters.material" placeholder="请选择材质">
            <el-option label="全部" value="">全部</el-option>
						<el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
					</el-select>
			  </el-form-item>
				<el-form-item label="款式：">
			    <el-select v-model="requestParameters.style" placeholder="请选择款式">
            <el-option label="全部" value="">全部</el-option>
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
      <div style="display: flex;text-align: center">
        <el-col :span="24">
		    <el-table :data="tableData" border >
        <el-table-column fixed prop="id" label="序号" width="80"></el-table-column>
		    <el-table-column fixed prop="sn" label="订单编号" width="170"></el-table-column>
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
		           <img :src="scope.row.traffic.avatar" style="display:block;margin:0 auto;width:100%;">
		        </template>
		    </el-table-column>
			<el-table-column  prop="Id" label="人脸ID" width="75">
        <template slot-scope="scope">
          {{scope.row.traffic.id}}
        </template>
      </el-table-column>
		    <el-table-column prop="customer_name" label="客户姓名" width="160"></el-table-column>
		    <el-table-column label="客户等级" width="160">
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.traffic.is_new == 1 && scope.row.traffic.vip_level == 0">熟客未购买</span>
			    	<span v-if="scope.row.traffic.is_new == 1 && scope.row.traffic.vip_level == 1">新客已购买</span>
			    	<span v-if="scope.row.traffic.is_new == 0 && scope.row.traffic.vip_level == 0">熟客未购买</span>
			    	<span v-if="scope.row.traffic.is_new == 0 && scope.row.traffic.vip_level == 1">熟客已购买</span>
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
        </el-col>
      </div>
    <!--新建订单-->
    <el-dialog title="新建订单" :visible.sync="FormVisible">
      <el-form :model='formName' ref="formName" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收银时间：" prop="cash_t">
          <el-date-picker
            v-model="formName.cash_t"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人脸ID：" :model="searchFace" prop="faceID">
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
        <div v-for="(item,index) in addProList" :key="index" v-if="addProList" :rules="rules">
          <el-row>
            <el-col :span='7'>
              <el-form-item label="材质：" prop="material">
                <el-select	v-model='item.material'>
                  <el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="款式：" prop="style">
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
              <div  class='deleproduct'>
                <div>
                  <el-button @click='deleProduct(index)'>删除</el-button>
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
            <input v-model='allNum' class='totalNumber' :disabled='true'/>件,总价
            <input v-model="totalMoney" class='totalPrice' :disabled='true' />元
          </p>
        </div>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="小票" v-model="formName.files_web">
          <el-upload v-model="item.file"
                     :action="importFileUrl()"
                     list-type="picture-card"
                     :data="upLoadData"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :onSuccess="uploadSuccess">
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
    <!--编辑-->
    <el-dialog title="编辑" :visible.sync="editVisible">
      <el-form  :model='editForm' ref="editForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收银时间：" prop="cash_t">
          <el-date-picker
            v-model="editForm.cash_t"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人脸ID：" :model="editForm.traffic.id" prop="faceID">
          <el-row>
            <el-col :span='20'><el-input v-model="editForm.traffic.id"></el-input></el-col>
            <el-col :span='2'><el-button @click="editFindFaceId()">查询</el-button></el-col>
          </el-row>
          <el-form-item :data="faceSearch">
            <div style="width:200px;height:200px;border:1px solid #eee;margin-top:60px;">
              <template>
                <img :src="editForm.traffic.avatar" style="display:block;margin:0 auto;width:100%;">
              </template>
            </div>
          </el-form-item>
        </el-form-item>
        <div v-for="(item,index) in editForm.orderGoods" :key="index" v-if="editForm.orderGoods" :rules="rules">
          <el-row>
            <el-col :span='7'>
              <el-form-item label="材质：" prop="material">
                <el-select	v-model='item.material'>
                  <el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="款式：" prop="style">
                <el-select v-model="item.style">
                  <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item label='成交金额：' prop="price" >
                <el-input v-model='item.price'  v-on:input='editInputFun()' ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='1'>
              <div  class='deleproduct'>
                <div>
                  <el-button @click='editDeleProduct(index)'>删除</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="addproduct">
          <div>
            <el-form-item label=''>
              <el-button @click='editAddProduct()'>新增商品</el-button>
            </el-form-item>
          </div>
        </div>
        <div class="totalAll">
          <p>共计
            <input v-model='editAllNum' class='totalNumber' :disabled='true'/>件,总价
            <input v-model="editForm.price" class='totalPrice' :disabled='true' />元
          </p>
        </div>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="小票" v-model="editForm.avatar">
          <div :model="editForm.avatar" :visible.sync="editImgVisible">
            <div class="editImg" v-for="item in editForm.avatar">
              <img :src="item" width="100%"/>
            </div>
          </div>
          <el-upload v-model="item.file"
                     :action="importFileUrl()"
                     list-type="picture-card"
                     :data="upLoadData"
                     :on-preview="editHandlePictureCardPreview"
                     :on-remove="editHandleRemove"
                     :onSuccess="editUploadSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelE()">取 消</el-button>
        <el-button type="primary" @click="EditFormSubmit()">确 定</el-button>
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
  import apiUrl from '../../config/API.js'
  const SERVER_IP = apiUrl.apiUrl
  const COMMON = 'v1'
  //图片上传
  global.IMAGS_PUSH = `${SERVER_IP}${COMMON}/user/upload`
  export default {
		name:'guest-list',
		components: {
		},
		data() {
			return{
        upLoadData: {
          access_token: localStorage.getItem('knock_knock'),
        },
        imageListF:[],
        allNum:'1',
        totalMoney:0,
        faceSearch:{
          avatar:'',
          customer_id:'',
        },
        searchFace:{
          id:'',
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
        createdTimes:['',''],
        dialogTitle: '',
        requestParameters: {
          page: 1,
          page_size:20,
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
          files_web:'',
          customer_id:'',
          remark:''
        },
        editForm:{
          traffic:{
            id:'',
            avatar:'',
          },
          orderGoods:[],
          cash_t:'15151515',
          avatar:'',
          price:'',
        },
        editAllNum:'',
        editImgAvatar:[],
        editRequestParameters:[],
        editImgVisible:false,
        FormVisible: false,
        editVisible:false,
        rules:{
          cash_t: [
            { required: true,message: '请选择创建时间', trigger: 'blur' }
          ],
          faceID:[
            { message: '请输入人脸信息', trigger: 'blur' }
          ],
          material: [
            { message: '请选择材质信息', trigger: 'blur' }
          ],
          style:[
            { message: '请选择款式信息', trigger: 'blur' },
          ],
          // price:[
          //   {required: true,message: '请输入商品价格', trigger: 'blur'},
          // ],
        },
      }
		},
		created: function () {
		 this.orderList();
		 this.getAll();

		},
    methods: {
      //  上传图片动态地址
      importFileUrl(){
        return global.IMAGS_PUSH
      },
      // 新增 上传图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        this.$data.imageListF.push(response.data.path);
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
      //编辑--上传图片的删除、添加地址
      editHandleRemove(file, fileList) {
        console.log(file, fileList);
      },
      editHandlePictureCardPreview(file) {
        console.log(file,11111);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 编辑上传图片成功后的回调
      editUploadSuccess (response, file, fileList) {
          for(let i=0;i<this.$data.editForm.avatar.length;i++){
            this.$data.editImgAvatar.push(this.$data.editForm.avatar[i]);
          }
          this.$data.editImgAvatar.push(response.data.fullpath);
      },
      //列表
      orderList(){
        this.$data.requestParameters.cash_t_start = utils.getDateTime(this.$data.cashTimes[0]);
        this.$data.requestParameters.cash_t_end = utils.getDateTime(this.$data.cashTimes[1]);
        this.$data.requestParameters.created_at_start = utils.getDateTime(this.$data.createdTimes[0]);
        this.$data.requestParameters.created_at_end = utils.getDateTime(this.$data.createdTimes[1]);
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
      //新增订单显示
      addNewList(){
        this.$data.FormVisible = true;
      },
      // 编辑显示列表
      fnEdit (row) {
        this.$data.editVisible = true;
        this.orderView(row.id);
        this.editList(row.orderGoods);

      },
      orderView(id){
        let qs = require('querystring')
        OrderApi.orderView(qs.stringify({id:id,})).then((res) => {
          if(res.data.errno === 0){
            this.$data.editForm = res.data.data;
            this.$data.editVisible = true;
            // console.log(res.data.data.cash_t);
            let s = this.moment(1532511781).format("YYYY-MM-DD HH:mm:ss");
            console.log(s);
            console.log(this.moment(1532509629).format('YYYY-MM-DD HH:mm:ss'))
            this.$data.editAllNum = this.$data.editForm.orderGoods.length;
            if(this.$data.editForm.avatar != null){
              this.$data.editImgVisible = true;
            }else{
              this.$data.editImgVisible = false;
            }
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      editList(orderGoods){
        for(let i=0;i<orderGoods.length;i++){
          let obj = {
            'material':orderGoods[i].material,
            'style': orderGoods[i].style,
            'price':orderGoods[i].price,
          };
          this.$data.editRequestParameters.push(obj);
        }
        console.log(this.$data.editRequestParameters);
      },
      //编辑计算总价
      editInputFun(){
        let n = 0;
        for(let i=0;i<this.$data.editForm.orderGoods.length;i++){
          if(this.$data.editForm.orderGoods[i].price.replace(/[^\.\d]/g,'')){
            n += parseInt(this.$data.editForm.orderGoods[i].price);
          }else{
            this.$data.editForm.orderGoods[i].price=0;
          }
        }
        this.$data.editForm.price = n;
      },
      //编辑添加商品
      editAddProduct(){
        let obj = {
          material : null,
          style : null,
          price:''
        }
        this.$data.editForm.orderGoods.push(obj);
        this.$data.editAllNum =  this.$data.editForm.orderGoods.length;
      },
      //编辑删除商品
      editDeleProduct(index){
        this.$data.editForm.orderGoods.splice(index,1);
        let n = 0;
        for(let i=0;i<this.$data.editForm.orderGoods.length;i++){
          if(this.$data.editForm.orderGoods[i].price.replace(/[^\.\d]/g,'')){
            n += parseInt(this.$data.editForm.orderGoods[i].price);
          }else{
            this.$data.editForm.orderGoods[i].price=0;
          }
        }
        this.$data.editForm.price = n;
        this.$data.editAllNum =  this.$data.editForm.orderGoods.length;
      },
      //编辑查询人脸信息
      editFindFaceId(){
        let list = {
          'id':this.$data.editForm.traffic.id,
        }
        let qs = require('querystring');
        OrderApi.findFaceId(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.$data.editForm.traffic.avatar = res.data.data.avatar;
            this.$data.editForm.traffic.customer_id = res.data.data.customer_id;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      //编辑提交，取消
      EditFormSubmit(){
        console.log(this.$data.editRequestParameters)
        let listArry = '';
        if(this.$data.editImgAvatar.length == 0){
          listArry = '';
        }else{
          listArry =  this.$data.editImgAvatar.join(',');
        }
        let sendA = JSON.stringify(this.$data.editRequestParameters);
        let list = {
          'id': this.$data.editForm.id,
          'goods_info':sendA,
          'cash_t':this.$data.editForm.cash_t,
          'remark':'',
          'files_web':this.$data.editForm.avatar,
          'avatar':listArry,
          'customer_id':this.$data.editForm.traffic.customer_id
        }
        let qs = require('querystring');
        OrderApi.editOrder(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.$data.editForm ={
              traffic:{
                id:'',
                avatar:'',
              },
              orderGoods:[],
              cash_t:'',
              avatar:'',
              price:'',
            }
            console.log(this.$data.editForm);
            this.orderList();
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.$data.editVisible = false;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      cancelE(){
        this.$data.editVisible = false;
        this.$data.editForm ={
          traffic:{
            id:'',
            avatar:'',
          },
          orderGoods:[],
            cash_t:'',
            avatar:'',
            price:'',
        }
        console.log(this.$data.editForm)
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
      //查询人脸ID
      findFaceId(){
        let list = {
          'id':this.$data.searchFace.id,
        }
        let qs = require('querystring');
        OrderApi.findFaceId(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.$data.faceSearch.avatar = res.data.data.avatar;
            this.$data.faceSearch.customer_id = res.data.data.customer_id;
            // this.$data.faceSearch.customer_id
            console.log(this.$data.faceSearch.customer_id,22222)
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
      //添加订单--删除商品
      deleProduct(index){
        this.$data.addProList.splice(index,1);
        let n = 0;
        for(let i=0;i<this.$data.addProList.length;i++){
          if(this.$data.addProList[i].price.replace(/[^\.\d]/g,'')){
            n += parseInt(this.$data.addProList[i].price);
          }else{
            this.$data.addProList[i].price=0;
          }
        }
        this.$data.totalMoney = n;
        this.$data.allNum =  this.$data.addProList.length;
      },
      //创建新订单
      submitForm(formName){
        let listArry =  this.$data.imageListF.join(',');
        let sendData = JSON.stringify(this.$data.addProList);
        let list = {
          'goods_info':sendData,
          'cash_t':this.$data.formName.cash_t,
          'remark':'',
          'files_web':listArry,
          'customer_id':this.$data.faceSearch.customer_id
        }
        let qs = require('querystring');
        OrderApi.addOrder(qs.stringify(list)).then((res) => {
          if(res.data.errno === 0){
            this.orderList();
            this.$data.formName = {
              goods_info: [],
              cash_t:'',
              files_web:'',
              customer_id:'',
              remark:''
            };
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
      },

      //实时录单
      realTime(){
        console.log(0);
        this.$router.push({path:'/realFound'})
      },

	    }
    }
</script>
<style lang="scss" scoped>
    .guest-list-page{
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
          .totalNumber, .totalPrice{
            padding:0;
            margin:0 3px;
            width:100px;
            height:40px;
            border-radius: 3px;
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
      .deleproduct{
        margin-left:20px;
      }
      .editImg{
        width: 150px;
        height:150px;
        border-radius:3px;
        display: inline-block;
        border: 1px solid #eee;
        padding: 15px;
        box-sizing:border-box;
        margin-right: 15px;
      }
    }


</style>


