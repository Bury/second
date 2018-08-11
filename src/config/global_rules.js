const rules={

	common:{
		id(len_min,len_max,text){
			return [
	    		{ required: true, message: text, trigger: 'blur' },
	        	{ min: len_min, max: len_max, message: `长度在 ${len_min}到${len_max}个字符`, trigger: 'blur' }
	    	]
		},
	},

	user:{

        //账号名5-16位字符
		username(text){
			return [
	    		{ required: true, message: text, trigger: 'blur' },
	        	{
	        		validator:(rule,value,callback) =>{
	        			if(value.match(/^[a-zA-Z0-9\u4E00-\u9FA5_]{5,16}$/)){
	        				callback();
	        			}else{
	        				callback("请输入5-16位的账号名")
	        			}
	        		},
	        		trigger:'blur'
	        	}
	    	]
		},

		loginPassword() {
			 return [
		        { required: true, message: '请输入密码：', trigger: 'blur' },

			]
		},

        //密码验证
		password(text) {
			 return [
		        { required: true, message: text, trigger: 'blur' },
		        { validator:(rule,value,callback) =>{
	        			if(value.match(/^[a-zA-Z0-9^·%&'.!@#*()_+\[\]~`\\{}\-:'"<>/,;=?$\x22]{6,16}$/)){
	        				callback();
	        			}else if(value.match(/^\s*|\s*$/)){
                        callback("除空格外数字,字母和任意字符6-16位")
                        }
                // else{
	        		// 		callback("数字,字母和任意字符6-16位")
	        		// 	}
	        		},
	        		trigger:'blur'
		        }
			]
		},
    //再次确认密码验证
    passwordRepeat() {
		  return[
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {
            if (value !== this.$data.passwordEditForm.passwordCurrent) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }
      ]
    },


        //手机号验证
		phone(){
			return [
	        		{ required: true, message: '请输入手机号', trigger: 'blur' },
	          		{
	                	validator: (rule, value, callback) => {
		                    if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
		                        callback();
		                    } else {
		                        callback("请输入正确的手机号");
		                    }
	                	},
	                	trigger: 'blur'
	            	}
	        	]
		},
		
		//手机号不必须验证
		noMustPhone(){
			return [
	        		{ required: false, message: '请输入手机号', trigger: 'blur' },
	          		{
	                	validator: (rule, value, callback) => {
		                    if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
		                        callback();
		                    } else {
		                        callback("请输入正确的手机号");
		                    }
	                	},
	                	trigger: 'blur'
	            	}
	        	]
		},
		
    //验证码验证
    code(){
      return[
        { required: true, message: '请输入验证码', trigger: 'blur' },
      ]
    },

        //姓名验证
		truename(){
			return [
	    		{ required: true, message: '请输入姓名', trigger: 'blur' },

	        	{
	                validator: (rule, value, callback) => {
		                    if (value.match(/^[a-zA-Z0-9^·%&'.!@#*()_+\[\]~`\\{}\-:'"<>/,;=?$\x22]{1,15}$/)){
		                        callback();
		                    } else {
		                        callback("请输入1-15位汉字或英文");
		                    }
	                	},
	                	trigger: 'blur'
	            	}
	    	]
		},
		
		//任意字符长度控制
		minMax(min,max){
			return [{ required: true, min: min, max: max,message: `请输入${min}到${max}位`, trigger: 'blur' }]
		},

		//性别验证
		gender(){
			return [
			    { required: true,min: len_min, message: '请选择性别', trigger: 'blur' }
			]
		},
    //备注验证
    remark(){
		  return[
        { required: true, message: '请填写备注信息', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {

            if (value.length > 200){
              callback("最多输入200个字符");
            }
          },
          trigger: 'blur'
        }
      ]
    },
	},


}

export default {
  rules
}
