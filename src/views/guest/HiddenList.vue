<template>
	<div>
		<!-- 屏蔽列表 -->
    <table width="99%" class="table">
      <thead style="background: #fafafa;border: 1px solid #f5f5f5;border-bottom: 0;">
      <tr height="58px">
        <th class="col-md-1 text-center">序号</th>
        <th class="col-md-1 text-center">人脸</th>
        <th class="col-md-1 text-center">姓名</th>
        <th class="col-md-1 text-center">性别</th>
        <th class="col-md-1 text-center">年龄</th>
        <th class="col-md-1 text-center">新客/熟客</th>
        <th class="col-md-1 text-center">未购/已购</th>
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
        <td>
          <span>{{item.gender == 1 ?'男':'女'}}</span>
        </td>
        <td>{{item.age}}</td>
        <td>
          <span>{{item.is_new == 1 ?'新客':'熟客'}}</span>
        </td>
        <td><span>{{item.vip_level == 1 ?'已购':'未购'}}</span></td>
        <td>{{item.created_at | date(4)}}</td>
        <td>
          <el-button type="text" size="small" @click="return_process(item) " onclick="clickTotal('008','撤销屏蔽',1)" >撤销屏蔽</el-button>
        </td>
      </tr>
      </tbody>
    </table>

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
<style>
  .table thead{
    color: #999;
  }
  .table tbody tr td{
    color: #2a2a2a;
    vertical-align: middle;
  }
  .table tbody tr:hover{
    background-color: #f5fbfe;
  }
  .imgHover{
    height: 50%;
    width: 50%;
    padding: 5%;
    box-sizing: border-box
  }
  .imgHover:hover{
    height: 90%;
    width: 90%;
  }

</style>
