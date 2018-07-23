import globalFunctions from '@/config/global_functions'

import settingsApi from '@/api/settings'

export default {

    name:'open-time-set',

    data() {
        return {
            startTime: '',
            endTime: ''
        };
    },

    created:function(){
        this.fnGetTime();
    },

    methods:{

        //显示
        fnGetTime(){
            settingsApi.timeView().then((res) => {
                if(res.data.errno === 0){
                    console.log(res.data.data);
                    this.$data.startTime = res.data.data.start_time;
                    this.$data.endTime = res.data.data.end_time;
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },

        //设置
        fnSetTime(){
            var startTime = this.$data.startTime;
            var endTime = this.$data.endTime;
            if(startTime == '' || startTime == null){
                globalFunctions.functions.message(this,'warning','请选择开始时间',1000);
                return false;
            }
            if(endTime == '' || endTime == null){
                globalFunctions.functions.message(this,'warning','请选择结束时间',1000);
                return false;
            }
            let list = {
                'start_time' : startTime,
                'end_time'   : endTime
            }
            let qs = require('querystring')
            settingsApi.timeSet(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    console.log(res)
                    globalFunctions.functions.message(this,'success','操作成功',1500);

                }else{
                    this.$message.error(res.data.msg);
                }
            })

        },

    }

}