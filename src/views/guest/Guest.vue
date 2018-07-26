<template>
	<div class="remind-list-page">
    <div class="top-box" v-show="topBoxSow">
			  <el-form :inline="true" :model="requestParameters" class="demo-form-inline" size="mini">
          <el-form-item label="进店时间：">
            <el-date-picker
                v-model="value4"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="新客/熟客：">
          <el-select v-model="requestParameters.level" placeholder="新客/熟客">
              <el-option v-for="(item, idx) in allGuestVisitClass" :key="idx" :label="item" :value="idx"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="未购/已购：">
          <el-select v-model="requestParameters.level" placeholder="未购/已购">
              <el-option v-for="(item, idx) in allGuestBoughtClass" :key="idx" :label="item" :value="idx"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-select v-model="requestParameters.age" placeholder="年龄">
              <el-option v-for="(item, idx) in allAgeScope" :key="idx" :label="item" :value="idx"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select v-model="requestParameters.gender" placeholder="性别">
              <el-option v-for="(item, idx) in allGenderScope" :key="idx" :label="item" :value="idx"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
			</el-form>
		</div>

    <!--tabel 分页-->
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

      <el-tab-pane label="来客列表" name="first">
        <table width="99%" class="table-bordered">
          <thead style="background-color: #d1d1d1">
          <tr height="40">
            <th class="col-md-1 text-center">序号</th>
            <th class="col-md-1 text-center">人脸</th>
            <th class="col-md-1 text-center">姓名</th>
            <th class="col-md-1 text-center">性别</th>
            <th class="col-md-1 text-center">年龄</th>
            <th class="col-md-1 text-center">新客/熟客</th>
            <th class="col-md-1 text-center">未购/已购</th>
            <th class="col-md-1 text-center">拍摄位置</th>
            <th class="col-md-2 text-center">进店时间</th>
            <th class="col-md-2 text-center">操作</th>
          </tr>
          </thead>
          <tbody style="text-align: center">
          <tr v-for="(item,index) in tableData" :key="index" height="40">
            <td>{{item.id}}</td>
            <td>
              <div style="height: 90%;width: 90%;padding: 5%;box-sizing: border-box">
              <img :src="item.avatar" style="display:block;margin:0 auto;width:100%;">
              </div>
            </td>
            <td>{{item.customerMerchant.name}}</td>
            <td>
              <span>{{item.gender == 1 ?'男':'女'}}</span>
            </td>
            <td>{{item.age}}</td>
            <td>
              <span>{{item.is_new == 1 ?'新客':'熟客'}}</span>
            </td>
            <td><span>{{item.vip_level == 1 ?'已购':'未购'}}</span></td>
            <td>{{item.device_name}}</td>
            <td>{{item.created_at | date(4)}}</td>
            <td>
              <el-button type="text" size="small" @click="showDialog(item)" >详情备注</el-button>
              <el-button type="text" size="small" @click="filter_process(item)" >屏蔽此人</el-button>
              <el-button type="text" size="small" @click="dele(item)" >删除</el-button>
            </td>
          </tr>
          </tbody>
        </table>
        <!-- 列表 -->
        <div style="display: flex;text-align: center">
          <!--<el-col :span="23">-->
          <!--<el-table :data="tableData" border height="680" style="margin:0 auto;text-align:center;">-->
          <!--<el-table-column fixed type="index" label="序号" width="80">-->
          <!--</el-table-column>-->
          <!--<el-table-column label="人脸" width="60">-->
            <!--<template slot-scope="scope">-->
              <!--<img :src="scope.row.avatar" style="display:block;margin:0 auto;width:100%;">-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="customerMerchant.name" label="姓名" width="100">-->
          <!--</el-table-column>-->
          <!--<el-table-column label="性别" width="50">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.gender == 1 ?'男':'女'}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="age" label="年龄" width="100">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="customerMerchant.is_new" label="新客/熟客" width="110">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.is_new == 1 ?'新客':'熟客'}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="customerMerchant.vip_level" label="未购/已购" width="110">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.vip_level == 1 ?'已购':'未购'}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="device_name" label="拍摄位置" width="160">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="created_at" label="进店时间" width="200">-->
            <!--<template slot-scope="scope">-->
              <!--{{scope.row.created_at | date(4)}}-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column fixed="right" label="操作" width="200">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button type="text" size="small" @click="showDialog(scope.row)" >详情备注</el-button>-->
              <!--<el-button type="text" size="small" @click="filter_process(scope.row)" >屏蔽此人</el-button>-->
              <!--<el-button type="text" size="small" @click="dele(scope.row)" >删除</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
          <!--</el-col>-->
        </div>
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
      </el-tab-pane>

      <el-tab-pane label="屏蔽列表" name="second">
            <hidden-list :updateHidden="updateCount"></hidden-list>
      </el-tab-pane>

    </el-tabs>


    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogVisible" style="min-width:1200px;z-index:2010;" :before-close="closeChangeMachie" :append-to-body="true">
      <el-tabs v-model="activeName1" @tab-click="checkout">
          <el-tab-pane label="个人信息" name="first">
            <guest-info :customerId="currentCustomerId" :showInfoEdit="showInfoEdit"></guest-info>
          </el-tab-pane>

          <el-tab-pane label="到店记录" name="second" style="min-height:415px;">
			    	<guest-visited-record :customerId="currentCustomerId"></guest-visited-record>
			    </el-tab-pane>

          <el-tab-pane label="订单记录" name="third">
			    	<guest-order-record :customerId="currentCustomerId" style="min-height:415px;"></guest-order-record>
			    </el-tab-pane>

      </el-tabs>
    </el-dialog>

	</div>

</template>

<script src="@/assets/js/guest/Guest.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/Guest.scss">
