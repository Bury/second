import globalData from '@/config/global_data'

import globalRules from '@/config/global_rules'

import globalFunctions from '@/config/global_functions'

import guestApi from '@/api/guest'

import tagApi from '@/api/tag'

export default {

	name: 'user-info',

	props: {
		customerId: {
			type: Number
		},
		showInfoEdit: {
			type: Boolean
		},
		traffic: {
			type: Number
		},
		editShow:{
			type: Boolean
		}
	},

	data() {

		return {
			active: [],
			checked: false,
			infoEdit: false,
			remarksId: "",
			guestInfo: {},
			editGuestInfoData: {},
			ids: [],
			labels: {},
			GuestInfoRules: {
				phone: globalRules.rules.user.noMustPhone()
			}
		};

	},

	watch: {
		customerId: function() {			
			this.view(this.$props.customerId, this.$props.traffic);
		},
		editShow:function(){
			this.$data.infoEdit = false;
			
		}
	},

	created: function() {
		this.view(this.$props.customerId, this.$props.traffic)
		this.getTagListsResults(this.$props.customerId)
		
	},

	methods: {
		//标签
		getTagListsResults(customerId) {
			let list = {
				'all': 1,
				'customer_id': customerId
			}
			let qs = require('querystring')
			tagApi.lists_results(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					console.log(res.data.data)
					this.$data.labels = res.data.data
				} else {

				}
			})
		},

		view(customerId, traffic) {
			// console.log(customerId,traffic,141414);
			this.$data.infoEdit = this.$props.showInfoEdit;
			let qs = require('querystring');
			let list = {
				'customer_id': customerId,
				'traffic_id': traffic,
			};
			guestApi.viewInfo(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					var is_new = this.$data.guestInfo.is_new;
					// console.log(res.data.data.vip_level)
					var vip_level = res.data.data.vip_level;
					// console.log(vip_level);
					this.$set(res.data.data, 'is_new_to_text', globalFunctions.functions.guest.getVisitInfo(is_new));
					this.$set(res.data.data, 'is_bought_to_text', globalFunctions.functions.guest.getBoughtInfo(vip_level));
					this.$data.guestInfo = res.data.data;
					let tagLabel = res.data.data.tag
					if(tagLabel) {
						for(let i = 0; i < tagLabel.length; i++) {
							this.ids.push(tagLabel[i].id)
						}
					} else {
						return false;
					}
				} else {

				}
			})
		},

		editGuestInfo() {
			this.$data.editGuestInfoData = this.$data.guestInfo;
			this.$data.infoEdit = true;
			console.log(this.$data.editGuestInfoData);
		},

		guestInfoCancel() {
			this.$data.infoEdit = false;
			this.ids = []
		},

		guestInfoEditSubmit(formName) {

			let qs = require('querystring');
			guestApi.edit(qs.stringify({
				customer_id: this.$data.editGuestInfoData.customer_id,
				name: this.$data.editGuestInfoData.name,
				phone: this.$data.editGuestInfoData.phone,
				gender: this.$data.editGuestInfoData.gender,
				age: this.$data.editGuestInfoData.age,
				tag_ids: this.ids.join(","),
				vip_level: this.$data.editGuestInfoData.vip_level,
				remark: this.$data.editGuestInfoData.remark,
			})).then((res) => {
				console.log(res)
				if(res.data.errno === 0) {
					console.log(this.$data.editGuestInfoData.vip_level)
					this.guestInfoCancel();
					this.view(this.$props.customerId)
				} else {
					this.$message({
						type: 'warning',
						message: res.data.msg,
					})
				}
			})

		},
		remark(val) {
			if(val.length >= 200) {
				let remarkVal = val.substring(0, 200);
				this.$data.editGuestInfoData.remark = remarkVal;
				this.$message({
					type: 'warning',
					message: '备注信息最多输入200个字符',
				})
			}
		},

	}

};