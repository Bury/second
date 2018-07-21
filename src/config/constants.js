/**
 * 定义所有的常量
 */
// 接口地址
import apiUrl from './API.js'

const SERVER_IP = apiUrl.apiUrl
const COMMON = 'v1/'

//客流统计
// post analysis/customer
global.GET_CUSTOMER = `${SERVER_IP}${COMMON}analysis/customer`
// post analysis/feature
global.GET_FEATURE = `${SERVER_IP}${COMMON}analysis/feature`

/*提醒列表*/
// post customer//remind-list 获取提醒列表
global.GET_REMIND_LIST = `${SERVER_IP}${COMMON}customer/remind-list`
// post customer/personal-info 个人信息
global.GET_PERSONAL_INFO = `${SERVER_IP}${COMMON}customer/personal-info`
// post customer/edit-personal-info
global.EDIT_PERSONAL_INFO = `${SERVER_IP}${COMMON}customer/edit-personal-info`
// post customer/store-recore 到店记录
global.GET_STORE_RECORE = `${SERVER_IP}${COMMON}customer/store-recore`
// post customer/order-recore 订单记录
global.GET_ORDER_RECORE = `${SERVER_IP}${COMMON}customer/order-recore`
// post customer/levels 提醒列表用户等级筛选项
global.GET_LEVELS = `${SERVER_IP}${COMMON}customer/levels`
// post customer/store-list 门店筛选项
global.GET_STORES = `${SERVER_IP}${COMMON}customer/store-list`
// post customer/is-reception 接待
global.IS_RECEPTION = `${SERVER_IP}${COMMON}customer/is-reception`

/*来客列表*/
// post customer/visitor-list 获取来客列表
global.GET_GUEST_LIST = `${SERVER_IP}${COMMON}customer/visitor-list`

/*订单管理*/
// post order/list订单列表
global.GET_ORDER_LIST = `${SERVER_IP}${COMMON}order/list`
// post order/dele
global.DELE_ORDER = `${SERVER_IP}${COMMON}order/dele`
/// post order/adds 添加订单
global.ADD_ORDER_LIST = `${SERVER_IP}${COMMON}order/adds`
// post order/edit 修改订单
global.EDIT_ORDER_LIST = `${SERVER_IP}${COMMON}order/edit`
//post order/search-traffic 查询人脸信息
global.FINDFACEID_ORDER = `${SERVER_IP}${COMMON}order/search-traffic`


//订单管理/实时录单
global.POST_ORDER_FACE = `${SERVER_IP}${COMMON}order/face-recognition`
//订单管理/实时录单/查找手机号
global.CHECK_USER_PHONE = `${SERVER_IP}${COMMON}order/search-phone`
//订单管理/实时录单/查找手机号/点击获取验证码
global.GET_SEND_MSG = `${SERVER_IP}${COMMON}order/send`
//订单管理/实时录单/查找手机号/点击获取验证码/验证
global.CHECK_MSG = `${SERVER_IP}${COMMON}order/check-sms`
//订单管理/实时录单/查找手机号/点击获取验证码/验证/是否是本人
global.IS_NO_ME = `${SERVER_IP}${COMMON}order/is-me`
//订单管理/实时录单/查找手机号/点击获取验证码/验证/是否是本人/但凡是新手机号都走添加
global.ADD_NEW_PHONE = `${SERVER_IP}${COMMON}order/add-phone`
//新增消费
global.ADD_GOODS = `${SERVER_IP}${COMMON}order/adds`


/*标签管理*/
// post /v1/tag/tree-form
global.GET_TREE_FORM = `${SERVER_IP}${COMMON}tag/tree-form`

//1、父级
// post tag/list 标签列表
global.GET_LABEL_LIST = `${SERVER_IP}${COMMON}tag/parent-list`
// post tag/parent-adds 添加
global.ADD_LABEL = `${SERVER_IP}${COMMON}tag/parent-adds`
// post tag/parent-edit 修改
global.EDIT_LABEL = `${SERVER_IP}${COMMON}tag/parent-edit`
// post tag/parent-dele 删除
global.DELE_LABEL = `${SERVER_IP}${COMMON}tag/parent-dele`

//2、子级
// post tag/childs-list 标签列表
global.GET_CHILD_LABEL_LIST = `${SERVER_IP}${COMMON}tag/childs-list`
// post tag/childs-adds 添加
global.ADD_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-adds`
// post tag/childs-edit 修改
global.EDIT_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-edit`
// post tag/childs-dele 删除
global.DELE_CHILD_LABEL = `${SERVER_IP}${COMMON}tag/childs-dele`

//设备管理
// post device/list 按设备
global.GET_DEVICE_LIST = `${SERVER_IP}${COMMON}device/list`
// post device/version
global.GET_ALL_VERSION = `${SERVER_IP}${COMMON}device/version`
// post device/camera-depoly 按设备分配
global.SET_DEPOLY = `${SERVER_IP}${COMMON}device/camera-depoly`
// post device/edit
global.EDIT_DEVICE = `${SERVER_IP}${COMMON}device/edit`
// post device/device-list 按门店
global.GET_DEVICE_LIST_STORE = `${SERVER_IP}${COMMON}device/device-list`
// post device/operation 按门店分配
global.SET_OPERATION = `${SERVER_IP}${COMMON}device/operation`


//*************店员管理
//岗位列表
global.ROLE_LISTS_RESULTS = `${SERVER_IP}${COMMON}role/list_results`
//帐号管理
global.USER_LISTS = `${SERVER_IP}${COMMON}account/list`
global.USER_ADDS = `${SERVER_IP}${COMMON}account/adds`
global.USER_VIEW = `${SERVER_IP}${COMMON}account/view`
global.USER_EDIT = `${SERVER_IP}${COMMON}account/edit`
global.USER_DELE = `${SERVER_IP}${COMMON}account/dele`
global.USER_PASSWORD_RESET = `${SERVER_IP}${COMMON}account/edit-password`

global.USER_EDIT_CURRENT = `${SERVER_IP}${COMMON}user/edit`

//*************系统设置

//提醒设置
global.STORE_REMIND_GET = `${SERVER_IP}${COMMON}store-config/view-remind`
global.STORE_REMIND_SET = `${SERVER_IP}${COMMON}store-config/remind`

//营业时间设置
global.STORE_TIME_GET = `${SERVER_IP}${COMMON}store-config/view-time`
global.STORE_TIME_SET = `${SERVER_IP}${COMMON}store-config/business-time`



global.USER_CURRENT_INFO = `${SERVER_IP}${COMMON}user/info`
global.USER_PASSWORD_EDIT = `${SERVER_IP}${COMMON}user/change-password`

global.USER_LOGOUT = `${SERVER_IP}${COMMON}user/logout`
global.USER_LOGIN = `${SERVER_IP}${COMMON}user/login`

