<template>
	<div class="remind-list-page">
    <div class="top-box"  ref="topBox" v-show="topBox">
      <div style="display: flex;" v-show="topBoxShow">
        <div class="left" style="width: 75%;" >
          <el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
            <el-row>
              <el-form-item label="进店时间：">
                <el-date-picker :picker-options="pickerOptionsSet"
                                v-model="store_visited_start"
                                type="date"
                                placeholder="开始时间"
                                :clearable=false
                                onclick="clickTotal('001','进店开始时间',1)">
                </el-date-picker>
                -
                <el-date-picker :picker-options="pickerOptionsSet"
                                v-model="store_visited_end"
                                type="date"
                                placeholder="结束时间"
                                :clearable=false
                                onclick="clickTotal('0011','进店结束时间',1)">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="客户类型：">
                <el-select v-model="requestParameters.visited" placeholder="新客/熟客" onclick="clickTotal('002','客户类型',1)">
                  <el-option v-for="(item, idx) in allGuestVisitClass" :key="idx" :label="item" :value="idx"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row v-if="visibled">
              <el-form-item label="消费状态：">
                <el-select v-model="requestParameters.bought" placeholder="未购/已购" onclick="clickTotal('003','消费状态',1)">
                  <el-option v-for="(item, idx) in allGuestBoughtClass" :key="idx" :label="item" :value="idx"></el-option>
                </el-select>
              </el-form-item>
              <!--<el-form-item label="年龄：">-->
              <!--<el-select v-model="requestParameters.age" placeholder="年龄" onclick="clickTotal('004','年龄',1)">-->
              <!--<el-option v-for="(item, idx) in allAgeScope" :key="idx" :label="item" :value="idx"></el-option>-->
              <!--</el-select>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="性别：">-->
              <!--<el-select v-model="requestParameters.gender" placeholder="性别" onclick="clickTotal('005','性别',1)">-->
              <!--<el-option v-for="(item, idx) in allGenderScope" :key="idx" :label="item" :value="idx"></el-option>-->
              <!--</el-select>-->
              <!--</el-form-item>-->
            </el-row>


          </el-form>
        </div>
        <div class="right">
          <el-button plain size="mini" @click="onSubmit" onclick="clickTotal('006','查询',1)">查询</el-button>
          <el-button plain size="mini" @click="fnReset" onclick="clickTotal('007','重置',1)">重置</el-button>
        </div>
      </div>

      <div class="movement"  v-if="imageShow">
        <div class="movement_image" v-if="bottom"  @click="movementBottom">
          <img src="../../assets/images/bottom.png" />
        </div>
        <div class="movement_image" v-if="top" @click="movementTop">
          <img src="../../assets/images/top.png" />
        </div>
      </div>
		</div>



    <!--tabel-->
    <el-tabs style="margin-top: 10px;background: #fff;padding: 1rem;"
      v-model="activeName2" type="card" @tab-click="handleClick">

      <el-tab-pane label="来客列表" name="first">
        <table width="99%" class="table">
          <thead style="background: #fafafa;border: 1px solid #f5f5f5;border-bottom: 0;">
          <tr height="58px">
            <th class="col-md-1 text-center">序号</th>
            <th class="col-md-2 text-center">人脸</th>
            <th class="col-md-2 text-center">姓名</th>
            <!--<th class="col-md-1 text-center">性别</th>-->
            <!--<th class="col-md-1 text-center">年龄</th>-->
            <th class="col-md-1 text-center">客户类型</th>
            <th class="col-md-1 text-center">消费状态</th>
            <!--<th class="col-md-1 text-center">拍摄位置</th>-->
            <th class="col-md-2 text-center">进店时间</th>
            <th class="col-md-2 text-center">操作</th>
          </tr>
          </thead>
          <tbody style="text-align: center">
          <tr v-for="(item,index) in tableData" :key="index" height="58px">
            <td>{{(pagination.currentPage - 1) * 20 + index + 1 }}</td>
            <td>
              <div class="imgHover">
              <img :src="item.avatar" style="display:block;margin:0 auto;width:100%;">
              </div>
            </td>
            <td>{{item.customerMerchant.name == '' ? '--' : item.customerMerchant.name}}</td>
            <!--<td>-->
              <!--<span>{{item.gender == 1 ?'男':'女'}}</span>-->
            <!--</td>-->
            <!--<td>{{item.age}}</td>-->
            <td>
              <span>{{item.is_new == 1 ?'新客':'熟客'}}</span>
            </td>
            <td><span>{{item.vip_level == 1 ?'已购':'未购'}}</span></td>
            <!--<td>{{item.device_name != null ? '--' : item.device_name}}</td>-->
            <td>{{item.created_at | date(4)}}</td>
            <td>
              <el-button type="text" size="small" @click="showDialog(item)" >详情备注</el-button>
              <el-button type="text" size="small" @click="filter_process(item)" >屏蔽此人</el-button>
              <!--<el-button type="text" size="small" @click="dele(item)" >删除</el-button>-->
            </td>
          </tr>
          </tbody>
        </table>
        <div class="noData" v-if="noData" style="text-align: center;margin-top:2rem;font-size: 1.4rem;">暂无数据~</div>
        <div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;text-align: center">
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
      </el-tab-pane>

      <el-tab-pane label="屏蔽列表" name="second">
            <hidden-list :updateHidden="updateCount"></hidden-list>
      </el-tab-pane>

    </el-tabs>

    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogVisible" center style="min-width:1200px;z-index:2010;" :before-close="closeChangeMachie" :append-to-body="true">
      <el-tabs v-model="activeName1" @tab-click="checkout" onclick="clickTotal('201',event.target,4)">
        <el-tab-pane label="个人信息" name="first">
          <guest-info  :customerId="currentCustomerId" :traffic="trafficId" :editShow="dialogVisible" :showInfoEdit="showInfoEdit"></guest-info>
        </el-tab-pane>
          <el-tab-pane label="到店记录" name="second" style="min-height:415px;">
			    	<guest-visited-record :customerId="currentCustomerId"></guest-visited-record>
			    </el-tab-pane>
          <el-tab-pane label="订单记录" name="third" onclick="clickTotal('203','详情备注-订单记录',1)">
			    	<guest-order-record :customerId="currentCustomerId" style="min-height:415px;"></guest-order-record>
			    </el-tab-pane>

      </el-tabs>
    </el-dialog>

    <el-dialog title="提示" center :visible.sync="filterProcess"  style="min-width:500px;z-index:2010;" :before-close="closeFilterProcess">
      <el-row>
        <div style="padding-left: 3rem;">
          <i class="el-icon-warning" style="color: rgb(245,175,55);font-size: 3rem;"></i>
          <span style="font-size: 1.8rem;margin-left: 2rem;">是否屏蔽此人？</span>
        </div>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button @click="submitForm()" onclick="clickTotal('0','屏蔽此人确定',1)">确 定</el-button>
      </div>
    </el-dialog>
	</div>

</template>

<script src="@/assets/js/guest/Guest.js"></script>

<style lang="scss"  src="@/assets/css/guest/Guest.scss">
