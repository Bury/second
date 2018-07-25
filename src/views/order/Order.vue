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
				<el-form-item label="金额：">
					<el-col :span="11">
						<el-input v-model="requestParameters.price_start"></el-input>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-input v-model="requestParameters.price_end"></el-input>
					</el-col>
			  </el-form-item>
        <el-form-item label="新客/熟客：">
          <el-select v-model="requestParameters.level" placeholder="新客/熟客">
              <el-option v-for="(item, idx) in allGuestVisitClass" :key="idx" :label="item" :value="idx"></el-option>
            </el-select>
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
		    <el-table-column fixed prop="sn" label="编号" width="170"></el-table-column>
		    <el-table-column label="材质/款式" width="160">
					<template slot-scope="scope">
					<span v-for="good in scope.row.orderGoods" class="margin">[{{good.material_name}}/{{good.style_name}}]</span>
		    	</template>
				</el-table-column>
		    <el-table-column prop="price" label="金额" width="120"></el-table-column>
		    
		    <el-table-column label="客户" width="140">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.traffic.avatar" style="display:block;margin:0 auto;width:100%;">
            </div>
            <div>
              ID:{{scope.row.traffic.id}}
            </div>
            <div>
              姓名:{{scope.row.customer_name}}
            </div>
            <div>
              类型:{{scope.row.traffic.is_new == 1 ?'新客':'熟客'}}
            </div>
          </template>
		    </el-table-column>
        <el-table-column label="收银时间" width="160">
		    	<template slot-scope="scope">
		    		{{scope.row.cash_t | date(4)}}
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
        <el-button @click="cancelE(editForm)">取 消</el-button>
        <el-button type="primary" @click="EditFormSubmit(editForm)">确 定</el-button>
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



