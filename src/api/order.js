/**
 * 订单列表
 */
import axios from 'axios'

export default {
	orderList (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_ORDER_LIST,list).then((res) => {
					resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	deleOrder (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.DELE_ORDER,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	addOrder (list){
		return new Promise((resolve, reject) => {
			axios.post(global.ADD_ORDER_LIST,list).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	},
	//查询人脸ID
	findFaceId(list){
		return new Promise((resolve, reject) => {
			axios.post(global.FINDFACEID_ORDER,list).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	},
	editOrder (list){
		return new Promise((resolve, reject) => {
			axios.post(global.EDIT_ORDER_LIST,list).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}