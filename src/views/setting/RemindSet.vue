<template>
	<div class="remind-set-page">
        <h3 class="top-box">提醒配置</h3>
        <div class="all-box">
            <el-checkbox :indeterminate="isIndeterminate" 
            v-model="checkAll"
            @change="handleCheckAllChange">全选</el-checkbox>
        </div>
		<div class="type-list">
            <el-checkbox-group v-model="checkedType" @change="fnChangeType">
                <el-checkbox v-for="city in types" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </div>
		<div class="saveBtn">
            <el-button type="primary" class="save-btn">保存</el-button>
        </div>
	</div>
</template>
<script>
  const typeOptions = ['新客匿名', '新客VIP', '熟客匿名', '熟客VIP'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedType: ['新客匿名', '新客VIP',],
        types: typeOptions,
        isIndeterminate: true
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedType = val ? typeOptions : [];
        this.isIndeterminate = false;
      },
      fnChangeType(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.types.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .remind-set-page{
    margin:80px auto 0;
    padding:40px;
    width: 500px;
    border:1px solid #d2d2d2;
    .top-box{
        height: 60px;
    }
    .all-box{
        margin-bottom:20px;
    }
    .type-list{
        margin-bottom:100px;
    }
    .saveBtn{
        position:relative;
        width: 100%;
        height: 40px;
        .save-btn{
            position: absolute;
            bottom:0;
            right:0;
        }
    }
  }
</style>