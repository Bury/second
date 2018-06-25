import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
import Main from '../views/home/Main'

// 登录页面
import Home from '../views/Home'

//客流统计
import Statistics from '../views/statistics/Statistics'

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
import Equipment from '../views/equipment/Equipment'
import EquipmentOfOwner from '../views/equipment/EquipmentOfOwner'
import StoreDetail from '../views/equipment/StoreDetail'

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
      {path: '',name: 'Statistics',component: Statistics},
      {path: 'RemindList',name: 'RemindList',component: RemindList},
      {path: 'GuestList',name: 'GuestList',component: GuestList},
      {path: 'OrderList',name: 'OrderList',component: OrderList},
      {path: 'LabelList',name: 'LabelList',component: LabelList},
      {path: 'LabelDetail',name: 'LabelDetail',component: LabelDetail},
      {path: 'Equipment',name: 'Equipment',component: Equipment},
      {path: 'EquipmentOfOwner',name: 'EquipmentOfOwner',component: EquipmentOfOwner},
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
export default router
