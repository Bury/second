import global_data from '@/config/global_data'
import orderApi from '@/api/order'
import * as utils from '@/utils/index'
import apiUrl from '@/config/API.js'

const SERVER_IP = apiUrl.apiUrl
const COMMON = 'v1'


export default {
  name: 'guest-list',
  components: {},
  data() {
    return {
      allGuestVisitClass: global_data.data.guest_visit_class,
      upLoadData: {
        access_token: localStorage.getItem('knock_knock'),
      },
      imageListF:'',
      allNum: '1',
      takeTitle:'',
      isForChange:false,
      totalMoney: 0,
      faceSearch: {
        avatar: '',
        customer_id: '',
      },
      searchFace: {
        id: '',
      },
      addProList: [{
        material: null,
        style: null,
        price: ''
      }],
      item: {
        material: '',
        style: '',
        price: '',
        file:''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      tableData: [],
      materials: [],
      styles: [],
      pagination: {
        currentPage: 1,
        totalCount: 0,
      },
      cashTimes: ['', ''],
      createdTimes: ['', ''],
      dialogTitle: '',
      requestParameters: {
        page: 1,
        page_size: 20,
        material: '',
        style: '',
        level: '',
        price_start: '',
        price_end: '',
        cash_t_start: '',
        cash_t_end: '',
        created_at_start: '',
        created_at_end: '',

      },
      formName: {
        cash_t: '',
        goods_info: [],
        files_web: '',
        customer_id: '',
        remark: ''
      },
      editForm: {
        traffic: {
          id: '',
          avatar: '',
          customer_id: '',
        },
        orderGoods: [],
        cash_t: '',
        avatar: '',
        price: '',
        customer_id: '',
      },
      editAllNum: '',
      editImgAvatar: [],
      editRequestParameters: [],
      editImgVisible: false,
      FormVisible: false,
      editVisible: false,
      faceVisible: false,
      rules: {
        cash_t: [
          {required: true, message: '请选择创建时间', trigger: 'blur'}
        ],
        faceID: [
          {message: '请输入人脸信息', trigger: 'blur'}
        ],
        material: [
          {message: '请选择材质信息', trigger: 'blur'}
        ],
        style: [
          {message: '请选择款式信息', trigger: 'blur'},
        ],
        price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'},
        ],
      },
      viewVisible: false,
      noData:false,
      inputMaxL:'',
    }
  },
  created: function () {
    this.lists();
    this.getAll();
  },

  methods: {
    getAll() {
      let list = {
        'all': 1,
        'customer_id': ''
      };
      let qs = require('querystring');
      orderApi.getAll(qs.stringify(list)).then((res) => {
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

    //上传图片动态地址
    importFileUrl() {
      return global.FILE_UPLOAD
    },

    //新增上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(file)
      console.log(fileList)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 上传成功后的回调
    uploadSuccess(response, file, fileList) {
      console.log(response.data.path);
      // console.log(this.$data.imageListF)
      let imageArr = [];
      imageArr.push(response.data.path);
      this.$data.imageListF = imageArr;
      // console.log(this.$data.imageListF)
    },

    //编辑--上传图片的删除、添加地址
    editHandleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(this.$data.dialogImageUrl)

    },

    editHandlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //编辑上传图片成功后的回调
    editUploadSuccess(response, file, fileList) {
      for (let i = 0; i < this.$data.editForm.avatar.length; i++) {
        this.$data.editImgAvatar.push(this.$data.editForm.avatar[i]);
      }
      this.$data.editImgAvatar.push(response.data.fullpath);
    },

    //列表
    lists() {
      if((this.$data.cashTimes != null) && (this.$data.createdTimes != null) ){
        this.$data.requestParameters.cash_t_start = utils.getDateTime(this.$data.cashTimes[0]);
        this.$data.requestParameters.cash_t_end = utils.getDateTime(this.$data.cashTimes[1]);
        this.$data.requestParameters.created_at_start = utils.getDateTime(this.$data.createdTimes[0]);
        this.$data.requestParameters.created_at_end = utils.getDateTime(this.$data.createdTimes[1]);
      }else{
        this.$data.cashTimes = ['',''];
        this.$data.createdTimes = ['',''];
        this.lists();
      }
      let qs = require('querystring');
      orderApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        if (res.data.errno === 0) {
          this.$data.tableData = res.data.data.list;
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;

        }
      })
    },

    // 编辑显示列表
    fnEdit(row) {
      this.$data.editVisible = true;
      this.$data.takeTitle = '编辑';
      this.$data.isForChange = true;
      this.view(row.id);
    },
    fnView(row) {
      this.$data.viewVisible = true;
      this.$data.takeTitle = '查看';
      this.$data.isForChange = false;
      this.view(row.id);
    },
    viewClose() {
      this.$data.viewVisible = false;
      this.editClearData();
    },

    //删除
    fnRemove(row) {
      this.$confirm('确认删除该订单：' + row.sn + ' ？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = {
          'id': row.id
        }
        let qs = require('querystring');
        orderApi.deleOrder(qs.stringify(list)).then((res) => {
          if (res.data.errno === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.lists();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }).catch(action => {
      })
    },

    handleCurrentChange(currentPage) {
      this.$data.requestParameters.page = currentPage;
      this.lists();
    },
    dialogClose(){
      this.$data.FormVisible = false;
      setTimeout(() =>{
        this.$refs.formName.resetFields();
        this.submitClearData();
        this.$data.faceVisible = false;
      },0)
    },
    //查看
    view(id) {
      let qs = require('querystring')
      orderApi.view(qs.stringify({id: id,})).then((res) => {
        if (res.data.errno === 0) {
          this.$data.editForm = res.data.data;
          let time = new Date(res.data.data.cash_t * 1000);
          this.$data.editForm.cash_t = time;
          this.$data.editForm.remark = res.data.data.remark;
          this.$data.editForm.price = Number(res.data.data.price).toFixed(2);
          for (let i = 0; i < this.$data.editForm.orderGoods.length; i++) {
            let obj = {
              'material': this.$data.editForm.orderGoods[i].material,
              'style': this.$data.editForm.orderGoods[i].style,
              'price': this.$data.editForm.orderGoods[i].price,
            };
            this.$data.editRequestParameters.push(obj);
          }
          this.$data.editAllNum = this.$data.editForm.orderGoods.length;
          if (this.$data.editForm.avatar != null) {
            this.$data.editImgVisible = true;
          } else {
            this.$data.editImgVisible = false;
          }

        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    //编辑计算总价
    editInputFun() {
      let n = 0;
      for (let i = 0; i < this.$data.editForm.orderGoods.length; i++) {
        if (this.$data.editForm.orderGoods[i].price.replace(/[^\.\d]/g, '')) {
          n += parseInt(this.$data.editForm.orderGoods[i].price);
        } else {
          this.$data.editForm.orderGoods[i].price = 0;
        }
      }
      this.$data.editForm.price = n;
    },

    totalPrice() {
      let n = 0;
      for (let i = 0; i < this.$data.addProList.length; i++) {
        if (this.$data.addProList[i].price.replace(/[^\.\d]/g, '')) {
          n += parseInt(this.$data.addProList[i].price);
        } else {
          this.$data.addProList[i].price = 0;
        }
      }
      this.$data.totalMoney = n;
    },



    //编辑添加商品
    editAddProduct() {
      let obj = {
        material: null,
        style: null,
        price: ''
      }
      this.$data.editForm.orderGoods.push(obj);
      this.$data.editRequestParameters.push(obj);
      this.$data.editAllNum = this.$data.editForm.orderGoods.length;
    },

    //编辑删除商品
    editDeleProduct(index) {
      this.$data.editForm.orderGoods.splice(index, 1);
      this.$data.editRequestParameters.splice(index, 1);
      let n = 0;
      for (let i = 0; i < this.$data.editForm.orderGoods.length; i++) {
        if (this.$data.editForm.orderGoods[i].price.replace(/[^\.\d]/g, '')) {
          n += parseInt(this.$data.editForm.orderGoods[i].price);
        } else {
          this.$data.editForm.orderGoods[i].price = 0;
        }
      }
      this.$data.editForm.price = n;
      this.$data.editAllNum = this.$data.editForm.orderGoods.length;
    },

    //编辑查询人脸信息
    editFindGuestByFaceId() {
      console.log(0)
      let list = {
        'id': this.$data.editForm.traffic.customer_id,
      }
      let qs = require('querystring');
      orderApi.checkFaceInfo(qs.stringify(list)).then((res) => {
        if (res.data.errno === 0) {
          this.$data.editForm.traffic.avatar = res.data.data.avatar;
          this.$data.editForm.traffic.customer_id = res.data.data.customer_id;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    //编辑提交，取消
    EditFormSubmit(editForm) {
      console.log(editForm)
      let listArry = '';
      if (this.$data.editImgAvatar.length == 0) {
        listArry = '';
      } else {
        listArry = this.$data.editImgAvatar.join(',');
      }
      let sendA = JSON.stringify(this.$data.editRequestParameters);
      console.log(this.editForm.cash_t);
      let postTime = this.editForm.cash_t / 1000;
      let list = {
        'id': this.$data.editForm.id,
        'goods_info': sendA,
        'cash_t': postTime,
        'remark': this.$data.editForm.remark,
        'files_web': this.$data.editForm.avatar,
        'avatar': listArry,
        'customer_id': this.$data.editForm.traffic.customer_id
      };
      let qs = require('querystring');
      orderApi.editOrder(qs.stringify(list)).then((res) => {
        if (res.data.errno === 0) {
          this.lists();
          this.editClearData();
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$data.editVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      })
      setTimeout(() =>{
        this.$refs.editForm.resetFields();
      },0)
    },

    cancelE(editFrom) {
      this.$data.editVisible = false;
      this.editClearData();
    },


    //根据人脸ID查询来客信息
    findGuestByFaceId() {
      this.$data.faceVisible = true;
      let list = {
        'id': this.$data.searchFace.id,
      }
      let qs = require('querystring');
      orderApi.checkFaceInfo(qs.stringify(list)).then((res) => {
        if (res.data.errno === 0) {
          this.$data.faceSearch.avatar = res.data.data.avatar;
          this.$data.faceSearch.customer_id = res.data.data.customer_id;
        } else {
          this.$message.error("没有该编号信息");
          this.$data.faceVisible = false;
        }
      })
    },

    //添加商品
    addProduct() {
      let obj = {
        material: null,
        style: null,
        price: ''
      }
      this.$data.addProList.push(obj);

    },
    //计算总价
    inputFun(itemPrice) {
      let n= 0;
      for(let i = 0; i< this.$data.addProList.length; i++){
      n += parseFloat(this.$data.addProList[i].price,2);
      }
      this.$data.totalMoney = n;
      this.$data.allNum = this.$data.addProList.length;
    },


    submitClearData() {
      this.$data.formName = {
        goods_info: [],
        cash_t: '',
        files_web: '',
        customer_id: '',
        remark: ''
      };
      this.$data.searchFace = {
        id: '',
      };
      this.$data.faceSearch = {
        avatar: '',
        customer_id: '',
      };
      this.$data.addProList = [{
        material: null,
        style: null,
        price: ''
      }];
      this.$data.imageListF = '';
      this.$data.allNum = '1';
      this.$data.totalMoney = '';
      this.$data.upLoadData = {
        access_token: '',
      };
      this.$data.dialogImageUrl = '';
      this.$data.editForm.avatar = '';
      this.$data.item.file = '';
      this.$data.dialogVisible = false;
    },

    editClearData() {
      this.$data.item = {
        material: '',
        style: '',
        price: ''
      };
      this.$data.editForm = {
        traffic: {
          id: '',
          avatar: '',
        },
        orderGoods: [],
        cash_t: '',
        avatar: '',
        price: '',
      };
      this.$data.editForm.orderGoods.material = '';
      this.$data.editForm.orderGoods.style = '';
      this.$data.editForm.orderGoods.price = '';
      this.$data.editAllNum = '';
      this.$data.editImgAvatar = [];
      this.$data.editRequestParameters = [];
    },

    //删除商品
    deleProduct(index) {
      this.$data.addProList.splice(index, 1);
      let n = 0;
      for (let i = 0; i < this.$data.addProList.length; i++) {
        if (this.$data.addProList[i].price.replace(/[^\.\d]/g, '')) {
          n += parseFloat(this.$data.addProList[i].price,2);
        } else {
          this.$data.addProList[i].price = 0;
        }
      }
      this.$data.totalMoney = n;
      this.$data.allNum = this.$data.addProList.length;
    },

    //补单
    submitForm(formName) {
      let listArry = this.$data.imageListF.join(',');
      let sendData = JSON.stringify(this.$data.addProList);
      let cashTime = this.$data.formName.cash_t / 1000;
      let list = {
        'goods_info': sendData,
        'cash_t': cashTime,
        'remark': this.$data.formName.remark,
        'files_web': listArry,
        'customer_id': this.$data.faceSearch.customer_id
      }
      let qs = require('querystring');
      orderApi.addsNotLive(qs.stringify(list)).then((res) => {
        if (res.data.errno === 0) {
          this.lists();
          this.submitClearData();
          this.$message({
            type: 'success',
            message: '创建成功!'
          });
          this.$data.FormVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    //删除
    fnRemove(row) {
      this.$confirm('确认删除该订单：' + row.sn + ' ？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = {
          'id': row.id
        }
        let qs = require('querystring');
        orderApi.deleOrder(qs.stringify(list)).then((res) => {
          if (res.data.errno === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.lists();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }).catch(action => {
      })
    },

    //取消
    cancel(name) {
      this.$data.FormVisible = false;
      this.submitClearData();
      this.$data.faceVisible = false;
    },

    //现场录单
    orderLive() {
      this.$router.push({path: '/OrderLive'})
    },
    orderVideo() {
      this.$router.push({path: '/OrderVideo'})
    },
    //补单
    orderNotLive() {
      this.$data.FormVisible = true;
      //点击补单的时候，清空一下数据
      this.$data.imageListF = '';
      this.$data.item.file = '';
    },

  }

}
