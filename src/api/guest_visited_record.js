/**
 * 提醒列表
 */
import axios from 'axios'

export default {

    lists(list){
    return new Promise((resolve, reject) => {
      axios.post(global.Guest_Visited_Record_Lists, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}
