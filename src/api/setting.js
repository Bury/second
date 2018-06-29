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
  editStroe (list) {
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



}