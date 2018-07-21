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

	allVersion () {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_ALL_VERSION).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	setDepoly(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.SET_DEPOLY,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	editDevice(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.EDIT_DEVICE,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	deviceListStore (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_DEVICE_LIST_STORE,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	setOperation(list){
		return new Promise((resolve, reject) => {
	      axios.post(global.SET_OPERATION,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	}
}