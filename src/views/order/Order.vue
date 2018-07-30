<template>
	  <div class="guest-list-page">
		<div class="top-box">
			<el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
			  <el-form-item label="编号：">
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
        <el-form-item label="新客/熟客：">
          <el-select v-model="requestParameters.level" placeholder="新客/熟客">
              <el-option v-for="(item, idx) in allGuestVisitClass" :key="idx" :label="item" :value="idx"></el-option>
            </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="金额：">
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
			    <el-button type="primary" @click="lists">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>

		<div style="text-align:right;border-top:1px solid #dcdfe6;padding:20px 0;">
			<el-button type="primary" @click="orderLive">现场开单</el-button>
			<el-button type="primary" @click="addNewList()">补单</el-button>
		</div>

    <table width="99%" class="table-bordered">
      <thead style="background-color: #d1d1d1">
        <tr height="40">
          <th class="col-md-1 text-center">序号</th>
          <th class="col-md-2 text-center">编号</th>
          <th class="col-md-2 text-center">材质/款式</th>
          <th class="col-md-1 text-center">金额</th>
          <th class="col-md-2 text-center">客户</th>
          <th class="col-md-1.5 text-center">收银时间</th>
          <th class="col-md-1.5 text-center">创建时间</th>
          <th class="col-md-1 text-center">操作</th>
        </tr>
      </thead>
      <tbody style="text-align: center">
        <tr v-for="(item,index) in tableData" :key="index" height="40">
          <td>{{item.id}}</td>
          <td>{{item.sn}}</td>
          <td>
            <span v-for="good in item.orderGoods" class="margin">[{{good.material_name}}/{{good.style_name}}]</span>
          </td>
          <td>{{parseFloat(item.price,2)}}</td>
          <td>
            <div style="width: 100%;display: flex;padding: 5%;">
            <div style="width:45%;">
              <img :src="item.traffic.avatar" style="width:100%;">
            </div>
            <div style="width:55%;padding:5% 0 0 8%;text-align:left">
              ID:{{item.traffic.id}}<br/>
              姓名:{{item.customer_name}}<br/>
              类型:{{item.traffic.is_new == 1 ?'新客':'熟客'}}
            </div>
            </div>
          </td>
          <td>{{item.cash_t | date(4)}}</td>
          <td>{{item.created_at | date(4)}}</td>
          <td>
            <el-button @click="fnEdit(item)" type="text" size="small">编辑</el-button>
            <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <!--补单-->
    <el-dialog title="补单" :visible.sync="FormVisible">
      <el-form :model='formName' ref="formName" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收银时间：" prop="cash_t">
          <el-date-picker
            v-model="formName.cash_t"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人脸ID：" :model="searchFace" prop="id">
          <el-row>
            <el-col :span='12'><el-input v-model="searchFace.id" prop="id"></el-input></el-col>
            <el-col :span='2'><el-button @click="findGuestByFaceId()">查询</el-button></el-col>
          </el-row>
          <el-form-item :data="faceSearch">
            <div style="width:200px;height:200px;border:1px solid #eee;margin-top:60px;" v-if="false">
              <template>
                <img :src="faceSearch.avatar" style="display:block;margin:0 auto;width:100%;" prop="avatar">
              </template>
            </div>
          </el-form-item>
        </el-form-item>
        <div v-for="(item,index) in addProList" :key="index" v-if="addProList" :rules="rules">
          <el-row type="flex">
            <el-col :span="7" style="padding: 0;margin: 0;">
              <el-form-item label="材质：" prop="material" label-width="60px">
                <el-select	v-model='item.material'>
                  <el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7"  style="padding: 0;margin: 0;">
              <el-form-item label="款式：" prop="style" label-width="60px">
                <el-select v-model="item.style">
                  <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="padding: 0;margin: 0;">
              <el-form-item label='成交金额：'>
                <el-input v-model='item.price'  v-on:input='inputFun()' ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='1' style="padding: 0;margin: 0;">
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
        <el-form-item label="小票" v-model="imageListF">
          <el-upload v-model="item.file"
                     :action="importFileUrl()"
                     list-type="picture-card"
                     :data="upLoadData"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :onSuccess="uploadSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!--<el-dialog :visible.sync="dialogVisible">-->
            <!--<img width="100%" :src="dialogImageUrl" alt="" prop="imageListF">-->
          <!--</el-dialog>-->
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel(formName)">取 消</el-button>
        <el-button type="primary" @click="submitForm(formName)">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑-->
    <el-dialog title="编辑" :visible.sync="editVisible" >
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
            <el-col :span='12'><el-input v-model="editForm.traffic.id" prop="id"></el-input></el-col>
            <el-col :span='2'><el-button @click="editFindGuestByFaceId()">查询</el-button></el-col>
          </el-row>
          <el-form-item :data="faceSearch">
            <div style="width:200px;height:200px;border:1px solid #eee;margin-top:60px;">
              <template>
                <img :src="editForm.traffic.avatar" style="display:block;margin:0 auto;width:100%;" prop="avatar">
              </template>
            </div>
          </el-form-item>
        </el-form-item>
        <div v-for="(item,index) in editForm.orderGoods" :key="index" v-if="editForm.orderGoods" :rules="rules">
          <el-row>
            <el-col :span='7'>
              <el-form-item label="材质：" prop="material" label-width="60px">
                <el-select	v-model='item.material'>
                  <el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="款式：" prop="style" label-width="60px">
                <el-select v-model="item.style">
                  <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
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
            <input v-model='editAllNum' class='totalNumber' :disabled='true' prop="editAllNum"/>件,总价
            <input v-model="editForm.price" class='totalPrice' :disabled='true' prop="price"/>元
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

<script src="@/assets/js/order/Order.js"></script>

<style lang="scss" scoped src="@/assets/css/order/Order.scss">



