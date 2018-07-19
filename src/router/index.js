import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
import Main from '../views/menu/Main'

// 登录页面
import UserLogin from '../views/user/UserLogin'

//客流统计
import Statistics from '../views/home/Statistics'
//提醒列表
import Remind from '../views/remind/Remind'
//来客列表
import Guest from '../views/guest/Guest'

/*订单管理*/
import Order from '../views/order/Order'
import realFound from '../views/order/realFound'

/*标签管理*/
import Label from '../views/label/Label'
import LabelDetail from '../views/label/LabelDetail'

/*设备管理*/
import Device from '../views/device/Device'
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
    { path: '/login',name: 'UserLogin',component: UserLogin},
    {
      path: '/',
      meta: { requiresAuth: true },
      component: Main,
      children: [
        {path: '/',name: 'Statistics',component: Statistics},
        {path: 'Remind',name: 'Remind',component: Remind},
        {path: 'Guest',name: 'Guest',component: Guest},
        {path: 'Order',name: 'Order',component: Order},
        {path: 'realFound',name: 'realFound',component: realFound},
        {path: 'Label',name: 'Label',component: Label},
        {path: 'LabelDetail',name: 'LabelDetail',component: LabelDetail},
        {path: 'Device',name: 'Device',component: Device},
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
