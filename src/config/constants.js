/**
 * 定义所有的常量
 */
// 接口地址
import apiUrl from './API.js'

const SERVER_IP = apiUrl.apiUrl
const COMMON = 'v1/'


global.FILE_UPLOAD = `${SERVER_IP}${COMMON}/user/upload`//图片上传地址 //PHP对象设计错误


//客流统计
// post analysis/customer
global.GET_CUSTOMER = `${SERVER_IP}${COMMON}analysis/customer`

global.StatisticsFeature = `${SERVER_IP}${COMMON}analysis/feature`



/*订单管理*/
global.ORDER_LISTS = `${SERVER_IP}${COMMON}order/list`

// post order/dele
global.DELE_ORDER = `${SERVER_IP}${COMMON}order/dele`
/// post order/adds 添加订单
global.ADD_ORDER_LIST = `${SERVER_IP}${COMMON}order/adds`
// post order/edit 修改订单
global.EDIT_ORDER_LIST = `${SERVER_IP}${COMMON}order/edit`
//显示订单
global.ORDER_VIEW = `${SERVER_IP}${COMMON}order/view`


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


//*************来客列表
global.GUEST_LISTS = `${SERVER_IP}${COMMON}customer/visitor-list`

//来客列表屏蔽动作
global.GUEST_HIDDEN = `${SERVER_IP}${COMMON}customer/do-hidden`
//屏蔽列表
global.GUEST_HIDDEN_LISTS = `${SERVER_IP}${COMMON}customer/hidden-list`

global.GUEST_EDIT = `${SERVER_IP}${COMMON}customer/edit-personal-info`
global.GUEST_VIEW = `${SERVER_IP}${COMMON}customer/personal-info`
global.GUEST_DELE = `${SERVER_IP}${COMMON}customer/del`

//标签数据
global.TAG_LISTS_RESULTS = `${SERVER_IP}${COMMON}tag/tree-form`

//到店记录
global.Guest_Visited_Record_Lists = `${SERVER_IP}${COMMON}customer/store-recore`
//来客订单记录
global.ORDER_LISTS_USER_RESULTS = `${SERVER_IP}${COMMON}customer/order-recore`
//post order/search-traffic 查询人脸信息
// global.GUEST_VIEW = `${SERVER_IP}${COMMON}order/search-traffic`//PHP对象错误




//*************设备管理
global.DEVICE_LISTS = `${SERVER_IP}${COMMON}device/list`
global.EDIT_DEVICE = `${SERVER_IP}${COMMON}device/edit`


//*************帐号管理
//岗位列表
global.ROLE_LISTS_RESULTS = `${SERVER_IP}${COMMON}role/list`
//帐号管理
global.USER_LISTS = `${SERVER_IP}${COMMON}account/list`
global.USER_ADDS = `${SERVER_IP}${COMMON}account/adds`
global.USER_VIEW = `${SERVER_IP}${COMMON}account/view`
global.USER_EDIT = `${SERVER_IP}${COMMON}account/edit`
global.USER_DELE = `${SERVER_IP}${COMMON}account/dele`
global.USER_PASSWORD_RESET = `${SERVER_IP}${COMMON}account/edit-password`
global.USER_STATUS_UPDATE = `${SERVER_IP}${COMMON}account/update-status`

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

