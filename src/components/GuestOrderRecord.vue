<template>
	<div class="order-record-box">
		<h3 class="top-box">总成交金额：{{orderRecords.count_price}}元</h3>
		<ul class="store-record-list">
			<li class="store-record-item" v-for="(item,key) in orderRecords.list">
				<div>订单编号：{{orderRecords.list[key].sn}}</div>
				<div>收银时间：{{orderRecords.list[key].cash_t}}</div>
				<div>材质款式：<span v-for="goods in orderRecords.list[key].orderGoods">&nbsp;[{{goods.material_name}}/{{goods.style_name}}]&nbsp;</span></div>
				<div>成交金额：{{orderRecords.list[key].price}}元</div>
			</li>
		</ul>
	</div>
</template>

<script src="@/assets/js/guest/GuestOrderRecord.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/GuestOrderRecord.scss">