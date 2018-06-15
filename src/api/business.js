/**
 * 所有关于商家的接口
 */
import axios from 'axios'

export default {
	//获取、搜索商家列表
  businessList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_BUSINESS_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
	//新增商家
	addBusiness (form) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_BUSINESS, form).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
	//修改商家
	editBusiness (form, id) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.EDIT_BUSINESS}${id}`, form).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
	//删除商家
	deleBusiness (id) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.DELETE_BUSINESS}${id}`).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 设置账号
  setAccount (account) {
    return new Promise((resolve, reject) => {
      axios.post(global.SET_BUSINESS_ACCOUNT, account).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 按商家获取模块
  getSubsystem (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.SET_BUSINESS_SUBSYSTEM, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 增加天数
  updateDay (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_DAYS, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 更新状态
  updateStatus (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.SET_STATUS, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}