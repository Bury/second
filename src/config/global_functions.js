const functions={

	success_message(object,message_text,duration_value) {
		if(message_text==undefined || message_text==''){
			message_text='操作成功';
		}
		if(duration_value==undefined || duration_value==''){
			duration_value='1000';
		}
	 	object.$message({
            type: 'success',
            message: message_text,
            duration:duration_value
      	});
	},
	
}

export default {
  functions
}