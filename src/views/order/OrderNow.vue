<template>
    <div  class="guest-list-page">
      <div class="top-box">
        <el-button size="mini" @click="fnGoback" onclick="clickTotal('023','开单返回',1)">返回</el-button>
        <el-button size="mini" @click="reFresh" style="margin-left: 3rem;">刷新</el-button>
      </div>

      <div style="overflow: hidden;">


        <!--第一步-->
        <div class="get_a" v-show="step01_block">
          <div v-if="noData" style="margin: 0 auto;text-align: center">暂无数据~</div>
          <div class="orderVideo" v-if="imgData">
            <div  v-for="(item,index) in tableData" :key="index" style="display: flex;flex-direction: column;width: 15%;">
              <div class="videoImg" style="width: 100%;margin-bottom: 1rem;overflow: hidden;">
                <div style="width:12rem;">
                  <img :src="item.avatar" style="width: 12rem;height: 12rem;" />
                </div>
              </div>
              <div>
                <img src="@/assets/images/check.png" @click="recognition(item.id,index)" v-show="see[index]"/>
                <img src="@/assets/images/checked.png" v-show="saw[index]"/>
                <!--<el-button style="" @click="recognition(item.id,index)">选择</el-button>-->
              </div>

            </div>
          </div>
          <!--分页-->
          <div v-if="tableData.length > 0" style="margin:0 auto;max-width:1551px;">
            <el-pagination
              style="font-family: '微软雅黑';font-weight: 100;"
              class="pagination"
              layout="prev, pager, next"
              small
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-size="requestParameters.page_size"
              :total="pagination.totalCount">
            </el-pagination>
          </div>
        </div>

        <!--第二步-->
        <div class="get_a" v-show="step02_block">
          <el-form v-model="NewRuleForm">
            <el-row class="el_row">
              <el-col :span="6" class='el_col'><span class="name">姓名：</span><el-input v-model="NewRuleForm.name" ></el-input></el-col>
              <el-col :span="6" class='el_col'><span class="name">手机：</span><el-input v-model="NewRuleForm.phone"></el-input></el-col>
              <el-col :span="4" class='el_col'><span class="name">性别：</span><el-input v-model="NewRuleForm.sex" disabled></el-input></el-col>
              <el-col :span="4" class='el_col'><span class="name">年龄：</span><el-input v-model="NewRuleForm.age" disabled></el-input></el-col>
            </el-row>
          </el-form>
        </div>

        <!--第三步--创建订单-->
        <div class="get_a" v-show="step03_block" style="text-align: center">
          <div>
            <el-form :inline="true" :model="item" ref="item" size="small" style="text-align: center">
              <div v-for='(item,index) in addProList' v-if="addProList">
                <el-form-item label="材质:">
                  <el-col :span="20">
                  <el-select v-model="item.material" placeholder="请选择材质">
                    <el-option  v-for="material in materials" :key="material.id" :label="material.name" :value="material.id"></el-option>
                  </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="款式:">
                  <el-col :span="20">
                  <el-select v-model="item.style" placeholder="请选择款式">
                    <el-option  v-for="style in styles" :key="style.id" :label="style.name" :value="style.id"></el-option>
                  </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="成交总额:">
                  <el-col :span="15">
                    <input class="inputStyle" type="number" v-model="item.money" v-on:input="getMoney(item.money)" value="0" oninput="if(value.length>7)value=value.slice(0,7)"></input>

                  </el-col>
                </el-form-item>
                <el-form-item>
                  <div v-if="addProList.length > 1" @click="delGoods(index)">
                    <img src="@/assets/images/dele.png" />
                  </div>
                </el-form-item>
              </div>

              <el-row style="margin-top: 3rem;">
                <div @click="addAGood">
                  <img src="@/assets/images/plus.png" style="margin-right: 1rem;"/>添加商品
                </div>
              </el-row>
              <el-row style="margin-top: 3rem;margin-left: 2rem;">
                <div class="moneyL">
                  <p>总计：共</p>
                  <input class="lastNum" disabled v-model="allGoodLenght" style="width: 4rem;">
                  <p>件，</p><p>总价</p>
                  <input class="lastNum" disabled v-model="allMoney" value="0">
                  <p>元</p>
                </div>
              </el-row>
              <el-row>
                <el-form-item label="备注：" style="float: left;margin-left: 7rem;">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength=200
                    rows="3"
                    size="mini"
                    cols="70"
                    v-model="remarkString">
                  </el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
          <el-row style="margin-top: 3rem">
            <el-button size="middle" @click="isTrueAndPass" onclick="clickTotal('022','订单管理开单',3)">确认</el-button>
          </el-row>
        </div>


      </div>

    </div>
</template>

<script src="@/assets/js/order/OrderNow.js"></script>

<style lang="scss" scoped src="@/assets/css/order/OrderNow.scss">
