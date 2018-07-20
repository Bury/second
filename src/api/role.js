/**
 * 个人中心
 */
import axios from 'axios'

export default {
  
  //角色管理
  lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_LISTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  adds (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_ADDS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  edit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_EDIT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  dele (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_DELE,list).then((res) => {
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