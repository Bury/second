/**
 * 定义所有的常量
 */
// 接口地址
const SERVER_IP = 'http://test.yy_api.ibetwo.com/'
const COMMON = 'v1/'

/*提醒列表*/
// post customer//remind-list 获取提醒列表
global.GET_REMIND_LIST = `${SERVER_IP}${COMMON}customer/remind-list`
// post customer/personal-info 个人信息
global.GET_PERSONAL_INFO = `${SERVER_IP}${COMMON}customer/personal-info`
// post customer/store-recore 到店记录
global.GET_STORE_RECORE = `${SERVER_IP}${COMMON}customer/store-recore`
// post customer/order-recore 订单记录
global.GET_ORDER_RECORE = `${SERVER_IP}${COMMON}customer/order-recore`
// post customer/levels 提醒列表用户等级筛选项
global.GET_LEVELS = `${SERVER_IP}${COMMON}customer/levels`
// post customer/store-list 门店筛选项
global.GET_STORES = `${SERVER_IP}${COMMON}customer/store-list`

/*来客列表*/
// post customer/visitor-list 获取提醒列表
global.GET_GUEST_LIST = `${SERVER_IP}${COMMON}customer/visitor-list`

/*订单管理*/
// post order/list订单列表
global.GET_ORDER_LIST = `${SERVER_IP}${COMMON}order/list`

/*标签管理*/
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

/*个人中心*/
//1、门店管理
// psot store/lists 门店列表
global.GET_STORE_LIST = `${SERVER_IP}${COMMON}store/lists`
// post store/adds 添加门店
global.ADD_STORE = `${SERVER_IP}${COMMON}store/adds`
// post store/edit 编辑门店
global.EDIT_STORE = `${SERVER_IP}${COMMON}store/edit`
// post store/dele 删除门店
global.DELE_STORE = `${SERVER_IP}${COMMON}store/dele`


//2、角色管理
// post role/list 角色列表
global.GET_ROLE_LIST = `${SERVER_IP}${COMMON}role/list`
// post role/adds 添加
global.ADD_ROLE = `${SERVER_IP}${COMMON}role/adds`
// POST role/edit 修改
global.EDIT_ROLE = `${SERVER_IP}${COMMON}role/edit`
// post role/dele 删除
global.DELE_ROLE = `${SERVER_IP}${COMMON}role/dele`
// post role/view-permission 所有权限
global.GET_ALL_PERMISSION = `${SERVER_IP}${COMMON}role/view-permission`
// post role/edit-permission 编辑权限
global.EDIT_PERMISSION = `${SERVER_IP}${COMMON}role/edit-permission`


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

//5、当前用户
// post user/info 当前用户信息
global.GET_USER_INFO = `${SERVER_IP}${COMMON}user/info`
// post user/change-password 修改密码
global.CHANGE_PASSWORD = `${SERVER_IP}${COMMON}user/change-password`
// post user/logout 退出
global.LOGOUT = `${SERVER_IP}${COMMON}user/logout`
// post user/login 登陆
global.LOGIN = `${SERVER_IP}${COMMON}user/login`

