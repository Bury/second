import globalFunctions from '@/config/global_functions'

import OrderApi from '@/api/order'

import UserApi from '@/api/user'

import apiUrl from '@/config/API.js'

import router from '@/router/index'

const SERVER_IP = apiUrl.apiUrl

const COMMON = 'v1'
let clock;
export default {

  name: "order-live",

  components: {

  },

  data(){
    return {
      isMeFlag:true,
      traffic_id:'',
      upLoadData: {
        access_token: localStorage.getItem('knock_knock'),
      },
      materials:[],
      styles:[],
      isCan:0,
      step01_block:true,
      step02_block:false,
      step03_block:false,
      faceIdIs:'',
      allGoodLenght:'',
      allMoney:'',
      pushGoods:[],
      pushRemk:'',
      ruleForm: {
        name: '',
        phone:'',
        sex:'',
        type:'',
        image:'',
        textarea2:''
      },
      NewRuleForm:{
        name:'',
        phone:'',
        sex:'',
        type:'',
      },
      item: {
        material: '',
        style: '',
        money:'',
        file:''
      },
      addProList:[{
        material: '',
        style: '',
        money:''
      }],
      tableData:{
        id:'',
        avatar:'',
      },
      remarkString:'',
      noData:false,
      imgData:true,
      see:[true,true,true,true,true,true],
      saw:[false,false,false,false,false,false],
      pagination: {
        currentPage: 1,
        totalCount: 0,
      },
      requestParameters:{
        page: 1,
        page_size: 6,
      }
    };
  },

  created:function () {
    this.chooseLists();
  },

  methods:{
    chooseLists(){
      let list = {
        'page':this.$data.requestParameters.page
      }
      let qs = require('querystring')
      OrderApi.chooseLists(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0){
          if(res.data.data.list.length > 0){
            this.$data.tableData = res.data.data.list;
            this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
            this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
          }else{
            this.$data.noData = true;
            this.$data.imgData = false;
          }
        }else{
          this.$message.error(res.data.msg);
          this.$data.noData = true;
          this.$data.imgData = false;
        }
      })
    },
    reFresh(){
      this.$data.requestParameters.page = 1;
      this.chooseLists();
    },
    getAll() {
      let list = {
        'all': 1,
        'customer_id': ''
      };
      let qs = require('querystring');
      OrderApi.getAll(qs.stringify(list)).then((res) => {
        if (res.data.errno === 0) {
          let labels = res.data.data;
          for (let i = 0; i < labels.length; i++) {
            if (labels[i].name === '材质') {
              this.materials = labels[i].children;
            } else if (labels[i].name === '款式') {
              this.styles = labels[i].children;
            } else {
              return false
            }
          }
        }
      })
    },

    //选择人脸信息进行开单
    recognition(id,index){
      this.$data.see = [true,true,true,true,true,true];
      this.$data.saw = [false,false,false,false,false,false];
      this.$data.saw[index] = true;
      this.$data.see[index] = false;
      this.$data.traffic_id = id;
      this.step02_block=true;
      this.step01_block=true;
      this.step03_block=true;
      //  请求接口
      let list = {
        id:id
      };
      let qs = require('querystring')
      OrderApi.videoFindFace(qs.stringify(list)).then((res) => {
        this.getAll();
          this.$data.NewRuleForm = res.data.data;
          this.$data.faceIdIs = res.data.data.customer_id;
          if((res.data.data.is_new === 1) || (res.data.data.is_new === 0)){
            if(res.data.data.gender === 0){
              this.$data.NewRuleForm.sex = '女'
            }else{
              this.$data.NewRuleForm.sex = '男'
            }
          }
      })
    },

    //  返回的顾客信息,进行消费
    isTrueAndPass(){
      let list = {
        'name': this.$data.NewRuleForm.name,
        'phone': this.$data.NewRuleForm.phone,
        'customer_id':this.$data.faceIdIs,
        'is_me':1
      }
      let qs = require('querystring');
      OrderApi.postMe(qs.stringify(list)).then((res) => {
        if(res.data.errno === 0){
          this.step03_block=true;
          this.step02_block=true;
          this.step01_block=true;
          this.allPostM();
        }else if(res.data.errno == 1000002){
          this.$message.error(res.data.msg);
          return false;
        }else{
          this.$message.error(res.data.msg);
          return false;
        }
      });
    },

    addAGood(){
      let obj = {
        material : null,
        style : null,
        money:''
      }
      this.$data.addProList.push(obj);
    },

    //  实时计算输入金额
    getMoney(obj){
      if(obj.length >= 7){
        this.$message({
          message: '最高输入金额为百万元',
          type: 'warning',
        });
      }
      let m = 0;
      for(let i = 0; i< this.$data.addProList.length; i++){
        m += Number(this.$data.addProList[i].money);
      }
      this.$data.allGoodLenght =this.$data.addProList.length;
      this.$data.allMoney = m;
    },

    //  删除一条新增的商品数据
    delGoods(index){
      this.$data.addProList.splice(index,1);
      if(this.$data.addProList.length == 1){
        this.$data.allMoney = this.$data.allMoney;
        this.$data.allGoodLenght = 1;
      }else{
        //删除一条之后，需要再计算金额
        let m ;
        m = this.$data.allMoney;
        m=0;
        for(let i = 0; i< this.$data.addProList.length; i++){
          if(this.$data.addProList[i].money){
            m += parseInt(this.$data.addProList[i].money);
          }
        }
        this.$data.allGoodLenght =this.$data.addProList.length
        this.$data.allMoney = m;
      }
    },


    //最后的计算
    allPostM(){
      let arrAs= {};
      for(let i = 0; i< this.$data.addProList.length; i++){
        arrAs = {
          'material':this.$data.addProList[i].material,
          'style':this.$data.addProList[i].style,
          'price':this.$data.addProList[i].money
        };
        this.$data.pushGoods.push(arrAs);
      }
      let sendData = JSON.stringify(this.$data.pushGoods);
      if(this.$data.NewRuleForm.textarea2 === ''){
        this.$data.pushRemk = this.$data.ruleForm.textarea2;
      }else if(this.$data.ruleForm.textarea2 === ''){
        this.$data.pushRemk = this.$data.NewRuleForm.textarea2;
      }
      let list = {
        'goods_info':sendData,
        'remark':this.$data.remarkString,
        'customer_id':this.$data.faceIdIs,
        'traffic_id':this.$data.traffic_id,
      }
      let qs = require('querystring');
      OrderApi.addGoods(qs.stringify(list)).then((res) => {
        this.$data.item = {};
        this.$data.pushGoods = [];
        if(res.data.errno === 0){
          this.$router.push({path: '/Order'});
          this.$message({
            message: '创建订单成功',
            type: 'success',
          });
        }else{
          this.$message.warning(res.data.msg)
        }

      });
    },
    fnGoback(){
      this.$router.push('/Order')
    },
    handleCurrentChange(currentPage) {
      this.$data.see = [true,true,true,true,true,true,true];
      this.$data.saw = [false,false,false,false,false,false];
      this.$data.step02_block = false;
      this.$data.step03_block = false;
      this.$data.requestParameters.page = currentPage;
      this.chooseLists();
    },

  }
}
