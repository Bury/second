/**
 * 来客列表
 */
import axios from 'axios'

export default {

  lists (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_LISTS, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  edit(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_EDIT, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  viewInfo (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_VIEW_INFO, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  dele (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_DELE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //查询人脸ID
	// findFaceId(list){
	// 	return new Promise((resolve, reject) => {
	// 		axios.post(global.FINDFACEID_ORDER,list).then((res) => {
	// 			resolve(res)
	// 		}).catch((err) => {
	// 			reject(err)
	// 		})
	// 	})
	// },

  //屏蔽动作
  hidden (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_HIDDEN, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  //屏蔽列表
  hiddenLists (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_HIDDEN_LISTS, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },



}
