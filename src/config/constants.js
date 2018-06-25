/**
 * 定义所有的常量
 */
// 接口地址
const SERVER_IP = 'http://test.yy_api.ibetwo.com/'
const COMMON = 'v1/'

/*提醒列表*/
// post customer/list 获取提醒列表
global.GET_REMIND_LIST = `${SERVER_IP}${COMMON}customer/list`
// post customer/personal-info 个人信息
global.GET_PERSONAL_INFO = `${SERVER_IP}${COMMON}customer/personal-info`
// post customer/store-recore 到店记录
global.GET_STORE_RECORE = `${SERVER_IP}${COMMON}customer/store-recore`
// post customer/order-recore 订单记录
global.GET_ORDER_RECORE = `${SERVER_IP}${COMMON}customer/order-recore`

/*订单管理*/
// post order/list订单列表
global.GET_ORDER_LIST = `${SERVER_IP}${COMMON}order/list`

/*个人中心*/
//3、提醒设置
// post store-config/view-remind 显示提醒
global.GET_REMIND = `${SERVER_IP}${COMMON}store-config/view-remind`
// post store-config/remind 设置提醒
global.SET_REMIND = `${SERVER_IP}${COMMON}store-config/remind`

//4、营业时间设置
// post store-config/view-time 显示营业时间
global.GET_TIME = `${SERVER_IP}${COMMON}store-config/view-time`
// post store-config/business-time 营业时间设置
global.SET_BUSINESS_TIME = `${SERVER_IP}${COMMON}store-config/business-time`

