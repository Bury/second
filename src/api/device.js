/**
 * 设备管理
 */
import axios from 'axios'

export default {

	lists (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.DEVICE_LISTS,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	edit(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.EDIT_DEVICE,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
}