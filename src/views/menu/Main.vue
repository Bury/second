<!-- 用户登录后的首页 -->
<template>
    <div class="main-box">
        <div class="header-wrap">
            <div class="company">鹰眼门店管理系统</div>
            <div style="float:left;margin-top:20px;color:#ffffff;">
                {{store_name}}
            </div>
            <!-- 
            <div class="top-menu" style="float:left;">
                <el-menu :default-active="horizontalIndex"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelect"
                      background-color="#545c64"
                      text-color="#fff"
                      active-text-color="#409EFF">
                    <el-menu-item index="1">我的工作台1</el-menu-item>
                    <el-menu-item index="2">我的工作台2</el-menu-item>
                    <el-menu-item index="3">我的工作台3</el-menu-item>
                    <el-menu-item index="4">我的工作台4</el-menu-item>
                </el-menu>
            </div> 
            -->
            <div class="user">
                <el-dropdown trigger="hover" >
                    <span class="el-dropdown-link" style="color:#fff;">
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
                <el-radio-button :label="false" v-if="isCollapse">展开</el-radio-button>
                <el-radio-button :label="true" v-if="!isCollapse">收起</el-radio-button>
            </el-radio-group>
            <MenuLeft v-if="leftMenu.leftMenu1" :isCollapse="isCollapse" :isShow="leftMenu.leftMenu1"></MenuLeft>
        </div>
        <div class="content-wrap" ref="content" :style="isCollapse ? 'margin-left:70px;' : 'margin-left:160px;'">
            <router-view></router-view>
        </div>
    </div>
</template>

<script src="@/assets/js/menu/Main.js"></script>

<style lang="scss" scoped src="@/assets/css/menu/Main.scss">