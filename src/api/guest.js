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

  getGuestInfo (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_INFO, list).then((res) => {
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