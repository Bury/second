<template>
	<div>
		<!-- 屏蔽列表 -->
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
		<!--<el-table :data="tableData" border height="680" style="margin:0 auto;width: 1231px;text-align:center;">-->
			<!--<el-table-column fixed type="index" label="ID" width="80">-->
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
			<!--<el-table-column prop="customerMerchant.phone" label="手机" width="110">-->
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
			<!--<el-table-column prop="created_at" label="进店时间" width="200">-->
				<!--<template slot-scope="scope">-->
					<!--{{scope.row.created_at | date(4)}}-->
				<!--</template>-->
			<!--</el-table-column>-->
			<!--<el-table-column fixed="right" label="操作" width="150">-->
				<!--<template slot-scope="scope">-->
					<!--<el-button type="text" size="small" @click="return_process(scope.row)">撤销屏蔽</el-button>-->
				<!--</template>-->
			<!--</el-table-column>-->
		<!--</el-table>-->

		<!-- 分页 -->
		<div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;text-align: right;">
			<el-pagination
				background
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

<script src="@/assets/js/guest/HiddenList.js"></script>
