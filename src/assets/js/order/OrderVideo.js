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
      upLoadData: {
        access_token: localStorage.getItem('knock_knock'),
      },
      step_1:1,
      step_2:2,
      step_3:2,
      step_4:2,
      materials:[],
      styles:[],
      getClickName:'获取验证码',
      waitTime:60,
      canClick: true,
      isCan:0,
      step01_block:true,
      step02_block:false,
      step03_block:false,
      inputMaxL:9,

      showVideo:true,
      actionDialogVisible: false,
      userOld:false,
      userNew:false,
      msgGetNews:false,
      phoneIsMySql:false,
      checkoutCallBack:false,
      phoneNoMySql:false,
      ifIsOld:false,
      ifIsNew:false,
      firstNewC:false,
      phoneIsMySqlA:false,
      faceIdIs:'',
      faceIdNo:'',
      takeImages:'',
      goodsList:[],
      allMoneyList:[],
      allGoodLenght:'',
      allMoney:'',
      newNewP:'',
      newNewQ:'',
      newNewR:'',
      oldOT:'',
      imageListF:[],
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
        images:'',
        name:'',
        phone:'',
        sex:'',
        type:'',
        textarea2:'',
      },
      rule:{
        name: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      rulesA:{
        newPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 13, max: 13, message: '长度在11个字符', trigger: 'change' }
        ],
      },
      rulesD:{
        money:[
          { required: true, message: '最高输入金额一百万', trigger: 'change' },
          // { min: 3, max: 9, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      form:{
        newPhone:'',
        newTakeNum:'',
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
      dialogImageUrl: '',
      actionDialogVisible: false,
      isNoMyself:'',
      tableData:{
        id:'',
        avatar:'',
      },
      remarkString:'',

    };
  },

  created:function () {
    // this.getAll();

    // this.postFace();
    // this.view();
    this.chooseLists();
  },

  mounted:function(){
    // this.camera_process();
  },

  methods:{
    chooseLists(){
      OrderApi.chooseLists().then((res) => {
        if(res.data.errno === 0){
          this.$data.tableData = res.data.data.list;
          // console.log(this.$data.tableData);
        }
      })
    },
    reFresh(){
      // console.log('刷新操作');
      this.chooseLists();
    },
    //  上传图片动态地址
    importFileUrl(){
      return global.FILE_UPLOAD
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


    //确认人脸
    step01:function (){
      console.log('确认人脸');
    },
    //确认信息
    step02:function (){
      console.log('确认信息');
      //一下都是测试开启，勿动
      // this.userNew = true;
      // this.phoneIsMySqlA = true;
      // this.step01_block = false;
      // this.step02_block = true;
      // this.userNew= false;
      // this.userOld = true;
      // this.firstNewC = false;
      // this.ifIsOld=true;
      // this.ifIsNew=false;
    },
    //订单录入
    step03:function (){
      console.log('订单录入');
      // this.step03_block = true
    },



    //智能识别人脸身份
    recognition(id){
      console.log(id)
      this.step02_block=true;
      this.step01_block=false;
      this.step03_block=false;
      //直接点击智能识别的时候一切都回到原始状态
      this.userNew = false;
      this.userOld = false;
      this.firstNewC =false;
      this.$data.form.newPhone = '';
      this.phoneIsMySqlA = false;
      this.phoneIsMySql = false;
      this.firstNewC = false;
      this.phoneNoMySql = false;
      this.checkoutCallBack = false;
      //  请求接口，上传文件（头像）,返回0-新客，1-熟客
      let list = {
        id:id
      };
      let qs = require('querystring')
      OrderApi.videoFindFace(qs.stringify(list)).then((res) => {
        console.log(res);
        console.log(res.data.data)
        if(res.data.msg === '服务器内部错误'){
          this.$message({
            message: '您获取的照片不合法',
            type: 'warning',
            center: true
          });
          this.step02_block=false;
          this.step01_block=true;
          this.step03_block=false;
        }else if(res.data.errno === -1){
          console.log("获取照片失败");
          this.$message({
            message: '获取人脸失败',
            type: 'warning',
            center: true
          });
          this.step02_block=false;
          this.step01_block=true;
          this.step03_block=false;
        }
        else{
          this.step_1=2;
          this.step_2=1;
          this.step_3=2;
          this.step_4=2;
          console.log('获取到照片了');
          console.log(res.data.errno);
          this.$data.faceIdIs = res.data.data.customer_id;
          if(res.data.data.is_new === 1){
            this.$data.NewRuleForm.images = res.data.data.avatar;
            // this.$data.NewRuleForm.phone = res.data.data.avatar;
            if(res.data.data.gender === 1){
              this.$data.NewRuleForm.sex = '男'
            }else{
              this.$data.NewRuleForm.sex = '女'
            }
            //  老用户
            this.userNew= false;
            this.userOld = true;
            this.firstNewC = false;
            this.ifIsOld=true;
            this.ifIsNew=false;
            //回显数据
          }else if(res.data.data.is_new === 0){
            //  新用户
            this.userNew = true;
            this.userOld = false;
            this.firstNewC =true;
            this.$data.form.newPhone = '';
            this.phoneIsMySqlA = false;
            this.phoneIsMySql = false;
            this.phoneNoMySql = false;
            this.$data.newNewP = res.data.data.avatar;
            if(res.data.data.gender === 1){
              this.$data.newNewQ = '男'
            }else{
              this.$data.newNewQ = '女'
            }
            if(res.data.data.vip_level === 0){
              this.$data.newNewR = '未购买'
            }else{
              this.$data.newNewR = '已购买'
            }
          }
        }
      })
    },

    //  有人脸且手机号正确-走下一步
    userOldIs(){
      this.getAll();
      console.log(this.$data.NewRuleForm.textarea2);
      if(this.$data.NewRuleForm.textarea2 === ''){
        this.$message({
          message: '请填写备注信息',
          type: 'warning',
          center: true
        });
      }else{
        this.step03_block=true;
        this.step02_block=false;
        this.step01_block=false;

        this.step_1=2;
        this.step_2=2;
        this.step_3=1;
        this.step_4=2;
        //不管有没有为新手机号，最终走向消费，传值一次,更一次手机号
        //这里的 this.$data.faceI 有两种可能，是本人和不是本人
        console.log(this.$data.isNoMyself);
        let list = {
          'phone': this.$data.form.newPhone,
          'customer_id':this.$data.isNoMyself,
        }
        let qs = require('querystring');
        OrderApi.addNPhone(qs.stringify(list)).then((res) => {
          console.log(res);
          console.log(res.data.msg)
          // this.$message({
          //   message: res.data.msg,
          //   type: 'warning',
          //   center: true
          // });
        });
      }

    },

    //  有人脸但手机号错误-走纠正-验证手机号
    userOldNoPhone(){
      this.userOld = false;
      this.userNew = true;
      //  清空以前的纠错数据
      this.$data.form.newPhone = '';
      this.$data.form.newTakeNum = '';
      this.phoneIsMySqlA = false;
      this.phoneIsMySql = false;
      this.phoneNoMySql = false;
    },

    //  输入手机号点击查找，是否存在数据库
    checkoutPhone(){
      //  请求接口，发送手机号，如果存在，则显示验证码，如果不存在
      let list = {
        'phone': this.$data.form.newPhone
      }
      let qs = require('querystring');
      OrderApi.postPhone(qs.stringify(list)).then((res) => {
        console.log(res);
        console.log(res.data.errno);
        if(res.data.errno === 1000002){
          this.$message({
            message: res.data.msg,
            type: 'warning',
            center: true
          });
        }else{
          if(res.data.data.is_not === 0){
            //  该用户已注册
            this.phoneIsMySqlA = true;
            // this.firstNewC =false;
            // this.phoneIsMySql = true;
            window.clearInterval(clock)
            this.$data.getClickName = '发送验证码';
            this.$data.waitTime = 60;
            this.canClick = true  //这里重新开启
          }else if(res.data.data.is_not === 1){
            //  该用户未注册
            this.phoneNoMySql = true;

          }
        }
      });

      //
    },

    //如果查询手机号，突然又修改重新查询，则获取焦点的时候，最新状态
    needsC(){
      this.$data.form.newPhone = '';
      this.$data.form.newTakeNum = '';
      this.phoneIsMySqlA = false;
      this.phoneIsMySql = false;
      this.phoneNoMySql = false;
    },

    //点击获取验证码
    getMsg(){
      let list = {
        'phone': this.$data.form.newPhone
      }
      let qs = require('querystring');
      OrderApi.getMsg(qs.stringify(list)).then((res) => {
        console.log(res);
        this.phoneIsMySql = true;
      });
    },
    GetSendM(){
      if(this.$data.form.newPhone == ''){
        this.$message({
          type: 'warning',
          message: '请输入手机号!'
        });
      }else{
        if (!this.canClick) return  ;
        this.canClick = false
        this.$data.getClickName = this.$data.waitTime + 's后发送';
        this.getMsg();
        clock = window.setInterval(() => {
          this.$data.waitTime--;
          this.$data.getClickName = this.$data.waitTime + 's后发送';
          if (this.$data.waitTime < 0) {
            window.clearInterval(clock)
            this.$data.getClickName = '发送验证码';
            this.$data.waitTime = 60;
            this.canClick = true  //这里重新开启

          }
        },1000);
      }

    },

    //获得验证码，点击确认返回顾客信息
    GetMsgPull(){
      //验证码填写之后，点击确认
      if(this.$data.form.newTakeNum == ''){
        this.$message({
          type: 'warning',
          message: '请填写验证码!'
        });
      }else{
        let list = {
          'phone': this.$data.form.newPhone,
          'code':this.$data.form.newTakeNum
        }
        let qs = require('querystring');
        OrderApi.checkMsg(qs.stringify(list)).then((res) => {
          if(res.data.msg == '验证码错误'){
            this.$message({
              type: 'warning',
              message: '验证码填写错误!'
            });
          }else{
            console.log(res);
            console.log(res.data.data.avatar);
            this.$data.ruleForm.image = res.data.data.avatar;
            this.$data.ruleForm.name = res.data.data.name;
            this.$data.ruleForm.textarea2 = res.data.data.remark;
            this.$data.ruleForm.phone = this.$data.form.newPhone;
            if(res.data.data.gender === 1){
              this.$data.ruleForm.sex = '男'
            }else{
              this.$data.ruleForm.sex = '女'
            }
            if(res.data.data.vip_level === 0){
              this.$data.ruleForm.type = '未购'
            }else if(res.data.data.vip_level === 1){
              this.$data.ruleForm.type = '已购'
            }
            this.$data.faceIdNo = res.data.data.customer_id;
            this.checkoutCallBack = true;
            this.userNew = false;
          }
        });
      }


    },

    //  返回的顾客信息，是本人直接走消费
    isTrueAndPass(){
      this.getAll();
        // console.log(this.$data.faceIdNo);
        let list = {
          'phone': this.$data.form.newPhone,
          'customer_id':this.$data.faceIdNo,
          'is_me':1
        }
        let qs = require('querystring');
        OrderApi.postMe(qs.stringify(list)).then((res) => {
          //是本人的时候，人脸id为查询手机号返回人脸id
          this.$data.isNoMyself = this.$data.faceIdNo;
          console.log(res);
          this.step03_block=true;
          this.step02_block=false;
          this.step01_block=false;

          this.step_1=2;
          this.step_2=2;
          this.step_3=1;
          this.step_4=2;
        });

    },

    //  返回的顾客信息不是本人，则显示最开始的顾客信息
    isNoAndPass(){
      let list = {
        'phone': this.$data.form.newPhone,
        'customer_id':this.$data.faceIdIs,
        'is_me':0
      }
      let qs = require('querystring');
      OrderApi.postMe(qs.stringify(list)).then((res) => {
        //不是本人的时候，人脸id为人脸识别返回id
        this.$data.isNoMyself = this.$data.faceIdIs;
        console.log(res);
        console.log(0)
        this.userOld = true;
        this.ifIsOld = true;
        this.checkoutCallBack = false;
        //人脸为拍摄人脸
        console.log(this.$data.newNewP);
        console.log(this.$data.NewRuleForm.images);
        this.$data.NewRuleForm.images = this.$data.newNewP;
        this.$data.NewRuleForm.phone = this.$data.form.newPhone;
        this.$data.NewRuleForm.sex = this.$data.newNewQ;
        this.$data.NewRuleForm.type =  this.$data.newNewR;
        this.$data.NewRuleForm.textarea2 = this.$data.remark;
      });

    },

    //  查询到的手机号没有在数据库，点击返回信息
    GetNOMysql(){
      this.userOld = true;
      this.ifIsOld=true;
      this.ifIsNew=false;
      this.userNew = false;
      //人脸为拍摄人脸
      this.$data.NewRuleForm.images = this.$data.newNewP;
      this.$data.NewRuleForm.phone = this.$data.form.newPhone;
      this.$data.NewRuleForm.sex = this.$data.newNewQ;
      this.$data.NewRuleForm.type =  this.$data.newNewR;
      this.$data.NewRuleForm.textarea2 =  this.$data.remark;
      this.$data.isNoMyself = this.$data.faceIdIs;
    },

    //第二步返回第一步
    backA(){
      console.log(0)
      this.step01_block=true;
      this.step02_block=false;
      this.step03_block=false;
      // this.camera_process();

      this.step_1=1;
      this.step_2=2;
      this.step_3=2;
      this.step_4=2;

    },
    backLine(){
      this.step01_block=true;
      this.step02_block=false;
      this.step03_block=false;
      // this.camera_process();

      this.step_1=1;
      this.step_2=2;
      this.step_3=2;
      this.step_4=2;
    },
    //放弃验证返回输入状态
    getUpMsg(){
      this.step01_block=true;
      this.step02_block=false;
      this.step03_block=false;
      // this.camera_process();

      this.step_1=1;
      this.step_2=2;
      this.step_3=2;
      this.step_4=2;
    },

    //第三步返回第二步
    backB(){
      this.step01_block=false;
      this.step02_block=true;
      this.step03_block=false;

      this.step_1=2;
      this.step_2=1;
      this.step_3=2;
      this.step_4=2;
    },

    addAGood(){
      console.log('新增一条');
      let obj = {
        material : null,
        style : null,
        money:''
      }

      this.$data.addProList.push(obj);

    },

    //  实时计算输入金额
    getMoney(obj){
      if(obj.length > 11){
        this.$message({
          message: '最高输入金额为一百万',
          type: 'warning',
          center: true
        });
        // this.isCan = 1;
        obj.length = 9;
      }
      console.log(0);
      // console.log(this.$data.requestNewCreate.money);
      let m = 0;
      for(let i = 0; i< this.$data.addProList.length; i++){
        console.log(this.$data.addProList[i].money);
        m += Number(this.$data.addProList[i].money);
        console.log(m);
      }
      this.$data.allGoodLenght =this.$data.addProList.length
      this.$data.allMoney = m;
    },

    //  删除一条新增的商品数据
    delGoods(index){
      //  删除
      this.$data.addProList.splice(index,1);
      //删除一条之后，需要再计算金额
      let m = 0;
      for(let i = 0; i< this.$data.addProList.length; i++){
        console.log(this.$data.addProList[i].money);
        m += parseInt(this.$data.addProList[i].money);
        console.log(m);
      }
      this.$data.allGoodLenght =this.$data.addProList.length
      this.$data.allMoney = m;
    },

    //  上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.actionDialogVisible = true;
      console.log(file)
      console.log(this.dialogImageUrl)
    },
    // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      console.log('上传文件', response);
      console.log(response.msg)

      // if (response.errno == 1000000 || response.msg=='access-token不能为空' || response.msg=='用户不存在') {
      //   console.log(0)
      //   localStorage.setItem('knock_knock', '')
      //   localStorage.setItem('username', '')
      //   router.replace({
      //     path: '/UserLogin',
      //     query: {redirect: router.currentRoute.fullPath}
      //   })
      // }else{
      //
      // }
      console.log(response.data.path);
      this.$data.imageListF.push(response.data.path);
      console.log(this.$data.imageListF);
    },

    //最后的计算
    allPostM(){
      console.log(this.$data.addProList);
      let arrAs= {};
      for(let i = 0; i< this.$data.addProList.length; i++){
        arrAs = {
          'material':this.$data.addProList[i].material,
          'style':this.$data.addProList[i].style,
          'price':this.$data.addProList[i].money
        };
        this.$data.pushGoods.push(arrAs);
      }
      // console.log(this.$data.pushGoods);
      let sendData = JSON.stringify(this.$data.pushGoods);
      // console.log(sendData);
      let listArry =  this.$data.imageListF.join(',');
      // console.log(listArry);
      if(this.$data.NewRuleForm.textarea2 === ''){
        this.$data.pushRemk = this.$data.ruleForm.textarea2;
      }else if(this.$data.ruleForm.textarea2 === ''){
        this.$data.pushRemk = this.$data.NewRuleForm.textarea2;
      }
      let list = {
        'goods_info':sendData,
        'remark':this.$data.remarkString,
        'files_web':listArry,
        'customer_id':this.$data.isNoMyself,
      }
      let qs = require('querystring');
      OrderApi.addGoods(qs.stringify(list)).then((res) => {
        // console.log(res);
        if(res.data.msg != ''){
          this.$message({
            message: res.data.msg,
            type: 'warning',
            center: true
          });
        }
        if(this.$data.item.material != '' && this.$data.item.style != '' && this.$data.item.money != ''){
          this.$router.push({path: '/Order'});
          this.$message({
            message: '创建订单成功',
            type: 'success',
            center: true
          });

        }else{
          this.$message.warning('请填写商品信息')
        }

        //完成订单之后，跳回列表页面
        if(res.data.error == 0){
          this.$refs.upload.clearFiles();
          this.step_1=2;
          this.step_2=2;
          this.step_3=2;
          this.step_4=1;
        }

      });
      // this.$router.push({path: '/Order'})
    }

  }
}
