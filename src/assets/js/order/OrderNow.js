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



    //智能识别人脸身份
    recognition(id,index){
      this.$data.see = [true,true,true,true,true,true];
      this.$data.saw = [false,false,false,false,false,false];
      this.$data.saw[index] = true;
      this.$data.see[index] = false;
      // (nowIdx !== 4) && (this.$data.saw = false);
      this.$data.traffic_id = id;
      this.step02_block=true;
      this.step01_block=true;
      this.step03_block=true;
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
        this.getAll();
        if(res.data.msg === '服务器内部错误'){
          this.$message({
            message: '您获取的照片不合法',
            type: 'warning',
            center: true
          });
          this.step02_block=false;
          this.step01_block=true;
          this.step03_block=false;
        }
        else{
          this.$data.NewRuleForm = res.data.data;
          this.$data.faceIdIs = res.data.data.customer_id;
          if(res.data.data.is_new === 1){
            this.$data.NewRuleForm.images = res.data.data.avatar;
            // this.$data.NewRuleForm.phone = res.data.data.avatar;
            if(res.data.data.gender === 0){
              this.$data.NewRuleForm.sex = '女'
            }else{
              this.$data.NewRuleForm.sex = '男'
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
              this.$data.NewRuleForm.sex = '男'
            }else{
              this.$data.NewRuleForm.sex = '女'
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

    //  返回的顾客信息，是本人直接走消费
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
          //是本人的时候，人脸id为查询手机号返回人脸id
          this.$data.isNoMyself = this.$data.faceIdNo;

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
      if(obj.length > 11){
        this.$message({
          message: '最高输入金额为一百万',
          type: 'warning',
          center: true
        });
        // this.isCan = 1;
        obj.length = 9;
      }
      let m = 0;
      for(let i = 0; i< this.$data.addProList.length; i++){
        m += Number(this.$data.addProList[i].money);
      }
      this.$data.allGoodLenght =this.$data.addProList.length
      this.$data.allMoney = m;
    },

    //  删除一条新增的商品数据
    delGoods(index){
      this.$data.addProList.splice(index,1);
      if(this.$data.addProList.length == 1){
        if(this.$data.addProList[0].money == ''){
          this.$data.allMoney = '';
        }
      }else{
        //删除一条之后，需要再计算金额
        let m = 0;
        for(let i = 0; i< this.$data.addProList.length; i++){
          m += parseInt(this.$data.addProList[i].money);
        }
        this.$data.allGoodLenght =this.$data.addProList.length
        this.$data.allMoney = m;
      }
    },

    //  上传图片
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.actionDialogVisible = true;
      // console.log(file)
      // console.log(this.dialogImageUrl)
    },
    // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      // console.log('上传文件', response);
      // console.log(response.msg)
      this.$data.imageListF.push(response.data.path);
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
      let listArry =  this.$data.imageListF.join(',');
      if(this.$data.NewRuleForm.textarea2 === ''){
        this.$data.pushRemk = this.$data.ruleForm.textarea2;
      }else if(this.$data.ruleForm.textarea2 === ''){
        this.$data.pushRemk = this.$data.NewRuleForm.textarea2;
      }
      let list = {
        'goods_info':sendData,
        'remark':this.$data.remarkString,
        'files_web':listArry,
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
