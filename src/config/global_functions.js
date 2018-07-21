const functions={

	message(object,type_string,message_text,duration_value) {
		if(type_string==undefined || type_string==''){
			type_string='success';
		}
		if(message_text==undefined || message_text==''){
			if(type_string=='success'){
				message_text='操作成功';
			}else{
			}
		}
		if(duration_value==undefined || duration_value==''){
			duration_value='1000';
		}
	 	object.$message({
            type: type_string,
            message: message_text,
            duration:duration_value
      	});
	},


	user:{
		logout(object,router,message){
			object.logout().then((res) => {
				if(res.data.errno === 0){
					localStorage.setItem('knock_knock', '');
			        localStorage.setItem('username', '');
			        localStorage.setItem('store_id', '');
			        localStorage.setItem('store_name', '');
					// this.$router.replace({
					// 	name: 'UserLogin'
					// });
					router.push('/');//this.$router.replace({name: '/'})
				}else{
					message.error(res.ata.msg);
				}
			})

			
		}
	}
	
}

export default {
  functions
}