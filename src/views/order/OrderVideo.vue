<template>
  <div class="guest-list-page">

    <div class="top-box" style="text-align: center;border-bottom:1px solid #dcdfe6;margin-bottom: 2rem;">
      <ul style="display: flex">
        <li @click="step01">
          <span :class="{'circles':step_1 ===1,'circlesR':step_1 ===2}" >1</span>
          <p class="circleFont">确认人脸</p>
        </li>
        <li @click="step02">
          <span :class="{'circles':step_2 ===1,'circlesR':step_2 ===2}" >2</span>
          <p class="circleFont">确认信息</p>
        </li>
        <li @click="step03">
          <span :class="{'circles':step_3 ===1,'circlesR':step_3 ===2}">3</span>
          <p class="circleFont">订单录入</p>
        </li>
        <li>
          <span :class="{'circles':step_4 ===1,'circlesR':step_4 ===2}">4</span>
          <p class="circleFont">完成</p>
        </li>
      </ul>
    </div>
    <div style="position: relative;margin-bottom: 2rem;">
      <div style="position: absolute;right: 12rem;margin-bottom: 2rem;">
        <el-button @click="reFresh">刷新</el-button>
      </div>

    </div>

    <div style="margin-top: 2rem;overflow: hidden;">
      <!--拍摄人脸确认身份-->
      <div class="get_a" style="" v-show="step01_block">
        <!--<div>-->
          <!--<div class="showImg" style="display: flex;align-items: center;width: 30rem;height: 30rem;" v-show="showVideo" id="getVideo">-->
            <!--<video id="video" autoplay="" style='width:640px;height:480px'></video>-->
            <!--<el-row style="display: flex;flex-direction: column;margin-left: 2rem">-->
              <!--<el-button id='picture' @click="takePicture">拍摄</el-button>-->
            <!--</el-row>-->
          <!--</div>-->
          <!--<div class="showImg" id="getCn" v-show="actionDialogVisible">-->
            <!--<canvas id="canvas" width="640" height="480"></canvas>-->
            <!--<el-row style="flex-direction: column;margin-left: 2rem;align-items: center;margin-bottom: 3rem" id="getNn" >-->
              <!--<el-button @click="takePictureAgain" style="margin-top: 1rem;margin-left: 1rem">重拍</el-button>-->
              <!--<el-button style="margin-top: 5rem;" @click="recognition">智能识别</el-button>-->
            <!--</el-row>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="get_a" style="margin-top:2rem;" v-show="step01_block">
        <table width="90%" style="margin-top:2rem;border: 1px solid #000">
          <thead style="font-size:2rem;">
          <tr height="40">
            <th class="col-md-5 text-center">人脸</th>
            <th class="col-md-3 text-center">操作</th>
          </tr>

          </thead>
          <tbody>
            <tr height="100" style="border: 1px solid #000;text-align: center;">
              <td>
                <div class="videoImg" style="width: 50%;height: 10rem;border: 1px solid #000;">
                  <img src="" style="width: 100%;" />
                </div>
              </td>
              <td><el-button style="" @click="recognition">智能识别</el-button></td>
            </tr>
          </tbody>
        </table>
        </div>

      <!--确认信息-->
      <div class="get_a" style="" v-show="step02_block">
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
              <el-input v-model="NewRuleForm.phone" style="width: 13rem" :disabled="true"></el-input>
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

        <!--有人脸，但是手机错误-->
        <div v-show="userNew">
          <!--纠错-去数据库查找这个手机-->
          <el-form ref="form" :model="form"  :rules="rulesA" label-width="80px">
            <el-form-item style="width: 30rem" v-show="firstNewC">
              <p style="color: red;font-size: 1.2rem">人脸识别该顾客为新顾客，请输入手机！</p>
            </el-form-item>
            <el-form-item label="手机:" style="width: 30rem;" prop="newPhone">
              <el-input v-model="form.newPhone" style="width: 10rem" maxlength="11" @focus="needsC"></el-input>
              <el-button plain style="float: right" @click="checkoutPhone">查找</el-button>
            </el-form-item>
            <!--数据库找到这个手机，验证更改信息-->
            <el-form-item v-show="phoneIsMySqlA" label="验证码:" style="width: 30rem;">
              <el-input v-model="form.newTakeNum" style="width: 10rem"></el-input>
              <el-button plain style="float: right" @click="GetSendM">获取验证码</el-button>
            </el-form-item>
            <el-form-item label="" style="width: 30rem;margin-top: 5rem;margin-right: 10rem">
              <el-button v-show="phoneIsMySql" @click="getUpMsg">上一步</el-button>
              <el-button style="margin-left: 5rem" v-show="phoneIsMySql" @click="GetMsgPull">确认</el-button>
            </el-form-item>
            <!--数据库没有找到这个手机，显示为新号码-->
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
            <el-form-item label="手机:" prop="phone" style="width: 30rem">
              <el-input v-model="ruleForm.phone" :disabled="true"></el-input>
              <!--<el-button style="margin-left: 2rem">纠错</el-button>-->
            </el-form-item>
            <el-form-item label="性别:" prop="sex" style="width: 30rem">
              <el-input v-model="ruleForm.sex" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="类型:" prop="type" style="width: 30rem">
              <el-input v-model="ruleForm.type" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="type" style="width: 30rem">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="ruleForm.textarea2">
              </el-input>
            </el-form-item>
          </el-form>
          <el-row style="margin-top: 3rem">
            <el-button @click="backLine">上一步</el-button>
            <el-button style="margin-left: 15rem" @click="isNoAndPass">不是本人</el-button>
            <el-button style="margin-left: 5rem" @click="isTrueAndPass">是本人</el-button>
          </el-row>
        </div>
      </div>

      <!--订单录入-->
      <div class="get_a" v-show="step03_block" style="text-align: center">
        <div>
          <el-form :inline="true" :model="item" :rules="rulesD" ref="item" size="mini" style="text-align: center">
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
                  <el-input v-model="item.money" v-on:input="getMoney(item.money)" value="0" :maxlength="inputMaxL"  @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(item.money) ? null : item.money.length - 1"></el-input>
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
                     :action="importFileUrl()"
                     list-type="picture-card"
                     :data="upLoadData"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :onSuccess="uploadSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!--<el-dialog :visible.sync="actionDialogVisible">-->
          <!--<img width="100%" :src="dialogImageUrl" alt="">-->
          <!--</el-dialog>-->
        </el-row>
        <el-row style="margin-top: 3rem">
          <el-button style="margin-left: 15rem;margin-right: 10rem;float: right" @click="allPostM">确认</el-button>
          <el-button style=" float: right" @click="backB">上一步</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/order/OrderVideo.js"></script>

<style lang="scss" scoped src="@/assets/css/order/OrderLive.scss">
