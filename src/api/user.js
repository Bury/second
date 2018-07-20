/**
 * 当前用户登录、退出、修改密码、信息
 */
import axios from 'axios'

export default {
  //帐号
  lists(list){
    return new Promise((resolve, reject) => {
      axios.post(global.USER_LISTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_ADDS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  edit_current (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_EDIT_CURRENT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //重置密码
  password_reset(list){
    return new Promise((resolve, reject) => {
      axios.post(global.USER_PASSWORD_RESET,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  view (list){
    return new Promise((resolve, reject) => {
      axios.post(global.USER_VIEW,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //修改当前登录用户密码
  password_edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_PASSWORD_EDIT, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //获取当前登录用户信息
	getUserCurrentView () {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_CURRENT_VIEW).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  logout (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_LOGOUT, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  login (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_LOGIN, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}