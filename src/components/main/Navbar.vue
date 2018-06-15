<template>
  <div class="navbar skin-6">
    <div class="container">
      <div class="left">
        <div class="logo">
          <span>
            知己科技鹰眼管理系统
          </span>
        </div>
        <!--<div class="friendly-tip">
          <span>杭州知己科技有限公司</span>
        </div>-->
      </div>
      <div class="right">
        <div class="user">
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link">
              你好，张三<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided command="logout" >退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
     handleCommand(command) {
      if (command === 'logout') {
        this.$router.replace({name: 'Login'})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  width: 100%;
  min-width: 1240px;
  height: 45px;
  background-color: #2b333c;
  color: #ffffff;
  display: table;
  z-index: 101;
  position: fixed;
  top: 0;
}

.navbar .container {
  display: table-cell;
  vertical-align: middle;
  
}

.navbar .left {
  width: 35%;
}

.navbar .right {
  width: 65%;
}

.navbar .left, .navbar .logo, .navbar .friendly-tip {
  float: left;
}

.navbar .right, .navbar .telephone, .navbar .language, .navbar .help-guide, .navbar .message, .navbar .user {
  float: right;
}

.navbar .friendly-tip, .navbar .telephone, .navbar .language, .navbar .help-guide, .navbar .message, .navbar .user {
  opacity: 0.7;
}

.navbar .right {
  position: relative;
  right: 30px;
}

.navbar .logo {
  margin: 0px 0px 0px 16px;

  width: 190px;
  text-align: left;
}

.navbar .logo img {

  vertical-align: middle;
}

.navbar .friendly-tip {
  font-size: 13px;
  height: 30px; 
  line-height: 30px;
}

.navbar .telephone {
  font-size: 14px;
  height: 28px; 
  line-height: 28px;
}

.navbar .telephone img {
  width: 10.2px;
  height: 20px;
  vertical-align: middle;
}

.navbar .telephone .telnum {
  margin: 0px 52px 0px 8px;
}

.navbar .language {
  font-size: 13px;
  height: 28px;
  line-height: 28px;
  margin-right: 45px;
}

.navbar .language .zh {
  margin-right: 9px;
}

.navbar .language .en {
  opacity: 0.6;
}

.navbar .help-guide {
  font-size: 13px;
  height: 28px; 
  line-height: 28px;
}

.navbar .help-guide img {
  vertical-align: middle;
}

.navbar .help-guide span {
  margin-right: 44px;
}

.navbar .message {
  height: 24px; 
  line-height: 24px;
}

.navbar .message img {
  vertical-align: middle;
}

.navbar .message {
  margin-right: 50px;
}

.navbar .user {
  height: 26px; 
  line-height: 26px;
}

.el-dropdown-menu__item a {
    display: block;
    color: black;
}

.el-dropdown-menu__item a:link {
    text-decoration: none;
}

.el-dropdown-menu__item a:hover {
    color: #48576a;
}
</style>
