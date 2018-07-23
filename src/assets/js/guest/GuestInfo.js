import globalData from '@/config/global_data'

import globalRules from '@/config/global_rules'

import globalFunctions from '@/config/global_functions'
    
import guestApi from '@/api/guest'

import tagApi from '@/api/tag'

export default {

    name:'user-info',

    props:{
        customerId:{
            type:Number
        },
        showInfoEdit:{
            type:Boolean
        },
        traffic:{
            type:Number
        }
    },

    data() {

        return {
            infoEdit:false,
            remarksId:"",
            guestInfo:{},
            editGuestInfoData:{},
            labels:{},
            GuestInfoRules:{
                name: globalRules.rules.user.truename(),
                gender:globalRules.rules.user.gender(),
                phone:globalRules.rules.user.phone(),
            }
        };

    },

    watch: {
        customerId: function() {
            this.view(this.$props.customerId)
        },
    },

    created:function(){
        this.view(this.$props.customerId)
        this.getTagListsResults(this.$props.customerId)
    },

    methods: {

        getTagListsResults(customerId){
            let list = {
                'all': 1,
                'customer_id': customerId
            }
            let qs = require('querystring')
            tagApi.lists_results(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    console.log(res.data.data)
                    this.$data.labels = res.data.data
                }else{
                    
                }
            })
        },

        view(customerId){
            this.$data.infoEdit = this.$props.showInfoEdit;
            let qs = require('querystring');
            let list ={'customer_id':customerId};
            guestApi.view(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    var is_new=this.$data.guestInfo.is_new;
                    var vip_level=this.$data.guestInfo.vip_level;
                    this.$set(res.data.data, 'is_new_to_text', globalFunctions.functions.guest.getVisitInfo(is_new));
                    this.$set(res.data.data, 'is_bought_to_text', globalFunctions.functions.guest.getBoughtInfo(vip_level));
                    this.$data.guestInfo = res.data.data;
                }else{

                }
            })
        },

        editGuestInfo(){
            this.$data.editGuestInfoData = this.$data.guestInfo;
            this.$data.infoEdit = true;
        },

        guestInfoCancel(){
            this.$data.infoEdit = false;
        },

        guestInfoEditSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        let qs = require('querystring');                            
                        guestApi.edit(qs.stringify({
                            customer_id:this.$data.editGuestInfoData.customer_id,
                            name:this.$data.editGuestInfoData.name,    
                            phone:this.$data.editGuestInfoData.phone,   
                            gender:this.$data.editGuestInfoData.gender, 
                            tag_ids:this.$data.editGuestInfoData.tag_ids,
                            remark:this.$data.editGuestInfoData.remark,
                        })).then((res) => {
                            if(res.data.errno === 0){
                                this.guestInfoCancel();
                                this.view(this.$props.customerId)
                            }else{
                                
                            }
                    })
                }
            })
        }

    }

};