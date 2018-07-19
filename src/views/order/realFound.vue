<template>

  <div class="guest-list-page">
      <div class="top-box" style="text-align: center">
        <ul style="display: flex">
          <li @click="get_a">
            <span class="circles">1</span>
            <p class="circleFont">确认人脸</p>
          </li>
          <li @click="get_b">
            <span class="circles">2</span>
            <p class="circleFont">确认信息</p>
          </li>
          <li @click="get_c">
            <span class="circles">3</span>
            <p class="circleFont">订单录入</p>
          </li>
          <li>
            <span class="circles">4</span>
            <p class="circleFont">完成</p>
          </li>
        </ul>
      </div>
      <div style="border-top:1px solid #dcdfe6;margin-top: 2rem">
        <!--确认人脸-->
        <div class="get_a" style="" v-show="mask_a">
          <div>
            <div class="showImg" style="display: flex;
    align-items: center;
    width: 30rem;
    height: 30rem;" v-show="getShowVideo" id="getVideo">
              <video id="video" autoplay="" style='width:640px;height:480px'></video>

              <el-row style="display: flex;flex-direction: column;margin-left: 2rem">
                <el-button id='picture' @click="pImage">拍摄</el-button>
              </el-row>
            </div>
            <div class="showImg" id="getCn" v-show="dialogVisible">
              <canvas id="canvas" width="640" height="480"></canvas>
              <el-row style="flex-direction: column;margin-left: 2rem;align-items: center;margin-bottom: 3rem" id="getNn" >
                <el-button @click="getNewvideo" style="margin-top: 1rem;margin-left: 1rem">重拍</el-button>
                <el-button style="margin-top: 5rem;" @click="recognition">智能识别</el-button>
              </el-row>
            </div>

          </div>

        </div>
        <!--确认信息-->
        <div class="get_a" style="" v-show="mask_b">
          <!--确认信息-有人脸-->
          <div style="display: flex;flex-direction: column;align-items: center" v-show="userOld">
            <div class="showImg">
              <div style="display: flex;flex-direction: column;align-items: center">
                <img :src="NewRuleForm.images" alt="" style="width: 20rem;height: 20rem">
              </div>
            </div>
            <el-form :model="NewRuleForm" :rules="rule" ref="NewRuleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名:" prop="name" style="width: 30rem">
                <el-input v-model="NewRuleForm.name" ></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="phone" style="width: 30rem;">
                <el-input v-model="NewRuleForm.phone" style="width: 15rem" :disabled="true"></el-input>
                <el-button style="margin-left: 2rem" @click="userOldNoPhone" v-show="ifIsOld">纠错</el-button>
                <p style="margin-left: 2rem;color: red" v-show="ifIsNew">此号码为新号码</p>
              </el-form-item>
              <el-form-item label="性别:" prop="sex" style="width: 30rem">
                <el-input v-model="NewRuleForm.sex" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="类型:" prop="type" style="width: 30rem">
                <el-input v-model="NewRuleForm.type" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="备注:" prop="type" style="width: 30rem">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="NewRuleForm.textarea2">
                </el-input>
              </el-form-item>
            </el-form>
            <el-row style="margin-top: 3rem">
              <el-button @click="backA">上一步</el-button>
              <el-button @click="userOldIs" style="margin-left: 15rem">下一步</el-button>
            </el-row>
          </div>
          <!--有人脸，但是手机号错误-->
          <div v-show="userNew">
            <!--纠错-去数据库查找这个手机号-->
            <el-form ref="form" :model="form"  :rules="rulesA" label-width="80px">
              <el-form-item style="width: 30rem" v-show="firstNewC">
                <p style="color: red;font-size: 1.2rem">人脸识别该顾客为新顾客，请输入手机号！</p>
              </el-form-item>
              <el-form-item label="手机号:" style="width: 30rem;" prop="newPhone">
                <el-input v-model="form.newPhone" style="width: 10rem" maxlength="11" @focus="needsC"></el-input>
                <el-button plain style="float: right" @click="checkoutPhone">查找</el-button>
              </el-form-item>
              <!--数据库找到这个手机号，验证更改信息-->
              <el-form-item v-show="phoneIsMySqlA" label="验证码:" style="width: 30rem;">
                <el-input v-model="form.newTakeNum" style="width: 10rem"></el-input>
                <el-button plain style="float: right" @click="GetSendM">获取验证码</el-button>
              </el-form-item>
              <el-form-item label="" style="width: 30rem;margin-top: 5rem;margin-right: 10rem">
                <el-button v-show="phoneIsMySql">上一步</el-button>
                <el-button style="margin-left: 5rem" v-show="phoneIsMySql" @click="GetMsgPull">确认</el-button>
              </el-form-item>
              <!--数据库没有找到这个手机号，显示为新号码-->
              <el-form-item v-show="phoneNoMySql" label="" style="width: 30rem;">
                <p style="color: red">此号码为新号码</p>
              </el-form-item>
              <el-form-item label="" style="width: 30rem;margin-top: 5rem;margin-right: 10rem">
                <el-button style="margin-left: 5rem" v-show="phoneNoMySql" @click="GetNOMysql">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--通过验证码，验证之后，显现顾客信息-->
          <div style="display: flex;flex-direction: column;align-items: center" v-show="checkoutCallBack">
            <div class="showImg">
              <div style="display: flex;flex-direction: column;align-items: center">
                <img :src="ruleForm.image" alt=""  style="width: 20rem;height: 20rem">
              </div>
            </div>
            <el-form :model="ruleForm" :rules="rule" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名:" prop="name" style="width: 30rem">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="phone" style="width: 30rem">
                <el-input v-model="ruleForm.phone" :disabled="true"></el-input>
                <!--<el-button style="margin-left: 2rem">纠错</el-button>-->
              </el-form-item>
              <el-form-item label="性别:" prop="sex" style="width: 30rem">
                <el-input v-model="ruleForm.sex" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="类型:" prop="type" style="width: 30rem">
                <el-input v-model="ruleForm.type" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
            <el-row style="margin-top: 3rem">
              <el-button >上一步</el-button>
              <el-button style="margin-left: 15rem" @click="isNoAndPass">不是本人</el-button>
              <el-button style="margin-left: 5rem" @click="isTrueAndPass">是本人</el-button>
            </el-row>
          </div>


        </div>
        <!--订单录入-->
        <div class="get_a" v-show="mask_c" style="text-align: center">
          <div>
            <el-form :inline="true" :model="item"  size="mini" style="text-align: center">
              <div v-for='(item,index) in addProList' v-if="addProList">
                <el-form-item label="材质：">
                  <el-select v-model="item.material" placeholder="请选择材质">
                    <el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="款式：">
                  <el-select v-model="item.style" placeholder="请选择款式">
                    <el-option  v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="成交总额：">
                  <el-col :span="15">
                    <el-input v-model="item.money" v-on:input="getMoney" value="0"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button plain @click="delGoods(index)">删除</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <el-row style="margin-top: 3rem;margin-right: 3rem">
            <el-button style="margin-left: 5rem;float: right" @click="addAGood">新增商品</el-button>
          </el-row>
          <el-row style="margin-top: 3rem;margin-right: 3rem;">
            <div class="moneyL" style="">
              <p>共计</p>
              <input class="lastNum" disabled v-model="allGoodLenght">
              <p>件，</p><p>总价</p>
              <input class="lastNum" disabled v-model="allMoney" value="0">
              <p>元</p>
            </div>
          </el-row>
          <!--长传小票-->
          <el-row>
            <el-upload v-model="item.file"
                       action="http://dev-api.yy.ibetwo.com/v1/user/upload"
                       list-type="picture-card"
                       :data="upLoadData"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove"
                       :onSuccess="uploadSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-row>
          <el-row style="margin-top: 3rem">
            <el-button style="margin-left: 15rem;margin-right: 10rem;float: right" @click="allPostM">确认</el-button>
            <el-button style=" float: right" @click="backB">上一步</el-button>
          </el-row>
        </div>
      </div>
  </div>
