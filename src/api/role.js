/**
 * 个人中心
 */
import axios from 'axios'

export default {
  
  //角色管理
  lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ROLE_LIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_ROLE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_ROLE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  dele (list) {
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

}