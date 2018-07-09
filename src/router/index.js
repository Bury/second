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

/*标签管理*/
import LabelList from '../views/label/LabelList'
import LabelDetail from '../views/label/LabelDetail'


/*设备管理*/
import DeviceList from '../views/device/DeviceList'
import StoreDetail from '../views/device/StoreDetail'

/*****系统设置*****/
//门店管理
import StoreSet from '../views/setting/storeSet/StoreSet'
import AccountSet from '../views/setting/storeSet/AccountSet'
//角色管理
import RoleSet from '../views/setting/RoleSet'
//提醒设置
import RemindSet from '../views/setting/RemindSet'
//营业时间设置
import OpenTimeSet from '../views/setting/OpenTimeSet'
//个人中心
import Personal from '../views/setting/Personal'


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
        {path: 'LabelList',name: 'LabelList',component: LabelList},
        {path: 'LabelDetail',name: 'LabelDetail',component: LabelDetail},
        {path: 'DeviceList',name: 'DeviceList',component: DeviceList},
        {path: 'StoreDetail',name: 'StoreDetail',component: StoreDetail},
        {path: 'StoreSet',name:'StoreSet',component:StoreSet},
        {path: 'AccountSet',name:'AccountSet',component:AccountSet},
        {path: 'RoleSet',name:'RoleSet',component:RoleSet},
        {path: 'RemindSet',name: 'RemindSet',component: RemindSet},
        {path: 'OpenTimeSet',name: 'OpenTimeSet',component: OpenTimeSet},
        {path: 'Personal',name: 'Personal',component: Personal},
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
