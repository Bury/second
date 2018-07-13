<template>
    <div class="notice">
        <div class="top-box">
			<el-button type="primary" size="small" class="add-btn" @click="outerVisible = true">创建通知</el-button>
		</div>
        <el-table :data="tableData" border style="text-align:center">
	    	<el-table-column prop="name" label="标题"></el-table-column>
            <el-table-column prop="conent" label="内容"></el-table-column>
            <el-table-column prop="who" label="操作人" ></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
		    <el-table-column label="操作" width="200">
			    <template slot-scope="scope">
			    	<el-button type="text" size="small">查看</el-button>
			    	<el-button type="text" size="small">删除</el-button>
			    </template>
		    </el-table-column> 
	    </el-table>
        <!--创建通知-->
        <el-dialog title="创建通知" :visible.sync="outerVisible">
            <el-form ref="form" label-width="80px">
                <el-form-item label="收件人">
                    <el-button size="small" @click="innerVisible = true">收件人</el-button>
                </el-form-item> 
                <el-form-item label="标题">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <el-dialog width="40%" title="添加收件人" :visible.sync="innerVisible" append-to-body>
                <div style="margin: 15px 0;">
                    <el-checkbox>门店一</el-checkbox>
                    <el-checkbox-group>
                        <el-checkbox>店长</el-checkbox>
                        <el-checkbox>导购一</el-checkbox>
                        <el-checkbox>导购二</el-checkbox>
                        <el-checkbox>导购一</el-checkbox>
                        <el-checkbox>导购二</el-checkbox>
                        <el-checkbox>导购一</el-checkbox>
                        <el-checkbox>导购二</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div style="margin: 15px 0;">
                    <el-checkbox>门店二</el-checkbox>
                    <el-checkbox-group>
                        <el-checkbox>店长</el-checkbox>
                        <el-checkbox>导购一</el-checkbox>
                        <el-checkbox>导购二</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="innerVisible = false">确定</el-button>
                </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="outerVisible = false">发送</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'notice',
    data(){
        return{
            outerVisible: false,
            innerVisible: false,
            tableData: [
                {name: 'zhangan',
                 conent: '删除账号',
                 who: 'zhangs',
                 time: '2017-7-12'
                }
            ]
        }
    },
    created: function () {

    },
    methods: {

    }

}
</script>
<style lang="scss" scoped>
.notice{
		.top-box{
			position:relative;
			margin-bottom:20px;
			height: 36px;
			border-bottom:1px solid #d2d2d2;
			.add-btn{
				position: absolute;
				top:0;
				right:20px;

			}
		}

	}

</style>
