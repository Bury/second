<template>
	<div class="left-menu1">

    <el-menu style="width: 100%;"
      :default-active="currentMenu"
             router
             class="el-menu-vertical-demo"
             :collapse="isCollapse && isShow"
             background-color="#4588e6"
             text-color="#fff"
            active-text-color="#fff">

      <template v-for="(item,index) in tableData">
        <el-menu-item :key="index" :index="item.front_url" v-if="item.no_child" style="text-align: center;" :id="item.id">
          <div onclick="clickTotal(this.parentNode.id,this.id,1)" :id="item.name">
            <i :class="item.front_icon" style="color: #fff;"></i>
            <span slot="title">{{item.name}}</span>
          </div>
        </el-menu-item>

        <el-submenu v-else :key="index"  :index="item.front_url" style="text-align: center">
            <template slot="title">
                <i :class="item.front_icon"  style="color: #fff;"></i>
                <span slot="title">{{item.name}}</span>
            </template>

          <template v-for="(item1,index1) in item.children">
              <el-menu-item :key="index1" :index="item1.front_url" style="padding-left:53px;" :id="item1.id">
                <div  onclick="clickTotal(this.parentNode.id,this.id,1)" :id="item1.name">
                {{item1.name}}
                </div>
              </el-menu-item>
          </template>
        </el-submenu>
      </template>

    </el-menu>

	</div>
</template>
<script>
  import userApi from '../../api/user.js'
  import globalFunctions from '@/config/global_functions'
    export default {
        name:'word-item',
        props:{
            isCollapse: Boolean,
            isShow: Boolean,
        },
        data(){
            return{
              tableData:[],
              currentMenu: '',
            }
        },
        watch:{
          $route(to,from){
    	         	this.$data.currentMenu = this.$route.name;
    	      },
        },
        created:function(){
          // this.menu();
        	this.getUrl();

        },
        methods:{
          // menu() {
          //   userApi.menu().then((res) => {
          //     if(res.data.errno === 0){
        	// 	 for(let i=0;i<res.data.data.length;i++){
        	// 	 	  if(res.data.data[i].no_child === false){
        	// 	 	  	 res.data.data[i].front_url = String(i)
        	// 	 	  }
        	// 	 }
        	// 	 this.$data.tableData = res.data.data;
          //
        	// 	 this.refreash();
        	//  }
          //
          //   })
          // },
          getUrl() {
            this.$data.currentMenu = this.$route.name;
          },
          // refreash(){
          //   let arr = [];
          //   arr.push('OrderNow');
          //   for(let item of this.$data.tableData){
          //     arr.push(item.front_url);
          //   }
          //   if(arr.indexOf(this.$data.currentMenu) == -1){
          //     // window.location.href = 'https://test.yy.ibetwo.com/';
          //     this.$message.warning('该账号的岗位状态有更改，需重新登录');
          //     globalFunctions.functions.user.logout(userApi,this.$router,this.$message);
          //   }
          // },
        },
    }
</script>

<style lang="scss" src="@/assets/css/menu/MenuLeft.scss">
