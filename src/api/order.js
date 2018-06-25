/**
 * 提醒列表
 */
import axios from 'axios'

export default {
	orderList () {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ORDER_LIST).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}