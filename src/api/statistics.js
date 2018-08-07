/**
 * 客流统计
 */
import axios from 'axios'

export default {
	
	getCustomer (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_CUSTOMER,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},


	statisticsFeature (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.StatisticsFeature,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
	
	storeStatistics (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.STORE_DATA_STATISTICS,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
}