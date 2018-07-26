/**
 * 来客列表
 */
import axios from 'axios'

export default {

  lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_LISTS, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  edit(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_EDIT, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  view (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_VIEW, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  dele (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_DELE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //屏蔽动作
  guestHidden (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_HIDDEN, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //屏蔽列表
  guestHiddenList (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_HIDDEN_LIST, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },



}
