/**
 * 个人中心
 */
import axios from 'axios'

export default {

  //门店管理
  storeList(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_STORE_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addStore (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_STORE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  editStore (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_STORE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  deleStore (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELE_STORE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //账号
  accountList(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ACCOUNT_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addAccount (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  detailAccount (list){
    return new Promise((resolve, reject) => {
      axios.post(global.DETAIL_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  editAccount (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  deleAccount (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELE_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  changPwdAccount(list){
    return new Promise((resolve, reject) => {
      axios.post(global.CHANGEpWD_ACCOUNT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })

  },
  //角色管理
  roleList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ROLE_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addRole (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_ROLE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  editRole (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_ROLE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  deleRole (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELE_ROLE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  allPermission (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ALL_PERMISSION,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  editPermission (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_PERMISSION,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },


  

  //提醒配置
  getRemind () {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_REMIND).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  setRemind (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.SET_REMIND, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //营业时间设置
  getTime () {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_TIME).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
	
  setBusinessTime (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.SET_BUSINESS_TIME, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  // 获取登录信息
  getUserInfo (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_USER_INFO, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  //获取customer_id
  getCustomerId(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_PERSONAL_INFO, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  



}