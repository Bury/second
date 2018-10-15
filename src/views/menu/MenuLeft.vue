<template>
	<div class="left-menu1">

    <el-menu 
              :default-active="currentMenu"
             router
             class="el-menu-vertical-demo"
             :collapse="isCollapse && isShow"
             background-color="#4588e6"
             text-color="#fff"
            active-text-color="#fff">

      <template v-for="(item,index) in tableData">
        <el-menu-item :key="index" :index="item.front_url" v-if="item.no_child" :id="item.id">
          <div class="iconfontSize" onclick="clickTotal(this.parentNode.id,this.id,1)" :id="item.name">
            <i :class="item.front_icon" style="color: #fff;"></i>
            <span slot="title">{{item.name}}</span>
          </div>
        </el-menu-item>

        <el-submenu v-else :key="index"  :index="item.front_url">
            <template slot="title">
                <i :class="item.front_icon"  style="color: #fff;font-size:20px;"></i>
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
<script src="@/assets/js/menu/MenuLeft.js"></script>

<style lang="scss" src="@/assets/css/menu/MenuLeft.scss">
