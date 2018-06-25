<template>
	<div class="store-record-box">
		<h3 class="top-box">到店总次数：{{storeRecords.count_num}}次</h3>
		<ul class="store-record-list">
			<li class="store-record-item" v-for="(item,key) in storeRecords.list">
				<div class="item-cont">
					<div class="left-img"></div>
					<ul class="right-txt">
						<li class="item-time">时间：{{storeRecords.list[key].created_at}}</li>
						<li class="store-info">{{storeRecords.list[key].store_name}} —— {{storeRecords.list[key].device_name}}</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import remindApi from '../api/remind'
	export default{
		name:'store-record',
		props:{
            customerId:String
        },
		data(){
			return{
				storeRecords:{}
			}
		},
		created:function(){
			this.storeRecord(this.$props.customerId);
		},
		methods:{
			storeRecord(customer_id){
                let list = {
                        'customer_id':customer_id
                    }
                let qs = require('querystring')
                remindApi.storeRecord(qs.stringify(list)).then((res) => {
                    if(res.data.errno === 0){
                        console.log(res.data.data)
                        this.$data.storeRecords = res.data.data;
                    }else{

                    }
                })
            }
		}
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
						line-height:30px;
					}
				}
			}
		}
	}
</style> 