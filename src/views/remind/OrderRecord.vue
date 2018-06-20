<template>
	<div class="order-record-box">
		<h3 class="top-box">总成交金额：33333元</h3>
		<ul class="store-record-list">
			<li class="store-record-item">
				<div>订单编号：ZJ1111111111</div>
				<div>收银时间：2018/06/07  15:20</div>
				<div>商品名：黄金750手链</div>
				<div>成交金额：3275元</div>
			</li>
			<li class="store-record-item">
				<div>订单编号：ZJ1111111111</div>
				<div>收银时间：2018/06/07  15:20</div>
				<div>商品名：黄金750手链</div>
				<div>成交金额：3275元</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'order-record',
		data(){
			return{

			}
		},
	}
</script>
<style lang="scss" scoped>
	.order-record-box{
		.top-box{
			padding:20px 0;
		}
		.store-record-list{
			.store-record-item{
				margin:0 auto 20px;
				padding:20px;
				padding:10px;
				border:1px solid #d2d2d2;
				div{
					margin-bottom:5px;
				}
				
			}
		}
	}
</style> 