</template>
<script>
  import remindApi from '../../api/remind'
  import OrderApi from '../../api/order'
    export default {
        name: "real-found",
      components: {

      },
      data(){
        return {
              upLoadData: {
                access_token: 'X6dMRIwBZD8oUf_Qpr1JeBTIK37iQmzM',
            },
          materials:[],
          styles:[],
          mask_a:true,
          getShowVideo:true,
          dialogVisible: false,
          mask_b:false,
          userOld:false,
          userNew:false,
          mask_c:false,
          msgGetNews:false,
          phoneIsMySql:false,
          checkoutCallBack:false,
          phoneNoMySql:false,
          ifIsOld:false,
          ifIsNew:false,
          firstNewC:false,
          phoneIsMySqlA:false,
          faceId:'',
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
          ruleForm: {
            name: '',
            phone:'',
            sex:'',
            type:'',
            image:''
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
              { min: 13, max: 13, message: '长度在13个字符', trigger: 'change' }
            ],
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
          dialogVisible: false
        };
      },
      created:function () {
        this.getAll();
        // this.postFace();

        // this.view();
        console.log(this.$data.NewRuleForm.images);
      },
      mounted:function(){
        this.camera_process();
        // this.dialogVisible = false;
      },

      methods:{
        //  调用摄像头
        camera_process(){
          //访问用户媒体设备的兼容方法
          function getUserMedia(constraints, success, error) {
            if (navigator.mediaDevices.getUserMedia) {
              //最新的标准API
              navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
            } else if (navigator.webkitGetUserMedia) {
              //webkit核心浏览器
              navigator.webkitGetUserMedia(constraints,success, error)
            } else if (navigator.mozGetUserMedia) {
              //firfox浏览器
              navigator.mozGetUserMedia(constraints, success, error);
            } else if (navigator.getUserMedia) {
              //旧版API
              navigator.getUserMedia(constraints, success, error);
            }
          }

          function success(stream) {
            //兼容webkit核心浏览器
            let CompatibleURL = window.URL || window.webkitURL;
            //将视频流设置为video元素的源
            //console.log(stream);

            //video.src = CompatibleURL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
          }

          function error(error) {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
          }

          let video = document.getElementById('video');
          let canvas = document.getElementById('canvas');
          let context = canvas.getContext('2d');
          let image = new Image();

          if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
            //调用用户媒体设备, 访问摄像头
            getUserMedia({video : {width: 480, height: 320}}, success, error);
          } else {
            alert('不支持访问用户媒体');
          }

          // document.getElementById('picture').addEventListener('click', function () {
          //   context.drawImage(video, 0, 0, 480, 320);
          //   // console.log(context.drawImage);
          //   image = canvas.toDataURL("image/png");//base64
          //   console.log(this.$data.takeImages);
          //   console.log(image);
          //   this.$data.takeImages = image;
          //   console.log(this.$data.takeImages);
          //   document.getElementById('getVideo').style.display = 'none';
          //   document.getElementById('getNn').style.display = 'flex';
          //   document.getElementById('getCn').style.display = 'flex';
          //   //  获取头像
          //   this.getShowVideo = false;
          //   this.dialogVisible = true;
          // })

        // this.pImage();
        },
        pImage() {
          let context = canvas.getContext('2d');
          let image = new Image();
          context.drawImage(video, 0, 0, 480, 320);
          // console.log(context.drawImage);
          image = canvas.toDataURL("image/jpeg");//base64

          this.$data.takeImages = image;
          // console.log(this.$data.takeImages)

          document.getElementById('getVideo').style.display = 'none';
          //  获取头像
          this.getShowVideo = false;
          this.dialogVisible = true;
        },
        //  材质信息返回
        getAll(){
          let list = {
            'all': '1',
            'customer_id': ''
          }
          let qs = require('querystring')
          remindApi.getAll(qs.stringify(list)).then((res) => {
            if(res.data.errno === 0){
              let labels = res.data.data
              console.log(labels)
              for (let i = 0; i < labels.length; i++) {
                if(labels[i].name === '材质'){
                  this.materials = labels[i].children
                } else if(labels[i].name === '款式'){
                  this.styles = labels[i].children
                } else {
                  return false
                }
              }
            }else{

            }
          })
        },
      //      确认人脸
        get_a:function (){
          console.log('确认人脸');
          // this.mask_a=true;
          // this.mask_b=false;
          // this.mask_c=false;
        },
      //  确认信息
        get_b:function (){
          console.log('确认信息');
          // this.mask_b=true;
          // this.mask_a=false;
          // this.mask_c=false;
        },
        //订单录入
        get_c:function (){
          console.log('订单录入');
          this.mask_c=true;
          this.mask_b=false;
          this.mask_a=false;
        },
        //重拍
        getNewvideo(){
          // document.getElementById('getVideo').style.display = 'flex';
          // document.getElementById('getCn').style.display = 'none';
          this.getShowVideo = true;
          this.dialogVisible = false;
        },
        dataURLtoFile(dataurl, filename){
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, {type:mime});
        },
      //  智能识别
        recognition(){
          this.mask_b=true;
          this.mask_a=false;
          this.mask_c=false;

          //  请求接口，上传文件（头像）,返回0-新客，1-熟客
          let file = this.dataURLtoFile(this.$data.takeImages,'testaaa.jpg');
          let list = new FormData();
          list.append('file', file);
          OrderApi.postFace(list).then((res) => {
            console.log(res);
            // console.log(res.data.data.avatar)
            if(res.data.msg === '服务器内部错误'){
              this.$message({
                message: '您获取的照片不合法',
                type: 'warning'
              });
              this.mask_b=false;
              this.mask_a=true;
              this.mask_c=false;
            }else{
              console.log('获取到照片了');
              console.log(res.data.errno);
              if(res.data.errno === 1){
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
              }else if(res.data.errno === 0){
                //  新用户
                this.userNew = true;
                this.userOld = false;
                this.firstNewC =true;
                this.$data.newNewP = res.data.data.avatar;
                if(res.data.data.gender === 1){
                  this.$data.newNewQ = '男'
                }else{
                  this.$data.newNewQ = '女'
                }
                if(res.data.data.is_new === 0){
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
          console.log(this.$data.NewRuleForm.textarea2);
          if(this.$data.NewRuleForm.textarea2 === ''){
            this.$message({
              message: '请填写备注信息',
              type: 'warning'
            });
          }else{
            this.mask_c=true;
            this.mask_b=false;
            this.mask_a=false;
            //不管有没有为新手机号，最终走向消费，传值一次,更一次手机号
            let list = {
              'phone': this.$data.form.newPhone,
              'customer_id':this.$data.faceId,
            }
            let qs = require('querystring');
            OrderApi.addNPhone(qs.stringify(list)).then((res) => {
              console.log(res);

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
            if(res.data.data.is_not === 0){
            //  该用户已注册
              this.phoneIsMySqlA = true;
              // this.firstNewC =false;
              // this.phoneIsMySql = true;
            }else if(res.data.data.is_not === 1){
              //  该用户未注册
              this.phoneNoMySql = true;

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
        GetSendM(){
          let list = {
            'phone': this.$data.form.newPhone
          }
          let qs = require('querystring');
          OrderApi.getMsg(qs.stringify(list)).then((res) => {
            console.log(res);
            this.phoneIsMySql = true;
          });
        },
        //获得验证码，点击确认返回顾客信息
        GetMsgPull(){
          //验证码填写之后，点击确认
          let list = {
            'phone': this.$data.form.newPhone,
            'code':this.$data.form.newTakeNum
          }
          let qs = require('querystring');
          OrderApi.checkMsg(qs.stringify(list)).then((res) => {
            console.log(res);
            console.log(res.data.data.avatar);
            this.$data.ruleForm.image = res.data.data.avatar;
            this.$data.ruleForm.name = res.data.data.name;
            this.$data.ruleForm.phone = this.$data.form.newPhone;
            if(res.data.data.gender === 1){
              this.$data.ruleForm.sex = '男'
            }else{
              this.$data.ruleForm.sex = '女'
            }
            if(res.data.data.vip_level === 0){
              this.$data.ruleForm.type = '普通'
            }else if(res.data.data.vip_level === 1){
              this.$data.ruleForm.type = 'VIP'
            }
            this.$data.faceId = res.data.data.customer_id;
            this.checkoutCallBack = true;
            this.userNew = false;
          });

        },
      //  返回的顾客信息，是本人直接走消费
        isTrueAndPass(){
          console.log(this.$data.faceId);
          let list = {
            'phone': this.$data.form.newPhone,
            'customer_id':this.$data.faceId,
            'is_me':1
          }
          let qs = require('querystring');
          OrderApi.postMe(qs.stringify(list)).then((res) => {
            console.log(res);
            this.mask_c=true;
            this.mask_b=false;
            this.mask_a=false;
          });

        },
      //  返回的顾客信息不是本人，则显示最开始的顾客信息
        isNoAndPass(){
          let list = {
            'phone': this.$data.form.newPhone,
            'customer_id':this.$data.faceId,
            'is_me':0
          }
          let qs = require('querystring');
          OrderApi.postMe(qs.stringify(list)).then((res) => {
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
            this.$data.NewRuleForm.type =  this.$data.newNewR
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
          this.$data.NewRuleForm.type =  this.$data.newNewR
        },
        //第二步返回第一步
        backA(){
          console.log(0)
          this.mask_a=true;
          this.mask_b=false;
          this.mask_c=false;
        },
        //第三步返回第二步
        backB(){
          this.mask_a=false;
          this.mask_b=true;
          this.mask_c=false;
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
        getMoney(){
          console.log(0);
          // console.log(this.$data.requestNewCreate.money);
          let m = 0;
          for(let i = 0; i< this.$data.addProList.length; i++){
            console.log(this.$data.addProList[i].money);
            m += parseInt(this.$data.addProList[i].money);
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
          this.dialogVisible = true;
          console.log(file)
          console.log(this.dialogImageUrl)
        },
        // 上传成功后的回调
        uploadSuccess (response, file, fileList) {
          console.log('上传文件', response);
          console.log(response.data.path)
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
          console.log(this.$data.pushGoods)
          let listArry =  this.$data.imageListF.join(',');
          console.log(listArry);
          console.log(this.$data.dialogImageUrl)
          let list = {
            'goods_info':this.$data.pushGoods,
            'remark':this.$data.NewRuleForm.textarea2 ,
            'avatar':listArry,
            'customer_id':this.$data.faceId,
          }
          let qs = require('querystring');
          OrderApi.addGoods(qs.stringify(list)).then((res) => {
            console.log(res);
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          });

        }

      }
    }
</script>

<style scoped>
  .circles{
    display: inline-block;
    width: 3rem;
    height: 3rem;
    border:1px solid white;
    text-align: center;
    line-height: 3rem;
    font-size: 1.2rem;
    border-radius: 50%;
    background-color: yellow;
  }
  .circleFont{
    font-size: 1.6rem;
    margin-top: 1rem;
  }
  .get_a{
    /*border:1px solid black;*/
    margin-top: 5rem;
  }
  .showImg{
    display: flex;
    align-items: center;
    width: 30rem;
    height: 30rem;
  }
  .moneyL{
    display: flex;
    justify-content: space-between;
    width: 15rem;
    text-align: center;
    float: right;
    margin-right: 5rem;
  }
  .lastNum{
    display: inline-block;
    border:1px solid #bababa;
    width: 3rem;
    height: 1rem;
  }
  .upload-demo{
    margin-left: 2rem;
  }
  .getTop_image{
    width: 10rem;
    height: 10rem;
  }
  .el-icon-plus{
    font-size: 5rem;
  }
</style>
