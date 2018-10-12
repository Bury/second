<!-- 用户登录后的首页 -->
<template>
    <div class="main-box">
        <div class="header-wrap">
        	<div :class="[isCollapse ? 'ml90' : 'ml190' , 'company']"><img src="../../assets/images/logoname.png"/></div>
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
        	<div class="leftNav">
              <img  :width="isCollapse ? 54 : 84" src="../../assets/images/logo.png" />
            </div>
        	<div class="left-arrow">
            	<ul class="arrow-wrap">
            		<li v-if="isCollapse" @click="isCollapse = false"><img class="moveImg" src="../../assets/images/right.png"/></li>
            		<li v-if="!isCollapse" @click="isCollapse = true"><img class="moveImg" src="../../assets/images/left.png"/></li>            		
            	</ul>
            </div>
            <!--<el-radio-group v-model="isCollapse">-->
                <!--<el-radio-button :label="false" v-if="isCollapse">展开</el-radio-button>-->
                <!--<el-radio-button :label="true" v-if="!isCollapse">收起</el-radio-button>-->
            <!--</el-radio-group>-->
            <MenuLeft v-if="leftMenu.leftMenu1" :isCollapse="isCollapse" :isShow="leftMenu.leftMenu1"></MenuLeft>
        </div>
        <div ref="content">
          <!--<div class="marginTop"></div>-->
          <div :class="[ 'content-wrap' ,isCollapse ? 'ml74' :  'ml170']"   ref="content"><router-view></router-view></div>
        </div>
    </div>
</template>

<script src="@/assets/js/menu/Main.js"></script>

<style lang="scss" scoped src="@/assets/css/menu/Main.scss">
