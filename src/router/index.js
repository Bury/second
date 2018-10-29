import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
// import Main from '../views/menu/Main'
const Main = resolve => require(['@/views/menu/Main'],resolve)

// 登录页面
// import UserLogin from '../views/user/UserLogin'
const UserLogin = resolve => require(['@/views/user/UserLogin'],resolve)

//客流统计
// import Statistics from '../views/home/Statistics'
const Statistics = resolve => require(['@/views/home/Statistics'],resolve)

//来客列表
// import Guest from '../views/guest/Guest'
const Guest = resolve => require(['@/views/guest/Guest'],resolve)

//订单管理
// import Order from '../views/order/Order'
const Order = resolve => require(['@/views/order/Order'],resolve)
// import OrderLive from '../views/order/OrderLive'
// import OrderVideo from '../views/order/OrderVideo'
// import OrderNow from '../views/order/OrderNow'
const OrderNow = resolve => require(['@/views/order/OrderNow'],resolve)

//设备管理
// import Device from '../views/device/Device'
const Device = resolve => require(['@/views/device/Device'],resolve)

//帐号管理
// import User from '../views/user/User'
const User = resolve => require(['@/views/user/User'],resolve)
// import UserCurrentDetail from '../views/user/UserCurrentDetail'
const UserCurrentDetail = resolve => require(['@/views/user/UserCurrentDetail'],resolve)

//提醒设置
// import StoreRemind from '../views/settings/StoreRemind'
const StoreRemind = resolve => require(['@/views/settings/StoreRemind'],resolve)
//营业时间设置
// import StoreTime from '../views/settings/StoreTime'
const StoreTime = resolve => require(['@/views/settings/StoreTime'],resolve)




Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/UserLogin',name: 'UserLogin',component: UserLogin},
    {
      path: '/',
      meta: { requiresAuth: true },
      component: Main,
      children: [
        {path: 'Statistics',name: 'Statistics',component: Statistics},
        {path: 'Guest',name: 'Guest',component: Guest},
        {path: 'Order',name: 'Order',component: Order},
        // {path: 'OrderLive',name: 'OrderLive',component: OrderLive},
        // {path: 'OrderVideo',name: 'OrderVideo',component: OrderVideo},
        {path: 'OrderNow',name: 'OrderNow',component: OrderNow},
        {path: 'Device',name: 'Device',component: Device},
        {path: 'User',name:'User',component:User},
        {path: 'StoreRemind',name: 'StoreRemind',component: StoreRemind},
        {path: 'StoreTime',name: 'StoreTime',component: StoreTime},
        {path: 'UserCurrentDetail',name: 'UserCurrentDetail',component: UserCurrentDetail},
      ]
  }]
})

router.beforeEach((to, from, next) => {
  let knock_knock = window.localStorage.getItem('knock_knock')
  if (to.matched.some(
        record => record.meta.requiresAuth)&& (!knock_knock || knock_knock === null)) {

        // window.location.href = '/';

 next({
   path: '/UserLogin',
      query: { redirect: to.fullPath }
  })
  } else {
    next()
  }
})

export default router
