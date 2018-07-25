import remindApi from '@/api/remind'

import statisticsApi from '@/api/statistics'

import GuestChart from '@/views/statistics/GuestChart'

import GuestVisitedInfoChart from '@/views/statistics/GuestVisitedInfoChart'

import GuestBoughtInfoChart from '@/views/statistics/GuestBoughtInfoChart'

import GuestAgeChart from '@/views/statistics/GuestAgeChart'

import GuestGenderChart from '@/views/statistics/GuestGenderChart'

import GuestFromChart from '@/views/statistics/GuestFromChart'

import * as utils from '@/utils/index'

export default {
    
    name: 'dashboard',

    components: {
        GuestChart,
        GuestVisitedInfoChart,
        GuestBoughtInfoChart,
        GuestAgeChart,
        GuestGenderChart,
        GuestFromChart
    },

    data () {
        return {
            noData: false,
            timeType: 'day',
            day:'',
            week:'',
            month:'',
            year:'',
            userDefined:[],
            ctrlTimeType:[true,false,false,false,false],
            chartClass:'',
            guestData:{},
            guestVisitedInfoData:[],
            guestBoughtInfoData:[],
            ageData:[],
            guestGenderData:[],
            guestFromData:[],
            guestParameters:{
                begin_time:'',
                end_time:'',
            },
        }
    },

    created:function(){
        this.setData();
    },

    methods: {

        //时间转为秒
        getS(value){
            var formatTimeS = new Date(value).getTime()/1000;
            return formatTimeS
        },

        //客流量
        getCustomer(parameters){
            let qs = require('querystring');
            statisticsApi.getCustomer(qs.stringify(parameters)).then((res) => {
                if(res.data.errno === 0){
                    // console.log(res.data.data)
                    this.$data.guestData = res.data.data;
                }else{

                }
            })
        },

        //特征
        statisticsFeature(parameters, types){
            let list = {
                begin_time: parameters.begin_time,
                end_time: parameters.end_time,
                feature: types
            }
            let qs = require('querystring');
            statisticsApi.statisticsFeature(qs.stringify(list)).then((res) => {
                if(res.data.errno === 0){
                    //console.log(res)
                    let thisData = res.data.data;
                    if (thisData) {
                        if(types == 'face'){
                            let newData = [];
                            for(var i=0; i<thisData.face.length; i++){
                                newData.push([thisData.face[i],thisData.sum[i]])
                            }
                            this.$data.guestVisitedInfoData = newData;
                        }
                        if(types == 'buy'){
                            let newData = [];
                            for(var i=0; i<thisData.buy.length; i++){
                                newData.push([thisData.buy[i],thisData.sum[i]])
                            }
                            this.$data.guestBoughtInfoData = newData;
                        }
                        if(types == 'age'){
                            let newData = [];
                            for(var i=0; i<thisData.age.length; i++){
                                newData.push([thisData.age[i],thisData.sum[i]])
                            }
                            this.$data.ageData = newData;
                        }
                        if(types == 'gender'){
                            let newData = [];
                            for(var i=0; i<thisData.gender.length; i++){
                                newData.push([thisData.gender[i],thisData.sum[i]])
                            }
                            this.$data.guestGenderData = newData;
                        }
                        if(types == 'camera'){
                            let newData = [];
                            for(var i=0; i<thisData.camera.length; i++){
                                newData.push([thisData.camera[i],thisData.sum[i]])
                            }
                            this.$data.guestFromData = newData;
                        }
                    } else {
                        this.noData = true
                    }
                }else{

                }
            })

        },

        switchChart(value){
            // console.log(value)
            this.$data.chartClass = value;
            this.setData();
        },

        //搜索
        onSubmit(){
            this.setData();
        },

        /*
        统计类型切换
        */
        cateChanged(tab, event){
            var nowIdx = tab.index;
            this.$data.ctrlTimeType = [false,false,false,false,false];
            this.$data.ctrlTimeType[nowIdx] = true;
            this.$data.guestParameters = {
                begin_time:'',
                end_time:'',
            }
            this.setData();
        },

        setData(){
            if(this.$data.ctrlTimeType[0]){
                //日
                // let day = new Date()
                // console.log(this.$data.day);
                this.$data.guestParameters.begin_time = this.getS('2018-07-23 00:00:00');
                this.$data.guestParameters.end_time =  this.getS('2018-07-23 23:59:59');
                this.requestData();
                return false;
            }
            if(this.$data.ctrlTimeType[1]){
                //周
                // console.log(this.week);
                this.$data.guestParameters.begin_time = utils.getDateTime(this.week);
                this.$data.guestParameters.end_time =  this.getS('2018-07-30 23:59:59');
                this.requestData();
                return false;
            }
            if(this.$data.ctrlTimeType[2]){
                //月
                this.$data.guestParameters.begin_time = utils.getDateTime(this.month);
                this.$data.guestParameters.end_time =  this.getS('2018-07-31 23:59:59');
                this.requestData();
                return false;
            }
            if(this.$data.ctrlTimeType[3]){
                //年

                this.$data.guestParameters.begin_time = utils.getDateTime(this.year);
                this.$data.guestParameters.end_time =  this.getS('2018-12-31 23:59:59');
                this.requestData();
                return false;
            }
            if(this.$data.ctrlTimeType[4]){
                //自定义
                this.$data.guestParameters.begin_time = utils.getDateTime(this.userDefined[0]);
                this.$data.guestParameters.end_time =  utils.getDateTime(this.userDefined[1]);
                this.requestData();
                return false;
            }

        },

        requestData(){
            this.getCustomer(this.$data.guestParameters);
            this.statisticsFeature(this.$data.guestParameters, 'face');
            this.statisticsFeature(this.$data.guestParameters, 'buy');
            this.statisticsFeature(this.$data.guestParameters, 'age');
            this.statisticsFeature(this.$data.guestParameters, 'gender');
            this.statisticsFeature(this.$data.guestParameters, 'camera');
        }

    }

}