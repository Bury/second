<template>
	<div class="left-menu1">
		<el-menu :default-active="currentMenu"
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse && isShow"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#409EFF">
            <router-link :to="{name: 'Statistics'}">
                <el-menu-item index="/Statistics">
                    <i class="el-icon-menu"></i>
                    <span slot="title">客流统计</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{name: 'Guest'}">
                <el-menu-item index="/Guest">
                    <i class="el-icon-service"></i>
                    <span slot="title">来客列表</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{name: 'Order'}">
                <el-menu-item index="/Order">
                    <i class="el-icon-phone-outline"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{name: 'Device'}">
                <el-menu-item index="/Device">
                    <i class="el-icon-view"></i>
                    <span slot="title">设备管理</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{name: 'User'}">
                <el-menu-item index="/User">
                    <i class="el-icon-service"></i>
                    <span slot="title">帐号管理</span>
                </el-menu-item>
            </router-link>
            <el-submenu index="7-1" style="padding-bottom:200px;">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统设置</span>
                </template>
                <router-link :to="{name: 'StoreRemind'}">
                    <el-menu-item index="/StoreRemind" style="padding-left:53px;">来客提醒</el-menu-item>
                </router-link>
                <router-link :to="{name: 'StoreTime'}">
                    <el-menu-item index="/StoreTime" style="padding-left:53px;">营业时间</el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>
	</div>
</template>
<script>
    export default {
        name:'word-item',
        props:{
            isCollapse: Boolean,
            isShow: Boolean,
          // active_text_color:'',
        },
        data(){
            return{
                currentMenu:'/'
            }
        },
        created(){
            this.getUrl();
        },
        mounted:function () {
          window.addEventListener("popstate", function(){
            let self = this;
            let currentUrl = window.location.href;
            self.currentMenu = currentUrl.split('#')[1];
            console.log(self.currentMenu)
          }, false)
        },
        methods:{
            getUrl(){
                let self = this;
                let currentUrl = window.location.href;
                self.currentMenu = currentUrl.split('#')[1];
            }
        }
    }
</script>

<style lang="scss" scoped src="@/assets/css/menu/MenuLeft.scss">
