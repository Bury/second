import axios from 'axios'
import router from '../router/index'

axios.interceptors.request.use(function (config) {
    let knock_knock = localStorage.getItem('knock_knock')
    if (knock_knock && knock_knock!==null && knock_knock!=='') {
            if(config.method=='post'){
                config.data = {
                    'access-token' : knock_knock,
                    ...config.data
                };            
            }else if(config.method=='get'){
                config.param = {
                    'access-token' : knock_knock,
                    ...config.params
                };
            }
        }
    return config;
  }, function (err) {
    return Promise.reject(err);
  });

axios.interceptors.response.use(function (res) {
    if (res.data.errno == 1000000 || res.data.msg=='access-token不能为空' || res.data.msg=='用户不存在') {
            localStorage.setItem('knock_knock', '')
            localStorage.setItem('username', '')
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
    return res;
  }, function (err) {
     if (err.data.errno == 1000000 || err.data.msg=='access-token不能为空' || res.data.msg=='用户不存在') {
            localStorage.setItem('knock_knock', '')
            localStorage.setItem('username', '')
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
    return Promise.reject(err);
  });

