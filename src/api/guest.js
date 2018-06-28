/**
 * 来客列表 
 */
import axios from 'axios'

export default {
	
	guestList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_GUEST_LIST, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  

}