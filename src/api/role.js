/**
 * 个人中心
 */
import axios from 'axios'

export default {
  
  //岗位列表
  lists_results (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ROLE_LISTS_RESULTS,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}