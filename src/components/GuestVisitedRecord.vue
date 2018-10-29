<template>
	<div class="store-record-box">
		<h4 class="top-box">到店总次数：{{totalNum}}次</h4>
		<ul class="store-record-list">
			<li class="store-record-item" v-for="(item,key) in storeRecords">
        <div class="item-time" style="display: flex;border-bottom:1px solid #d5d5d5;">
          <div>{{item.created_at | date(4)}}</div>
          <div style="font-size: 12px;">{{item.is_buy == 0 ? '未消费' : '已消费'}}</div>
        </div>
        <div style="display: flex;">
          <div>{{item.store_name}}</div>
          <div>标签:
            <div v-if="item.traffic_tag.length > 0">
              <div style="display: flex;">
                <div v-for="(item1,idx1) in label[0]">
                  <span v-for="(item2,index2) in item1.name">{{item2}}</span>
                </div>
              </div>
              <div style="display: flex;">
                <div v-for="(item1,idx1) in label[1]">
                  <span v-for="(item2,index2) in item1.name">{{item2}}</span>
                </div>
              </div>
              <div style="display: flex;justify-content: flex-start;">
                <div v-for="(item1,idx1) in label[2]">
                  <span v-for="(item2,index2) in item1.name">{{item2}}</span>
                </div>
              </div>

            </div>
            <div v-else>暂无数据</div>
          </div>
        </div>
				<div class="item-cont">
					<div class="left-img">
						<img :src="item.avatar">
					</div>
					<ul class="right-txt">
						<!--<li class="item-time">时间：</li>-->
						<li class="store-info">门店：{{item.store_name}}</li>
						<li class="store-info">设备：{{item.device_name}}</li>
					</ul>
				</div>
			</li>
		</ul>
		<!-- 分页 -->
		<div style="text-align: center">
			<el-pagination
        style="font-family: '微软雅黑';font-weight: 100;"
	            class="pagination"
	            layout="prev, pager, next"
	            small
	            @current-change="changePage"
	            :current-page="userInfoPagination.currentPage"
	            :page-size="requestParas.page_size"
	            :total="userInfoPagination.totalCount">
	        </el-pagination>
	    </div>
	</div>
</template>

<script src="@/assets/js/guest/GuestVisitedRecord.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/GuestVisitedRecord.scss">
