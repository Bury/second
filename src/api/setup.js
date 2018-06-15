/**
 * 所有关于设置的接口
 */
import axios from 'axios'

export default {
  // 获取账号列表
  userList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_USER_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 添加账号
  addUser (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_USER, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 修改账号
  editUser (list, id) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.EDIT_USER}${id}`, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 删除账号
  deleUser (id) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.DELETE_USER}${id}`).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 获取角色列表
  roleList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ROLE_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 新增角色
  addRole (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_ROLE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 修改角色
  editRole (list,id) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.EDIT_ROLE}${id}`, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 删除角色
  deleRole (id) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.DELETE_ROLE}${id}`).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}