import globalRules from '@/config/global_rules'

import userApi from '@/api/user.js'

export default {

    name: 'login-form',

    data () {

        return {

            loginInfo: {
                username: '',
                password: ''
            },

            rules: {
                username: globalRules.rules.user.username(5,16,'请输入帐号'),
                password: globalRules.rules.user.password(6,16,'请输入密码：')
            }

        }

    },

    methods: {

        reset() {
            this.$refs.loginForm.resetFields();
        },

        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let qs = require('querystring');
                    userApi.login(qs.stringify(this.$data.loginInfo)).then((res) => {
                        if(res.data.errno === 0){
                            localStorage.setItem('knock_knock', res.data.data.access_token);
                            localStorage.setItem('username', res.data.data.user.username);
                            localStorage.setItem('store_id', res.data.data.user.store_id);
                            localStorage.setItem('store_name', res.data.data.user.store_name);
                            this.$router.replace({name: 'Statistics'})
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    return false
                }
            })
        }

    },

}