const rules={

	username(len_min,len_max,text){
		return [
    		{ required: true, message: text, trigger: 'blur' },
        	{ min: len_min, max: len_max, message: '长度在 4 到 20 个字符', trigger: 'blur' }
    	]
	},

	password(len_min,len_max,text) {
		 return [
	        { required: true, message: text, trigger: 'blur' },
	        { min: len_min, max: len_max, message: '长度在 '+len_min+' 到 '+len_max+' 个字符', trigger: 'blur' }
		]
	},

	phone(){
		return [
        		{ required: true, message: '请输入手机', trigger: 'blur' },
          		{
                	validator: (rule, value, callback) => {
	                    if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
	                        callback();
	                    } else {
	                        callback("请输入正确的手机");
	                    }
                	},
                	trigger: 'blur'
            	}
        	]
	},

	truename(){
		return [
    		{ required: true, message: '请输入姓名', trigger: 'blur' },
        	{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
    	]
	}
	
}

export default {
  rules
}