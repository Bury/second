import global_data from '@/config/global_data'
import orderApi from '@/api/order'
import * as utils from '@/utils/index'
import apiUrl from '@/config/API.js'
import globalFunctions from '@/config/global_functions'

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
			imageListF: [],
			allNum: '1',
			takeTitle: '',
			isForChange: false,
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
				file: ''
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
			requestParameters: {
				page: 1,
				page_size: 20,
				material: '',
				style: '',
				visited: '',
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
			fromRules:{
				cash_t: [{required: true,message: '请选择创建时间',trigger: 'blur'}],
				id: [{required: true,message: '请输入人脸编号',trigger: 'blur'}],
			},
			rules: {
				cash_t: [{required: true,message: '请选择创建时间',trigger: 'blur'}],
				faceID: [{message: '请输入人脸信息',trigger: 'blur'}],
				material: [{message: '请选择材质信息',trigger: 'blur'}],
				style: [{message: '请选择款式信息',trigger: 'blur'}],
				price: [{required: true,message: '请输入商品价格',trigger: 'blur'}]
			},
			viewVisible: false,
			noData: false,
			inputMaxL: '',
			pickerOptionsSet: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e6
				}
			},
			imgViewVisible: false,
			imgViewBig: '',
			submitFlag: true,
      bottom:true,
      top:false,
      visibled:false,
      cash_time_start:'',
      cash_time_end:'',
      create_time_start:'',
      create_time_end:'',
		}
	},
	watch:{
		FormVisible:function(){
			setTimeout(() => {
				this.$refs.formName.clearValidate()
			},0)
		}
	},
	created: function() {
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
				if(res.data.errno === 0) {
					let labels = res.data.data;
					for(let i = 0; i < labels.length; i++) {
						if(labels[i].name === '材质') {
							this.materials = labels[i].children;
						} else if(labels[i].name === '款式') {
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
		beforeAvatarUpload(file) {
			const isJPEG = file.type === 'image/jpeg';
			const isPNG = file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if(!isJPEG && !isPNG) {
				this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
			}
			if(!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return(isJPEG || isPNG) && isLt2M;
		},

		// 上传成功后的回调
		uploadSuccess(response, file, fileList) {
			if(response.errno === 0) {
				let image = response.data.path;
				if(this.$data.imageListF.length < 3) {
					this.$data.imageListF.push(image)
				}
			} else {
				this.$message({
					type: 'warning',
					message: '此图片有格式问题！',
				})
			}

		},

		//编辑--上传图片的删除、添加地址
		editHandleRemove(file, fileList) {
			// console.log(file, fileList);
			// console.log(this.$data.dialogImageUrl)

		},

		editHandlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},

		//编辑上传图片成功后的回调
		editUploadSuccess(response, file, fileList) {
			// console.log(response)
			if(response.errno === 0) {
				for(let i = 0; i < this.$data.editForm.avatar.length; i++) {
					this.$data.editImgAvatar.push(this.$data.editForm.avatar[i]);
				}
				this.$data.editImgAvatar.push(response.data.fullpath);
			} else {
				this.$message({
					type: 'warning',
					message: '此图片有格式问题！',
				})
			}
		},
    //时间转为秒
    getS(value) {
      var formatTimeS = new Date(value).getTime() / 1000;
      return formatTimeS
    },
		//列表
		lists() {
		  let cashTimeStart = this.getS(this.$data.cash_time_start);
		  let cashTimeEnd = this.getS(this.$data.cash_time_end) + 86399;
		  let createTimeStart = this.getS(this.$data.create_time_start) ;
		  let createTimeEnd = this.getS(this.$data.create_time_end) + 86399;
		  if((cashTimeStart > cashTimeEnd) || (createTimeStart > createTimeEnd)){
        this.$confirm('您选择的结束时间应该大于开始时间','日期选择警告',{
          confirmButtonText:'知道了',
          showCancelButton:false,
          type:'warning'
        })
      }
      this.$data.requestParameters.cash_t_start = this.getS(this.$data.cash_time_start) ;
      this.$data.requestParameters.cash_t_end = this.getS(this.$data.cash_time_end) + 86399;
      this.$data.requestParameters.created_at_start = this.getS(this.$data.create_time_start) ;
      this.$data.requestParameters.created_at_end = this.getS(this.$data.create_time_end) + 86399;
			let qs = require('querystring');
      orderApi.lists(qs.stringify(this.$data.requestParameters)).then((res) => {
        if (res.data.errno === 0) {
          if(res.data.data.list.length === 0){
            this.$data.noData = true;
          }else{
            this.$data.noData = false;

          }
          this.$data.tableData = res.data.data.list;
          this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
          this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
          this.$data.requestParameters.page = 1;
        }
      })
		},

		// 编辑显示列表
		fnEdit(row) {
			this.$data.editVisible = true;
			this.$data.isForChange = true;
			this.view(row.id);
			setTimeout(()=>{
						this.$refs.upload.clearFiles();
			},0)
		},
		fnView(row) {
			this.$data.viewVisible = true;
			this.$data.isForChange = false;
			this.view(row.id);
		},
		viewClose() {
			this.$data.viewVisible = false;
			this.editClearData();
		},

		handleCurrentChange(currentPage) {
			this.$data.requestParameters.page = currentPage;
			this.lists();
		},

		dialogCloseEdit() {
			this.$data.editVisible = false;
			this.$refs.upload.clearFiles();
			setTimeout(() => {
				this.$refs.editForm.resetFields();
				this.editClearData();
			}, 0)
		},
		//查看
		view(id) {
			let qs = require('querystring')
			orderApi.view(qs.stringify({
				id: id,
			})).then((res) => {
				if(res.data.errno === 0) {
					res.data.data.avatar === null && (res.data.data.avatar = [])
					this.$data.editForm = res.data.data;
					let time = new Date(res.data.data.cash_t * 1000);
					this.$data.editForm.cash_t = time;
					this.$data.editForm.remark = res.data.data.remark;
					this.$data.editForm.price = Number(res.data.data.price).toFixed(2);
					let arrM = [];
					let arrS = [];
					for(let i = 0; i < this.$data.editForm.orderGoods.length; i++) {
					  if(this.$data.materials == 0){
              this.$data.editForm.orderGoods[i].material = null;
            }else{
              for (let item of this.$data.materials){
               arrM.push(item.id);
              }
              if(arrM.indexOf(this.$data.editForm.orderGoods[i].material) == -1){
                this.$data.editForm.orderGoods[i].material = null;
              }
            }

            if(this.$data.styles.length == 0){
              this.$data.editForm.orderGoods[i].style = null;
            }else{
              for (let item of this.$data.styles){
                arrS.push(item.id)
              }
              if(arrS.indexOf(this.$data.editForm.orderGoods[i].style) == -1){
                this.$data.editForm.orderGoods[i].style = null;
              }
            }

					  if(this.$data.editForm.orderGoods[i].material != 0 && this.$data.editForm.orderGoods[i].style != 0){
              let obj = {
                'material': this.$data.editForm.orderGoods[i].material,
                'style': this.$data.editForm.orderGoods[i].style,
                'price': this.$data.editForm.orderGoods[i].price,
              };
              this.$data.editRequestParameters.push(obj);
            }else{
					    let obj = {
                'material': null,
                'style': null,
                'price': this.$data.editForm.orderGoods[i].price,
              }
              this.$data.editRequestParameters.push(obj);
            }


					}
					this.$data.editAllNum = this.$data.editForm.orderGoods.length;
					if(this.$data.editForm.avatar != null) {
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
			for(let i = 0; i < this.$data.editForm.orderGoods.length; i++) {
				if(this.$data.editForm.orderGoods[i].price.replace(/[^\.\d]/g, '')) {
					n += parseInt(this.$data.editForm.orderGoods[i].price);
				} else {
					this.$data.editForm.orderGoods[i].price = 0;
				}
			}
			this.$data.editForm.price = n;
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
			for(let i = 0; i < this.$data.editForm.orderGoods.length; i++) {
				if(this.$data.editForm.orderGoods[i].price.replace(/[^\.\d]/g, '')) {
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
			let list = {
				'id': this.$data.editForm.traffic.customer_id,
			}
			let qs = require('querystring');
			orderApi.checkFaceInfo(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					this.$data.editForm.traffic.avatar = res.data.data.avatar;
					this.$data.editForm.traffic.customer_id = res.data.data.customer_id;
				} else {
					this.$message.error(res.data.msg);
				}
			})
		},

		//编辑提交，取消
		EditFormSubmit(editForm) {
			if(this.$data.submitFlag = false) {
				return false;
			}
			this.$data.submitFlag = false;
			let listArry = '';
			this.$data.editImgAvatar.length === 0 ? listArry = '' : listArry = this.$data.editImgAvatar.join(',');
			let sendA = JSON.stringify(this.$data.editRequestParameters);
			let postTime = this.editForm.cash_t / 1000;
			let files_web = this.$data.editForm.avatar.join()
			let list = {
				'id': this.$data.editForm.id,
				'goods_info': sendA,
				'cash_t': postTime,
				'remark': this.$data.editForm.remark,
				'files_web': files_web,
				'avatar': listArry,
				'customer_id': this.$data.editForm.traffic.customer_id
			};
			let qs = require('querystring');
			orderApi.editOrder(qs.stringify(list)).then((res) => {
				if(res.data.errno === 0) {
					this.lists();
					this.$message({
						type: 'success',
						message: '修改成功!'
					});
          this.$data.editVisible = false;
          this.editClearData();
          setTimeout(() => {
            this.$refs.editForm.resetFields();
          }, 0)
				} else {
					this.$message.error(res.data.msg);
				}


			})
			this.$data.submitFlag = true;

		},

		cancelE(editFrom) {
			this.$data.editVisible = false;
			this.editClearData();
			this.$refs.upload.clearFiles();
		},

		//清空数据
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
			this.$data.imageListF = [];
			this.$data.allNum = '1';
			this.$data.totalMoney = '';
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
			this.$data.item.material = '';
			this.$data.item.style = '';
			this.$data.item.price = '';
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
							if(res.data.errno === 0) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.lists();
							} else {
								this.$message.error(res.data.msg);
							}
						})
					}).catch(action => {})
				},
				//查看图片放大
				imgView(event) {
					this.$data.imgViewVisible = true;
					this.$data.imgViewBig = event.currentTarget.src
				},
				orderVideo() {
					this.$router.push({
						path: '/OrderNow'
					})
				},
				remark(val){
            if(val.length >= 200 ){
              let remarkVal = val.substring(0,200);
              this.$data.formName.remark = remarkVal;
              this.$message({
                   type:'warning',
                   message:'备注信息最多输入200个字符',
              })
            }
        },
    fnReset(){
		  this.$data.requestParameters.sn = '';
		  this.$data.requestParameters.material = '';
		  this.$data.requestParameters.style = '';
		  this.$data.requestParameters.visited = '';
		  this.$data.requestParameters.price_start = '';
		  this.$data.requestParameters.price_end = '';
		  this.$data.cash_time_start = '';
		  this.$data.cash_time_end = '';
		  this.$data.create_time_start = '';
		  this.$data.create_time_end = '';
    },
    viewDialogClose(){
		  this.$data.viewVisible = false;
      this.editClearData();
    },
    movementBottom(){
      this.$refs.topBox.style.overflow = 'visible';
      this.$data.visibled = true;
      this.$data.top = true;
      this.$data.bottom = false;
    },
    movementTop(){
      this.$refs.topBox.style.overflow = 'hidden';
      this.$data.visibled = false;
      this.$data.top = false;
      this.$data.bottom = true;
    },


		}

	}
