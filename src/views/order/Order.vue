<template>
  <div class="guest-list-page">
    <div class="top-box" ref="topBox">
      <div style="display: flex;">
        <div class="left" style="width: 75%;">
          <el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
            <el-row>
              <el-form-item label="编号：">
                <el-input v-model.trim="requestParameters.sn" onclick="clickTotal('009','编号',1)"></el-input>
              </el-form-item>
              <el-form-item label="材质：">
                <el-select v-model="requestParameters.material" placeholder="请选择材质" onclick="clickTotal('010','材质',1)">
                  <el-option label="全部" value="">全部</el-option>
                  <el-option v-for="material in materials" :key="material.id" :label="material.name"
                             :value="material.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="款式：">
                <el-select v-model="requestParameters.style" placeholder="请选择款式"  onclick="clickTotal('011','款式',1)">
                  <el-option label="全部" value="">全部</el-option>
                  <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row v-if="visibled">
              <el-form-item label="客户类型：">
                <el-select v-model="requestParameters.visited" placeholder="新客/熟客" onclick="clickTotal('012','客户类型',1)">
                  <el-option v-for="(item, idx) in allGuestVisitClass" :key="idx" :label="item" :value="idx"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="金额：">
                <el-col :span="11">
                  <el-input v-model.trim="requestParameters.price_start" onclick="clickTotal('013','金额',1)"></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="11">
                  <el-input v-model.trim="requestParameters.price_end" onclick="clickTotal('013','金额',1)"></el-input>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row v-if="visibled">
              <el-form-item label="收银时间：">
                <el-date-picker :picker-options="pickerOptionsSet"
                                v-model="cash_time_start"
                                type="date"
                                placeholder="开始时间"
                                :clearable=false
                                onclick="clickTotal('014','收银开始时间',1)">
                </el-date-picker>
                -
                <el-date-picker :picker-options="pickerOptionsSet"
                                v-model="cash_time_end"
                                type="date"
                                placeholder="结束时间"
                                :clearable=false
                                onclick="clickTotal('0141','收银结束时间',1)">
                </el-date-picker>
              </el-form-item>
            </el-row>
            <el-row v-if="visibled">
              <el-form-item label="创建时间：">
                <el-date-picker :picker-options="pickerOptionsSet"
                                v-model="create_time_start"
                                type="date"
                                placeholder="开始时间"
                                :clearable=false
                                onclick="clickTotal('015','创建开始时间',1)">
                </el-date-picker>
                -
                <el-date-picker :picker-options="pickerOptionsSet"
                                v-model="create_time_end"
                                type="date"
                                placeholder="结束时间"
                                :clearable=false
                                onclick="clickTotal('0151','创建结束时间',1)">
                </el-date-picker>
              </el-form-item>
            </el-row>
          </el-form>
        </div>

        <div class="right">
          <el-button plain size="mini" @click="lists" onclick="clickTotal('016','订单管理查询',1)">查询</el-button>
          <el-button plain size="mini" @click="fnReset" onclick="clickTotal('017','订单管理重置',1)">重置</el-button>
        </div>
      </div>
      <div class="movement">
        <div class="movement_image" v-if="bottom"  @click="movementBottom">
          <img src="../../assets/images/bottom.png" />
        </div>
        <div class="movement_image" v-if="top" @click="movementTop">
          <img src="../../assets/images/top.png" />
        </div>
      </div>
    </div>

    <div style="text-align:right;background: #fff;padding:2rem 3rem 1rem;">
      <el-button size="mini" plain @click="orderVideo" onclick="clickTotal('018','订单开单',2)">开单</el-button>
    </div>

    <div style="padding: 1rem;background: #fff;">
      <table width="99%" class="table">
        <thead style="background: #fafafa;border: 1px solid #f5f5f5;border-bottom: 0;">
        <tr height="50px">
          <th class="col-md-1 text-center">序号</th>
          <th class="col-md-1 text-center">编号</th>
          <th class="col-md-1 text-center">材质/款式</th>
          <th class="col-md-1 text-center">金额</th>
          <th class="col-md-2 text-center">客户</th>
          <th class="col-md-2 text-center">收银时间</th>
          <!--<th class="col-md-1 text-center">创建时间</th>-->
          <th class="col-md-2 text-center">操作</th>
        </tr>
        </thead>

        <tbody style="text-align: center">
        <tr v-for="(item,index) in tableData" :key="index" height="50px">
          <td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
          <td>{{item.sn}}</td>
          <td>
            <span v-for="good in item.orderGoods" class="margin">[{{good.material_name}}/{{good.style_name}}]</span>
          </td>
          <!--<td>{{parseFloat(item.price,2)}}</td>-->
          <td>{{item.price | numbersFilter}}</td>
          <td>
            <div style="width: 100%;display: flex;padding: 5%;text-align: center">
              <div style="width:30%;margin-left: 2rem;">
                <img :src="item.traffic_avatar" style="width:100%;">
              </div>
              <div style="width:55%;text-align:left;margin-left: 1rem;">
                ID:{{item.traffic.customer_id}}<br/>
                姓名:{{item.customer_name}}<br/>
                类型:{{item.traffic.is_new == 1 ?'新客':'熟客'}}
              </div>
            </div>
          </td>
          <td>{{item.cash_t | date(4)}}</td>
          <!--<td>{{item.created_at | date(4)}}</td>-->
          <td class="handle">
            <div>
              <div>
                <i class="iconfont icon1 el-icon-yy-chakan" @click="fnView(item)"  onclick="clickTotal('019','订单管理查看',1)"></i>
              </div>
              <div><i class="iconfont icon2 el-icon-yy-Group-" @click="fnEdit(item)" onclick="clickTotal('020','订单管理编辑',1)"></i></div>
              <div><i class="iconfont icon3 el-icon-yy-shanchu" @click="fnRemove(item)" onclick="clickTotal('021','订单管理删除',1)" ></i></div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="noData" v-if="noData" style="text-align: center;margin-top:2rem;font-size: 1.4rem;">暂无数据~</div>
      <!-- 分页 -->
      <div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;height: 4rem;background: #fff;text-align: center">
        <el-pagination
          style="font-family: '微软雅黑';font-weight: 100;"
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

    <!--编辑-->
    <el-dialog title="编辑" center :visible.sync="editVisible" :before-close="dialogCloseEdit">
      <el-form :model='editForm' ref="editForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收银时间：" prop="cash_t">
          <el-date-picker
            disabled size="mini"
            v-model="editForm.cash_t"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人脸编号：" prop="faceID">
          <el-row>
            <el-col :span='10'>
              <el-input size="mini" v-model.trim="editForm.traffic.customer_id"></el-input>
            </el-col>
            <el-col :span='2'>
              <el-button plain size="mini" style="margin-left: 1rem;" @click="editFindGuestByFaceId()" onclick="clickTotal('0201','人脸编号',1)">查询</el-button>
            </el-col>
          </el-row>
          <el-form-item :data="faceSearch">
            <div style="width:200px;height:200px;border:1px solid #eee;margin:2rem 0 1rem 0;">
              <template>
                <img :src="editForm.traffic.avatar" style="display:block;margin:0 auto;width:100%;" prop="avatar">
              </template>
            </div>
          </el-form-item>
        </el-form-item>
        <div v-for="(item,index) in editRequestParameters" :key="index" v-if="editRequestParameters">
          <el-row>
            <el-col :span='7'>
              <el-form-item label="材质:">
                <el-select size="mini" v-model='item.material ' onclick="clickTotal('0202','编辑材质',1)">
                  <el-option v-for="material in materials" :key="material.id" :label="material.name"
                             :value="material.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="款式:">
                <el-select size="mini" v-model="item.style" onclick="clickTotal('0203','编辑款式',1)">
                  <el-option v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label='成交金额:'>
                <input class="inputStyle" type="number" v-model="item.price" v-on:input="editInputFun()"onclick="clickTotal('0204','编辑金额',1)" value="0" oninput="if(value.length>7)value=value.slice(0,7)"></input>
                <!--<el-input size="mini" v-model.trim='item.price' v-on:input='editInputFun()' onclick="clickTotal('0204','编辑金额',1)"></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span='1'>
              <div class='deleproduct'>
                <div v-if="editRequestParameters.length > 1" @click="editDeleProduct(index)">
                  <img src="@/assets/images/dele.png" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="addproduct">
          <el-row style="margin-bottom: 2rem;text-align: center;">
            <div @click='editAddProduct()' onclick="clickTotal('0205','新增商品',1)">
              <img src="@/assets/images/plus.png" style="margin-right: 1rem;"/>添加商品
            </div>
          </el-row>
        </div>
        <div class="totalAll">
          <el-form-item label="总计:">
            共<input v-model='editAllNum' class='totalNumber'/>件,总价
            <input v-model="editForm.price" class='totalPrice'/>元
          </el-form-item>
        </div>
        <el-form-item label="小票:" v-model="editForm.avatar">
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
                     :onSuccess="editUploadSuccess"
                     onclick="clickTotal('0206','编辑小票',1)">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="备注:" prop="type" style="margin-top: 1rem;">
          <el-input
            type="textarea"
            maxlength=200
            placeholder="请输入内容"
            v-model="editForm.remark"
            onclick="clickTotal('0207','编辑备注',1)">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelE()">取 消</el-button>
        <el-button size="mini" @click="EditFormSubmit(editForm)" v-show="isForChange" onclick="clickTotal('0208','编辑确定',1)">确 定</el-button>
      </div>
    </el-dialog>

    <!--查看-->
    <el-dialog title="查看" center :visible.sync="viewVisible" :before-close="viewDialogClose">
      <el-form :model='editForm' ref="editForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收银时间:">
          <el-date-picker disabled size="mini"
            v-model="editForm.cash_t"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人脸编号:">
          <el-row>
            <el-col :span='10'>
              <el-input size="mini" v-model="editForm.traffic.customer_id" disabled></el-input>
            </el-col>
          </el-row>
          <el-form-item :data="faceSearch">
            <div style="width:200px;height:200px;border:1px solid #eee;margin:2rem 0 1rem 0;">
              <template>
                <img :src="editForm.traffic.avatar" style="display:block;margin:0 auto;width:100%;" prop="avatar" @click="imgView($event)">
              </template>
            </div>
          </el-form-item>
        </el-form-item>
        <div v-for="(item,index) in editForm.orderGoods" :key="index" v-if="editForm.orderGoods">
          <el-row>
            <el-col :span='7'>
              <el-form-item label="材质:">
                <el-input size="mini" v-model="item.material_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label="款式:">
                <el-input size="mini" v-model="item.style_name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='7'>
              <el-form-item label='成交金额:'>
                <el-input size="mini" v-model='item.price' disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
          <el-form-item label="总计:">
            共<input v-model='editAllNum' class='totalNumber' :disabled='true' prop="editAllNum"/>件,总价
            <input v-model="editForm.price" class='totalPrice' :disabled='true' prop="price"/>元
          </el-form-item>
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
          <el-input disabled v-if="editForm.remark"
            type="textarea"
            v-model="editForm.remark">
          </el-input>
          <span v-else>暂无备注</span>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="viewClose()">取 消</el-button>
      </div>
    </el-dialog>

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



