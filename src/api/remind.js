/**
 * 提醒列表 1 /来客列表 0
 */
import axios from 'axios'

export default {
	
	remindList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_REMIND_LIST, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  personalInfo(customer_id){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_PERSONAL_INFO, customer_id).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  storeRecord(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_STORE_RECORE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  orderRecord(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ORDER_RECORE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

}