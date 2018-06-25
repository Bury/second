/**
 * 个人中心
 */
import axios from 'axios'

export default {
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
  }

}