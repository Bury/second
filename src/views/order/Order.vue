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
            <el-option v-for="material in materials" :key="material.id" :label="material.name"
                       :value="material.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="款式：">
          <el-select v-model="requestParameters.style" placeholder="请选择款式">
            <el-option label="全部" value="">全部</el-option>
            <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新客/熟客：">
          <el-select v-model="requestParameters.visited" placeholder="新客/熟客">
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
          <el-date-picker :picker-options="pickerOptionsSet"
            v-model="cashTimes"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-date-picker :picker-options="pickerOptionsSet"
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
      <el-button type="primary" @click="orderLive">现场开单(拍摄)</el-button>
      <el-button type="primary" @click="orderVideo">现场开单(视频流)</el-button>
      <el-button type="primary" @click="orderNotLive">补单</el-button>
    </div>

    <table width="99%" class="table">
      <thead>
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
        <!--<td>{{parseFloat(item.price,2)}}</td>-->
        <td>{{item.price | numberFilter}}</td>
        <td>
          <div style="width: 100%;display: flex;padding: 5%;">
            <div style="width:45%;">
              <img :src="item.traffic.avatar" style="width:100%;">
            </div>
            <div style="width:55%;padding:5% 0 0 8%;text-align:left">
              ID:{{item.traffic.customer_id}}<br/>
              姓名:{{item.customer_name}}<br/>
              类型:{{item.traffic.is_new == 1 ?'新客':'熟客'}}
            </div>
          </div>
        </td>
        <td>{{item.cash_t | date(4)}}</td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button @click="fnView(item)" type="text" size="small">查看</el-button>
          <el-button @click="fnEdit(item)" type="text" size="small">编辑</el-button>
          <el-button @click="fnRemove(item)" type="text" size="small">删除</el-button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="noData" v-if="noData" style="text-align: center;margin-top:2rem;font-size: 1.4rem;">暂无数据~</div>    <!--补单-->
    <!--补单-->
    <el-dialog title="补单" :visible.sync="FormVisible" :before-close="dialogClose">
      <el-form :model='formName' ref="formName" :rules="fromRules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收银时间："  prop="cash_t">
          <el-date-picker
            v-model="formName.cash_t"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人脸编号：" :model="searchFace">
          <el-row>
            <el-col :span='7'>
              <el-input v-model="searchFace.id"  prop="id"></el-input>
              <!--<input type="number" class="input" v-model="searchFace.id" maxlength="5" v-on:input="getMoneyb(form.moneyb)"  placeholder=""-->
                     <!--onkeyup="this.value=this.value.replace(/\.\d{2,}$/,this.value.substr(this.value.indexOf('.'),3))" />-->
              <!--</el-input>-->
            </el-col>
            <el-col :span='7' style="margin-left: 10px;">
              <el-button @click="findGuestByFaceId()">查询</el-button>
            </el-col>
          </el-row>
          <el-form-item :data="faceSearch">
            <div style="width:200px;height:200px;border:1px solid #eee;margin-top:40px;margin-left: 0px;"
                 v-if="faceVisible">
              <template>
                <img :src="faceSearch.avatar" style="display:block;margin:0 auto;width:100%;" prop="avatar">
              </template>
            </div>
          </el-form-item>
        </el-form-item>
        <div v-for="(item,index) in addProList" :key="index" v-if="addProList">
          <el-row type="flex">
            <el-col :span="7" style="padding: 0;margin: 0;">
              <el-form-item label="材质：" prop="material" label-width="80px">
                <el-select v-model='item.material' >
                  <el-option v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="padding: 0;margin: 0;">
              <el-form-item label="款式：" prop="style" label-width="80px">
                <el-select v-model="item.style">
                  <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="padding: 0;margin: 0;">
              <el-form-item label='成交金额：' prop="price"  label-width="100px">
                <!--<el-input v-model='item.price' v-on:input='inputFun(item.price)'></el-input>-->
                <!--<input type="number" class="input" v-model="item.price"-->
                       <!--v-on:input="inputFun(item.price)"  placeholder=""-->
                       <!--onkeyup="this.value=this.value.replace(/\.\d{2,}$/,this.value.substr(this.value.indexOf('.'),3))" />-->
                <!--<input type="text" class="input" v-model="form.moneya"  maxlength="11"-->
                       <!--onkeyup="this.value=this.value.replace(/\D/g,'')"-->
                       <!--onafterpaste="this.value=this.value.replace(/\D/g,'')"/>-->
                <el-input v-model.trim="item.price" v-on:input="inputFun(index)" value="" :maxlength="inputMaxL">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span='1' style="padding: 0;margin: 0;">
              <div class='deleproduct'>
                <div>
                  <el-button v-if="addProList.length > 1" @click='deleProduct(index)'>删除</el-button>
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
            <input v-model="totalMoney" class='totalPrice' :disabled='true'/>元
          </p>
        </div>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="小票" v-model="imageListF">
          <el-upload  v-model="item.file"
          	         :limit = 3
                     ref='upload'
                     :action="importFileUrl()"
                     list-type="picture-card"
                     :data="upLoadData"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :onSuccess="uploadSuccess"
                     :on-exceed="handleExceed"
                     :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注:" prop="type">
          <el-input
            type="textarea"
            autosize
            maxlength=200
            placeholder="请输入内容"
            v-model="formName.remark">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel(formName)">取 消</el-button>
        <el-button type="primary" @click="submitForm(formName)">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog :title="takeTitle" :visible.sync="editVisible" :before-close="dialogCloseEdit">
      <el-form :model='editForm' ref="editForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收银时间：" prop="cash_t">
          <el-date-picker
            v-model="editForm.cash_t"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人脸编号：" prop="faceID">
          <el-row>
            <el-col :span='10'>
              <el-input v-model="editForm.traffic.customer_id"></el-input>
            </el-col>
            <el-col :span='2'>
              <el-button @click="editFindGuestByFaceId()">查询</el-button>
            </el-col>
          </el-row>
          <el-form-item :data="faceSearch">
            <div style="width:200px;height:200px;border:1px solid #eee;margin-top:60px;">
              <template>
                <img :src="editForm.traffic.avatar" style="display:block;margin:0 auto;width:100%;" prop="avatar">
              </template>
            </div>
          </el-form-item>
        </el-form-item>
        <div v-for="(item,index) in editRequestParameters" :key="index" v-if="editRequestParameters" :rules="rules">
          <el-row>
            <el-col :span='7'>
              <el-form-item label="材质：" prop="material" label-width="60px">
                <el-select v-model='item.material'>
                  <el-option v-for="material in materials" :key="material.id" :label="material.name"
                             :value="material.id"></el-option>
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
              <el-form-item label='成交金额：' prop="price">
                <el-input v-model='item.price' v-on:input='editInputFun()'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='1'>
              <div class='deleproduct'>
                <div>
                  <el-button v-if="editRequestParameters.length > 1" @click='editDeleProduct(index)'>删除</el-button>
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
          <el-upload
          	         ref="upload"
          	         v-model="item.file"
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
        <el-form-item label="备注:" prop="type">
          <el-input
            type="textarea"
            maxlength=200
            placeholder="请输入内容"
            v-model="editForm.remark">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelE()">取 消</el-button>
        <el-button type="primary" @click="EditFormSubmit(editForm)" v-show="isForChange">确 定</el-button>
      </div>
    </el-dialog>

    <!--查看-->
    <el-dialog title="查看" :visible.sync="viewVisible">
      <el-form :model='editForm' ref="editForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收银时间：" prop="cash_t">
          <el-date-picker disabled
            v-model="editForm.cash_t"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人脸编号：" prop="faceID">
          <el-row>
            <el-col :span='10'>
              <el-input v-model="editForm.traffic.customer_id" disabled></el-input>
            </el-col>
          </el-row>
          <el-form-item :data="faceSearch">
            <div style="width:200px;height:200px;border:1px solid #eee;margin-top:60px;">
              <template>
                <img :src="editForm.traffic.avatar" style="display:block;margin:0 auto;width:100%;" prop="avatar" @click="imgView($event)">
              </template>
            </div>
          </el-form-item>
        </el-form-item>
        <div v-for="(item,index) in editForm.orderGoods" :key="index" v-if="editForm.orderGoods" :rules="rules">
          <el-row>
            <el-col :span='7'>
              <el-form-item label="材质：" prop="material" label-width="60px">
                <el-select v-model='item.material' disabled>
                  <el-option v-for="material in materials" :key="material.id" :label="material.name"
                             :value="material.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="款式：" prop="style" label-width="60px">
                <el-select v-model="item.style" disabled>
                  <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label='成交金额：'>
                <p class="numberPrice">{{item.price | numberFilter}}</p>
                <!--<el-input v-model='' v-on:input='editInputFun()' disabled></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>
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
        <el-form-item label="小票:" v-model="editForm.avatar">
          <div :model="editForm.avatar" :visible.sync="editImgVisible">
          	<template v-if='editForm.avatar.length > 0'>
          		<div class="editImg" v-for="item in editForm.avatar">
                <img :src="item" width="100%" height="100%"  @click="imgView($event)"/>
              </div>
          	</template>
          	<span v-else>暂无小票</span>

          </div>
        </el-form-item>
        <el-form-item label="备注:" prop="type">
          <el-input disabled
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="editForm.remark">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewClose()">取 消</el-button>
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
    <!--查看放大图片-->
    <el-dialog :visible.sync="imgViewVisible">
      <div  class="imgView">
        <img :src="imgViewBig">
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/assets/js/order/Order.js"></script>

<style lang="scss" scoped src="@/assets/css/order/Order.scss">



