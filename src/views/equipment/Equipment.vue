<template>
	<div class="equipment-page">
		<device v-if="isShow"></device>
		<store v-if="!isShow"></store>
	</div>
</template>
<script>
	import Device from './Device'
	import Store from './Store'
	export default{
		name:"equipment",
		components: {
		    Device,
		    Store
		},
		data(){
			return{
				isShow:false
			}
		},
		
	}
</script>