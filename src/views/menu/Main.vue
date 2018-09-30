<!-- 用户登录后的首页 -->
<template>
    <div class="main-box">
        <div class="header-wrap">
          <div class="logo">
            <img src="../../assets/images/logo.png" />
          </div>
            <div class="company">
              <img src="../../assets/images/logoname.png" />
            </div>
            <!--<div style="float:left;margin-top:20px;color:#ffffff;">-->
                <!--{{store_name}}-->
            <!--</div>-->
            <div class="user">
                <el-dropdown trigger="hover" >
                    <span class="el-dropdown-link">
                      您好，{{username}}
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" split-button style="text-align:center;">
                        <el-dropdown-item divided @click.native="user_current_detail">个人资料</el-dropdown-item>
                        <!--<el-dropdown-item divided @click.native="notice">通知</el-dropdown-item>-->
                        <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="left-menu-wrap">
          <el-radio-group v-model="isCollapse">
          <div class="arrow">
            <div class="arrow1">
              <!--<div style="margin-left: 40%;margin-top: -3px;">-->
                <!--<img src="../../assets/images/menuLeft-1.png" />-->
              <!--</div>-->
              <div class="movement">
                <div class="movement_image" v-if="left" @click="movementLeft">
                  <img src="../../assets/images/left.png" />
                </div>
                <div class="movement_image" v-if="right" @click="movementRight">
                  <img src="../../assets/images/right.png" />
                </div>
              </div>
            </div>
          </div>
          </el-radio-group>
            <!--<el-radio-group v-model="isCollapse">-->
                <!--<el-radio-button :label="false" v-if="isCollapse">展开</el-radio-button>-->
                <!--<el-radio-button :label="true" v-if="!isCollapse">收起</el-radio-button>-->
            <!--</el-radio-group>-->
            <MenuLeft v-if="leftMenu.leftMenu1" :isCollapse="isCollapse" :isShow="leftMenu.leftMenu1"></MenuLeft>
        </div>
        <div ref="content">
          <!--<div class="marginTop"></div>-->
          <div class="content-wrap"  ref="content"><router-view></router-view></div>
        </div>
    </div>
</template>

<script src="@/assets/js/menu/Main.js"></script>

<style lang="scss" scoped src="@/assets/css/menu/Main.scss">
