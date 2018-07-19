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

  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_DELE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  password_reset(list){
    return new Promise((resolve, reject) => {
      axios.post(global.USER_PASSWORD_RESET,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  password_edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.USER_PASSWORD_EDIT, list).then((res) => {
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

	getUserInfo () {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_USER_INFO).then((res) => {
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