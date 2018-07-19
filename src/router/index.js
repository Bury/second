import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
import Main from '../views/menu/Main'

// 登录页面
import Login from '../views/login/Login'

//客流统计
import Statistics from '../views/home/Statistics'

//提醒列表
import RemindList from '../views/remind/RemindList'

//来客列表
import GuestList from '../views/guest/GuestList'

/*订单管理*/
import OrderList from '../views/order/OrderList'
import realFound from '../views/order/realFound'

/*标签管理*/
import LabelList from '../views/label/LabelList'
import LabelDetail from '../views/label/LabelDetail'


/*设备管理*/
import DeviceList from '../views/device/DeviceList'
import StoreDetail from '../views/device/StoreDetail'

/*****系统设置*****/
//门店管理

import User from '../views/user/User'
//角色管理
import Role from '../views/role/Role'
//提醒设置
import StoreRemind from '../views/store/StoreRemind'
//营业时间设置
import StoreTime from '../views/store/StoreTime'
//个人中心
import UserPersonal from '../views/user/UserPersonal'



Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login',name: 'Login',component: Login},
    {
      path: '/',
      meta: { requiresAuth: true },
      component: Main,
      children: [
        {path: '/',name: 'Statistics',component: Statistics},
        {path: 'RemindList',name: 'RemindList',component: RemindList},
        {path: 'GuestList',name: 'GuestList',component: GuestList},
        {path: 'OrderList',name: 'OrderList',component: OrderList},
        {path: 'realFound',name: 'realFound',component: realFound},
        {path: 'LabelList',name: 'LabelList',component: LabelList},
        {path: 'LabelDetail',name: 'LabelDetail',component: LabelDetail},
        {path: 'DeviceList',name: 'DeviceList',component: DeviceList},
        {path: 'StoreDetail',name: 'StoreDetail',component: StoreDetail},
        {path: 'StoreSet',name:'StoreSet',component:StoreSet},

        {path: 'User',name:'User',component:User},
        {path: 'Role',name:'Role',component:Role},
        {path: 'StoreRemind',name: 'StoreRemind',component: StoreRemind},
        {path: 'StoreTime',name: 'StoreTime',component: StoreTime},
        {path: 'UserPersonal',name: 'UserPersonal',component: UserPersonal},
      ]
  }]
})

router.beforeEach((to, from, next) => {
  let knock_knock = window.localStorage.getItem('knock_knock')
  if (to.matched.some(
        record => record.meta.requiresAuth)&& (!knock_knock || knock_knock === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
