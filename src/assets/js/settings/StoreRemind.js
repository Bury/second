import globalFunctions from '@/config/global_functions'

import settingsApi from '@/api/settings'

const typeOptions = ['新客未购',  '熟客未购', '熟客已购'];

const typeId = ["1","3","4"]

export default {

    data() {
        return {
            checkAll: false,
            checkedType: [],
            types: typeId,
            typeVal: typeOptions,
            isIndeterminate: true
        };
    },

    created:function(){
        this.fnGetRemind();
    },

    methods: {

        //显示
        fnGetRemind(){
            settingsApi.remindView().then((res) => {
                if(res.data.errno === 0){
                    console.log(res);
                    if(res.data.data.remind_ids.length > 1){
                      this.checkedType = res.data.data.remind_ids.split(",");
                    }

                    if(this.checkedType.length == this.types.length){
                        this.checkAll = true;
                        this.isIndeterminate = false;
                    }
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },

        //设置
        fnSetRemind(){
            let list = {
                'remind_ids' :  this.checkedType.toString(),
            }
            let qs = require('querystring')
            settingsApi.remindSet(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    console.log(res);
                    globalFunctions.functions.message(this,'success');
                    this.fnGetRemind();
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },

        handleCheckAllChange(val) {
            if(val == false){
              this.isIndeterminate = true;
              this.$data.checkAll = false;
              this.checkedType = val ? typeId : [];
            }else if(val == true){
              this.$data.checkAll = true;
              this.isIndeterminate = false;
              this.checkedType = val ? typeId : [];
            }
        },

        fnChangeType(value) {
            console.log(value)
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.types.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
        }

    }

};
