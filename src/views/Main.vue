<!-- 用户登录后的首页 -->
<template>
    <div class="main-box">
        <div class="header-wrap">
            <div class="company">鹰眼管理系统</div>
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
        </div>
        <div class="left-menu-wrap">
            <el-radio-group v-model="isCollapse">
                <el-radio-button :label="false" v-if="isCollapse">展开</el-radio-button>
                <el-radio-button :label="true" v-if="!isCollapse">收起</el-radio-button>
            </el-radio-group>
            <el-menu default-active="1-1" 
                     class="el-menu-vertical-demo"
                     @open="handleOpen" 
                     @close="handleClose" 
                     :collapse="isCollapse"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#409EFF">
                <router-link :to="{name: 'Dashboard'}">
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">客流统计</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{name: 'RemindList'}">
                    <el-menu-item index="2-1">
                        <i class="el-icon-bell"></i>
                        <span slot="title">提醒列表</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{name: 'GuestList'}">
                    <el-menu-item index="3-1">
                        <i class="el-icon-service"></i>
                        <span slot="title">来客列表</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{name: 'OrderList'}">
                    <el-menu-item index="4-1">
                        <i class="el-icon-phone-outline"></i>
                        <span slot="title">订单管理</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{name: 'LabelList'}">
                    <el-menu-item index="5-1">
                        <i class="el-icon-info"></i>
                        <span slot="title">标签管理</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{name: 'Equipment'}">
                    <el-menu-item index="6-1">
                        <i class="el-icon-view"></i>
                        <span slot="title">设备管理</span>
                    </el-menu-item>
                </router-link>
                <el-submenu index="7">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统设置</span>
                    </template>
                    <router-link :to="{name: 'RemindSet'}">
                        <el-menu-item index="7-1">提醒配置</el-menu-item>
                    </router-link>
                    <router-link :to="{name: 'OpenTimeSet'}">
                        <el-menu-item index="7-2">营业时间设置</el-menu-item>
                    </router-link>
                    <router-link :to="{name: 'Personal'}">
                        <el-menu-item index="7-3">个人中心</el-menu-item>
                    </router-link>
                </el-submenu>
            </el-menu>
        </div>
        <div class="content-wrap" ref="content" :style="isCollapse ? 'margin-left:70px;' : 'margin-left:160px;'">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/main/Navbar'
import Sidebar from '../components/main/Sidebar'

export default {
  name: 'main-box',
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {
        horizontalIndex: '1',
        isCollapse: false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
    .main-box{
        width: 100%;
        height: 100%;
        color: #333;
        .header-wrap{
            position: fixed;
            top: 0;
            left: 0;
            height: 60px;
            width: 100%;
            min-width: 1204px;
            background: #545c64;
            .company{
                float:left;
                margin-right:30px;
                width:160px;
                line-height:60px;
                font-size:18px;
                text-align:center;
                color:#fff;
            }
        }
        .left-menu-wrap{
            position:fixed;
            left:0;
            top:60px;
            min-height: 100%;
            background: #545c64;
            overflow: hidden;
            overflow-y: visible;
            .left-menu{
               
            }
        }
        .content-wrap{
            padding:90px 30px 30px;

        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 160px;
    }
    .el-menu{
        border:0;
    }
</style>