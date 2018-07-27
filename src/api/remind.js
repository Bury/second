/**
 * 提醒列表
 */
import axios from 'axios'

export default {

	lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.REMIND_LISTS, list).then((res) => {
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



  isReception(list){
    return new Promise((resolve, reject) => {
      axios.post(global.IS_RECEPTION, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  getAll(list){
  return new Promise((resolve, reject) => {
    axios.post(global.TAG_LISTS_RESULTS, list).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
  }

}
