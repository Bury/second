import MenuLeft from '@/views/menu/MenuLeft'

import globalFunctions from '@/config/global_functions'

import userApi from '@/api/user'

export default {

    name: 'main-box',

    components: {
        MenuLeft
    },

    data () {
        return {
            store_name:'xxxxxx',
            username:'xxxxxx',
            horizontalIndex: '1',
            isCollapse: false,
            leftMenu: {
                leftMenu1:true,
                leftMenu2:false,
                leftMenu3:false,
                leftMenu4:false
            },
          left:true,
          right:false,

        }
    },

    created: function(){
        this.$data.username = localStorage.getItem('username');
        this.$data.store_name = localStorage.getItem('store_name');
    },

    methods: {
        handleSelect(key, keyPath) {
            var nowKey = "leftMenu"+key;
            for(var i in this.$data.leftMenu){
                var nowI = i;
                this.$data.leftMenu[nowI] = false;
                if(nowKey == nowI){
                    this.$data.leftMenu[nowI] = true;
                }
            }

        },

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        logout(){
            userApi.logout().then((res) => {
                globalFunctions.functions.user.logout(userApi,this.$router,this.$message);
            });
        },

        user_current_detail(){
            this.$router.push('/UserCurrentDetail')
        },
      movementLeft(){
        this.$data.right = true;
        this.$data.left = false;
        this.$data.isCollapse = true;
      },
      movementRight(){
          this.$data.right = false;
          this.$data.left = true;
        this.$data.isCollapse = false;
      },

    }

}
