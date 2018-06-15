import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
import Main from '../views/Main'

// 登录页面
import Home from '../views/Home'

//客流统计
import Dashboard from '../views/home/Dashboard'

//提醒列表
import RemindList from '../views/remind/RemindList'

//来客列表
import GuestList from '../views/guest/GuestList'

/*订单管理*/
import OrderList from '../views/order/OrderList'

/*标签管理*/
import LabelList from '../views/label/LabelList'

/*设备管理*/
import Equipment from '../views/equipment/Equipment'

/*****系统设置*****/
//提醒设置
import RemindSet from '../views/setUp/RemindSet'
//营业时间设置
import OpenTimeSet from '../views/setUp/OpenTimeSet'
//个人中心
import Personal from '../views/setUp/Personal'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Home,
      meta: { auth: false }
    },
    {
    path: '/',
    component: Main,
    children: [
      {path: '',name: 'Dashboard',component: Dashboard},
      {path: 'RemindList',name: 'RemindList',component: RemindList},
      {path: 'GuestList',name: 'GuestList',component: GuestList},
      {path: 'OrderList',name: 'OrderList',component: OrderList},
      {path: 'LabelList',name: 'LabelList',component: LabelList},
      {path: 'Equipment',name: 'Equipment',component: Equipment},
      {path: 'RemindSet',name: 'RemindSet',component: RemindSet},
      {path: 'OpenTimeSet',name: 'OpenTimeSet',component: OpenTimeSet},
      {path: 'Personal',name: 'Personal',component: Personal},
    ]
  }]
})
export default router
