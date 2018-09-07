<template>
    <div  class="guest-list-page">
      <div class="top-box">
        <el-button type="primary" @click="fnGoback" style="margin-left: 5rem;">返回</el-button>
        <el-button  @click="reFresh" style="margin-left: 5rem;">刷新</el-button>
      </div>

      <div style="margin-top: 2rem;overflow: hidden;">


        <!--第一步-->
        <div class="get_a" v-show="step01_block">
          <div v-if="noData" style="margin: 0 auto;text-align: center">暂无数据~</div>
          <div class="orderVideo" v-if="imgData">
            <div  v-for="(item,index) in tableData" :key="index" style="display: flex;flex-direction: column;width: 15%;">
              <div class="videoImg" style="width: 100%;margin-bottom: 1rem;overflow: hidden;">
                <div style="width:100%;">
                  <img :src="item.avatar" style="width: 100%;height: 100%;" />
                </div>
              </div>
              <div>
                <el-button style="" @click="recognition(item.id)">选择</el-button>
              </div>

            </div>
          </div>
        </div>

        <!--第二步-->
        <div class="get_a" v-show="step02_block">
          <el-form v-model="NewRuleForm">
            <el-row class="el_row">
              <el-col :span="8" class='el_col'><span class="name">姓名：</span><el-input v-model="NewRuleForm.name" ></el-input></el-col>
              <el-col :span="8" class='el_col'><span class="name">手机：</span><el-input v-model="NewRuleForm.phone"></el-input></el-col>
            </el-row>
            <el-row class="el_row">
              <el-col :span="8" class='el_col'><span class="name">性别：</span><el-input v-model="NewRuleForm.sex" disabled></el-input></el-col>
              <el-col :span="8" class='el_col'><span class="name">年龄：</span><el-input v-model="NewRuleForm.age" disabled></el-input></el-col>
            </el-row>
          </el-form>
        </div>

        <!--第三步--创建订单-->
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
              <el-row>
                <el-form-item label="备注：" style="float: left;margin-left: 10%;">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength=200
                    rows="3"
                    size="mini"
                    v-model="remarkString">
                  </el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
          <el-row style="margin-top: 3rem">
            <el-button style="margin-left: 15rem;margin-right: 10rem;float: right" @click="isTrueAndPass">确认</el-button>
          </el-row>
        </div>

      </div>

    </div>
</template>

<script src="@/assets/js/order/OrderNow.js"></script>

<style lang="scss" scoped src="@/assets/css/order/OrderNow.scss">
