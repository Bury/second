/**
 * 个人中心
 */
import axios from 'axios'

export default {


  

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

  // 获取登录信息
  getUserInfo (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_USER_INFO, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  //获取customer_id
  getCustomerId(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_PERSONAL_INFO, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  



}