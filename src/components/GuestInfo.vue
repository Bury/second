<template>
	<div class="user-info-box">
        <div class="user-info-detail" v-if="!infoEdit">
            <ul class="detail-left">
                <li class="user-name">姓名： {{guestInfo.name}}</li>
                <li class="user-phone">手机： {{guestInfo.phone}}</li>
                <li class="user-sex">性别： {{guestInfo.gender == 1 ? '男' : '女'}}</li>
                <li class="user-age">年龄： {{guestInfo.age}}</li>
                <li class="user-type">来客类型： {{guestInfo.vip_level}}</li>
            </ul>
            <div class="img-box">
                <div class="img-wrap">
                    <img :src="guestInfo.avatar" alt="人脸图像">
                </div>
                <div class="img-id">人脸ID：{{guestInfo.id}}</div>
            </div>
            <div class="user-tags">
                标签： 
                    <el-tag v-for="(item,key) in guestInfo.tag" :key="key" style="margin-right:10px;">{{guestInfo.tag[key].name}}</el-tag>
            </div>
            <p class="user-remarks">备注： {{guestInfo.remark === '' ? '暂无' : guestInfo.remark}}</p>
            <el-button type="primary" plain size="small" class="edit-btn" @click="editGuestInfo()">编辑</el-button>
        </div>

        <div class="user-info-edit" v-if="infoEdit">
           <el-form :model="editGuestInfoData" :rules="GuestInfoRules" ref="editGuestInfoData" label-width="100px" class="demo-editGuestInfoData" size="mini" style="float:left;margin-right:50px;width:400px;">
              <el-form-item label="姓名：" prop="name" >
                <el-input v-model="editGuestInfoData.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="editGuestInfoData.phone"></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="editGuestInfoData.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄：" >{{editGuestInfoData.age}}</el-form-item>
              <el-form-item label="来客类型：">{{editGuestInfoData.vip_level == 0 ? '普通' : 'VIP'}}</el-form-item>
              <el-form-item label="年龄：" >{{editGuestInfoData.age}}</el-form-item>
              <el-form-item label="标签：">
                <div v-for="label in labels" :key="label.id" class="labels">
                    <div>—— {{label.name}} ——</div>
                    <span v-for="children in label.children" :key="children.id">{{children.name}}</span>
                </div>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="editGuestInfoData.remark"></el-input>
              </el-form-item>
          </el-form>
          <div class="img-box">
            <div class="img-wrap">
                <img :src="editGuestInfoData.avatar" alt="人脸图像">
            </div>
            <div class="img-id">人脸ID：{{editGuestInfoData.id}}</div>
          </div>
          <el-row class="guestInfoEdit-wrap">
                <el-button plain size="small" @click="guestInfoCancel">取消</el-button>
                <el-button type="primary" plain size="small" @click="guestInfoSubmit('editGuestInfoData')">确定</el-button>
          </el-row>
        </div>
	</div>
</template>
<script>

    import globalRules from '../config/global_rules'

    import remindApi from '../api/remind'

    import guestApi from '../api/guest'

    export default {

      	name:'user-info',

        props:{
            customerId:{
                type:Number
            },
            showInfoEdit:{
                type:Boolean
            },
            traffic:{
            	type:Number
            }
        },

        data() {

            return {
                infoEdit:false,
                remarksId:"",
                guestInfo:{},
                editGuestInfoData:{},
                labels:{},
                GuestInfoRules:{
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                    ],
                    gender:[
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    phone:globalRules.rules.user.phone(),
                }
            };

        },

        watch: {
          customerId: function() {
             this.getGuestInfo(this.$props.customerId,this.$props.traffic)
          },
        },

        created:function(){
            this.getGuestInfo(this.$props.customerId,this.$props.traffic)
            this.getAll(this.$props.customerId)
        },

        methods: {

            getAll(customerId){
                let list = {
                    'all': 1,
                    'customer_id': customerId
                }
                let qs = require('querystring')
                remindApi.getAll(qs.stringify(list)).then((res) => {
                    if(res.data.errno === 0){
                    	console.log(res.data.data)
                        this.$data.labels = res.data.data
                    }else{
                    	
                    }
                })
            },

            getGuestInfo(customerId,trafficId){
            	this.$data.infoEdit = this.$props.showInfoEdit;
                let qs = require('querystring');
                let personlList ={'customer_id':customerId,'traffic_id':trafficId};
                guestApi.getGuestInfo(qs.stringify(personlList)).then((res) => {
                    if(res.data.errno === 0){
                        this.$data.guestInfo = res.data.data
                    }else{

                    }
                })
            },

            editGuestInfo(){
                this.$data.editGuestInfoData = this.$data.guestInfo;
                this.$data.infoEdit = true;
            },

            guestInfoCancel(){
                this.$data.infoEdit = false;
            },

            guestInfoSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            let qs = require('querystring');                            
                            remindApi.editPersonalInfo(qs.stringify({
                                customer_id:this.$data.editGuestInfoData.customer_id,
                                traffic_id: this.$props.traffic,
                                name       :this.$data.editGuestInfoData.name,    
                                phone      :this.$data.editGuestInfoData.phone,   
                                gender     :this.$data.editGuestInfoData.gender, 
                                tag_ids    :this.$data.editGuestInfoData.tag_ids,
                                remark     :this.$data.editGuestInfoData.remark,
                            
                            })).then((res) => {
                                if(res.data.errno === 0){
                                    this.guestInfoCancel();
                                    this.getGuestInfo(this.$props.customerId,this.$props.traffic)
                                }else{
                                	
                                }
                        })
                    }
                })
            }

        }

    };
</script>
<style lang="scss" scoped>
  .user-info-box{
    position: relative;
    padding:20px 0;
    .user-info-detail{
        margin:0 auto;
        width: 450px;
        overflow:hidden;
        .detail-left{
            float: left;
        }
        .img-box{
            float: right;
            width: 160px;
            height: 130px;
            text-align:center;
            .img-wrap{
                width:100px;
                img{
                    width:100%;
                }
            }
            .img-id{
                line-height:30px;
            }
            
        }
        .detail-left li,.user-tags,.user-remarks{
            margin-bottom:10px;
        }
        .user-tags{
            line-height:40px;
        }
        .user-tags,.user-remarks{
            clear:both;
            overflow:hidden;
        }
        .user-remarks{margin-bottom:40px;line-height:24px;}
    }
    .edit-btn{
        position: absolute;
        right:0;
        bottom:0;
    }
    .user-info-edit{
        position: relative;
        overflow:hidden;
        .img-box{
            float: left;
            width: 160px;
            height: 130px;
            text-align:center;
            .img-wrap{
                width:100px;
                img{
                    width:100%;
                }
            }
            .img-id{
                line-height:30px;
            }
            
        }
        .guestInfoEdit-wrap{
            position: absolute;
            right:0;
            bottom:15px;
        }
    }
    .labels{
        font-size: 12px;
        div{
            color:#999;
        }
        span{
            display:inline-block;
            padding: 0 10px;
            height: 32px;
            line-height: 30px;
            color: #999;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid #999;
            white-space: nowrap;
            margin:0 5px 5px 0;
        }
        .border{
            color:#409eff;
            border: 1px solid #409eff;;
        }
    }
  }
</style>