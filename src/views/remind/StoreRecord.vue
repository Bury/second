<template>
	<div class="store-record-box">
		<h3 class="top-box">到店总次数：2次</h3>
		<ul class="store-record-list">
			<li class="store-record-item">
				<div class="item-time">时间：2018/06/22 14:30</div>
				<div class="item-cont">
					<div class="left-img"></div>
					<div class="right-txt">门店信息-捕捉设备</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'store-record',
		data(){
			return{

			}
		},
	}
</script>
<style lang="scss" scoped>
	.store-record-box{
		.top-box{
			padding:20px 0;
		}
		.store-record-list{
			.store-record-item{
				margin:0 auto 20px;
				padding:20px;
				padding:10px;
				border:1px solid #d2d2d2;
				.item-time{
					margin-bottom:10px;
				}
				.item-cont{
					overflow:hidden;
					.left-img{
						float:left;
						margin-right:20px;
						width: 200px;
						height: 80px;
						background:#ccc;
					}
					.right-txt{
						float: left;
						line-height:80px;
					}
				}
			}
		}
	}
</style> 