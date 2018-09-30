<template>
<div>
  <div class="order-record-box">
    <h4 class="top-box">总成交金额：{{orderRecords.count_price | numberFilter}}元</h4>
    <ul class="store-record-list">
      <li class="store-record-item" v-for="(item,key) in orderRecords.list">
        <div>订单编号：{{orderRecords.list[key].sn}}</div>
        <div>收银时间：{{orderRecords.list[key].cash_t | date(4)}}</div>
        <div>材质款式：<span v-for="goods in orderRecords.list[key].orderGoods">&nbsp;[{{goods.material_name}}/{{goods.style_name}}]&nbsp;</span></div>
        <div>成交金额：{{orderRecords.list[key].price | numberFilter}}元</div>
      </li>
    </ul>
  </div>
  <!-- 分页 -->
  <div v-if="listArr.length > 0" style="margin:0 auto;max-width:1551px;text-align: center;">
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
</template>

<script src="@/assets/js/guest/GuestOrderRecord.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/GuestOrderRecord.scss">
