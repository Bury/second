<template>
	<div class="device-list-page">
		<device></device>
	</div>
</template>
<script>
	import Device from './Device'
	export default{
		name:"device-list",
		components: {
		    Device
		},
		data(){
			return{
			}
		},
		
	}
</script>
<style lang="scss" scoped>
	.device-list-page{
		.top-box{
			position:relative;
			margin-bottom:20px;
			height: 36px;
			border-bottom:1px solid #d2d2d2;
			.btn-wrap{
				position: absolute;
				bottom:-1px;
				right:20px;
			}
			
		}

	}
</style>