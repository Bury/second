/**
 * 提醒列表 
 */
import axios from 'axios'

export default {
	
  lists_results(list){
    return new Promise((resolve, reject) => {
      axios.post(global.TAG_LISTS_RESULTS, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

}