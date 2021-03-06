/**
 * 个人中心
 */
import axios from 'axios'

export default {

  //提醒显示
  remindView () {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_REMIND_GET).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //提醒配置
  remindSet (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_REMIND_SET, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //营业时显示
  timeView () {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_TIME_GET).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
	
  //营业时间设置
  timeSet (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.STORE_TIME_SET, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}