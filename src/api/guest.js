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

  view (list){
    return new Promise((resolve, reject) => {
      axios.post(global.GUEST_VIEW, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}