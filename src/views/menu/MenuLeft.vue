<template>
	<div class="left-menu1">
    <el-menu :default-active="currentMenu"
             router
             class="el-menu-vertical-demo"
             :collapse="isCollapse && isShow"
             background-color="#545c64"
             text-color="#fff"
            active-text-color="#409EFF">

      <template v-for="(item,index) in tableData">      	
        <el-menu-item :index="item.front_url" v-if="item.no_child">
        	<template slot="title">
            <i :class="item.front_icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>  
        </el-menu-item>
        
        <el-submenu v-else   :index="item.front_url" >
         <template slot="title">
          <i :class="item.front_icon"></i>
          <span slot="title">{{item.name}}</span>
         </template>
          <template v-for="(item1,index1) in item.children">
          	<el-menu-item :index="item1.front_url" style="padding-left:53px;">{{item1.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>     

    </el-menu>

	</div>
</template>
<script>
  import userApi from '../../api/user.js'
    export default {
        name:'word-item',
        props:{
            isCollapse: Boolean,
            isShow: Boolean,
          // active_text_color:'',
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
    	      }
        },
        created:function(){
          this.menu();
        	this.getUrl();
        },
        methods:{
          menu() {
            userApi.menu().then((res) => {
              this.$data.tableData = res.data.data;
            })
          },
          getUrl() {
            this.$data.currentMenu = this.$route.name;
          },
        },
    }
</script>

<style lang="scss" scoped src="@/assets/css/menu/MenuLeft.scss">
