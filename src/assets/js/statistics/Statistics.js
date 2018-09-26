import remindApi from '@/api/remind'

import statisticsApi from '@/api/statistics'

import TotalGuest from '@/views/statistics/TotalGuest'
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
        TotalGuest,
        GuestChart,
        GuestVisitedInfoChart,
        GuestBoughtInfoChart,
        GuestAgeChart,
        GuestGenderChart,
        GuestFromChart
    },

    data () {
        return {
        	noTimeHide:false,
        	changFlag:true,            
            timeType: 'day',
            day:'',
            week:'',
            month:'',
            year:'',
            userDefined:[],
            ctrlTimeType:[true,false,false,false,false],
            guestVisitedInfoData:[],
            guestBoughtInfoData:[],
            ageData:[],
            guestGenderData:[],
            guestFromData:[],
            guestParameters:{
                begin_time:'',
                end_time:'',
            },
            pickerOptionsSet:{
            	firstDayOfWeek:1,
        		disabledDate(time) {
                   return time.getTime() > Date.now() - 8.64e6
        		}
        	},
          times_start:'',
          times_end:'',
        }
    },

    created:function(){
      let unit = localStorage.getItem("unit") || '';
      if(unit === 'd'){
        this.$data.ctrlTimeType = [false, false, false, false, false];
        this.$data.ctrlTimeType[0] = true;
        this.$data.timeType = 'day';
      }else if(unit === 'w'){
        this.$data.ctrlTimeType = [false, false, false, false, false];
        this.$data.ctrlTimeType[1] = true;
        this.$data.timeType = 'week';
      }else if(unit === 'm'){
        this.$data.ctrlTimeType = [false, false, false, false, false];
        this.$data.ctrlTimeType[2] = true;
        this.$data.timeType = 'month';
      }else if(unit === 'y'){
        this.$data.ctrlTimeType = [false, false, false, false, false];
        this.$data.ctrlTimeType[3] = true;
        this.$data.timeType = 'year';
      };
        this.setData();
    },

    methods: {

        //时间转为秒
        getS(value){
            var formatTimeS = new Date(value).getTime()/1000;
            return  formatTimeS
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
                                newData.push([thisData.buy[i],thisData.count[i]])
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
                    }else{
                    	(types == 'face') && (this.$data.guestVisitedInfoData = []);
                    	(types === 'buy') && (this.$data.guestBoughtInfoData = []);
                    	(types === 'age') && (this.$data.ageData = []);
                    	(types === 'gender') && (this.$data.guestGenderData = []);
                    	(types ==='camera') && (this.$data.guestFromData = []);
                    }
                }else{

                }
            })

        },
        //搜索
        onSubmit(){
        	if(this.$data.ctrlTimeType[0]){
        		if(this.$data.day == null) { return false}
            	this.$data.guestParameters.begin_time = this.getS(this.$data.day);
                this.$data.guestParameters.end_time =   this.getS(this.$data.day) + 86399;

           }else if(this.$data.ctrlTimeType[1]){
           	    if(this.$data.week == null) { return false}
            	  this.$data.guestParameters.begin_time = this.getS(this.$data.week) - 86400;
                this.$data.guestParameters.end_time =   this.getS(this.$data.week) + 518399;
            }else if(this.$data.ctrlTimeType[2]){
            	if(this.$data.month== null) { return false}
            	let nexty,nextm;
            	let t = new Date(this.$data.month);
            	let m = t.getMonth() + 1;
            	let y = t.getFullYear();
            	m === 12 ? (nexty = y + 1,nextm = 1):(nexty = y,nextm = m + 1)
            	this.$data.guestParameters.begin_time = t.getTime() / 1000;
                this.$data.guestParameters.end_time =  this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;

            }else if(this.$data.ctrlTimeType[3]){
            	if(this.$data.year == null) {return false;}
            	let yearDate = new Date(this.$data.year);
            	let y = yearDate.getFullYear();
            	this.$data.guestParameters.begin_time = this.getS(`${y}/01/01 00:00:00`);
                this.$data.guestParameters.end_time =  this.getS(`${y}/12/31 23:59:59`);

            }else if(this.$data.ctrlTimeType[4]){
            let startTime = this.getS(this.$data.times_start);
            let endTime = this.getS(this.$data.times_end) + 86399;
            if(startTime > endTime){
              // this.$data.noTimeHide = true;
              this.$confirm('您选择的结束时间应该大于开始时间','日期选择警告',{
                confirmButtonText:'知道了',
                showCancelButton:false,
                type:'warning'
              })

            }else if(startTime < endTime){
              this.$data.noTimeHide = false;
              this.$data.guestParameters.begin_time = this.getS(this.$data.times_start);
              this.$data.guestParameters.end_time =  this.getS(this.$data.times_end) + 86399;
            }

            }
        	this.requestData();
        },

        /*
        统计类型切换
        */
        cateChanged(tab, event){
            var nowIdx = tab.index;
            this.$data.ctrlTimeType = [false,false,false,false,false];
            this.$data.ctrlTimeType[nowIdx] = true;
            (nowIdx !== 4) && (this.$data.noTimeHide = false);
            this.setData();
        },

        //绑定默认时间
        modelDate(t){
        	let d = new Date(t*1000);
            return d;
        },
        getBeginEnd(val){
        	let t = new Date();
            let y = t.getFullYear();
            let m = t.getMonth() + 1;
            let d = t.getDate();
            let weekd  = t.getDay();
            switch (val){
	       	case "day":
	       	    this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`);
                this.$data.guestParameters.end_time =  this.getS(`${y}/${m}/${d} 23:59:59`);
                this.$data.day = this.modelDate(this.$data.guestParameters.begin_time)
	       		break;
	       	case "week":
	       	    if(weekd === 0){ weekd = 7 }
            	this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/${d} 00:00:00`) - 86400*(weekd-1);
                this.$data.guestParameters.end_time =  this.getS(`${y}/${m}/${d} 23:59:59`) + 86400*(7 - weekd);
                this.$data.week =  this.modelDate(this.$data.guestParameters.begin_time)
	       		break;
	       	case "month":
	       	    let nexty,nextm;
            	m === 12 ? (nexty = y + 1,nextm = 1):(nexty = y,nextm = m + 1)
            	this.$data.guestParameters.begin_time = this.getS(`${y}/${m}/01 00:00:00`);
            	this.$data.guestParameters.end_time =  this.getS(`${nexty}/${nextm}/01 00:00:00`) - 1;
            	this.$data.month =  this.modelDate(this.$data.guestParameters.begin_time)
	       		break;
	       	case "year":
	       	    this.$data.guestParameters.begin_time = this.getS(`${y}/01/01 00:00:00`);
                this.$data.guestParameters.end_time =  this.getS(`${y}/12/31 23:59:59`);
               this.$data.year =  this.modelDate(this.$data.guestParameters.begin_time)
	       		break;
	       	case "select":
	       	    if(this.$data.userDefined !== null && this.$data.userDefined.length !== 0){
	       	    	this.$data.noTimeHide = false;
	       	    	this.$data.guestParameters.begin_time = utils.getDateTime(this.userDefined[0]);
                    this.$data.guestParameters.end_time =  utils.getDateTime(this.userDefined[1]);
	       	    }else{
	       	    	this.$data.noTimeHide = true;
	       	    }
	       	    break;
	        }
        },

        setData(){
            if(this.$data.ctrlTimeType[0]){
                //日

                this.getBeginEnd("day")
                this.requestData();
                return false;
            }
            if(this.$data.ctrlTimeType[1]){
                //周
                this.getBeginEnd("week")
                this.requestData();
                return false;

            }
            if(this.$data.ctrlTimeType[2]){
                //月
                this.getBeginEnd("month")
                this.requestData();
                return false;
            }
            if(this.$data.ctrlTimeType[3]){
                //年
                this.getBeginEnd("year")
                this.requestData();
                return false;
            }
            if(this.$data.ctrlTimeType[4]){
                //自定义
                this.getBeginEnd("select")
                this.requestData();
                return false;
            }

        },

        requestData(){
        	    this.$data.changFlag = !this.$data.changFlag;
                this.statisticsFeature(this.$data.guestParameters, 'face');
                this.statisticsFeature(this.$data.guestParameters, 'buy');
                this.statisticsFeature(this.$data.guestParameters, 'age');
                this.statisticsFeature(this.$data.guestParameters, 'gender');
                this.statisticsFeature(this.$data.guestParameters, 'camera');
        },



    }

}
