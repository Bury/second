<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-width:1204px;
  min-height: 100%;
  color: #ffffff;
  background-color: #eee;
  overflow: auto;

}
.el-input__inner{
  -webkit-border-radius:2px;
  -moz-border-radius:2px;
  border-radius:2px;
}
button,.el-button{
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
input, .el-select-dropdown, .el-textarea, .el-textarea__inner, .el-message-box, .el-message,
.el-dropdown-menu, .el-button, .el-cascader-menu, .el-tooltip__popper, .el-picker-panel, .el-date-picker {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
a {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

a:focus {
  outline :none;
}
ul,li{list-style: none;}

.el-table th{
  background-color: #C3CBD3;
}
.el-table th>.cell{
  text-align: center;
  color:#333;
}
.el-tree-node__content{
    display:inline-block !important;
  }
.el-menu-item .is-active {
  background-color: red !important;
}
.el-message .el-message__icon{
  margin: 0 10px;
}
.el-submenu .el-menu-item{
  background-color: #5e8ad8;
}
/*.el-pager li.active+li{*/
  /*border-left: 1px solid #999;*/
/*}*/
/*.el-pagination--small .el-pager li{*/
  /*border: 1px solid #999;*/
  /*width: 24px;*/
  /*height: 24px;*/
  /*margin-right: 15px;*/
  /*color: #999;*/
  /*font-size: 12px;*/
/*}*/
/*.el-pagination--small .el-pager li:last-child{*/
  /*border: 1px solid #999;*/
  /*width: 24px;*/
  /*height: 24px;*/
  /*margin-right: 15px;*/
  /*color: #999;*/
  /*font-size: 12px;*/
/*}*/
/*.el-pagination--small .el-pager li:link{*/
  /*color: #4581e0;*/
  /*border: 1px solid #4581e0;*/
/*}*/
/*.el-pagination--small .el-pager li:active{*/
  /*color: #4581e0;*/
  /*border: 1px solid #4581e0;*/
/*}*/
/*.el-pagination--small .el-pager li:hover{*/
  /*color: #4581e0;*/
  /*border: 1px solid #4581e0;*/
/*}*/
/*.el-pagination--small .el-pager li:active{*/
  /*color: #4581e0;*/
  /*border: 1px solid #4581e0;*/
/*}*/
/*.el-pagination--small button[type=button]{*/
  /*text-align: center;*/
  /*border: 1px solid #999;*/
  /*width: 24px;*/
  /*height: 24px;*/
  /*margin-right: 15px;*/
  /*color: #999;*/
  /*font-size: 12px;*/
/*}*/
/*.el-pagination .btn-next{*/
  /*padding-left: 6px;*/
/*}*/
</style>
