   import userApi from '@/api/user.js'
  import globalFunctions from '@/config/global_functions'
    export default {
        name:'word-item',
        props:{
            isCollapse: Boolean,
            isShow: Boolean,
        },
        data(){
            return{
              tableData:[],
              currentMenu: '',
            }
        },
        watch:{
          $route(to,from){
    	         	this.$data.currentMenu = this.$route.name;
    	      },
        },
        created:function(){
          this.menu();
        	this.getUrl();

        },
        methods:{
          menu() {
            userApi.menu().then((res) => {
              if(res.data.errno === 0){
        		 for(let i=0;i<res.data.data.length;i++){
        		 	  if(res.data.data[i].no_child === false){
        		 	  	 res.data.data[i].front_url = String(i)
        		 	  }
        		 }
        		 this.$data.tableData = res.data.data;

        		 this.refreash();
        	 }

            })
          },
          getUrl() {
            this.$data.currentMenu = this.$route.name;
          },
          refreash(){
            let arr = [];
            arr.push('OrderNow');
            for(let item of this.$data.tableData){
              arr.push(item.front_url);
            }
            if(arr.indexOf(this.$data.currentMenu) == -1){
              // window.location.href = 'https://test.yy.ibetwo.com/';
              this.$message.warning('该账号的岗位状态有更改，需重新登录');
              globalFunctions.functions.user.logout(userApi,this.$router,this.$message);
            }
          },
        },
    }