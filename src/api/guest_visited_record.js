/**
 * 提醒列表
 */
import axios from 'axios'

export default {

    lists(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GuestVisitedRecordLists, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}
