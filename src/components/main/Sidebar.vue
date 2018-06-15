<template>
  <div class="sidebar fixed">
    <div class="sidebar-inner scrollable-sidebar">
        <!-- size-toggle start  -->
        <!-- <div class="size-toggle">
            <a class="btn btn-sm" id="sizeToggle">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <a class="btn btn-sm pull-right logoutConfirm_open"  href="index.html#logoutConfirm">
                <i class="fa fa-power-off"></i>
            </a>
        </div>  -->
        <!-- /size-toggle end -->
        </router-link>
        <div class="main-menu">
          <!-- menu start -->
            <el-menu :default-active="defaultActive" :default-openeds="openeds" class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item index="1">
                    <router-link :to="{name: 'Dashboard'}" replace>
                        <img :src="imgSrcHome">客流统计
                    </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link :to="{name: 'RemindList'}" replace>
                        <img src="static/images/main/myqc.png">提醒列表
                    </router-link>
                </el-menu-item>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link :to="{name: 'GuestList'}" replace>
                        <img src="static/images/main/wesupervise.png">来客列表
                    </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link :to="{name: 'OrderList'}" replace>
                        <img src="static/images/main/icontrol.png">订单管理
                    </router-link>
                </el-menu-item>
                <el-menu-item index="5">
                    <router-link :to="{name: 'LabelList'}" replace>
                        <img src="static/images/main/wesupervise.png">标签管理
                    </router-link>
                </el-menu-item>
                <el-menu-item index="6">
                    <router-link :to="{name: 'Equipment'}" replace>
                        <img src="static/images/main/icontrol.png">设备管理
                    </router-link>
                </el-menu-item>
                <el-submenu index="7">
                    <template slot="title"><img src="static/images/main/wesupervise.png">系统设置</template>
                    <el-menu-item index="7-1">
                        <router-link :to="{name: 'RemindSet'}" replace>提醒配置</router-link>
                    </el-menu-item>
                    <el-menu-item index="7-2">
                        <router-link :to="{name: 'OpenTimeSet'}" replace>营业时间设置</router-link>
                    </el-menu-item>
                    <el-menu-item index="7-3">
                        <router-link :to="{name: 'Personal'}" replace>个人中心</router-link>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
          <!-- menu end -->
        </div><!-- /main-menu -->
        <div class="footer">
            <div class="info">
              杭州知己科技有限公司<br/>
              版权所有
            </div>
        </div>
    </div><!-- /sidebar-inner -->
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      defaultActive: '1',
      openeds: ['7'],
      imgSrcHome: 'static/images/main/home_active.png'
    }
  },
  created: function () {
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        // 点击 首页 时，改变图标颜色
        this.imgSrcHome = 'static/images/main/home_active.png'
      } else {
        this.imgSrcHome = 'static/images/main/home.png'
      }

      // 设置默认 active 为当前的 index 就是这里的参数 key
      this.defaultActive = key
    }
  }
}
</script>

<style scoped>
.sidebar {
  text-align: left;
  position: absolute;
  display: block;
  width: 190px;
  z-index: 100;
  left: 0;
  bottom: 0;
  top: 60px;
  height: calc(100% - 60px);
  background-color: #495b6c;
}
.sidebar .sidebar-inner {
  background-color: #495b6c;
}
.sidebar .sidebar-inner .user-block {
  padding: 10px 0px 6px 16px;
  box-shadow: 0 1px 0 #34364a;
  -moz-box-shadow: 0 1px 0 #34364a;
  -webkit-box-shadow: 0 1px 0 #34364a;
  height: 50px;
}
.sidebar .sidebar-inner .user-block img {
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 50em;
  -moz-border-radius: 50em;
  -webkit-border-radius: 50em;
  animation: fadeInRotate 0.9s ease;
  -webkit-animation: fadeInRotate 0.9s ease;
  -moz-animation: fadeInRotate 0.9s ease;
  -ms-animation: fadeInRotate 0.9s ease;
  -o-animation: fadeInRotate 0.9s ease;
  border: solid 1px #979797;
}
.sidebar .sidebar-inner .user-block .detail {
  float: left;
  color: #e6f1f7;
  margin-left: 10px;
  padding-top: 10px;
  text-align: left;
}

.sidebar .sidebar-inner .user-block .detail .name {
  font-size: 13px;
  color: #ffffff;
  text-align: center;
  max-width: 80px;
}

.sidebar .sidebar-inner .user-block .detail .grade {
  font-size: 11px;
  color: #ffffff;
  opacity: 0.5;
}

.sidebar .main-menu {
  height: 100%;
}

.sidebar .footer {
  background-color: #495b6c;
  margin-top: 40px;
}

.sidebar .footer .logo{
  text-align: center;
}

.sidebar .footer img {
  width: 40px;
  height: 40px;
}

.sidebar .footer .info {
  padding: 3px;
  font-size: 11px;
  text-align: center;
  color: #99a9bf;
}

.sidebar .footer .version {
  margin-top: 20px;
  font-size: 11px;
  text-align: center;
  color: #99a9bf;
}

.sidebar .el-menu-item.is-active a {
  color: #4a4a4a;
}

.sidebar a {
  display: block;
  width: 150px;
}
</style>
