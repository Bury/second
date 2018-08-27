import deviceApi from '@/api/device'

export default{

    name:'device',

    data(){
        return{
            isShow:true,
            tableData: [],
            pagination:{
                currentPage:1,
                totalCount:0,
            },
            editId:0,
            editLocationDesc:'',
            requestParameters: {
                page: 1,
                page_size:20,
            },
            editFormVisible:false,
            noText: false,
            editForm:{
                locate:'',
                locate_desc:''
            },
            editRules:{
                locate_desc:[
                    { required: true, message: '请输入位置', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ]
            },
          locate:'',
        }
    },

    created:function(){
        this.lists();
    },

    watch: {
        'editForm.locate': 'locate_changed'
    },

    methods:{

        locate_changed() {
            if(this.editForm.locate === 'cashier') {
                this.editForm.locate_desc = '收银台'
                this.noText = true
            } else {
                this.editForm.locate_desc = this.$data.editLocationDesc
                this.noText = false
            }
        },

        lists(){
            let qs = require('querystring');
            deviceApi.lists().then((res) => {
                if(res.data.errno === 0){
                    this.$data.tableData = res.data.data.list;
                    for(let item of res.data.data.list){
                      if(item.locate == null){
                        this.$data.locate = '--';
                      }else if(item.locate == "other"){
                        this.$data.locate = '进店';
                      }else if(item.locate == 'cashier'){
                        this.$data.locate = '收银台';
                      }
                    }
                    this.$data.pagination.currentPage = res.data.data.pagination.currentPage;
                    this.$data.pagination.totalCount = res.data.data.pagination.totalCount;
                }else{

                }
            })
        },

        handleCurrentChange(currentPage) {
            this.$data.requestParameters.page = currentPage;
            this.lists();
        },

        fnEdit(row){
            this.$data.editId=row.id;
            this.$data.editLocationDesc=row.locate_desc,
            this.$data.editForm = {
                locate: row.locate == '' ? 'other' : row.locate,
                locate_desc: row.locate_desc
            },
            this.locate_changed();
            this.$data.editFormVisible = true;
        },
        editSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                      let list = {
                        'id': this.$data.editId,
                        'locate': this.$data.editForm.locate,
                        'locate_desc': this.$data.editForm.locate_desc
                      }
                      let qs = require('querystring');
                      deviceApi.edit(qs.stringify(list)).then((res) => {
                        if (res.data.errno === 0) {
                          this.lists();
                          this.editCancel();
                        } else {
                          this.$message.error(res.data.msg);
                        }

                      })
                }
            });
        },
        dialogClose(){
            this.$data.editFormVisible = false;
            setTimeout(() => {
              this.$refs.editForm.resetFields();
            })
        },
        editCancel(){
          this.$data.editId=0;
          this.$data.editForm = {
            locate: '',
            locate_desc: ''
          }
          this.$data.editFormVisible = false;
          setTimeout(() => {
            this.$refs.editForm.resetFields();
          })
        },

    }

}



