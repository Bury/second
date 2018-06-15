/**
 * 所有关于工作日志的接口
 */
import axios from 'axios'

export default {
	// 获取登录日志
  loginList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_LOGINLOG_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
	// 获取操作日志
  opList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_OPLOG_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}