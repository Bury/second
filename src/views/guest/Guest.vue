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
          <el-form-item label="未购买/已购买：">
          <el-select v-model="requestParameters.level" placeholder="未购买/已购买">
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
        <!-- 列表 -->
        <el-table :data="tableData" border height="680" style="margin:0 auto;width: 1231px;text-align:center;">
          <el-table-column fixed type="index" label="ID" width="80">
          </el-table-column>
          <el-table-column label="人脸" width="60">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" style="display:block;margin:0 auto;width:100%;">
            </template>
          </el-table-column>
          <el-table-column prop="customerMerchant.name" label="姓名" width="100">
          </el-table-column>
          <el-table-column label="性别" width="50">
            <template slot-scope="scope">
              <span>{{scope.row.gender == 1 ?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="100">
          </el-table-column>
          <el-table-column prop="customerMerchant.phone" label="手机" width="110">
          </el-table-column>
          <el-table-column prop="customerMerchant.consume_num" label="新客/熟客" width="110">
          </el-table-column>
          <el-table-column prop="customerMerchant.consume_num" label="未购买/已购买" width="110">
          </el-table-column>
          <el-table-column prop="device_name" label="拍摄位置" width="160">
          </el-table-column>
          <el-table-column prop="created_at" label="进店时间" width="200">
            <template slot-scope="scope">
              {{scope.row.created_at | date(4)}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showDialog(scope.row)" >详情备注</el-button>
              <el-button type="text" size="small" @click="filter_process(scope.row)" >屏蔽此人</el-button>
            </template>
          </el-table-column>
        </el-table>

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
      <el-tabs v-model="activeName" @tab-click="checkout">
          <el-tab-pane label="个人信息" name="first">
            <guest-info :customerId="currentCustomerId" :showInfoEdit="showInfoEdit"></guest-info>
          </el-tab-pane>
          
      </el-tabs>
    </el-dialog>

	</div>

</template>

<script src="@/assets/js/guest/Guest.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/Guest.scss">
