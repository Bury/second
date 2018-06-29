<template>
	<div class="user-info-box">
        <div class="user-info-detail">
            <ul class="detail-left">
                <li class="user-name">姓名： {{userInfo.name}}</li>
                <li class="user-phone">手机号码： {{userInfo.phone}}</li>
                <li class="user-sex">性别： {{userInfo.gender === '1' ? '男' : '女'}}</li>
                <li class="user-age">年龄： {{userInfo.age}}</li>
                <li class="user-type">类型： {{userInfo.vip_level === '0' ? '普通' : 'VIP'}}</li>
            </ul>
            <div class="img-box">
                <div class="img-wrap">
                    <img :src="userInfo.avatar_path" alt="人脸图像" style="width:100%;">
                </div>
                <div class="img-id">人脸ID：{{userInfo.id}}</div>
            </div>
            <div class="user-tags">
                标签： 
                    <el-tag v-for="(item,key) in userInfo.tag" style="margin-right:10px;">{{userInfo.tag[key].name}}</el-tag>
            
            </div>
            <p class="user-remarks">备注： {{userInfo.remark === null ? '暂无备注' : userInfo.remark}}</p>
        </div>

        <div class="user-info-edit">
            
        </div>
	</div>
</template>
<script>
    import remindApi from '../api/remind'
    export default {
      	name:'user-info',
        props:{
            customerId:Number
        },
        data() {
            return {
                userInfo:{}
            };
        },
        created:function(){
            this.personalInfo(this.$props.customerId);
        },
        methods: {
            personalInfo(customer_id){
                let list = {
                        'customer_id':customer_id
                    }
                let qs = require('querystring')
                remindApi.personalInfo(qs.stringify(list)).then((res) => {
                    if(res.data.errno === 0){
                        console.log(res.data.data)
                        this.$data.userInfo = res.data.data
                    }else{

                    }
                })
            }
        }
    };
</script>
<style lang="scss" scoped>
  .user-info-box{
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
            .img-wrap{
                width:100%;
                height: 110px;
                background:#ccc;
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
        .user-remarks{line-height:24px;}
    }
    
  }
</style>